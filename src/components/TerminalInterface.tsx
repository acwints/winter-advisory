"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

type TerminalRole = 'system' | 'user' | 'assistant' | 'error'
type IntakeStep =
  | 'intro'
  | 'name'
  | 'email'
  | 'company'
  | 'website'
  | 'role'
  | 'service'
  | 'challenge'
  | 'timeline'
  | 'budget'
  | 'notes'
  | 'confirm'
  | 'submitted'

interface TerminalLine {
  id: string
  role: TerminalRole
  text: string
  timestamp: string
}

interface TerminalResponse {
  answer?: string
  responseId?: string
  model?: string
  error?: string
}

interface ContactResponse {
  error?: string
  success?: boolean
}

interface IntakeState {
  intro: string
  name: string
  email: string
  company: string
  website: string
  role: string
  serviceInterest: string
  challenge: string
  timeline: string
  budgetFit: string
  notes: string
}

const emptyIntake: IntakeState = {
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

const serviceOptions = [
  'AI deployment audit',
  'Pilot sprint support',
  'Deployment lead advisory',
  'Vendor/build evaluation',
]

const pricingText = [
  'Starter ranges are directional and final pricing follows review:',
  '- AI deployment audit: $2.5k-$5k',
  '- Pilot sprint support: $7.5k-$15k',
  '- Deployment lead advisory: $3k-$8k/month',
  '- Vendor/build evaluation is usually scoped inside an audit, sprint, or advisory engagement.',
].join('\n')

const guidedResponseDelay = 650

const bootLines: TerminalLine[] = [
  {
    id: 'boot-1',
    role: 'system',
    text: 'Welcome to Winter Advisory.',
    timestamp: '00:00:00',
  },
  {
    id: 'boot-2',
    role: 'system',
    text: 'This terminal can help identify the right service, share starter pricing ranges, and draft a short inquiry for review.',
    timestamp: '00:00:01',
  },
  {
    id: 'boot-3',
    role: 'assistant',
    text: 'Start by introducing yourself and what brought you here.',
    timestamp: '00:00:02',
  },
]

function terminalTimestamp() {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}

function newLine(role: TerminalRole, text: string): TerminalLine {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
    timestamp: terminalTimestamp(),
  }
}

function linePrefix(role: TerminalRole) {
  if (role === 'user') {
    return 'you'
  }

  if (role === 'assistant') {
    return 'winter'
  }

  if (role === 'error') {
    return 'error'
  }

  return 'system'
}

function isAffirmative(value: string) {
  return /^(y|yes|yeah|yep|confirm|confirmed|submit|send|looks good|go ahead)$/i.test(value.trim())
}

function isNegative(value: string) {
  return /^(n|no|nope|not yet|hold|wait|cancel)$/i.test(value.trim())
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isSkip(value: string) {
  return /^(skip|none|n\/a|na|no|nope)$/i.test(value.trim())
}

function isPricingQuestion(value: string) {
  return /\b(price|pricing|cost|costs|budget|range|fee|fees|retainer|monthly|how much)\b/i.test(value)
}

function isConfusedReply(value: string) {
  return /^(huh|what|what\?|wait|why|idk|i don't know|i dont know|confused|\?)$/i.test(value.trim())
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function cleanName(value: string) {
  return value
    .replace(/[.,!?;:]+$/g, '')
    .replace(/\s+(and|but|because|from|with)\s+.*$/i, '')
    .trim()
}

function extractNameFromIntro(value: string) {
  const match = value.match(/\b(?:i am|i'm|im|my name is|this is)\s+([a-z][a-z'-]*(?:\s+[a-z][a-z'-]*)?)/i)
  const name = match ? cleanName(match[1]) : ''

  if (!name || name.length < 2) {
    return ''
  }

  return name
}

function looksLikeName(value: string) {
  const trimmed = cleanName(value)

  if (trimmed.length < 2 || isConfusedReply(trimmed)) {
    return false
  }

  return /^[a-z][a-z' -]{1,60}$/i.test(trimmed)
}

function formatName(value: string) {
  return cleanName(value)
    .split(/\s+/)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
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

  return value
}

function nextQuestion(step: IntakeStep) {
  switch (step) {
    case 'intro':
      return 'What is your name?'
    case 'name':
      return 'What email should Andrew use to follow up?'
    case 'email':
      return 'What company or brand are you with?'
    case 'company':
      return 'What is the company website? Type skip if you would rather leave it out.'
    case 'website':
      return 'What is your role or function?'
    case 'role':
      return [
        'Which service are you most interested in?',
        '1. AI deployment audit',
        '2. Pilot sprint support',
        '3. Deployment lead advisory',
        '4. Vendor/build evaluation',
      ].join('\n')
    case 'service':
      return 'What workflow, operating problem, or AI opportunity should Winter Advisory help with?'
    case 'challenge':
      return 'What timeline are you working against?'
    case 'timeline':
      return `What pricing range or budget constraint should be considered?\n${pricingText}`
    case 'budget':
      return 'Anything else Andrew should know before reviewing this? Type skip if not.'
    case 'notes':
      return 'I will draft the inquiry now.'
    case 'confirm':
      return 'Reply yes to submit this inquiry, or no to hold it here.'
    case 'submitted':
      return 'Your inquiry has been submitted.'
  }
}

function currentQuestion(step: IntakeStep) {
  switch (step) {
    case 'intro':
      return 'Start by introducing yourself and what brought you here.'
    case 'name':
      return nextQuestion('intro')
    case 'email':
      return nextQuestion('name')
    case 'company':
      return nextQuestion('email')
    case 'website':
      return nextQuestion('company')
    case 'role':
      return nextQuestion('website')
    case 'service':
      return nextQuestion('role')
    case 'challenge':
      return nextQuestion('service')
    case 'timeline':
      return nextQuestion('challenge')
    case 'budget':
      return nextQuestion('timeline')
    case 'notes':
      return nextQuestion('budget')
    case 'confirm':
      return nextQuestion('confirm')
    case 'submitted':
      return nextQuestion('submitted')
  }
}

function buildIntakeText(intake: IntakeState) {
  return [
    `Name: ${intake.name || 'Not provided'}`,
    `Email: ${intake.email || 'Not provided'}`,
    `Company: ${intake.company || 'Not provided'}`,
    `Website: ${intake.website || 'Not provided'}`,
    `Role: ${intake.role || 'Not provided'}`,
    `Introduction: ${intake.intro || 'Not provided'}`,
    `Service interest: ${intake.serviceInterest || 'Not provided'}`,
    `Workflow/challenge: ${intake.challenge || 'Not provided'}`,
    `Timeline: ${intake.timeline || 'Not provided'}`,
    `Pricing/budget fit: ${intake.budgetFit || 'Not provided'}`,
    `Additional notes: ${intake.notes || 'None'}`,
  ].join('\n')
}

function fallbackDraft(intake: IntakeState) {
  return [
    'Draft inquiry for Winter Advisory',
    '',
    `${intake.name} from ${intake.company} is interested in ${intake.serviceInterest}.`,
    `Context: ${intake.challenge}`,
    `Timeline: ${intake.timeline}`,
    `Pricing/budget context: ${intake.budgetFit}`,
    intake.website ? `Website: ${intake.website}` : '',
    intake.role ? `Role: ${intake.role}` : '',
    intake.notes ? `Additional notes: ${intake.notes}` : '',
    '',
    'Recommended next step: review the context and follow up with a scoped recommendation. Pricing is directional until the workflow and fit are reviewed.',
  ].filter(Boolean).join('\n')
}

export function TerminalInterface() {
  const [lines, setLines] = useState<TerminalLine[]>(bootLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [previousResponseId, setPreviousResponseId] = useState<string | null>(null)
  const [step, setStep] = useState<IntakeStep>('intro')
  const [intake, setIntake] = useState<IntakeState>(emptyIntake)
  const [draftSummary, setDraftSummary] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [lines, isPending])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addAssistantLine = (text: string) => {
    setLines((current) => [...current, newLine('assistant', text)])
  }

  const addGuidedAssistantLine = async (text: string) => {
    setIsPending(true)
    await sleep(guidedResponseDelay)
    addAssistantLine(text)
    setIsPending(false)
  }

  const resetTerminal = () => {
    setPreviousResponseId(null)
    setStep('intro')
    setIntake(emptyIntake)
    setDraftSummary('')
    setLines([
      ...bootLines,
      newLine('system', 'intake restarted'),
    ])
  }

  const clearTerminal = () => {
    setLines([
      ...bootLines,
      newLine('assistant', currentQuestion(step)),
    ])
  }

  const createDraft = async (nextIntake: IntakeState) => {
    setIsPending(true)

    try {
      const response = await fetch('/api/openai-terminal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: [
            'Create a concise prospective-client inquiry summary for Winter Advisory using this intake.',
            'Use plain text. Include: prospect, company, service interest, challenge, timeline, pricing/budget context, and recommended next step.',
            'Mention that pricing is directional until scope is reviewed.',
            '',
            buildIntakeText(nextIntake),
          ].join('\n'),
          previousResponseId,
        }),
      })

      const data = (await response.json()) as TerminalResponse

      if (!response.ok) {
        throw new Error(data.error || 'Could not draft the inquiry with OpenAI')
      }

      if (data.responseId) {
        setPreviousResponseId(data.responseId)
      }

      const draft = data.answer || fallbackDraft(nextIntake)
      setDraftSummary(draft)
      setStep('confirm')
      setLines((current) => [
        ...current,
        newLine('assistant', `${draft}\n\n${nextQuestion('confirm')}`),
      ])
    } catch (error) {
      const draft = fallbackDraft(nextIntake)
      setDraftSummary(draft)
      setStep('confirm')
      setLines((current) => [
        ...current,
        newLine('error', error instanceof Error ? error.message : 'OpenAI draft failed'),
        newLine('assistant', `${draft}\n\n${nextQuestion('confirm')}`),
      ])
    } finally {
      setIsPending(false)
    }
  }

  const submitInquiry = async () => {
    if (!intake.name || !intake.email || !intake.company || !draftSummary) {
      setLines((current) => [
        ...current,
        newLine('error', 'Name, email, company, and inquiry summary are required before submission. Use /reset to start again.'),
      ])
      return
    }

    setIsPending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: intake.name,
          email: intake.email,
          company: intake.company,
          website: intake.website,
          role: intake.role,
          priority: intake.serviceInterest,
          timeline: intake.timeline,
          message: draftSummary,
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          scoreSummary: `Terminal intake | Service: ${intake.serviceInterest} | Pricing context: ${intake.budgetFit}`,
        }),
      })

      const data = (await response.json()) as ContactResponse

      if (!response.ok) {
        throw new Error(data.error || 'Could not submit the inquiry')
      }

      setStep('submitted')
      setLines((current) => [
        ...current,
        newLine('assistant', 'Submitted. Andrew will review the context and follow up. You can use /reset to start a new inquiry.'),
      ])
    } catch (error) {
      setLines((current) => [
        ...current,
        newLine('error', error instanceof Error ? error.message : 'Could not submit the inquiry'),
        newLine('assistant', 'The draft is still here. Reply yes to try submitting again, or copy the summary and email andrew@winteradvisory.llc.'),
      ])
    } finally {
      setIsPending(false)
    }
  }

  const handleIntakeStep = async (value: string) => {
    const nextIntake = { ...intake }

    if (step !== 'budget' && step !== 'confirm' && isPricingQuestion(value)) {
      await addGuidedAssistantLine(`${pricingText}\n\n${currentQuestion(step)}`)
      return
    }

    switch (step) {
      case 'intro':
        nextIntake.intro = value
        {
          const introName = extractNameFromIntro(value)

          if (introName) {
            nextIntake.name = formatName(introName)
            setIntake(nextIntake)
            setStep('email')
            await addGuidedAssistantLine(`Nice to meet you, ${nextIntake.name}. ${nextQuestion('name')}`)
            return
          }
        }

        setIntake(nextIntake)
        setStep('name')
        await addGuidedAssistantLine(nextQuestion('intro'))
        return
      case 'name':
        if (!looksLikeName(value)) {
          await addGuidedAssistantLine('I may have moved too fast. What name should Andrew use when he follows up?')
          return
        }

        nextIntake.name = formatName(value)
        setIntake(nextIntake)
        setStep('email')
        await addGuidedAssistantLine(nextQuestion('name'))
        return
      case 'email':
        if (!isValidEmail(value)) {
          await addGuidedAssistantLine('Please enter a valid email address so Andrew can follow up.')
          return
        }

        nextIntake.email = value
        setIntake(nextIntake)
        setStep('company')
        await addGuidedAssistantLine(nextQuestion('email'))
        return
      case 'company':
        nextIntake.company = value
        setIntake(nextIntake)
        setStep('website')
        await addGuidedAssistantLine(nextQuestion('company'))
        return
      case 'website':
        nextIntake.website = isSkip(value) ? '' : value
        setIntake(nextIntake)
        setStep('role')
        await addGuidedAssistantLine(nextQuestion('website'))
        return
      case 'role':
        nextIntake.role = value
        setIntake(nextIntake)
        setStep('service')
        await addGuidedAssistantLine(nextQuestion('role'))
        return
      case 'service':
        nextIntake.serviceInterest = normalizeService(value)
        setIntake(nextIntake)
        setStep('challenge')
        await addGuidedAssistantLine(nextQuestion('service'))
        return
      case 'challenge':
        nextIntake.challenge = value
        setIntake(nextIntake)
        setStep('timeline')
        await addGuidedAssistantLine(nextQuestion('challenge'))
        return
      case 'timeline':
        nextIntake.timeline = value
        setIntake(nextIntake)
        setStep('budget')
        await addGuidedAssistantLine(nextQuestion('timeline'))
        return
      case 'budget':
        nextIntake.budgetFit = value
        setIntake(nextIntake)
        setStep('notes')
        await addGuidedAssistantLine(nextQuestion('budget'))
        return
      case 'notes':
        nextIntake.notes = isSkip(value) ? '' : value
        setIntake(nextIntake)
        await createDraft(nextIntake)
        return
      case 'confirm':
        if (isAffirmative(value)) {
          await submitInquiry()
          return
        }

        if (isNegative(value)) {
          await addGuidedAssistantLine('No problem. The draft has not been submitted. Reply yes if you want to send it, or /reset to start over.')
          return
        }

        await addGuidedAssistantLine(currentQuestion('confirm'))
        return
      case 'submitted':
        await addGuidedAssistantLine('This inquiry is already submitted. Use /reset to start a new one.')
        return
    }
  }

  const runCommand = async (command: string) => {
    const value = command.trim()

    if (!value || isPending) {
      return
    }

    setInput('')
    setHistory((current) => [value, ...current.filter((item) => item !== value)].slice(0, 20))
    setHistoryIndex(null)
    setLines((current) => [...current, newLine('user', value)])

    if (value === '/clear') {
      clearTerminal()
      return
    }

    if (value === '/reset') {
      resetTerminal()
      return
    }

    if (value === '/help') {
      setLines((current) => [
        ...current,
        newLine('assistant', [
          'Commands: /clear, /reset, /help',
          'This intake asks for your intro, contact details, service interest, workflow, timeline, and pricing context.',
          pricingText,
        ].join('\n')),
      ])
      return
    }

    await handleIntakeStep(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void runCommand(input)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' && history.length > 0) {
      event.preventDefault()
      const nextIndex = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    }

    if (event.key === 'ArrowDown' && history.length > 0) {
      event.preventDefault()

      if (historyIndex === null || historyIndex <= 0) {
        setHistoryIndex(null)
        setInput('')
        return
      }

      const nextIndex = historyIndex - 1
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    }
  }

  return (
    <section className="relative flex min-h-screen px-3 pb-8 pt-36 sm:px-5 sm:pt-40 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.12),transparent_34%),linear-gradient(135deg,#05070a_0%,#091111_52%,#0e0f14_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="grid gap-3 border-b border-white/10 pb-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Guide</div>
            <div className="mt-2 font-mono text-sm text-cyan-100">Winter Advisory</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Intake</div>
            <div className="mt-2 font-mono text-sm text-emerald-100">{step === 'submitted' ? 'submitted' : step === 'confirm' ? 'review' : 'collecting'}</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Pricing</div>
            <div className="mt-2 font-mono text-sm text-amber-100">starter ranges</div>
          </div>
        </div>

        <div
          className="mt-4 flex min-h-[520px] flex-1 flex-col border border-white/10 bg-[#020405] shadow-2xl shadow-black/40"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6259]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">winter://intake</div>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 font-mono text-sm leading-6 text-slate-200 sm:px-6"
            aria-live="polite"
          >
            {lines.map((line) => (
              <div key={line.id} className="grid gap-2 sm:grid-cols-[8.5rem_1fr]">
                <div className="flex gap-2 text-xs text-slate-600">
                  <span>{line.timestamp}</span>
                  <span>{linePrefix(line.role)}</span>
                </div>
                <div
                  className={
                    line.role === 'error'
                      ? 'whitespace-pre-wrap text-rose-200'
                      : line.role === 'assistant'
                        ? 'whitespace-pre-wrap text-cyan-50'
                        : line.role === 'user'
                          ? 'whitespace-pre-wrap text-white'
                          : 'whitespace-pre-wrap text-slate-400'
                  }
                >
                  {line.text}
                </div>
              </div>
            ))}

            {isPending ? (
              <div className="grid gap-2 sm:grid-cols-[8.5rem_1fr]">
                <div className="flex gap-2 text-xs text-slate-600">
                  <span>{terminalTimestamp()}</span>
                  <span>winter</span>
                </div>
                <div className="text-cyan-100">working<span className="animate-pulse">...</span></div>
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 bg-black/40 px-4 py-4 sm:px-6">
            <label htmlFor="terminal-input" className="sr-only">
              Terminal prompt
            </label>
            <div className="flex min-h-12 items-center gap-3 font-mono text-sm">
              <span className="text-cyan-200">wa$</span>
              <input
                ref={inputRef}
                id="terminal-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isPending}
                autoComplete="off"
                spellCheck={false}
                placeholder="introduce yourself"
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-700 disabled:cursor-wait"
              />
              <button
                type="submit"
                disabled={isPending || input.trim().length === 0}
                className="border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 font-microgramma text-[0.66rem] uppercase text-cyan-100 transition hover:border-cyan-100 hover:bg-cyan-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-slate-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
