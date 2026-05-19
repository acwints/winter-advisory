import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-use-cases'

export const metadata: Metadata = {
  title: 'Ecommerce AI Use Cases for Deployment Leads | Winter Advisory',
  description: 'A practical ecommerce AI use-case library for deployment leads prioritizing Shopify, lifecycle, CX, merchandising, analytics, and operations workflows.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Use Cases for Deployment Leads | Winter Advisory',
    description: 'Prioritize ecommerce AI workflows by business outcome, deployment shape, controls, and KPI before choosing tools.',
    url,
    type: 'website',
  },
}

const useCases = [
  {
    function: 'Lifecycle marketing',
    useCase: 'Campaign brief and variant generator',
    deployment: 'Creates launch briefs, subject lines, body variants, offer checks, and QA notes from product, segment, brand, and performance inputs.',
    controls: 'Human approval, brand voice rubric, claims review, segment exclusions, link and offer QA.',
    kpi: 'Campaign throughput, review time, revenue per send, error rate.',
  },
  {
    function: 'Lifecycle marketing',
    useCase: 'Flow QA and optimization assistant',
    deployment: 'Reviews active Klaviyo flows for broken logic, stale offers, missing exclusions, weak branches, and performance anomalies.',
    controls: 'Read-only analysis first, change list for approval, pre-launch checklist.',
    kpi: 'Flow revenue, error reduction, time to QA, incremental tests launched.',
  },
  {
    function: 'Customer experience',
    useCase: 'Support intent routing and macro drafts',
    deployment: 'Classifies tickets, summarizes context, suggests macros, and routes edge cases using Shopify order data and policy context.',
    controls: 'Agent approval, escalation rules, policy source links, QA review set.',
    kpi: 'Handle time, first response time, CSAT, reopen rate, agent adoption.',
  },
  {
    function: 'Customer experience',
    useCase: 'Low-risk deflection pilot',
    deployment: 'Automates or semi-automates high-volume intents such as WISMO, return status, subscription edits, and product FAQ.',
    controls: 'Intent whitelist, confidence threshold, escalation path, customer sentiment monitoring.',
    kpi: 'Deflection rate, containment quality, escalation quality, refund leakage.',
  },
  {
    function: 'Merchandising',
    useCase: 'PDP enrichment workflow',
    deployment: 'Generates product descriptions, benefit bullets, comparison notes, FAQ, and SEO metadata from product facts and customer language.',
    controls: 'No unsupported claims, merchant approval, source data traceability, brand style checks.',
    kpi: 'Time to publish, PDP completeness, organic traffic, conversion lift.',
  },
  {
    function: 'Merchandising',
    useCase: 'Assortment insight brief',
    deployment: 'Turns sales, inventory, reviews, search, returns, and margin signals into merchandising decisions and test recommendations.',
    controls: 'Decision owner, source links, finance review for margin-sensitive actions.',
    kpi: 'Sell-through, margin, return rate, test velocity.',
  },
  {
    function: 'Analytics',
    useCase: 'Weekly commerce narrative',
    deployment: 'Summarizes channel, lifecycle, product, customer, and CX performance into a decision-focused weekly operating brief.',
    controls: 'Metric definitions, anomaly flags, human commentary layer, no autonomous budget changes.',
    kpi: 'Decision cycle time, reporting hours saved, action completion rate.',
  },
  {
    function: 'Operations',
    useCase: 'Returns and exception triage',
    deployment: 'Classifies return reasons, flags policy exceptions, drafts customer notes, and summarizes product or fulfillment patterns.',
    controls: 'Approval for financial actions, exception rules, audit trail.',
    kpi: 'Return processing time, exception leakage, reason-code completeness.',
  },
  {
    function: 'Operations',
    useCase: 'Inventory and vendor update assistant',
    deployment: 'Turns vendor emails, PO updates, inventory alerts, and forecast signals into action lists for operators.',
    controls: 'Human approval for orders or commitments, source attachment, confidence flag.',
    kpi: 'Stockout reduction, operator time saved, update latency.',
  },
]

const prioritizationRules = [
  'Start where the workflow is repeated weekly or daily.',
  'Choose a pilot with a named owner and measurable baseline.',
  'Prefer assistive workflows before customer-facing autonomy.',
  'Avoid pilots where the source data is inaccessible or politically contested.',
  'Do not buy a tool until the workflow, controls, and KPI are clear.',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Ecommerce AI use cases for deployment leads',
  url,
  itemListElement: useCases.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.useCase,
    description: `${item.function}: ${item.deployment}`,
  })),
}

export default function EcommerceAiUseCasesPage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">Ecommerce AI use cases</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            A practical AI use-case library for ecommerce deployment leads.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Use this to separate deployable AI workflows from generic ideas. Each use case is framed around the work to be done, the controls required, and the KPI that should decide whether it expands.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#use-cases"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Review use cases
            </a>
            <a
              href="/ai-deployment-scorecard"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              Score a pilot
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Prioritization rules</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Pick pilots like an operator, not a trend watcher.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {prioritizationRules.map((rule) => (
              <div key={rule} className="rounded-lg border border-white/10 bg-[#081115] p-5 text-sm leading-7 text-slate-300">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Use-case library</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Nine ecommerce AI workflows worth evaluating before you buy another tool.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-white/10">
            <div className="grid border-b border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid-cols-[0.7fr_1fr_1.35fr_1.2fr_0.8fr]">
              <span>Function</span>
              <span className="hidden lg:block">Use case</span>
              <span className="hidden lg:block">Deployment shape</span>
              <span className="hidden lg:block">Controls</span>
              <span className="hidden lg:block">KPI</span>
            </div>
            {useCases.map((item) => (
              <article key={item.useCase} className="grid gap-4 border-b border-white/10 bg-[#05070a] p-5 last:border-b-0 lg:grid-cols-[0.7fr_1fr_1.35fr_1.2fr_0.8fr]">
                <p className="font-microgramma text-xs uppercase text-cyan-200">{item.function}</p>
                <h3 className="text-lg font-semibold text-white">{item.useCase}</h3>
                <p className="text-sm leading-7 text-slate-400">{item.deployment}</p>
                <p className="text-sm leading-7 text-slate-400">{item.controls}</p>
                <p className="text-sm leading-7 text-amber-100">{item.kpi}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Turn a use case into a deployment plan</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the use case you want to pressure-test.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share the workflow, stack, KPI, and timeline. Winter Advisory can help decide whether it should be a diagnostic, a pilot sprint, or a no-build decision.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention the use case you want to evaluate in the workflow field.</p>
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
