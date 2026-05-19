import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-vendor-selection-guide'

export const metadata: Metadata = {
  title: 'Ecommerce AI Vendor Selection Guide | Winter Advisory',
  description: 'A vendor-agnostic guide for ecommerce AI deployment leads comparing native platform AI, SaaS tools, automation layers, custom builds, agencies, and internal teams.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Vendor Selection Guide | Winter Advisory',
    description: 'Choose the right ecommerce AI implementation path by scoring workflow fit, data access, controls, measurement, ownership, and rollout risk.',
    url,
    type: 'website',
  },
}

const paths = [
  {
    path: 'Native platform AI',
    bestFor: 'Low-risk improvements inside tools your team already uses.',
    examples: 'Shopify, Klaviyo, Gorgias, Zendesk, analytics, or help center features already in the stack.',
    watchouts: 'Feature scope may not match the cross-system workflow, and measurement can stay trapped inside one tool.',
  },
  {
    path: 'Specialized AI SaaS',
    bestFor: 'A clearly bounded workflow where the vendor has deep product fit and fast time to value.',
    examples: 'Support deflection, product enrichment, creative variation, search, personalization, reporting, or forecasting.',
    watchouts: 'The vendor demo can hide policy gaps, edge cases, data cleanup, and the operating work needed after launch.',
  },
  {
    path: 'Automation or orchestration layer',
    bestFor: 'Connecting existing systems when the workflow is mostly routing, drafting, summarizing, or exception handling.',
    examples: 'Order events, customer data, tickets, vendor emails, inventory alerts, campaign briefs, and operating reports.',
    watchouts: 'Brittle automations can create silent failures unless ownership, logs, fallback paths, and QA are designed upfront.',
  },
  {
    path: 'Custom build',
    bestFor: 'A proprietary workflow where off-the-shelf tools cannot represent the logic, data, or user experience.',
    examples: 'Internal copilots, workflow-specific review tools, enrichment systems, or decision support tied to unique operations.',
    watchouts: 'Custom work needs clear product ownership, maintenance budget, evaluation criteria, and a narrow v1.',
  },
  {
    path: 'Agency or implementation partner',
    bestFor: 'Teams that know the target workflow but need build capacity, system integration, or launch management.',
    examples: 'Shopify, lifecycle, CX, analytics, ops, and integration partners with relevant ecommerce stack experience.',
    watchouts: 'Partner selection should follow the pilot brief; otherwise the agency may optimize for its preferred tools.',
  },
  {
    path: 'Internal team',
    bestFor: 'Workflows close to core operations where internal ownership, data access, and long-term iteration matter most.',
    examples: 'Recurring reporting, policy-heavy CX, finance-sensitive ops, data products, and proprietary merchandising logic.',
    watchouts: 'Internal teams still need deployment leadership: scope, controls, baseline, launch rhythm, and executive narrative.',
  },
]

const scoringCriteria = [
  {
    criterion: 'Workflow fit',
    question: 'Does the option map to the actual work, handoffs, edge cases, and review points?',
    weakSignal: 'The demo is impressive but does not match the operator workflow.',
  },
  {
    criterion: 'Data access',
    question: 'Can it read the right source systems and preserve source-of-truth boundaries?',
    weakSignal: 'The plan depends on manual exports, stale data, or unclear permissions.',
  },
  {
    criterion: 'Control model',
    question: 'Where do humans approve, override, escalate, and roll back the workflow?',
    weakSignal: 'The vendor talks about autonomy before showing review controls.',
  },
  {
    criterion: 'Measurement',
    question: 'Can the team compare against a baseline for speed, cost, quality, revenue, margin, or CX?',
    weakSignal: 'Success is framed as usage, not business or operating impact.',
  },
  {
    criterion: 'Ownership',
    question: 'Who owns the workflow after launch, and who handles exceptions?',
    weakSignal: 'The project has an executive sponsor but no operating owner.',
  },
  {
    criterion: 'Expansion path',
    question: 'If the pilot works, what expands next without multiplying risk or maintenance burden?',
    weakSignal: 'The roadmap jumps from demo to broad autonomy without staged evidence.',
  },
]

const rfpQuestions = [
  'Which systems does the workflow need to read from, write to, or leave untouched?',
  'What customer-facing, financial, legal, or brand decisions require approval before action?',
  'What is the baseline for the current workflow, and how will the pilot compare against it?',
  'What failure modes are most likely, and how will the team detect and recover from them?',
  'What does the vendor or partner need from the internal team during setup and after launch?',
  'What happens if the pilot succeeds, fails, or produces mixed evidence?',
]

const redFlags = [
  'The vendor starts with model capability instead of the ecommerce workflow.',
  'No one can explain the human review path for risky outputs.',
  'The business case depends on full autonomy before supervised use has been proven.',
  'The integration plan ignores Shopify, lifecycle, CX, analytics, finance, or ops source-of-truth rules.',
  'The proposal does not name the internal owner who will operate the system after handoff.',
  'The success metric is demo quality, generated volume, or tool usage instead of operating evidence.',
]

const faqs = [
  {
    question: 'Should ecommerce teams start with native AI features or a new AI vendor?',
    answer: 'Start with the workflow. Native AI is often the fastest path when the work stays inside one trusted platform. A new vendor or custom layer becomes more attractive when the workflow crosses systems, needs stronger controls, or creates proprietary operating leverage.',
  },
  {
    question: 'How should a deployment lead compare vendors fairly?',
    answer: 'Use the same pilot brief for every option: business outcome, workflow scope, systems, data, controls, owner, KPI, and rollout plan. Then score vendors against that brief instead of comparing demos.',
  },
  {
    question: 'When is a custom build justified?',
    answer: 'Custom work is justified when the workflow is strategically important, hard to represent in existing tools, data-rich, and owned by a team that can maintain and improve it after launch.',
  },
  {
    question: 'What should happen before signing a vendor contract?',
    answer: 'The team should know the pilot workflow, baseline, owner, integration requirements, review controls, success metric, failure modes, and expansion decision criteria.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Ecommerce AI Vendor Selection Guide',
      description: 'A vendor-agnostic guide for ecommerce AI deployment leads comparing implementation paths.',
      url,
      author: {
        '@type': 'Organization',
        name: 'Winter Advisory',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function EcommerceAiVendorSelectionGuidePage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">Ecommerce AI vendor selection guide</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Choose the AI implementation path after the workflow is clear.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Use this guide to compare native platform AI, specialized SaaS, automation layers, custom builds, agencies, and internal teams by deployment fit instead of demo quality.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#paths"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Compare paths
            </a>
            <a
              href="/ecommerce-ai-deployment-audit"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              Pressure-test a decision
            </a>
          </div>
        </div>
      </section>

      <section id="paths" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Implementation paths</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The right answer depends on the workflow, not the category.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-white/10">
            <div className="grid border-b border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid-cols-[0.75fr_1fr_1.1fr_1.05fr]">
              <span>Path</span>
              <span className="hidden lg:block">Best for</span>
              <span className="hidden lg:block">Examples</span>
              <span className="hidden lg:block">Watchouts</span>
            </div>
            {paths.map((item) => (
              <article key={item.path} className="grid gap-4 border-b border-white/10 bg-[#05070a] p-5 last:border-b-0 lg:grid-cols-[0.75fr_1fr_1.1fr_1.05fr]">
                <h3 className="text-lg font-semibold text-white">{item.path}</h3>
                <p className="text-sm leading-7 text-slate-400">{item.bestFor}</p>
                <p className="text-sm leading-7 text-slate-400">{item.examples}</p>
                <p className="text-sm leading-7 text-amber-100">{item.watchouts}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Evaluation scorecard</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Score every option against the same deployment requirements.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scoringCriteria.map((item) => (
              <article key={item.criterion} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-xl font-semibold text-white">{item.criterion}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.question}</p>
                <p className="mt-5 rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-6 text-amber-50">
                  Weak signal: {item.weakSignal}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">RFP questions</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Questions to answer before comparing proposals.
            </h2>
            <div className="mt-8 grid gap-3">
              {rfpQuestions.map((question) => (
                <div key={question} className="rounded-lg border border-white/10 bg-[#081115] p-4 text-sm leading-7 text-slate-300">
                  {question}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Red flags</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Warning signs that the buying process is ahead of deployment readiness.
            </h2>
            <div className="mt-8 grid gap-3">
              {redFlags.map((flag) => (
                <div key={flag} className="rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-7 text-amber-50">
                  {flag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Vendor selection questions deployment leads ask.
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Pressure-test the choice</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the vendor shortlist and the workflow.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory can help compare vendors, native tools, custom builds, and internal paths against the deployment requirements that matter.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention the vendors, tools, or build paths you are comparing.</p>
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
