import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const deploymentMetrics = [
  ['First useful pilot', '14 days'],
  ['Stack audit', '8 systems'],
  ['Use-case backlog', '25+'],
  ['Launch posture', 'Human-in-loop'],
]

const useCases = [
  {
    area: 'Lifecycle marketing',
    title: 'Campaign and flow production that keeps brand voice intact',
    copy: 'Turn product context, customer segments, offer rules, and performance history into reviewed Klaviyo briefs, variants, QA checks, and launch-ready assets.',
  },
  {
    area: 'Customer experience',
    title: 'Support intelligence that resolves the repeatable work',
    copy: 'Route tickets, draft macros, summarize customer history, surface refund risk, and keep agents in control across Gorgias, Zendesk, Shopify, and help center content.',
  },
  {
    area: 'Merchandising',
    title: 'Catalog operations that move faster than spreadsheets',
    copy: 'Generate product enrichments, identify PDP gaps, compare assortment performance, and create SEO-aware content with approval gates before anything reaches the storefront.',
  },
  {
    area: 'Operations',
    title: 'Back-office automations that do not break finance or fulfillment',
    copy: 'Connect order events, returns, inventory signals, vendor updates, and reporting workflows so the system drafts the work and your team approves the exception paths.',
  },
]

const programs = [
  {
    name: 'AI Deployment Diagnostic',
    timing: '1 week',
    bestFor: 'Leaders who need a credible plan before committing budget.',
    deliverables: ['Workflow and stack inventory', 'Ranked AI use-case portfolio', 'Risk and data boundary map', 'Pilot recommendation with owner and KPI'],
  },
  {
    name: 'Pilot Sprint',
    timing: '2 to 4 weeks',
    bestFor: 'Teams ready to ship one workflow into controlled use.',
    deliverables: ['Prototype or automation spec', 'Evaluation checklist', 'Human review and rollback plan', 'Launch runbook for the operating team'],
  },
  {
    name: 'Deployment Lead Advisory',
    timing: 'Monthly',
    bestFor: 'AI owners coordinating agencies, internal teams, vendors, and executives.',
    deliverables: ['Decision support and architecture review', 'Vendor and build-vs-buy guidance', 'Team enablement sessions', 'Executive progress narrative'],
  },
]

const stack = [
  'Shopify Plus',
  'Klaviyo',
  'Gorgias',
  'Zendesk',
  'Recharge',
  'Meta Ads',
  'Google Ads',
  'GA4',
  'Triple Whale',
  'Northbeam',
  'NetSuite',
  '3PL and WMS tools',
]

const deploymentPrinciples = [
  {
    label: 'Revenue before novelty',
    copy: 'Every workflow is tied to conversion, retention, support cost, speed, or operating leverage.',
  },
  {
    label: 'Existing stack first',
    copy: 'AI should sit inside Shopify, Klaviyo, CX, analytics, and ops tools before it asks the team to adopt another dashboard.',
  },
  {
    label: 'Approval by default',
    copy: 'Customer-facing changes, financial actions, and brand voice decisions need preview, QA, and a clear owner.',
  },
  {
    label: 'Measurement built in',
    copy: 'Pilots ship with success criteria, error modes, adoption signals, and a path to expand or stop.',
  },
]

const auditDeliverables = [
  {
    title: 'AI opportunity map',
    copy: 'A ranked list of ecommerce workflows with expected leverage, complexity, dependencies, and the first pilot to ship.',
  },
  {
    title: 'Stack and data inventory',
    copy: 'A practical map of the Shopify, Klaviyo, CX, analytics, subscriptions, returns, and ops systems the AI workflow has to touch.',
  },
  {
    title: 'Deployment control plan',
    copy: 'Human review points, failure modes, data boundaries, QA checks, and rollback paths before anything reaches a customer.',
  },
  {
    title: 'Executive rollout brief',
    copy: 'A plain-English narrative leadership can use to decide budget, owner, KPI, timeline, and whether the pilot should expand.',
  },
]

const readinessSignals = [
  {
    label: 'Ready',
    items: [
      'A named owner can approve AI output during the pilot.',
      'The workflow touches a measurable business outcome.',
      'Core systems already have usable data and permissions.',
      'The team can compare AI-assisted work against the current process.',
    ],
  },
  {
    label: 'Not ready yet',
    items: [
      'No one owns the workflow after the consultant leaves.',
      'The ask is only "add AI" without a revenue, cost, speed, or quality target.',
      'Source data is inaccessible, untrusted, or politically blocked.',
      'Leadership wants full autonomy before testing supervised workflows.',
    ],
  },
]

const comparisons = [
  {
    option: 'Generic AI consultant',
    gap: 'Broad strategy, limited commerce context, and too much time spent learning your stack.',
    winter: 'Commerce-native workflows for Shopify, lifecycle, CX, catalog, analytics, and ops from day one.',
  },
  {
    option: 'Traditional ecommerce agency',
    gap: 'Strong channel execution, but AI often shows up as a side feature or vendor add-on.',
    winter: 'AI deployment is the product: workflow design, controls, evaluation, rollout, and team adoption.',
  },
  {
    option: 'AI SaaS tool',
    gap: 'Useful feature set, but the burden of integration, policy, measurement, and change management lands on your team.',
    winter: 'Tool-agnostic deployment support that makes the chosen platform fit the actual operating system of the brand.',
  },
]

const servicePages = [
  {
    title: 'Ecommerce AI consultant',
    href: '/ecommerce-ai-consultant',
    copy: 'The broad commercial page for Shopify and DTC teams evaluating AI consulting across lifecycle, CX, merchandising, analytics, and ops.',
  },
  {
    title: 'Ecommerce AI automation',
    href: '/ecommerce-ai-automation',
    copy: 'Controlled AI automation for Shopify, Klaviyo, Gorgias, merchandising, analytics, and ops workflows.',
  },
  {
    title: '90-day AI roadmap',
    href: '/ecommerce-ai-roadmap',
    copy: 'A quarter-by-quarter deployment roadmap for moving from workflow discovery to controlled pilots and expansion decisions.',
  },
  {
    title: 'AI deployment audit',
    href: '/ecommerce-ai-deployment-audit',
    copy: 'A focused diagnostic for turning scattered AI ideas into one ranked pilot, control plan, and rollout recommendation.',
  },
  {
    title: 'Sample audit deliverables',
    href: '/ecommerce-ai-audit-sample-deliverables',
    copy: 'Preview the opportunity map, pilot brief, control plan, KPI model, and launch runbook an audit produces.',
  },
  {
    title: 'AI ROI calculator',
    href: '/ecommerce-ai-roi-calculator',
    copy: 'Estimate pilot economics across time saved, revenue lift, support deflection, cost, ROI, and payback before assigning budget.',
  },
  {
    title: 'AI vendor selection guide',
    href: '/ecommerce-ai-vendor-selection-guide',
    copy: 'Compare native AI, SaaS tools, automation layers, custom builds, agencies, and internal teams by deployment fit.',
  },
  {
    title: 'Ecommerce AI agents',
    href: '/ecommerce-ai-agents',
    copy: 'A practical guide to deploying support, lifecycle, merchandising, analytics, and operations agents with controls.',
  },
  {
    title: 'Resource hub',
    href: '/resources',
    copy: 'All Winter Advisory ecommerce AI deployment resources in one place: templates, scorecards, use cases, and service pages.',
  },
  {
    title: 'AI pilot brief template',
    href: '/ecommerce-ai-pilot-brief-template',
    copy: 'A practical template for aligning workflow, owner, data, controls, KPI, and rollout before implementation.',
  },
  {
    title: 'Ecommerce AI use cases',
    href: '/ecommerce-ai-use-cases',
    copy: 'A practical library for deployment leads comparing AI workflows by deployment shape, controls, and KPI.',
  },
  {
    title: 'AI deployment scorecard',
    href: '/ai-deployment-scorecard',
    copy: 'For deployment leads who need to decide whether a workflow is ready for a controlled AI pilot.',
  },
  {
    title: 'Shopify AI consultant',
    href: '/shopify-ai-consultant',
    copy: 'For ecommerce leaders who need AI workflows connected to Shopify events, catalog data, CX, lifecycle, analytics, and ops.',
  },
  {
    title: 'Klaviyo AI automation',
    href: '/klaviyo-ai-automation',
    copy: 'For lifecycle teams that need faster campaign production, stronger QA, and brand-safe AI review loops.',
  },
  {
    title: 'Gorgias AI implementation',
    href: '/gorgias-ai-implementation',
    copy: 'For CX teams that want ticket deflection, macro QA, policy grounding, and safe escalation rules.',
  },
]

const faqs = [
  {
    question: 'What makes this different from an AI strategy engagement?',
    answer: 'The work is organized around deployed ecommerce workflows, not abstract AI capability. Strategy is included only insofar as it helps choose the right pilot, define controls, and get a system into controlled use.',
  },
  {
    question: 'Do you build the automations or only advise?',
    answer: 'Both modes are possible. The default is senior deployment advisory plus practical implementation support: workflow specs, architecture, vendor selection, evaluation plans, prototypes, and launch runbooks. If a specialist builder or internal team is better for a piece of the work, Winter Advisory helps direct it.',
  },
  {
    question: 'Which ecommerce teams are the best fit?',
    answer: 'The strongest fit is a Shopify or DTC brand with recurring operational drag, a real commerce stack, and an owner responsible for making AI useful. The work is especially relevant for lifecycle, CX, merchandising, analytics, and operations leaders.',
  },
  {
    question: 'How fast can a brand get a useful pilot?',
    answer: 'A diagnostic can identify the right pilot in about a week. A controlled pilot can usually be shaped in two to four weeks when data access, owner availability, and review rules are clear.',
  },
  {
    question: 'How do you keep AI from damaging brand voice or customer experience?',
    answer: 'Customer-facing workflows start with brand rules, examples, approval gates, and QA checks. Early systems draft, route, summarize, and recommend before they act autonomously.',
  },
  {
    question: 'Do you take vendor commissions?',
    answer: 'No. The recommendation should fit the brand, the workflow, the team, and the economics. Existing tools come first whenever they can do the job.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'Winter Advisory',
      url: 'https://winteradvisory.llc',
      email: 'andrew@winteradvisory.llc',
      description: 'AI deployment advisory for ecommerce brands running Shopify, Klaviyo, customer experience, merchandising, analytics, and operations workflows.',
      areaServed: 'United States',
      serviceType: [
        'Ecommerce AI consulting',
        'Shopify AI deployment',
        'AI workflow automation',
        'AI implementation advisory',
      ],
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

function DeploymentConsole() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute inset-3 rounded-lg border border-cyan-300/10 bg-cyan-300/5 blur-2xl" />
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#071014]/95 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-microgramma text-[0.62rem] uppercase text-cyan-200">Commerce AI deployment map</p>
            <p className="mt-1 text-sm text-slate-400">Prioritized workflows, controls, and launch owners</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            Ready
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {deploymentMetrics.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="mt-3 font-microgramma text-2xl text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 px-4 pb-4">
          <div className="rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-amber-100">Pilot candidate</p>
              <span className="rounded-full bg-amber-200/10 px-2.5 py-1 text-[0.68rem] uppercase text-amber-100">High leverage</span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">Klaviyo campaign production QA</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Draft, review, approve, and launch assets with brand, compliance, and offer checks.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Deployment gates</p>
              <div className="mt-4 space-y-3">
                {['Data access', 'Human approval', 'Error handling'].map((item) => (
                  <div key={item} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{item}</span>
                    <span className="text-cyan-200">mapped</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-cyan-200/20 bg-cyan-200/[0.06] p-4">
              <p className="text-sm font-semibold text-white">Next move</p>
              <p className="mt-3 text-3xl font-semibold text-cyan-100">Ship v1</p>
              <p className="mt-2 text-sm text-slate-400">Measured in working evidence, not AI theater.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="relative px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#05070a_0%,#0d1b1e_48%,#111318_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.86fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">For ecommerce AI deployment leads</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              AI deployment for ecommerce brands.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory helps Shopify and DTC teams turn AI from scattered experiments into deployed workflows across marketing, CX, merchandising, analytics, and operations.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/ecommerce-ai-deployment-audit"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Book a deployment audit
              </a>
              <a
                href="#use-cases"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                See use cases
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/10 py-5">
              {['Shopify stack', 'Human review', 'Launch runbooks'].map((item) => (
                <div key={item}>
                  <p className="font-microgramma text-[0.65rem] uppercase text-slate-500">Built for</p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <DeploymentConsole />
        </div>
      </section>

      <section id="fit" className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">The buyer</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              Built for the person who has to make AI useful after the demo.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'You own AI deployment but do not want another generic strategy deck.',
              'Your team already runs Shopify, Klaviyo, CX, ads, analytics, and ops tools.',
              'Leadership wants ROI, but the use cases still need data access, review loops, and owners.',
              'You need a senior operator to pressure-test vendors, pilots, architecture, and rollout plans.',
            ].map((copy) => (
              <div key={copy} className="rounded-lg border border-white/10 bg-[#081115] p-5 text-sm leading-7 text-slate-300">
                {copy}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="font-microgramma text-xs uppercase text-cyan-200">Deployment audit</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Leave the first engagement with a pilot your team can actually run.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The audit is designed for AI deployment leads who need to sort useful workflows from noise, align leadership, and avoid buying tools before the operating model is clear.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Request the audit
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {auditDeliverables.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Deployable use cases</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Practical AI systems for the places ecommerce teams feel the drag.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="bg-[#05070a] p-7 sm:p-8">
                <p className="font-microgramma text-xs uppercase text-amber-200">{useCase.area}</p>
                <h3 className="mt-5 text-2xl font-semibold text-white">{useCase.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{useCase.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-microgramma text-xs uppercase text-amber-200">Readiness filter</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                The best AI deployment starts by saying no to weak pilots.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The goal is not to make everything autonomous. The goal is to choose a workflow where AI can create measurable leverage without putting customers, margin, or brand trust at risk.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {readinessSignals.map((group) => (
                <article key={group.label} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                  <h3 className="text-2xl font-semibold text-white">{group.label}</h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
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
        </div>
      </section>

      <section id="programs" className="bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-microgramma text-xs uppercase text-amber-200">How engagements work</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Start with the smallest path to production evidence.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                Each engagement is designed for deployment leads who need enough strategy to choose well and enough implementation discipline to ship safely.
              </p>
            </div>

            <div className="space-y-4">
              {programs.map((program) => (
                <article key={program.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-microgramma text-xs uppercase text-cyan-200">{program.timing}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{program.name}</h3>
                    </div>
                    <p className="max-w-sm text-sm leading-6 text-slate-400">{program.bestFor}</p>
                  </div>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {program.deliverables.map((item) => (
                      <div key={item} className="rounded-lg border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-slate-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="font-microgramma text-xs uppercase text-cyan-200">Commerce stack aware</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                AI that works where your team already works.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The best deployment is usually not a new AI platform. It is a controlled workflow that connects the tools your team already trusts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stack.map((tool) => (
                <div key={tool} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">High-intent deployment lanes</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Focused pages for the workflows buyers are already searching for.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-200/50 hover:bg-white/[0.06]"
              >
                <h3 className="text-xl font-semibold text-white">{page.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{page.copy}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200">View page</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Deployment standards</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The operating rules that keep AI useful after launch.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deploymentPrinciples.map((principle) => (
              <article key={principle.label} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-xl font-semibold text-white">{principle.label}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-winter" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Why Winter</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The gap between AI tools and ecommerce outcomes is deployment leadership.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-white/10">
            <div className="grid border-b border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 md:grid-cols-[0.8fr_1.1fr_1.1fr]">
              <span>Alternative</span>
              <span className="hidden md:block">Where it breaks</span>
              <span className="hidden md:block">Winter Advisory</span>
            </div>
            {comparisons.map((row) => (
              <article key={row.option} className="grid gap-4 border-b border-white/10 bg-[#05070a] p-5 last:border-b-0 md:grid-cols-[0.8fr_1.1fr_1.1fr]">
                <h3 className="text-lg font-semibold text-white">{row.option}</h3>
                <p className="text-sm leading-7 text-slate-400">{row.gap}</p>
                <p className="text-sm leading-7 text-cyan-100">{row.winter}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Questions deployment leads ask before bringing in help.
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
            <p className="font-microgramma text-xs uppercase text-cyan-200">Start here</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the workflow you want in production.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share your ecommerce stack, the workflow you want to deploy, and what would make the pilot worth expanding.
            </p>
            <div className="mt-8 rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-5 text-sm leading-7 text-amber-50">
              Best fit: ecommerce brands with a working commerce stack, recurring operational drag, and a named owner for AI deployment.
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">A concise note is enough. The extra fields make the first conversation useful.</p>
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
