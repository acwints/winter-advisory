import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-pilot-brief-template'

export const metadata: Metadata = {
  title: 'Ecommerce AI Pilot Brief Template | Winter Advisory',
  description: 'A practical AI pilot brief template for ecommerce deployment leads aligning workflow, owner, data, controls, KPI, and rollout plan before implementation.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Pilot Brief Template | Winter Advisory',
    description: 'Use this ecommerce AI pilot brief to align leadership before buying tools or starting implementation.',
    url,
    type: 'website',
  },
}

const briefSections = [
  {
    title: '1. Business outcome',
    prompt: 'What business result will justify expanding the pilot?',
    guidance: 'Tie the pilot to revenue, margin, retention, support cost, speed, quality, or operator leverage. Avoid AI-only metrics.',
    example: 'Reduce lifecycle campaign production time by 40% while maintaining brand QA and revenue per send.',
  },
  {
    title: '2. Workflow scope',
    prompt: 'What exact workflow is in scope for v1?',
    guidance: 'Name the trigger, inputs, outputs, tools involved, team handoff, and what will stay manual.',
    example: 'Generate Klaviyo campaign briefs and first-pass variants from Shopify product data, segment notes, brand rules, and prior campaign performance.',
  },
  {
    title: '3. Owner and reviewers',
    prompt: 'Who can approve scope, output quality, and rollout?',
    guidance: 'Separate the accountable owner from reviewers. List who signs off on brand, legal/compliance, data, customer experience, and finance-sensitive actions.',
    example: 'Lifecycle lead owns pilot; brand approves voice; ecommerce approves offer; analytics validates KPI.',
  },
  {
    title: '4. Data and systems',
    prompt: 'What data does the workflow need, and where does it live?',
    guidance: 'Map source systems, access requirements, data quality issues, sensitive fields, and what the AI should never use.',
    example: 'Shopify products and collections, Klaviyo segments, approved brand examples, campaign performance exports, promotion calendar.',
  },
  {
    title: '5. Human review controls',
    prompt: 'Where must a human inspect, approve, or override the AI?',
    guidance: 'Define approval gates, QA checklist, confidence thresholds, escalation paths, and rollback rules before launch.',
    example: 'No customer-facing copy publishes without lifecycle review; unsupported product claims are rejected; offer mismatches require ecommerce approval.',
  },
  {
    title: '6. Pilot KPI and baseline',
    prompt: 'How will the team know whether v1 worked?',
    guidance: 'Capture current baseline, target, measurement window, and stop/expand criteria.',
    example: 'Baseline: 6 hours per campaign brief. Target: 3 hours or less with no increase in QA defects across four campaigns.',
  },
  {
    title: '7. Rollout plan',
    prompt: 'What happens after the first useful pilot?',
    guidance: 'Describe timeline, launch group, training, operating cadence, documentation, and expansion decision.',
    example: 'Run with one lifecycle manager for four weeks, review output weekly, then expand to flows if quality and speed targets hold.',
  },
]

const commonMistakes = [
  'Starting with a tool demo instead of a workflow brief.',
  'Letting AI act before the team agrees on review controls.',
  'Choosing a pilot with no baseline or owner.',
  'Skipping data access until implementation week.',
  'Measuring output volume instead of business impact.',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to write an ecommerce AI pilot brief',
  description: 'A pilot brief template for ecommerce AI deployment leads aligning workflow, owner, data, controls, KPI, and rollout plan.',
  url,
  step: briefSections.map((section, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: section.title,
    text: `${section.prompt} ${section.guidance}`,
  })),
}

export default function EcommerceAiPilotBriefTemplatePage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">AI pilot brief template</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Write the ecommerce AI pilot brief before you buy the tool.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Use this template to align the workflow, owner, data, controls, KPI, and rollout plan before an AI deployment becomes another disconnected experiment.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#template"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Use the template
            </a>
            <a
              href="/ai-deployment-scorecard"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              Score readiness first
            </a>
          </div>
        </div>
      </section>

      <section id="template" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-microgramma text-xs uppercase text-amber-200">Template</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Seven sections that make an AI pilot deployable.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The brief should be short enough for executives to read and specific enough for operators to run.
              </p>
            </div>

            <div className="space-y-4">
              {briefSections.map((section) => (
                <article key={section.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                  <p className="font-microgramma text-xs uppercase text-cyan-200">{section.title}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{section.prompt}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{section.guidance}</p>
                  <div className="mt-5 rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">Example</p>
                    <p className="mt-2 text-sm leading-6 text-amber-50">{section.example}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Failure modes</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Most AI pilots fail before the model is the problem.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {commonMistakes.map((mistake) => (
              <div key={mistake} className="rounded-lg border border-white/10 bg-[#081115] p-5 text-sm leading-7 text-slate-300">
                {mistake}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Turn the brief into a deployment plan</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the draft brief. I will pressure-test it.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share the workflow, owner, KPI, and timeline. Winter Advisory can help decide whether it is ready for a diagnostic, pilot sprint, or a no-build decision.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Paste your rough pilot brief into the workflow field if useful.</p>
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
