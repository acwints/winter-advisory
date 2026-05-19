"use client"

import { useMemo, useState } from 'react'

const dimensions = [
  {
    id: 'owner',
    label: 'Owner',
    prompt: 'Is there one accountable owner for the AI workflow?',
    options: [
      { value: 0, label: 'No owner', detail: 'Interest exists, but no one owns decisions or adoption.' },
      { value: 1, label: 'Shared owner', detail: 'A few leaders are involved, but ownership is split.' },
      { value: 2, label: 'Named owner', detail: 'One person can approve scope, access, and rollout.' },
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    prompt: 'How specific is the workflow you want to improve?',
    options: [
      { value: 0, label: 'Broad idea', detail: 'The ask is still "use AI" or "automate support."' },
      { value: 1, label: 'Known area', detail: 'The team knows the function, but not the exact workflow.' },
      { value: 2, label: 'Defined workflow', detail: 'Inputs, outputs, handoffs, and current pain are clear.' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    prompt: 'Can the pilot access the data it needs?',
    options: [
      { value: 0, label: 'Blocked', detail: 'Data is missing, unreliable, or inaccessible.' },
      { value: 1, label: 'Partial', detail: 'Some source systems are available, but cleanup is needed.' },
      { value: 2, label: 'Usable', detail: 'Core data, examples, and permissions are ready enough for v1.' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    prompt: 'Can humans review AI output before customer or financial impact?',
    options: [
      { value: 0, label: 'Unclear', detail: 'No QA owner, escalation path, or rollback rule exists.' },
      { value: 1, label: 'Some review', detail: 'Review exists, but criteria and edge cases are loose.' },
      { value: 2, label: 'Controlled', detail: 'Approval gates, QA checks, and escalation rules are clear.' },
    ],
  },
  {
    id: 'measurement',
    label: 'Measurement',
    prompt: 'Can the team tell whether the pilot worked?',
    options: [
      { value: 0, label: 'No baseline', detail: 'There is no current measure for speed, cost, quality, or revenue.' },
      { value: 1, label: 'Directional', detail: 'The team has a metric, but the baseline is rough.' },
      { value: 2, label: 'Measurable', detail: 'Baseline, KPI, and expansion criteria are defined.' },
    ],
  },
]

type Scores = Record<string, number>

const initialScores = dimensions.reduce<Scores>((scores, dimension) => {
  scores[dimension.id] = 1
  return scores
}, {})

export function DeploymentScorecard() {
  const [scores, setScores] = useState<Scores>(initialScores)
  const [copied, setCopied] = useState(false)

  const total = useMemo(
    () => dimensions.reduce((sum, dimension) => sum + scores[dimension.id], 0),
    [scores]
  )

  const result = getResult(total)
  const summary = dimensions
    .map((dimension) => {
      const selected = dimension.options.find((option) => option.value === scores[dimension.id])
      return `${dimension.label}: ${selected?.label ?? 'Not set'}`
    })
    .join('\n')

  const scoreText = `Winter Advisory AI deployment score: ${total}/10 - ${result.label}\n\n${summary}\n\nRecommended next step: ${result.nextStep}`

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(scoreText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  function discussScore() {
    window.localStorage.setItem('winter-advisory-score-summary', scoreText)
    window.dispatchEvent(new Event('winter-advisory-score'))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-4">
        {dimensions.map((dimension) => (
          <section key={dimension.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-microgramma text-xs uppercase text-cyan-200">{dimension.label}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{dimension.prompt}</h2>
              </div>
              <p className="font-microgramma text-2xl text-white">{scores[dimension.id]}/2</p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {dimension.options.map((option) => {
                const selected = scores[dimension.id] === option.value

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setScores((current) => ({ ...current, [dimension.id]: option.value }))}
                    className={`rounded-lg border p-4 text-left transition ${
                      selected
                        ? 'border-cyan-200/70 bg-cyan-200/10 text-white'
                        : 'border-white/10 bg-[#05070a] text-slate-300 hover:border-cyan-200/40'
                    }`}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="mt-2 block text-xs leading-5 text-slate-400">{option.detail}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <aside className="h-fit rounded-lg border border-white/10 bg-[#071014] p-6 lg:sticky lg:top-6">
        <p className="font-microgramma text-xs uppercase text-amber-200">Deployment score</p>
        <div className="mt-5 flex items-end gap-2">
          <span className="font-microgramma text-6xl text-white">{total}</span>
          <span className="pb-2 text-lg text-slate-500">/10</span>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-200 transition-all"
            style={{ width: `${Math.max(8, total * 10)}%` }}
          />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">{result.label}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{result.copy}</p>
        <div className="mt-5 rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4">
          <p className="text-sm font-semibold text-amber-100">Recommended next step</p>
          <p className="mt-2 text-sm leading-6 text-amber-50">{result.nextStep}</p>
        </div>
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={copySummary}
            className="w-full rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
          >
            {copied ? 'Copied' : 'Copy score summary'}
          </button>
          <button
            type="button"
            onClick={discussScore}
            className="flex w-full items-center justify-center rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Discuss this score
          </button>
        </div>
      </aside>
    </div>
  )
}

function getResult(total: number) {
  if (total >= 8) {
    return {
      label: 'Ready for a controlled pilot',
      copy: 'The workflow likely has enough ownership, data access, review structure, and measurement to move into a focused deployment sprint.',
      nextStep: 'Choose the smallest pilot that can prove value in two to four weeks, then document review gates before launch.',
    }
  }

  if (total >= 5) {
    return {
      label: 'Good candidate, needs tightening',
      copy: 'There is enough signal to keep going, but the pilot needs sharper ownership, scope, data access, or measurement before implementation starts.',
      nextStep: 'Run a deployment diagnostic to turn the idea into a ranked pilot with owner, KPI, data boundary, and rollout plan.',
    }
  }

  return {
    label: 'Not ready for implementation',
    copy: 'The risk is spending time or budget before the workflow is specific enough for AI to create measurable operating leverage.',
    nextStep: 'Start with workflow discovery, stack inventory, and a readiness map before choosing tools or automation scope.',
  }
}
