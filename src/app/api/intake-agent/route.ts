import { Agent, run, tool } from '@openai/agents'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const maxDuration = 30

const serviceOptions = [
  'AI deployment audit',
  'Pilot sprint support',
  'Deployment lead advisory',
  'Vendor/build evaluation',
] as const

const pricingText = [
  'AI deployment audit: $2.5k-$5k',
  'Pilot sprint support: $7.5k-$15k',
  'Deployment lead advisory: $3k-$8k/month',
  'Vendor/build evaluation is usually scoped inside an audit, sprint, or advisory engagement.',
].join('\n')

const fieldSchema = z.enum([
  'intro',
  'name',
  'email',
  'company',
  'website',
  'role',
  'serviceInterest',
  'challenge',
  'timeline',
  'budgetFit',
  'notes',
  'confirm',
])

const statusSchema = z.enum(['collecting', 'ready_to_review', 'submitted', 'held'])

const emptyFieldsValue = {
  intro: '',
  name: '',
  email: '',
  company: '',
  website: '',
  role: '',
  serviceInterest: '',
  challenge: '',
  timeline: '',
  budgetFit: '',
  notes: '',
}

const intakeFieldsSchema = z.object({
  intro: z.string().default(''),
  name: z.string().default(''),
  email: z.string().default(''),
  company: z.string().default(''),
  website: z.string().default(''),
  role: z.string().default(''),
  serviceInterest: z.string().default(''),
  challenge: z.string().default(''),
  timeline: z.string().default(''),
  budgetFit: z.string().default(''),
  notes: z.string().default(''),
})

const qualityFlagSchema = z.object({
  field: z.string(),
  input: z.string(),
  reason: z.string(),
})

const intakeAgentStateSchema = z.object({
  fields: intakeFieldsSchema.default(emptyFieldsValue),
  currentMissingField: fieldSchema.default('intro'),
  lastAskedQuestion: z.string().default('Start by introducing yourself and what brought you here.'),
  qualityFlags: z.array(qualityFlagSchema).default([]),
  confirmationState: z.enum(['none', 'awaiting_confirmation', 'confirmed', 'held']).default('none'),
  draftSummary: z.string().default(''),
})

const agentOutputSchema = z.object({
  reply: z.string(),
  state: intakeAgentStateSchema,
  status: statusSchema,
  draftSummary: z.string().default(''),
})

type IntakeAgentState = z.infer<typeof intakeAgentStateSchema>
type IntakeFields = z.infer<typeof intakeFieldsSchema>

function emptyFields(): IntakeFields {
  return {
    intro: '',
    name: '',
    email: '',
    company: '',
    website: '',
    role: '',
    serviceInterest: '',
    challenge: '',
    timeline: '',
    budgetFit: '',
    notes: '',
  }
}

function emptyState(): IntakeAgentState {
  return {
    fields: emptyFields(),
    currentMissingField: 'intro',
    lastAskedQuestion: 'Start by introducing yourself and what brought you here.',
    qualityFlags: [],
    confirmationState: 'none',
    draftSummary: '',
  }
}

function normalizeState(value: unknown): IntakeAgentState {
  return intakeAgentStateSchema.parse(value || emptyState())
}

function cleanName(value: string) {
  return value
    .replace(/[.,!?;:]+$/g, '')
    .replace(/\s+(and|but|because|from|with)\s+.*$/i, '')
    .trim()
}

function titleCaseName(value: string) {
  return cleanName(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function extractName(value: string) {
  const explicit = value.match(/\b(?:i am|i'm|im|my name is|this is)\s+([a-z][a-z'-]*(?:\s+[a-z][a-z'-]*)?)/i)
  if (explicit?.[1]) {
    return titleCaseName(explicit[1])
  }

  if (/^[a-z][a-z' -]{1,60}$/i.test(cleanName(value))) {
    return titleCaseName(value)
  }

  return ''
}

function extractEmail(value: string) {
  return value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0] || ''
}

function normalizeService(value: string) {
  const lower = value.toLowerCase()

  if (lower === '1' || lower.includes('audit') || lower.includes('diagnostic')) {
    return serviceOptions[0]
  }

  if (lower === '2' || lower.includes('pilot') || lower.includes('sprint') || lower.includes('implementation')) {
    return serviceOptions[1]
  }

  if (lower === '3' || lower.includes('advisory') || lower.includes('ongoing') || lower.includes('retainer')) {
    return serviceOptions[2]
  }

  if (lower === '4' || lower.includes('vendor') || lower.includes('build') || lower.includes('tool')) {
    return serviceOptions[3]
  }

  return ''
}

function isSkip(value: string) {
  return /^(skip|none|n\/a|na|no|nope)$/i.test(value.trim())
}

function isQuestion(value: string) {
  return value.includes('?') || /^(what|how|why|who|when|where|can you|what can|what do|tell me|explain)\b/i.test(value.trim())
}

function isLowQuality(value: string) {
  const trimmed = value.trim().toLowerCase()

  if (trimmed.length < 3) {
    return true
  }

  return /^(huh|what|what\?|idk|i don't know|i dont know|lol|lmao|test|asdf|qwerty|swag|max|swag max|whatever|what else)$/i.test(trimmed)
}

function isOffTopic(value: string) {
  return /\b(rocket|2\s*\+\s*2|weather|recipe|homework|joke|poem|song|movie)\b/i.test(value)
}

function isPricingQuestion(value: string) {
  return /\b(price|pricing|cost|costs|budget|range|fee|fees|retainer|monthly|how much)\b/i.test(value)
}

function nextMissingField(fields: IntakeFields): z.infer<typeof fieldSchema> {
  if (!fields.name) return 'name'
  if (!fields.email) return 'email'
  if (!fields.company) return 'company'
  if (!fields.serviceInterest) return 'serviceInterest'
  if (!fields.challenge) return 'challenge'
  if (!fields.timeline) return 'timeline'
  if (!fields.budgetFit) return 'budgetFit'
  if (!fields.website) return 'website'
  if (!fields.role) return 'role'
  if (!fields.notes) return 'notes'
  return 'confirm'
}

function questionFor(field: z.infer<typeof fieldSchema>) {
  switch (field) {
    case 'intro':
      return 'Start by introducing yourself and what brought you here.'
    case 'name':
      return 'What name should we use for follow-up?'
    case 'email':
      return 'What email should we use for follow-up?'
    case 'company':
      return 'What company or brand are you with?'
    case 'website':
      return 'What is the company website? Type skip if you would rather leave it out.'
    case 'role':
      return 'What is your role or function? Type skip if you would rather leave it out.'
    case 'serviceInterest':
      return [
        'Which service are you most interested in?',
        '1. AI deployment audit',
        '2. Pilot sprint support',
        '3. Deployment lead advisory',
        '4. Vendor/build evaluation',
      ].join('\n')
    case 'challenge':
      return 'What ecommerce workflow, operating problem, or AI deployment opportunity should Winter Advisory help with?'
    case 'timeline':
      return 'What timeline are you working against?'
    case 'budgetFit':
      return `What pricing range or budget constraint should be considered?\n${pricingText}`
    case 'notes':
      return 'Anything else we should know before reviewing this? Type skip if not.'
    case 'confirm':
      return 'Reply yes to submit this inquiry, or no to hold it here.'
  }
}

function mergeExtractedFields(state: IntakeAgentState, message: string) {
  const fields = { ...state.fields }
  const current = state.currentMissingField

  if (!fields.email) {
    fields.email = extractEmail(message)
  }

  if (!fields.name) {
    fields.name = extractName(message)
  }

  if (current === 'company' && !isQuestion(message) && !isLowQuality(message)) {
    fields.company = message.trim()
  }

  if (current === 'website') {
    fields.website = isSkip(message) ? 'Not provided' : message.trim()
  }

  if (current === 'role') {
    fields.role = isSkip(message) ? 'Not provided' : message.trim()
  }

  if (current === 'serviceInterest') {
    fields.serviceInterest = normalizeService(message)
  }

  if (current === 'challenge' && !isQuestion(message) && !isLowQuality(message) && !isOffTopic(message)) {
    fields.challenge = message.trim()
  }

  if (current === 'timeline' && !isQuestion(message) && !isLowQuality(message) && !isOffTopic(message)) {
    fields.timeline = message.trim()
  }

  if (current === 'budgetFit' && !isQuestion(message) && !isLowQuality(message) && !isOffTopic(message)) {
    fields.budgetFit = message.trim()
  }

  if (current === 'notes') {
    fields.notes = isSkip(message) ? 'None' : message.trim()
  }

  if (!fields.intro && current === 'intro') {
    fields.intro = message.trim()
  }

  return fields
}

function validateField(field: z.infer<typeof fieldSchema>, value: string) {
  if (['website', 'role', 'notes'].includes(field) && isSkip(value)) {
    return { valid: true, reason: 'Optional field skipped.' }
  }

  if (field === 'email') {
    return extractEmail(value)
      ? { valid: true, reason: 'Valid email.' }
      : { valid: false, reason: 'A valid email address is required.' }
  }

  if (field === 'serviceInterest') {
    return normalizeService(value)
      ? { valid: true, reason: 'Matched a Winter Advisory service.' }
      : { valid: false, reason: 'Choose one of the four Winter Advisory services.' }
  }

  if (['challenge', 'timeline', 'budgetFit'].includes(field)) {
    if (isQuestion(value) || isLowQuality(value) || isOffTopic(value)) {
      return { valid: false, reason: 'This does not look like usable inquiry context for the current field.' }
    }
  }

  if (isLowQuality(value)) {
    return { valid: false, reason: 'The reply is too unclear to store as lead context.' }
  }

  return { valid: true, reason: 'Usable reply.' }
}

function buildDraft(fields: IntakeFields) {
  return [
    'Draft inquiry for Winter Advisory',
    '',
    `Prospect: ${fields.name}`,
    `Company: ${fields.company}`,
    fields.website && fields.website !== 'Not provided' ? `Website: ${fields.website}` : '',
    fields.role && fields.role !== 'Not provided' ? `Role: ${fields.role}` : '',
    `Email: ${fields.email}`,
    '',
    `Service interest: ${fields.serviceInterest}`,
    `Workflow or challenge: ${fields.challenge}`,
    `Timeline: ${fields.timeline}`,
    `Pricing/budget context: ${fields.budgetFit}`,
    fields.notes && fields.notes !== 'None' ? `Additional notes: ${fields.notes}` : '',
    '',
    'Recommended next step: review fit and follow up with a scoped recommendation. Pricing is directional until Winter Advisory reviews scope, constraints, and timing.',
  ].filter(Boolean).join('\n')
}

async function postContactLead(requestUrl: string, fields: IntakeFields, draftSummary: string) {
  const contactUrl = new URL('/api/contact', requestUrl)
  const response = await fetch(contactUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: fields.name,
      email: fields.email,
      company: fields.company,
      website: fields.website === 'Not provided' ? '' : fields.website,
      role: fields.role === 'Not provided' ? '' : fields.role,
      priority: fields.serviceInterest,
      timeline: fields.timeline,
      message: draftSummary,
      sourcePath: '/',
      scoreSummary: `Agentic terminal intake | Service: ${fields.serviceInterest} | Pricing context: ${fields.budgetFit}`,
    }),
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not submit the inquiry')
  }

  return { success: true }
}

function createIntakeAgent(requestUrl: string) {
  const extractIntakeFields = tool({
    name: 'extract_intake_fields',
    description: 'Extract likely intake fields from the visitor message and existing state.',
    parameters: z.object({
      message: z.string(),
      state: intakeAgentStateSchema,
    }),
    async execute({ message, state }) {
      const normalized = normalizeState(state)
      const fields = mergeExtractedFields(normalized, message)
      const currentMissingField = nextMissingField(fields)

      return {
        fields,
        currentMissingField,
        lastAskedQuestion: questionFor(currentMissingField),
      }
    },
  })

  const validateIntakeQuality = tool({
    name: 'validate_intake_quality',
    description: 'Validate whether a visitor reply is usable for the current intake field.',
    parameters: z.object({
      field: fieldSchema,
      message: z.string(),
    }),
    async execute({ field, message }) {
      return validateField(field, message)
    },
  })

  const answerServiceQuestion = tool({
    name: 'answer_service_question',
    description: 'Answer prospect questions about Winter Advisory services, pricing, fit, or process.',
    parameters: z.object({
      question: z.string(),
      currentQuestion: z.string(),
    }),
    async execute({ question, currentQuestion }) {
      const lower = question.toLowerCase()

      if (lower.includes('2 + 2')) {
        return `4. For the inquiry, I still need the business context. ${currentQuestion}`
      }

      if (lower.includes('what can') || lower.includes('what do')) {
        return [
          'Winter Advisory helps ecommerce teams identify, scope, and lead practical AI deployments across workflows, vendor/build choices, pilots, and operating controls.',
          pricingText,
          currentQuestion,
        ].join('\n\n')
      }

      if (isPricingQuestion(question)) {
        return [`Starter pricing is directional and final pricing follows review:`, pricingText, currentQuestion].join('\n')
      }

      return `I can help with Winter Advisory services, pricing, fit, and next steps. ${currentQuestion}`
    },
  })

  const draftInquirySummary = tool({
    name: 'draft_inquiry_summary',
    description: 'Create a polished, customer-safe inquiry summary only when required fields are useful.',
    parameters: z.object({
      fields: intakeFieldsSchema,
    }),
    async execute({ fields }) {
      return buildDraft(fields)
    },
  })

  const submitContactLead = tool({
    name: 'submit_contact_lead',
    description: 'Submit a confirmed inquiry through the existing contact endpoint.',
    parameters: z.object({
      fields: intakeFieldsSchema,
      draftSummary: z.string(),
    }),
    async execute({ fields, draftSummary }) {
      return postContactLead(requestUrl, fields, draftSummary)
    },
  })

  return new Agent({
    name: 'Winter Advisory Intake Concierge',
    model: process.env.OPENAI_AGENT_MODEL || 'gpt-4.1-mini',
    instructions: [
      'You are the Winter Advisory public website intake concierge.',
      'Use only the provided intake tools. You do not have filesystem, shell, code execution, repo, broad browsing, payment, scheduling, or CRM tools.',
      'Your job is to answer concise prospect questions, keep the intake moving, validate low-quality replies, and produce a useful inquiry summary.',
      'Always return structured output matching the schema.',
      'State carries the truth. Preserve existing useful fields unless the visitor clearly corrects them.',
      'Required fields before draft/submission: name, email, company, serviceInterest, challenge, timeline, budgetFit.',
      'Optional fields: website, role, notes. If skipped, store "Not provided" for website/role and "None" for notes.',
      'If the visitor asks an off-script question, answer briefly using answer_service_question, then re-ask the active intake question.',
      'Never store nonsense, jokes, arithmetic, rocket-building, or vague replies as service, challenge, timeline, or budget context.',
      'For invalid service input, show the four numbered service choices again and keep currentMissingField as serviceInterest.',
      'For invalid challenge/timeline/budget input, explain what is needed in one sentence and keep the same currentMissingField.',
      'Once all required fields are present and useful, call draft_inquiry_summary and return status ready_to_review with confirmationState awaiting_confirmation.',
      'If confirmationState is awaiting_confirmation and the visitor says yes/submit/send/confirm, call submit_contact_lead and return submitted.',
      'If confirmationState is awaiting_confirmation and the visitor says no/hold/cancel, return held.',
      'Do not shame the visitor or write internal diagnostic language in the customer-facing summary.',
    ].join(' '),
    tools: [
      extractIntakeFields,
      validateIntakeQuality,
      answerServiceQuestion,
      draftInquirySummary,
      submitContactLead,
    ],
    outputType: agentOutputSchema,
    modelSettings: {
      toolChoice: 'auto',
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server' },
        { status: 500 }
      )
    }

    const state = normalizeState(body.state)
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
    const agent = createIntakeAgent(req.url)
    const result = await run(
      agent,
      [
        `Visitor message: ${message}`,
        `Session id: ${sessionId || 'not provided'}`,
        `Current state JSON: ${JSON.stringify(state)}`,
      ].join('\n'),
      {
        maxTurns: 6,
      }
    )
    const output = agentOutputSchema.parse(result.finalOutput)

    return NextResponse.json(output)
  } catch (error) {
    console.error('Intake agent error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to run intake agent' },
      { status: 500 }
    )
  }
}
