import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-roadmap'

export const metadata: Metadata = {
  title: '90-Day Ecommerce AI Roadmap | Winter Advisory',
  description: 'A practical 90-day ecommerce AI roadmap for deployment leads moving from workflow discovery to controlled pilots and operating handoff.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: '90-Day Ecommerce AI Roadmap | Winter Advisory',
    description: 'Plan ecommerce AI deployment across discovery, pilot design, controlled launch, and expansion decisions.',
    url,
    type: 'website',
  },
}

const phases = [
  {
    window: 'Days 1-14',
    title: 'Find the highest-leverage workflow',
    outcome: 'A ranked portfolio of AI opportunities with a clear first pilot.',
    work: [
      'Interview workflow owners across lifecycle, CX, merchandising, analytics, and operations.',
      'Inventory Shopify, Klaviyo, CX, subscription, returns, analytics, finance, and ops systems.',
      'Score candidate workflows by business impact, implementation complexity, risk, and adoption fit.',
      'Choose one pilot with owner, KPI, data requirements, and review controls.',
    ],
  },
  {
    window: 'Days 15-30',
    title: 'Design the pilot before building',
    outcome: 'A deployable pilot brief with controls and measurement built in.',
    work: [
      'Write the pilot brief: business outcome, workflow scope, data, reviewers, KPI, and rollout plan.',
      'Define human approval gates, QA rubric, exception handling, and rollback path.',
      'Choose build, buy, or hybrid implementation path after the workflow is clear.',
      'Create the test plan and baseline for speed, cost, quality, revenue, or support metrics.',
    ],
  },
  {
    window: 'Days 31-60',
    title: 'Launch a controlled v1',
    outcome: 'Working evidence from a supervised AI workflow.',
    work: [
      'Implement the workflow in the existing commerce stack wherever possible.',
      'Run with a small group of users or one operating lane before broad rollout.',
      'Review output quality, adoption, edge cases, and KPI movement every week.',
      'Document prompt patterns, review decisions, data issues, and operator feedback.',
    ],
  },
  {
    window: 'Days 61-90',
    title: 'Decide whether to expand, adjust, or stop',
    outcome: 'A leadership-ready decision on the next AI deployment investment.',
    work: [
      'Compare pilot performance against the baseline and expansion criteria.',
      'Identify what should be automated further, kept human-in-loop, or retired.',
      'Create the next workflow backlog with dependencies, owners, and risk controls.',
      'Hand off operating rhythm, documentation, and decision narrative to the team.',
    ],
  },
]

const operatingCadence = [
  {
    label: 'Weekly deployment review',
    copy: 'Review output quality, adoption, KPI movement, blockers, and the next set of decisions.',
  },
  {
    label: 'Risk and control log',
    copy: 'Track data boundaries, customer-impacting decisions, edge cases, and rollback rules.',
  },
  {
    label: 'Executive update',
    copy: 'Keep leadership focused on evidence, not demos: what changed, what worked, what is blocked, and what expands.',
  },
]

const roles = [
  'Executive sponsor',
  'Deployment owner',
  'Workflow operator',
  'Data or systems owner',
  'Brand/CX reviewer',
  'Implementation partner',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '90-day ecommerce AI roadmap',
  description: 'A roadmap for ecommerce AI deployment leads moving from opportunity discovery to controlled pilot and expansion decision.',
  url,
  step: phases.map((phase, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: phase.title,
    text: `${phase.window}: ${phase.outcome} ${phase.work.join(' ')}`,
  })),
}

export default function EcommerceAiRoadmapPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="relative px-6 pb-16 pt-36 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#05070a_0%,#0d1b1e_48%,#111318_100%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="font-microgramma text-xs uppercase text-cyan-200">90-day ecommerce AI roadmap</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            A practical roadmap for turning AI intent into deployed ecommerce workflows.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Use this roadmap to move from scattered AI ideas to one controlled pilot, working evidence, and a leadership-ready decision about what to expand next.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Review roadmap
            </a>
            <a
              href="/ecommerce-ai-pilot-brief-template"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              Write the pilot brief
            </a>
          </div>
        </div>
      </section>

      <section id="roadmap" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Roadmap</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Four phases that keep AI deployment grounded in operating evidence.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {phases.map((phase) => (
              <article key={phase.window} className="grid gap-6 rounded-lg border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[11rem_0.9fr_1.3fr]">
                <p className="font-microgramma text-sm uppercase text-cyan-200">{phase.window}</p>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{phase.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-amber-50">{phase.outcome}</p>
                </div>
                <ul className="space-y-3">
                  {phase.work.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Operating rhythm</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The roadmap needs cadence, owners, and controls.
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map((role) => (
                <span key={role} className="rounded-full border border-white/10 bg-[#05070a] px-4 py-2 text-sm text-slate-300">
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {operatingCadence.map((item) => (
              <article key={item.label} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-xl font-semibold text-white">{item.label}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Pressure-test the roadmap</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the quarter you want AI to change.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share the workflows, owner, stack, KPI, and timeline. Winter Advisory can help turn the roadmap into a diagnostic or pilot sprint.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention where you are in the 90-day roadmap.</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
