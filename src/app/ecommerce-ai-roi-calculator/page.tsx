import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RoiCalculator } from '@/components/RoiCalculator'

const url = 'https://winteradvisory.llc/ecommerce-ai-roi-calculator'

export const metadata: Metadata = {
  title: 'Ecommerce AI ROI Calculator | Winter Advisory',
  description: 'Estimate whether an ecommerce AI pilot is worth testing across operator time saved, revenue lift, support savings, pilot cost, ROI, and payback.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI ROI Calculator | Winter Advisory',
    description: 'A practical AI pilot ROI calculator for ecommerce deployment leads building the business case for controlled workflow automation.',
    url,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ecommerce AI ROI Calculator',
  url,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'An ecommerce AI ROI calculator estimating monthly benefit, net monthly impact, ROI, and payback period for AI workflow pilots.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Winter Advisory',
    url: 'https://winteradvisory.llc',
  },
}

export default function EcommerceAiRoiCalculatorPage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">Ecommerce AI ROI calculator</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Estimate whether an AI pilot is worth a controlled test.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Model the business case across operator time saved, revenue or conversion lift, support work avoided, and monthly pilot cost before committing implementation budget.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RoiCalculator />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">How to use the estimate</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              ROI is a filter, not a promise.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'High ROI',
                copy: 'Move into a pilot brief and define controls, baseline, owner, and launch window.',
              },
              {
                title: 'Unclear ROI',
                copy: 'Tighten the workflow and measurement before buying tools or assigning implementation work.',
              },
              {
                title: 'Low ROI',
                copy: 'Do not force AI into the workflow. Re-rank use cases and look for a better operating constraint.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Pressure-test the business case</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the estimate and the workflow.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              If the economics look promising, Winter Advisory can help turn the estimate into a scoped pilot with owner, controls, KPI, and rollout plan.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Use Discuss this estimate above to carry the ROI summary into the workflow field automatically.</p>
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
