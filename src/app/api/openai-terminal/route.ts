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
        'You are the Winter Advisory terminal assistant.',
        'Help ecommerce operators think through AI workflows, pilot scope, controls, ROI, vendor evaluation, and deployment risk.',
        'Be direct, practical, and specific. When the user asks for commands or implementation details, answer in concise terminal-friendly prose.',
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
