import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/resources'

export const metadata: Metadata = {
  title: 'Ecommerce AI Resources | Winter Advisory',
  description: 'A small set of practical Winter Advisory resources for ecommerce teams evaluating AI use cases, readiness, and pilot ROI.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Resources | Winter Advisory',
    description: 'Use cases, a readiness scorecard, and an ROI calculator for ecommerce AI deployment leads.',
    url,
    type: 'website',
  },
}

const resources = [
  {
    type: 'Use cases',
    title: 'Ecommerce AI use cases',
    href: '/ecommerce-ai-use-cases',
    copy: 'A practical list of AI workflows across lifecycle, CX, merchandising, analytics, and operations.',
  },
  {
    type: 'Readiness',
    title: 'AI deployment scorecard',
    href: '/ai-deployment-scorecard',
    copy: 'A quick way to tell whether a workflow is ready for a controlled pilot.',
  },
  {
    type: 'Business case',
    title: 'Ecommerce AI ROI calculator',
    href: '/ecommerce-ai-roi-calculator',
    copy: 'Estimate whether the economics justify a pilot before buying tools or assigning build time.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Ecommerce AI Resources',
  url,
  description: 'A concise resource hub for ecommerce AI use cases, readiness scoring, and ROI planning.',
  hasPart: resources.map((item) => ({
    '@type': 'WebPage',
    name: item.title,
    url: `https://winteradvisory.llc${item.href}`,
    description: item.copy,
  })),
}

export default function ResourcesPage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">Resources</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Simple tools for choosing a better AI pilot.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            No resource library sprawl. Just the pieces that help an ecommerce team decide what to test and whether it is ready.
          </p>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              className="rounded-lg border border-white/10 bg-[#081115] p-6 transition hover:border-cyan-200/50 hover:bg-white/[0.06]"
            >
              <p className="font-microgramma text-xs uppercase text-cyan-200">{resource.type}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{resource.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{resource.copy}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200">Open</span>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Use this with a real workflow</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the use case you want to pressure-test.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory can help decide whether it is worth an audit, a pilot sprint, or a no-build decision.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention the workflow you are evaluating.</p>
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
