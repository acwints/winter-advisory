"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

type TerminalRole = 'system' | 'user' | 'assistant' | 'error'
type ChatStatus = 'collecting' | 'submitted'

interface TerminalLine {
  id: string
  role: TerminalRole
  text: string
  timestamp: string
}

const initialQuestion = "Hey — what brings you to Winter Advisory?"

const thinkingWords = [
  'thinking',
  'sublimating',
  'crystallizing',
  'defrosting',
  'condensing',
  'precipitating',
  'calibrating',
  'drifting',
  'glaciating',
  'routing',
  'accumulating',
  'whirring',
]

function randomThinkingWord() {
  return thinkingWords[Math.floor(Math.random() * thinkingWords.length)]
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
    role: 'assistant',
    text: initialQuestion,
    timestamp: '00:00:01',
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

  return `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function chatMessages(lines: TerminalLine[]) {
  return lines
    .filter((line) => line.role === 'user' || line.role === 'assistant')
    .map((line) => ({
      role: line.role as 'user' | 'assistant',
      content: line.text,
    }))
}

export function TerminalInterface() {
  const [lines, setLines] = useState<TerminalLine[]>(bootLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [sessionId, setSessionId] = useState(createSessionId)
  const [status, setStatus] = useState<ChatStatus>('collecting')
  const [active, setActive] = useState(false)
  const [model, setModel] = useState('')
  const [thinkingWord, setThinkingWord] = useState(thinkingWords[0])
  const [streaming, setStreaming] = useState(false)
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

  // rotate the status verb while waiting on the first token
  useEffect(() => {
    if (!isPending || streaming) {
      return
    }

    setThinkingWord(randomThinkingWord())
    const interval = window.setInterval(() => setThinkingWord(randomThinkingWord()), 1600)
    return () => window.clearInterval(interval)
  }, [isPending, streaming])

  useEffect(() => {
    let cancelled = false

    fetch('/api/intake-agent')
      .then((response) => response.json())
      .then((data: { model?: string }) => {
        if (!cancelled && data.model) {
          setModel(data.model)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  // "Chat" links point at #chat — arriving on that hash opens the chat directly
  useEffect(() => {
    const activateFromHash = () => {
      if (window.location.hash === '#chat') {
        setActive(true)
      }
    }

    activateFromHash()
    window.addEventListener('hashchange', activateFromHash)
    return () => window.removeEventListener('hashchange', activateFromHash)
  }, [])

  const resetTerminal = () => {
    setSessionId(createSessionId())
    setStatus('collecting')
    setLines([
      ...bootLines,
      newLine('system', 'chat restarted'),
    ])
  }

  const clearTerminal = () => {
    setLines(bootLines)
  }

  const appendToLine = (id: string, text: string) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, text: line.text + text } : line))
    )
  }

  const runAgentTurn = async (message: string, priorLines: TerminalLine[]) => {
    setIsPending(true)
    setStreaming(false)

    let streamLineId: string | null = null

    try {
      const response = await fetch('/api/intake-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          messages: [...chatMessages(priorLines), { role: 'user', content: message }],
        }),
      })

      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error || 'The chat could not respond')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      const handleEvent = (event: { type?: string; text?: string; status?: string; message?: string }) => {
        if (event.type === 'delta' && event.text) {
          if (!streamLineId) {
            const line = newLine('assistant', event.text)
            streamLineId = line.id
            setStreaming(true)
            setLines((current) => [...current, line])
          } else {
            appendToLine(streamLineId, event.text)
          }
        } else if (event.type === 'done' && event.status === 'submitted') {
          setStatus('submitted')
        } else if (event.type === 'error') {
          throw new Error(event.message || 'The chat could not respond')
        }
      }

      while (true) {
        const { done, value } = await reader.read()

        if (value) {
          buffer += decoder.decode(value, { stream: true })
          const parts = buffer.split('\n')
          buffer = parts.pop() ?? ''

          for (const part of parts) {
            if (part.trim()) {
              handleEvent(JSON.parse(part))
            }
          }
        }

        if (done) {
          if (buffer.trim()) {
            handleEvent(JSON.parse(buffer))
          }
          break
        }
      }

      if (!streamLineId) {
        throw new Error('The chat could not respond')
      }
    } catch (error) {
      setLines((current) => [
        ...current,
        newLine('error', error instanceof Error ? error.message : 'Unknown chat error'),
        newLine('assistant', 'Sorry about that — say that again and I should catch it this time.'),
      ])
    } finally {
      setIsPending(false)
      setStreaming(false)
    }
  }

  const runCommand = async (command: string) => {
    const value = command.trim()

    if (!value || isPending) {
      return
    }

    const priorLines = lines

    setInput('')
    setHistory((current) => [value, ...current.filter((item) => item !== value)].slice(0, 20))
    setHistoryIndex(null)

    if (value === '/clear') {
      setLines((current) => [...current, newLine('user', value)])
      clearTerminal()
      return
    }

    if (value === '/reset') {
      setLines((current) => [...current, newLine('user', value)])
      resetTerminal()
      return
    }

    if (value === '/help') {
      setLines((current) => [
        ...current,
        newLine('user', value),
        newLine('assistant', [
          'Commands: /clear, /reset, /help',
          'Ask me anything about Winter Advisory services, pricing, fit, or process.',
          pricingText,
        ].join('\n')),
      ])
      return
    }

    setLines((current) => [...current, newLine('user', value)])
    await runAgentTurn(value, priorLines)
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
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Status</div>
            <div className="mt-2 font-mono text-sm text-emerald-100">{status === 'submitted' ? 'submitted' : 'online'}</div>
          </div>
          <div className="border border-white/10 bg-black/35 p-4">
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">Model</div>
            <div className="mt-2 font-mono text-sm text-amber-100">{model || '—'}</div>
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
                ▸ Start chat
              </button>
            </div>
          ) : null}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6259]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-microgramma text-[0.66rem] uppercase text-slate-500">winter://chat</div>
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

            {isPending && !streaming ? (
              <div className="grid gap-2 sm:grid-cols-[8.5rem_1fr]">
                <div className="flex gap-2 text-xs text-slate-600">
                  <span>{terminalTimestamp()}</span>
                  <span>winter</span>
                </div>
                <div className="text-cyan-100">{thinkingWord}<span className="animate-pulse">...</span></div>
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
                placeholder={status === 'submitted' ? 'inquiry sent' : 'ask about services, pricing, or your project'}
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
