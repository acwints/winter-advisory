import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-audit-sample-deliverables'

export const metadata: Metadata = {
  title: 'Sample Ecommerce AI Audit Deliverables | Winter Advisory',
  description: 'Preview the sample deliverables from a Winter Advisory ecommerce AI deployment audit: opportunity map, pilot brief, control plan, KPI model, and launch runbook.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Sample Ecommerce AI Audit Deliverables | Winter Advisory',
    description: 'See the artifacts ecommerce AI deployment leads can expect from a focused audit before moving into pilot implementation.',
    url,
    type: 'website',
  },
}

const deliverables = [
  {
    artifact: 'AI opportunity map',
    purpose: 'Turn scattered ideas into a ranked deployment backlog.',
    contents: [
      'Workflow candidates by function: lifecycle, CX, merchandising, analytics, and operations.',
      'Impact, effort, risk, readiness, and owner scores for each candidate.',
      'Recommended first pilot with rationale and explicit no-build candidates.',
    ],
    buyerQuestion: 'Which AI workflow should we pursue first, and what should we ignore for now?',
  },
  {
    artifact: 'Pilot brief',
    purpose: 'Translate the chosen workflow into a scope the team can approve.',
    contents: [
      'Business outcome, workflow boundary, user, owner, systems, and launch sequence.',
      'Data needed from Shopify, Klaviyo, CX, analytics, ops, or finance systems.',
      'Success metric, baseline, expansion criteria, and stop criteria.',
    ],
    buyerQuestion: 'Can leadership approve this without asking the team to decode a technical spec?',
  },
  {
    artifact: 'Control and QA plan',
    purpose: 'Keep AI output useful without putting customers, margin, or brand trust at risk.',
    contents: [
      'Human approval gates, escalation rules, confidence thresholds, and rollback triggers.',
      'Source-of-truth rules for customer, product, policy, offer, and order data.',
      'Review rubric for quality, brand voice, unsupported claims, and edge cases.',
    ],
    buyerQuestion: 'Where can the system act, where must a person approve, and how do we catch failures?',
  },
  {
    artifact: 'Pilot economics model',
    purpose: 'Connect the pilot to a business case before implementation spend grows.',
    contents: [
      'Expected benefit by time saved, revenue lift, support deflection, error reduction, or margin protection.',
      'Pilot cost assumptions, payback estimate, and sensitivity notes.',
      'Measurement plan for comparing AI-assisted work against the current baseline.',
    ],
    buyerQuestion: 'What has to be true for this pilot to be worth expanding?',
  },
  {
    artifact: 'Launch runbook',
    purpose: 'Give the operating team a practical path from test to controlled use.',
    contents: [
      'Setup steps, owner checklist, QA sequence, launch cohort, and weekly review cadence.',
      'Failure modes, exception handling, change log, and support path.',
      'Expansion decision narrative for executives and operators.',
    ],
    buyerQuestion: 'What exactly happens after approval, and who owns each decision?',
  },
]

const sampleRows = [
  {
    workflow: 'Klaviyo campaign QA assistant',
    score: 'High',
    why: 'Clear owner, repeated weekly work, measurable review time, low autonomy requirement.',
    control: 'Human approval before launch; brand, offer, and claims checklist.',
  },
  {
    workflow: 'Gorgias WISMO deflection',
    score: 'Medium',
    why: 'High volume and clear intent, but policy grounding and escalation design matter.',
    control: 'Intent whitelist, confidence threshold, escalation for negative sentiment.',
  },
  {
    workflow: 'Autonomous refund approval',
    score: 'Defer',
    why: 'Financial risk is too high before policy, fraud, and exception handling are proven.',
    control: 'Start with decision support and manual approval before automation.',
  },
]

const qualityStandards = [
  'Every recommendation names the workflow owner, not just the executive sponsor.',
  'Every pilot has a baseline and expansion decision, not only a launch task list.',
  'Every customer-facing workflow includes review, escalation, and rollback rules.',
  'Every vendor or build recommendation follows the pilot brief instead of leading it.',
  'Every artifact is written for operating decisions, not for AI theater.',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Sample Ecommerce AI Audit Deliverables',
  url,
  description: 'A preview of the artifacts produced during a Winter Advisory ecommerce AI deployment audit.',
  creator: {
    '@type': 'Organization',
    name: 'Winter Advisory',
  },
  about: deliverables.map((item) => item.artifact),
}

export default function EcommerceAiAuditSampleDeliverablesPage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">Sample audit deliverables</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            See what an ecommerce AI deployment audit produces.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            The audit is not a strategy deck. It is a set of decision artifacts that help a deployment lead choose the right pilot, define controls, win approval, and move into controlled implementation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#deliverables"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Review deliverables
            </a>
            <a
              href="/ecommerce-ai-deployment-audit"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              View audit offer
            </a>
          </div>
        </div>
      </section>

      <section id="deliverables" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Artifact preview</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Five outputs that turn AI intent into a launch decision.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {deliverables.map((item) => (
              <article key={item.artifact} className="grid gap-6 rounded-lg border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
                <div>
                  <p className="font-microgramma text-xs uppercase text-cyan-200">Deliverable</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.artifact}</h3>
                  <p className="mt-4 text-sm leading-7 text-amber-50">{item.purpose}</p>
                </div>
                <ul className="space-y-3">
                  {item.contents.map((content) => (
                    <li key={content} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-200" />
                      <span>{content}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg border border-white/10 bg-[#05070a] p-4">
                  <p className="font-microgramma text-xs uppercase text-slate-500">Answers</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.buyerQuestion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Example opportunity map rows</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              A good audit distinguishes pilots to run from ideas to defer.
            </h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-lg border border-white/10">
            <div className="grid border-b border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid-cols-[0.9fr_0.4fr_1.2fr_1.1fr]">
              <span>Workflow</span>
              <span className="hidden lg:block">Score</span>
              <span className="hidden lg:block">Why</span>
              <span className="hidden lg:block">Control path</span>
            </div>
            {sampleRows.map((row) => (
              <article key={row.workflow} className="grid gap-4 border-b border-white/10 bg-[#05070a] p-5 last:border-b-0 lg:grid-cols-[0.9fr_0.4fr_1.2fr_1.1fr]">
                <h3 className="text-lg font-semibold text-white">{row.workflow}</h3>
                <p className="font-microgramma text-sm uppercase text-cyan-200">{row.score}</p>
                <p className="text-sm leading-7 text-slate-400">{row.why}</p>
                <p className="text-sm leading-7 text-amber-100">{row.control}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Quality standard</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The artifacts should make the next decision easier.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              If the output cannot help an ecommerce team approve, reject, scope, or operate a pilot, it is not useful enough.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {qualityStandards.map((standard) => (
              <div key={standard} className="rounded-lg border border-white/10 bg-[#081115] p-5 text-sm leading-7 text-slate-300">
                {standard}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Request artifacts for your workflow</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the pilot decision you need to make.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share the workflow, stack, owner, and decision pressure. Winter Advisory can produce the audit artifacts that make the next move concrete.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention which artifact would help your team decide fastest.</p>
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
