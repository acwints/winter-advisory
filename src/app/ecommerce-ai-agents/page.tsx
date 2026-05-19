import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-agents'

export const metadata: Metadata = {
  title: 'Ecommerce AI Agents Implementation | Winter Advisory',
  description: 'A practical ecommerce AI agents implementation guide for Shopify and DTC teams evaluating support, marketing, merchandising, analytics, and operations agents.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Agents Implementation | Winter Advisory',
    description: 'Deploy ecommerce AI agents with workflow scope, data boundaries, human review, QA, KPI measurement, and controlled rollout.',
    url,
    type: 'website',
  },
}

const agentUseCases = [
  {
    agent: 'CX resolution agent',
    work: 'Answers repeatable support intents, drafts replies, updates tickets, and escalates edge cases with order and policy context.',
    safeStart: 'Begin with summaries, macro drafts, intent routing, and low-risk WISMO or return-status flows.',
    controls: 'Intent whitelist, confidence threshold, policy source links, escalation rules, QA review set.',
    kpi: 'Deflection quality, handle time, reopen rate, CSAT, refund leakage.',
  },
  {
    agent: 'Lifecycle campaign agent',
    work: 'Turns product, segment, offer, and performance context into campaign briefs, variants, QA notes, and launch checklists.',
    safeStart: 'Keep launch approval with the lifecycle owner; use the agent for drafting, checking, and recommendations.',
    controls: 'Brand rubric, claims review, segment exclusions, offer validation, link QA.',
    kpi: 'Production time, review time, error rate, revenue per send, tests launched.',
  },
  {
    agent: 'Merchandising agent',
    work: 'Generates PDP enrichment, flags catalog gaps, summarizes review themes, and recommends product content updates.',
    safeStart: 'Start with enrichment drafts and completeness scoring before any storefront publishing.',
    controls: 'Source facts, no unsupported claims, merchant approval, SEO and brand checks.',
    kpi: 'Time to publish, PDP completeness, organic traffic, conversion lift.',
  },
  {
    agent: 'Analytics narrative agent',
    work: 'Summarizes channel, product, customer, lifecycle, and CX metrics into weekly operating decisions.',
    safeStart: 'Use read-only reporting and human commentary before budget or merchandising actions.',
    controls: 'Metric definitions, source links, anomaly flags, finance-sensitive action locks.',
    kpi: 'Reporting hours saved, decision cycle time, action completion, forecast accuracy.',
  },
  {
    agent: 'Operations exception agent',
    work: 'Classifies returns, vendor updates, inventory alerts, order exceptions, and fulfillment issues into operator queues.',
    safeStart: 'Draft action lists and exception summaries before allowing system writes or financial decisions.',
    controls: 'Approval for commitments, audit trail, exception policy, rollback path.',
    kpi: 'Processing time, exception leakage, stockout risk, reason-code completeness.',
  },
]

const readinessChecks = [
  'A human owner can approve or reject the agent output during the pilot.',
  'The workflow has repeated volume and a measurable baseline.',
  'The agent can access trusted data without violating source-of-truth boundaries.',
  'Failure modes are known enough to define escalation and rollback rules.',
  'The first version can assist, draft, route, or recommend before taking irreversible action.',
  'The team knows what evidence would justify more autonomy.',
]

const autonomyLadder = [
  {
    level: 'Assist',
    description: 'The agent summarizes, drafts, classifies, enriches, or recommends while a human does the work.',
    decision: 'Best starting point for most ecommerce teams.',
  },
  {
    level: 'Approve',
    description: 'The agent prepares the action and the workflow owner approves before anything reaches a customer or system of record.',
    decision: 'Use when quality is strong but brand, customer, or margin risk remains.',
  },
  {
    level: 'Act with limits',
    description: 'The agent executes only whitelisted, low-risk actions under confidence, policy, and value thresholds.',
    decision: 'Use after supervised evidence proves quality and exception handling.',
  },
  {
    level: 'Autonomous lane',
    description: 'The agent owns a narrow workflow lane with monitoring, audit logs, rollback, and periodic human review.',
    decision: 'Reserve for mature workflows with strong evidence and low downside risk.',
  },
]

const deploymentSteps = [
  {
    step: '01',
    title: 'Choose the workflow lane',
    copy: 'Define the exact job the agent handles, the systems involved, the owner, the user, and the work that stays human.',
  },
  {
    step: '02',
    title: 'Map data and tools',
    copy: 'Identify source systems, permissions, write access, policy docs, product facts, order context, and operational logs.',
  },
  {
    step: '03',
    title: 'Design controls',
    copy: 'Set approval gates, confidence thresholds, escalation paths, audit logs, QA samples, and rollback triggers before launch.',
  },
  {
    step: '04',
    title: 'Pilot under supervision',
    copy: 'Run against a narrow workflow, compare to baseline, review output quality, and only expand autonomy where evidence supports it.',
  },
]

const redFlags = [
  'The pitch promises to replace an entire ecommerce function before a supervised pilot.',
  'The agent needs broad write access before the team has tested output quality.',
  'No one can name the workflow owner, review gate, or rollback path.',
  'The vendor measures generated volume rather than customer, revenue, cost, speed, or quality outcomes.',
  'The agent crosses Shopify, CX, subscriptions, finance, and fulfillment systems without a source-of-truth map.',
  'The team wants autonomy because it sounds advanced, not because the workflow evidence supports it.',
]

const faqs = [
  {
    question: 'Should ecommerce teams deploy AI agents or AI assistants first?',
    answer: 'Most teams should begin with assistants or supervised agents. Drafting, routing, summarizing, checking, and recommending create useful evidence before the agent takes customer-facing, financial, or system-of-record actions.',
  },
  {
    question: 'Which ecommerce AI agents are safest to start with?',
    answer: 'Read-only analytics narratives, campaign QA, support summaries, macro drafts, PDP enrichment drafts, and exception triage are usually safer starts than autonomous refunds, inventory commitments, or broad storefront changes.',
  },
  {
    question: 'What makes an ecommerce AI agent ready for more autonomy?',
    answer: 'The workflow needs strong output quality, clear policy boundaries, measurable improvement, low-risk action limits, escalation rules, rollback, and an owner who can review exceptions.',
  },
  {
    question: 'Can Winter Advisory help evaluate AI agent vendors?',
    answer: 'Yes. Winter Advisory can compare agent platforms, native Shopify or CX features, automation layers, and custom builds against the actual workflow, controls, data access, KPI, and rollout plan.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Ecommerce AI Agents Implementation',
      description: 'A practical guide for ecommerce teams deploying AI agents with controls, measurement, and human-in-loop rollout.',
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

export default function EcommerceAiAgentsPage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">Ecommerce AI agents implementation</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Deploy ecommerce AI agents where they can earn trust before they act.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            AI agents can help Shopify and DTC teams move faster across support, lifecycle, merchandising, analytics, and operations. The hard part is not the demo; it is choosing the right workflow, controls, KPI, and autonomy level.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#agent-use-cases"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Review agent use cases
            </a>
            <a
              href="/ecommerce-ai-deployment-audit"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
            >
              Audit an agent workflow
            </a>
          </div>
        </div>
      </section>

      <section id="agent-use-cases" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Agent use cases</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Start with narrow lanes where supervision is possible.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-white/10">
            <div className="grid border-b border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid-cols-[0.75fr_1.1fr_1fr_1fr_0.8fr]">
              <span>Agent</span>
              <span className="hidden lg:block">Work</span>
              <span className="hidden lg:block">Safe start</span>
              <span className="hidden lg:block">Controls</span>
              <span className="hidden lg:block">KPI</span>
            </div>
            {agentUseCases.map((item) => (
              <article key={item.agent} className="grid gap-4 border-b border-white/10 bg-[#05070a] p-5 last:border-b-0 lg:grid-cols-[0.75fr_1.1fr_1fr_1fr_0.8fr]">
                <h3 className="text-lg font-semibold text-white">{item.agent}</h3>
                <p className="text-sm leading-7 text-slate-400">{item.work}</p>
                <p className="text-sm leading-7 text-cyan-100">{item.safeStart}</p>
                <p className="text-sm leading-7 text-slate-400">{item.controls}</p>
                <p className="text-sm leading-7 text-amber-100">{item.kpi}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Readiness checks</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Agents need operating proof before autonomy.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              A strong agent pilot starts by proving output quality, owner adoption, and business impact while downside risk is still controlled.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {readinessChecks.map((check) => (
              <div key={check} className="rounded-lg border border-white/10 bg-[#081115] p-5 text-sm leading-7 text-slate-300">
                {check}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Autonomy ladder</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Move from assistive work to autonomous lanes only when evidence supports it.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {autonomyLadder.map((item) => (
              <article key={item.level} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-2xl font-semibold text-white">{item.level}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
                <p className="mt-5 rounded-lg border border-cyan-200/20 bg-cyan-200/[0.06] p-4 text-sm leading-6 text-cyan-50">
                  {item.decision}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Deployment path</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Agent implementation is a rollout discipline.
            </h2>
          </div>
          <div className="space-y-4">
            {deploymentSteps.map((item) => (
              <article key={item.step} className="grid gap-5 rounded-lg border border-white/10 bg-[#05070a] p-6 sm:grid-cols-[5rem_1fr]">
                <p className="font-microgramma text-2xl text-cyan-200">{item.step}</p>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Red flags</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Watch for agent projects that skip deployment reality.
            </h2>
          </div>
          <div className="grid gap-3">
            {redFlags.map((flag) => (
              <div key={flag} className="rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-7 text-amber-50">
                {flag}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Questions before deploying ecommerce AI agents.
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
            <p className="font-microgramma text-xs uppercase text-amber-200">Pressure-test an agent workflow</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the agent idea before you give it write access.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory can help define the workflow, controls, data boundaries, vendor path, and pilot evidence needed before an agent acts on behalf of your team.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention the agent workflow, systems, and autonomy level you are considering.</p>
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
