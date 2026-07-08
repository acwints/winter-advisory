import { Agent, run, tool } from '@openai/agents'
import type { AgentInputItem } from '@openai/agents'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_HISTORY_MESSAGES = 40

const pricingText = [
  'AI deployment audit: $2.5k-$5k',
  'Pilot sprint support: $7.5k-$15k',
  'Deployment lead advisory: $3k-$8k/month',
  'Vendor/build evaluation: usually scoped inside an audit, sprint, or advisory engagement',
].join('\n')

const instructions = `
You are the Winter Advisory assistant, chatting with visitors in a terminal-style
widget on winteradvisory.llc. Winter Advisory is a generalist AI deployment
advisory run by Andrew (andrew@winteradvisory.llc): it helps teams take AI from
demo to production by auditing workflows, running controlled pilots, and scaling
only the deployments that produce evidence.

Services and directional starter pricing (final pricing always follows a scope review):
${pricingText}

Chat like a sharp, friendly human — short plain-text replies, no markdown. Be
genuinely helpful; use your judgment. If a visitor wants to work with Winter
Advisory, get their inquiry over to Andrew with submit_inquiry once you have a
way to reach them and they've okayed sending it. Don't promise outcomes or
claim abilities you don't have (no scheduling, payments, or account access).
`.trim()

function createAgent(requestUrl: string, onSubmitted: () => void) {
  const submitInquiry = tool({
    name: 'submit_inquiry',
    description: 'Send a visitor inquiry to Andrew at Winter Advisory.',
    parameters: z.object({
      name: z.string(),
      email: z.string(),
      company: z.string().default(''),
      summary: z.string().describe(
        'Everything Andrew should know about this inquiry — what they need, context, timeline, budget, anything relevant from the conversation'
      ),
    }),
    async execute(input) {
      const contactUrl = new URL('/api/contact', requestUrl)
      const response = await fetch(contactUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          company: input.company || 'Not provided',
          message: input.summary,
          sourcePath: '/',
          scoreSummary: 'Terminal chat inquiry',
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Could not submit the inquiry')
      }

      onSubmitted()
      return { success: true }
    },
  })

  return new Agent({
    name: 'Winter Advisory Assistant',
    model: process.env.OPENAI_AGENT_MODEL || 'gpt-4.1-mini',
    instructions,
    tools: [submitInquiry],
  })
}

export function GET() {
  return NextResponse.json({
    model: process.env.OPENAI_AGENT_MODEL || 'gpt-4.1-mini',
  })
}

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = z.array(messageSchema).min(1).safeParse(body.messages)

    if (!parsed.success || parsed.data[parsed.data.length - 1].role !== 'user') {
      return NextResponse.json(
        { error: 'messages must end with a user message' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server' },
        { status: 500 }
      )
    }

    let submitted = false
    const agent = createAgent(req.url, () => {
      submitted = true
    })

    const history: AgentInputItem[] = parsed.data
      .slice(-MAX_HISTORY_MESSAGES)
      .map((message) =>
        message.role === 'user'
          ? { role: 'user' as const, content: message.content }
          : {
              role: 'assistant' as const,
              status: 'completed' as const,
              content: [{ type: 'output_text' as const, text: message.content }],
            }
      )

    const result = await run(agent, history, { maxTurns: 6, stream: true })
    const encoder = new TextEncoder()

    // NDJSON stream: {type:'delta',text} chunks, then {type:'done',status}
    const responseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: Record<string, string>) => {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`))
        }

        try {
          for await (const chunk of result.toTextStream()) {
            send({ type: 'delta', text: chunk })
          }
          await result.completed
          send({ type: 'done', status: submitted ? 'submitted' : 'collecting' })
        } catch (error) {
          console.error('Intake agent stream error:', error)
          send({
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to run the chat',
          })
        } finally {
          controller.close()
        }
      },
    })

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Intake agent error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to run the chat' },
      { status: 500 }
    )
  }
}
