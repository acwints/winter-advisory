import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const defaultModel = 'gpt-5.5'

interface OpenAIContentItem {
  type?: string
  text?: string
}

interface OpenAIOutputItem {
  type?: string
  content?: OpenAIContentItem[]
  text?: string
}

interface OpenAIResponse {
  id?: string
  model?: string
  output?: OpenAIOutputItem[]
  output_text?: string
  error?: {
    message?: string
  }
}

function extractOutputText(response: OpenAIResponse) {
  if (response.output_text) {
    return response.output_text
  }

  const textParts = response.output?.flatMap((item) => {
    if (item.text) {
      return [item.text]
    }

    return item.content
      ?.map((content) => content.text)
      .filter((text): text is string => Boolean(text)) || []
  }) || []

  return textParts.join('\n').trim()
}

export async function POST(req: Request) {
  try {
    const { message, previousResponseId } = await req.json()

    if (typeof message !== 'string' || !message.trim()) {
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

    const model = process.env.OPENAI_MODEL || defaultModel
    const payload: Record<string, unknown> = {
      model,
      input: message.trim(),
      instructions: [
        'You are the Winter Advisory prospective-client intake assistant.',
        'Write warm, concise, customer-facing responses for leaders evaluating Winter Advisory services.',
        'Services: AI deployment audit, pilot sprint support, deployment lead advisory, and vendor/build evaluation.',
        'Indicative starter pricing: AI deployment audit $2.5k-$5k; pilot sprint support $7.5k-$15k; deployment lead advisory $3k-$8k/month. Vendor/build evaluation is usually scoped inside an audit, sprint, or advisory engagement.',
        'Always treat pricing as directional and scope-dependent until Winter Advisory reviews fit, workflow, timeline, and constraints.',
        'When asked to draft an inquiry summary, produce plain text that Andrew can review quickly: prospect, company, service interest, challenge, timeline, budget/pricing context, and recommended next step.',
        'Do not imply a booking is confirmed, do not collect payment, and do not overpromise outcomes.',
      ].join(' '),
      store: true,
      reasoning: {
        effort: 'low',
      },
      text: {
        verbosity: 'medium',
      },
    }

    if (typeof previousResponseId === 'string' && previousResponseId.startsWith('resp_')) {
      payload.previous_response_id = previousResponseId
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = (await response.json()) as OpenAIResponse

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'OpenAI request failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      answer: extractOutputText(data) || 'No text returned.',
      responseId: data.id,
      model: data.model || model,
    })
  } catch (error) {
    console.error('OpenAI terminal error:', error)
    return NextResponse.json(
      { error: 'Failed to reach OpenAI' },
      { status: 500 }
    )
  }
}
