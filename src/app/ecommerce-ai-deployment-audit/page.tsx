import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ecommerce-ai-deployment-audit'

export const metadata: Metadata = {
  title: 'Ecommerce AI Deployment Audit | Winter Advisory',
  description: 'A focused ecommerce AI deployment audit for Shopify and DTC teams that need a ranked pilot, workflow map, control plan, and rollout recommendation.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Deployment Audit | Winter Advisory',
    description: 'Turn scattered AI ideas into a practical ecommerce pilot recommendation with owner, KPI, stack requirements, controls, and rollout path.',
    url,
    type: 'website',
  },
}

const outcomes = [
  {
    title: 'Ranked pilot recommendation',
    copy: 'A clear first workflow to test, with the business outcome, owner, expected leverage, complexity, and risk profile spelled out.',
  },
  {
    title: 'Commerce stack and data map',
    copy: 'The Shopify, Klaviyo, CX, analytics, subscription, returns, and ops systems the workflow has to read from or write back to.',
  },
  {
    title: 'Control and QA plan',
    copy: 'Human review points, source-of-truth rules, escalation paths, rollback triggers, and the output checks needed before launch.',
  },
  {
    title: 'Executive pilot brief',
    copy: 'A concise decision memo leadership can use to approve budget, assign ownership, and decide whether to build, buy, or defer.',
  },
]

const auditFlow = [
  {
    step: '01',
    title: 'Workflow inventory',
    copy: 'Capture the recurring work across lifecycle, CX, merchandising, analytics, and operations where AI may create leverage.',
  },
  {
    step: '02',
    title: 'Pilot scoring',
    copy: 'Score candidates by impact, readiness, data access, review burden, customer risk, and ability to measure a baseline.',
  },
  {
    step: '03',
    title: 'Deployment design',
    copy: 'Shape the best candidate into a pilot with owner, system touchpoints, human-in-loop controls, KPI, and rollout sequence.',
  },
  {
    step: '04',
    title: 'Decision handoff',
    copy: 'Leave with a recommendation for diagnostic, pilot sprint, internal build, vendor evaluation, or no-build decision.',
  },
]

const fitSignals = [
  'You run Shopify, Klaviyo, Gorgias, Zendesk, Recharge, analytics, or similar ecommerce systems.',
  'AI ideas already exist, but no one has translated them into owned workflows and measurable pilots.',
  'Leadership wants a business case before approving tools, agency work, or internal engineering time.',
  'The team needs approval gates because customer experience, brand voice, margin, or finance workflows are in scope.',
  'You need an outside deployment lead who can evaluate vendors without being vendor-led.',
  'You want a practical launch path in days or weeks, not a broad AI transformation program.',
]

const notFit = [
  'You want a keynote, workshop, or trend briefing without an implementation decision attached.',
  'There is no internal owner who can approve the workflow or participate in the audit.',
  'The target workflow cannot be measured against speed, cost, quality, revenue, margin, or support outcomes.',
]

const faqs = [
  {
    question: 'How long does the audit take?',
    answer: 'The default audit is designed for about one week when owner interviews and system context are available. More complex multi-brand or multi-region teams may need a longer diagnostic.',
  },
  {
    question: 'Does the audit include implementation?',
    answer: 'The audit produces the implementation recommendation. If the first pilot should move forward, Winter Advisory can support a pilot sprint, vendor evaluation, architecture review, or rollout advisory.',
  },
  {
    question: 'What do you need from our team?',
    answer: 'A deployment owner, access to relevant workflow context, examples of current work, performance baselines where available, and clarity on systems in scope.',
  },
  {
    question: 'Is this only for Shopify Plus brands?',
    answer: 'No. The work is strongest for Shopify and DTC teams, but the same audit structure applies to ecommerce brands with comparable lifecycle, CX, analytics, and operations systems.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Ecommerce AI Deployment Audit',
      url,
      provider: {
        '@type': 'ProfessionalService',
        name: 'Winter Advisory',
        url: 'https://winteradvisory.llc',
      },
      areaServed: 'United States',
      serviceType: 'Ecommerce AI deployment audit',
      description: 'A focused audit for ecommerce teams that need a ranked AI pilot recommendation, stack map, control plan, and rollout brief.',
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

export default function EcommerceAiDeploymentAuditPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="relative px-6 pb-16 pt-36 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#05070a_0%,#0d1b1e_48%,#111318_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Ecommerce AI deployment audit</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Turn AI ideas into one pilot your ecommerce team can actually ship.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              A focused audit for Shopify and DTC teams that need to choose the right AI workflow, define the controls, and leave with a launchable pilot recommendation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Request the audit
              </a>
              <a
                href="/ecommerce-ai-audit-sample-deliverables"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                View sample deliverables
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-[#071014] p-6 shadow-2xl shadow-black/30">
            <p className="font-microgramma text-xs uppercase text-amber-200">Typical output</p>
            <div className="mt-6 space-y-4">
              {['1 week diagnostic', '1 ranked pilot', '4 deployment artifacts', 'Build / buy / defer decision'].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <a
              href="/ecommerce-ai-audit-sample-deliverables"
              className="mt-6 inline-flex text-sm font-semibold text-cyan-200 transition hover:text-white"
            >
              Preview the artifacts
            </a>
          </aside>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Audit deliverables</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Leave with the artifacts a deployment lead needs to get budget and move.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-2xl font-semibold text-white">{outcome.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{outcome.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Audit flow</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Structured enough for executives. Practical enough for operators.
            </h2>
          </div>
          <div className="space-y-4">
            {auditFlow.map((item) => (
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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Strong fit</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Built for teams with real workflows, real tools, and a real owner.
            </h2>
            <div className="mt-8 grid gap-3">
              {fitSignals.map((signal) => (
                <div key={signal} className="rounded-lg border border-white/10 bg-[#081115] p-4 text-sm leading-7 text-slate-300">
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Not the right fit</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The audit is for deployment decisions, not AI theater.
            </h2>
            <div className="mt-8 grid gap-3">
              {notFit.map((signal) => (
                <div key={signal} className="rounded-lg border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-7 text-amber-50">
                  {signal}
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
              What buyers usually need to know first.
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
            <p className="font-microgramma text-xs uppercase text-amber-200">Request the audit</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the workflow, stack, and business pressure.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share what AI should help your ecommerce team do, the systems involved, and what would make the first pilot worth expanding.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">A concise workflow note is enough. The extra fields make the first conversation useful.</p>
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
