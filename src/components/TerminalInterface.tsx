"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

type TerminalRole = 'system' | 'user' | 'assistant' | 'error'
type IntakeStatus = 'collecting' | 'ready_to_review' | 'submitted' | 'held'
type IntakeField =
  | 'intro'
  | 'name'
  | 'email'
  | 'company'
  | 'website'
  | 'role'
  | 'serviceInterest'
  | 'challenge'
  | 'timeline'
  | 'budgetFit'
  | 'notes'
  | 'confirm'

interface TerminalLine {
  id: string
  role: TerminalRole
  text: string
  timestamp: string
}

interface IntakeFields {
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

interface QualityFlag {
  field: string
  input: string
  reason: string
}

interface IntakeAgentState {
  fields: IntakeFields
  currentMissingField: IntakeField
  lastAskedQuestion: string
  qualityFlags: QualityFlag[]
  confirmationState: 'none' | 'awaiting_confirmation' | 'confirmed' | 'held'
  draftSummary: string
}

interface IntakeAgentResponse {
  reply?: string
  state?: IntakeAgentState
  status?: IntakeStatus
  draftSummary?: string
  error?: string
}

const emptyFields: IntakeFields = {
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

const initialQuestion = 'Start by introducing yourself and what brought you here.'

const emptyAgentState: IntakeAgentState = {
  fields: emptyFields,
  currentMissingField: 'intro',
  lastAskedQuestion: initialQuestion,
  qualityFlags: [],
  confirmationState: 'none',
  draftSummary: '',
}

const pricingText = [
  'Starter ranges are directional and final pricing follows review:',
  '- AI deployment audit: $2.5k-$5k',
  '- Pilot sprint support: $7.5k-$15k',
  '- Deployment lead advisory: $3k-$8k/month',
  '- Vendor/build evaluation is usually scoped inside an audit, sprint, or advisory engagement.',
].join('\n')

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
    text: initialQuestion,
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

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `intake-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function cloneInitialState(): IntakeAgentState {
  return {
    ...emptyAgentState,
    fields: { ...emptyFields },
    qualityFlags: [],
  }
}

function statusLabel(status: IntakeStatus) {
  if (status === 'submitted') {
    return 'submitted'
  }

  if (status === 'ready_to_review') {
    return 'review'
  }

  if (status === 'held') {
    return 'held'
  }

  return 'collecting'
}

function placeholderFor(status: IntakeStatus, state: IntakeAgentState) {
  if (status === 'submitted') {
    return 'submitted'
  }

  if (status === 'ready_to_review' || state.confirmationState === 'awaiting_confirmation') {
    return 'yes to submit, no to hold'
  }

  if (state.currentMissingField === 'intro') {
    return 'introduce yourself'
  }

  return 'answer or ask a question'
}

export function TerminalInterface() {
  const [lines, setLines] = useState<TerminalLine[]>(bootLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [sessionId, setSessionId] = useState(createSessionId)
  const [agentState, setAgentState] = useState<IntakeAgentState>(cloneInitialState)
  const [status, setStatus] = useState<IntakeStatus>('collecting')
  const [active, setActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [lines, isPending])

  useEffect(() => {
    if (active) {
      inputRef.current?.focus()
    }
  }, [active])

  const resetTerminal = () => {
    const nextState = cloneInitialState()

    setSessionId(createSessionId())
    setAgentState(nextState)
    setStatus('collecting')
    setLines([
      ...bootLines,
      newLine('system', 'intake restarted'),
    ])
  }

  const clearTerminal = () => {
    setLines([
      ...bootLines,
      newLine('assistant', agentState.lastAskedQuestion || initialQuestion),
    ])
  }

  const runAgentTurn = async (message: string) => {
    setIsPending(true)

    try {
      const response = await fetch('/api/intake-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          state: agentState,
        }),
      })

      const data = (await response.json()) as IntakeAgentResponse

      if (!response.ok) {
        throw new Error(data.error || 'The intake agent could not respond')
      }

      if (!data.reply || !data.state || !data.status) {
        throw new Error('The intake agent returned an incomplete response')
      }

      const reply = data.reply
      setAgentState(data.state)
      setStatus(data.status)
      setLines((current) => [...current, newLine('assistant', reply)])
    } catch (error) {
      setLines((current) => [
        ...current,
        newLine('error', error instanceof Error ? error.message : 'Unknown intake agent error'),
        newLine('assistant', `I kept your place. ${agentState.lastAskedQuestion || initialQuestion}`),
      ])
    } finally {
      setIsPending(false)
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
          'This agent can answer Winter Advisory service, pricing, fit, and process questions while keeping the intake moving.',
          pricingText,
          agentState.lastAskedQuestion || initialQuestion,
        ].join('\n')),
      ])
      return
    }

    await runAgentTurn(value)
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
    <div className="flex w-full flex-col">
        <div className="grid gap-3 border-b border-white/10 pb-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Guide</div>
            <div className="mt-2 font-mono text-sm text-cyan-100">Winter Advisory</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Intake</div>
            <div className="mt-2 font-mono text-sm text-emerald-100">{statusLabel(status)}</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Pricing</div>
            <div className="mt-2 font-mono text-sm text-amber-100">starter ranges</div>
          </div>
        </div>

        <div
          className="relative mt-4 flex min-h-[520px] flex-1 flex-col border border-white/10 bg-[#020405] shadow-2xl shadow-black/40"
          onClick={() => {
            if (active) {
              inputRef.current?.focus()
            }
          }}
        >
          {!active ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#020405]/72 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={() => setActive(true)}
                className="border border-cyan-200/40 bg-cyan-200/10 px-8 py-4 font-microgramma text-xs uppercase tracking-[0.3em] text-cyan-100 transition hover:bg-cyan-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-100"
              >
                ▸ Start intake
              </button>
            </div>
          ) : null}
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
                disabled={!active || isPending || status === 'submitted'}
                autoComplete="off"
                spellCheck={false}
                placeholder={placeholderFor(status, agentState)}
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-700 disabled:cursor-wait"
              />
              <button
                type="submit"
                disabled={!active || isPending || status === 'submitted' || input.trim().length === 0}
                className="border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 font-microgramma text-[0.66rem] uppercase text-cyan-100 transition hover:border-cyan-100 hover:bg-cyan-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-slate-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}
