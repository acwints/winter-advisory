"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

type TerminalRole = 'system' | 'user' | 'assistant' | 'error'

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

const bootLines: TerminalLine[] = [
  {
    id: 'boot-1',
    role: 'system',
    text: 'winter-advisory terminal online',
    timestamp: '00:00:00',
  },
  {
    id: 'boot-2',
    role: 'system',
    text: 'openai responses api bridge ready',
    timestamp: '00:00:01',
  },
  {
    id: 'boot-3',
    role: 'system',
    text: 'session scope: ecommerce ai workflow, deployment, controls, roi',
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
    return 'openai'
  }

  if (role === 'error') {
    return 'error'
  }

  return 'system'
}

export function TerminalInterface() {
  const [lines, setLines] = useState<TerminalLine[]>(bootLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [previousResponseId, setPreviousResponseId] = useState<string | null>(null)
  const [model, setModel] = useState('gpt-5.5')
  const [sessionStarted, setSessionStarted] = useState(false)
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

  const resetSession = () => {
    setPreviousResponseId(null)
    setSessionStarted(false)
    setLines((current) => [
      ...current,
      newLine('system', 'session memory cleared'),
    ])
  }

  const clearTerminal = () => {
    setLines([
      ...bootLines,
      newLine('system', previousResponseId ? 'conversation memory retained' : 'new terminal buffer'),
    ])
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
      resetSession()
      return
    }

    if (value === '/help') {
      setLines((current) => [
        ...current,
        newLine('system', 'commands: /clear, /reset, /help'),
        newLine('system', 'send plain language to route it through the OpenAI API'),
      ])
      return
    }

    setIsPending(true)

    try {
      const response = await fetch('/api/openai-terminal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: value,
          previousResponseId,
        }),
      })

      const data = (await response.json()) as TerminalResponse

      if (!response.ok) {
        throw new Error(data.error || 'The OpenAI request failed')
      }

      if (data.responseId) {
        setPreviousResponseId(data.responseId)
      }

      if (data.model) {
        setModel(data.model)
      }

      setSessionStarted(true)
      setLines((current) => [
        ...current,
        newLine('assistant', data.answer || 'No text returned.'),
      ])
    } catch (error) {
      setLines((current) => [
        ...current,
        newLine('error', error instanceof Error ? error.message : 'Unknown terminal error'),
      ])
    } finally {
      setIsPending(false)
    }
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
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Model</div>
            <div className="mt-2 font-mono text-sm text-cyan-100">{model}</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Session</div>
            <div className="mt-2 font-mono text-sm text-emerald-100">{sessionStarted ? 'active' : 'standby'}</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Memory</div>
            <div className="mt-2 font-mono text-sm text-amber-100">{previousResponseId ? 'linked' : 'fresh'}</div>
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
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">winter://openai</div>
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
                  <span>openai</span>
                </div>
                <div className="text-cyan-100">thinking<span className="animate-pulse">...</span></div>
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
                placeholder="ask the terminal"
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-700 disabled:cursor-wait"
              />
              <button
                type="submit"
                disabled={isPending || input.trim().length === 0}
                className="border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 font-microgramma text-[0.66rem] uppercase text-cyan-100 transition hover:border-cyan-100 hover:bg-cyan-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-slate-600"
              >
                Run
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
