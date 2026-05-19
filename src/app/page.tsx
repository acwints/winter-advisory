import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const useCases = [
  {
    title: 'Lifecycle marketing',
    copy: 'Campaign briefs, flow QA, segmentation checks, and launch-ready review loops for Klaviyo teams.',
  },
  {
    title: 'Customer experience',
    copy: 'Ticket routing, macro drafts, customer summaries, and low-risk deflection with agents still in control.',
  },
  {
    title: 'Merchandising',
    copy: 'PDP enrichment, product content QA, catalog gaps, and merchandising insight briefs.',
  },
  {
    title: 'Operations',
    copy: 'Returns triage, vendor updates, reporting narratives, and exception workflows for busy operators.',
  },
]

const services = [
  {
    title: 'AI deployment audit',
    copy: 'Find the first workflow worth testing, map the stack, define controls, and leave with a practical pilot recommendation.',
  },
  {
    title: 'Pilot sprint support',
    copy: 'Shape the brief, evaluate tools, design review gates, and get a narrow workflow into controlled use.',
  },
  {
    title: 'Deployment lead advisory',
    copy: 'Ongoing help for founders or operators coordinating vendors, internal teams, executive updates, and rollout decisions.',
  },
]

const resources = [
  {
    title: 'Ecommerce AI use cases',
    href: '/ecommerce-ai-use-cases',
    copy: 'A practical list of workflows worth evaluating.',
  },
  {
    title: 'AI deployment scorecard',
    href: '/ai-deployment-scorecard',
    copy: 'Check whether a pilot is ready before you build.',
  },
  {
    title: 'AI ROI calculator',
    href: '/ecommerce-ai-roi-calculator',
    copy: 'Estimate the business case for a controlled pilot.',
  },
]

const faqs = [
  {
    question: 'What kind of ecommerce teams is this for?',
    answer: 'Shopify and DTC teams with a real commerce stack, recurring operational drag, and someone who can own an AI pilot.',
  },
  {
    question: 'Do you build or only advise?',
    answer: 'Both can work. The default is deployment leadership: picking the workflow, shaping the pilot, defining controls, evaluating tools, and helping the team launch safely.',
  },
  {
    question: 'What makes this different from an AI strategy project?',
    answer: 'The work is organized around deployed workflows, not broad transformation decks. The output should help a team approve, test, expand, or stop a pilot.',
  },
  {
    question: 'Do you take vendor commissions?',
    answer: 'No. The recommendation should fit the workflow, team, stack, and economics.',
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
      description: 'AI deployment advisory for ecommerce brands running Shopify, Klaviyo, CX, merchandising, analytics, and operations workflows.',
      areaServed: 'United States',
      serviceType: ['Ecommerce AI consulting', 'AI deployment audit', 'AI workflow automation advisory'],
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">AI deployment for ecommerce</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Make AI useful inside the ecommerce work you already run.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Winter Advisory helps Shopify and DTC teams choose the right AI pilot, design the controls, and get a workflow into practical use.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/ecommerce-ai-deployment-audit"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Request an audit
              </a>
              <a
                href="/ecommerce-ai-use-cases"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                See use cases
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-[#071014] p-6 shadow-2xl shadow-black/30">
            <p className="font-microgramma text-xs uppercase text-amber-200">Best fit</p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              <p>Shopify or DTC brand with a working stack.</p>
              <p>A repeated workflow in lifecycle, CX, merchandising, analytics, or ops.</p>
              <p>A named owner who needs a pilot plan, not another AI demo.</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="work" className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">What this is</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Practical AI consulting for operators.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              The job is to decide what should be automated, what needs review, what tools fit, and what evidence proves the pilot is worth expanding.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Use cases</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Start where the work is repeated and measurable.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Resources</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              A few useful tools. Nothing more than needed.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {resources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                className="rounded-lg border border-white/10 bg-[#081115] p-6 transition hover:border-cyan-200/50 hover:bg-white/[0.06]"
              >
                <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{resource.copy}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200">Open</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Questions before reaching out.
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Start here</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the workflow you want to make useful.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share your stack, the work you want AI to help with, and what would make a pilot worth expanding.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">A short, specific note is enough.</p>
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
