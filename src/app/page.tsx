import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LoadingScreen } from '@/components/LoadingScreen'
import { TerminalInterface } from '@/components/TerminalInterface'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Winter Advisory',
  description:
    'AI deployment advisory for Shopify and DTC ecommerce teams across lifecycle marketing, CX, merchandising, analytics, and operations.',
  url: 'https://winteradvisory.llc',
  areaServed: 'Worldwide',
  serviceType: 'AI deployment consulting',
}

const services = [
  {
    name: 'AI deployment audit',
    price: '$2.5k–$5k',
    copy: 'Map your workflows, find the highest-ROI AI deployments in your stack, and leave with a scoped, sequenced plan.',
    href: '/ecommerce-ai-deployment-audit',
  },
  {
    name: 'Pilot sprint support',
    price: '$7.5k–$15k',
    copy: 'Ship one controlled pilot into production — success metrics, guardrails, and evidence your team can trust.',
    href: '/ecommerce-ai-consultant',
  },
  {
    name: 'Deployment lead advisory',
    price: '$3k–$8k/mo',
    copy: 'A fractional AI deployment lead who owns the roadmap, vendor calls, and operating controls while you scale.',
    href: '/ecommerce-ai-consultant',
  },
  {
    name: 'Vendor & build evaluation',
    price: 'Scoped in engagement',
    copy: 'Buy, build, or skip — a hands-on evaluation of the tools competing for your budget, run inside an audit or sprint.',
    href: '/ecommerce-ai-use-cases',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Audit the stack',
    copy: 'Inventory the workflows across lifecycle, CX, merchandising, analytics, and ops. Rank them by ROI and deployment risk.',
  },
  {
    step: '02',
    title: 'Pilot with controls',
    copy: 'Take the top candidate to production as a controlled pilot with explicit success metrics and human-in-the-loop guardrails.',
  },
  {
    step: '03',
    title: 'Scale what works',
    copy: 'Expand spend, scope, and autonomy only where the pilot produced evidence. Kill what did not earn its keep.',
  },
]

const resources = [
  {
    name: 'AI deployment scorecard',
    copy: 'Grade how ready your team, data, and workflows are for a production AI deployment.',
    href: '/ai-deployment-scorecard',
  },
  {
    name: 'Ecommerce AI ROI calculator',
    copy: 'Estimate what an AI workflow is worth before you commit budget to it.',
    href: '/ecommerce-ai-roi-calculator',
  },
  {
    name: 'Use-case library',
    copy: 'Where AI is actually working in ecommerce right now — and where it keeps failing.',
    href: '/ecommerce-ai-use-cases',
  },
]

const deployStack = ['Shopify', 'Klaviyo', 'Gorgias', 'GA4', 'Recharge', 'Postscript']

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen />
      <Header />

      {/* Hero */}
      <section className="relative px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(103,232,249,0.1),transparent_38%),linear-gradient(135deg,#05070a_0%,#0d1b1e_52%,#111318_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">
              AI deployment for ecommerce brands
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              AI is coming. Deploy it before your competitors do.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory helps Shopify and DTC teams take AI from demo to production
              across lifecycle marketing, CX, merchandising, analytics, and operations —
              with the controls to survive contact with real customers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#intake"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Start your intake
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                Explore services
              </Link>
            </div>
            <div className="mt-12 max-w-2xl border-y border-white/10 py-5">
              <p className="font-microgramma text-[0.65rem] uppercase text-slate-500">
                Deploys into
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {deployStack.map((tool) => (
                  <li key={tool} className="text-sm font-semibold text-slate-200">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="/images/sentinel-hero.jpg"
              alt="The Winter Advisory sentinel — a frost-covered robot with ice-blue eyes"
              width={880}
              height={1072}
              priority
              className="w-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/55 to-transparent p-5 pt-16">
              <p className="font-microgramma text-[0.66rem] uppercase tracking-widest text-cyan-200">
                AI is coming
              </p>
              <p className="mt-1 text-sm text-slate-300">
                The question is whether it ships under your control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Services</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Four ways to engage, one operating standard
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Every engagement is scoped around production evidence — not decks. Starter
              ranges below are directional; final pricing follows a scope review.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.name}
                className="group flex flex-col rounded-lg border border-white/10 bg-[#081115] p-6 transition hover:border-cyan-200/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <p className="rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {service.price}
                  </p>
                </div>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">{service.copy}</p>
                <Link
                  href={service.href}
                  className="mt-6 text-sm font-semibold text-cyan-100 transition group-hover:text-white"
                >
                  View engagement <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-microgramma text-xs uppercase text-cyan-200">Process</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Evidence before expansion
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The sequence is designed to create controlled production evidence before
                your team expands spend, scope, or autonomy.
              </p>
            </div>
            <ol className="space-y-4">
              {processSteps.map((item) => (
                <li
                  key={item.step}
                  className="flex gap-6 rounded-lg border border-white/10 bg-[#081115] p-6"
                >
                  <span className="font-microgramma text-sm text-cyan-200" aria-hidden="true">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Intake terminal */}
      <section id="intake" className="relative scroll-mt-24 border-y border-white/10 px-6 py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.12),transparent_34%),linear-gradient(135deg,#05070a_0%,#091111_52%,#0e0f14_100%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Intake</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Skip the discovery call
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The terminal answers service, pricing, and fit questions, then drafts your
              inquiry for review — no meeting required. Prefer email?{' '}
              <a
                href="mailto:andrew@winteradvisory.llc"
                className="font-semibold text-cyan-100 transition hover:text-white"
              >
                andrew@winteradvisory.llc
              </a>
            </p>
          </div>
          <div className="mt-10">
            <TerminalInterface />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="scroll-mt-24 px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-microgramma text-xs uppercase text-cyan-200">Resources</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Do the math before the meeting
              </h2>
            </div>
            <Link
              href="/resources"
              className="text-sm font-semibold text-cyan-100 transition hover:text-white"
            >
              All resources <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="rounded-lg border border-white/10 bg-[#081115] p-6 transition hover:border-cyan-200/40 hover:bg-[#0a141a]"
              >
                <h3 className="text-lg font-semibold text-white">{resource.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{resource.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
