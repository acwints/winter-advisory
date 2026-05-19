import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { DeploymentScorecard } from '@/components/DeploymentScorecard'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/ai-deployment-scorecard'

export const metadata: Metadata = {
  title: 'Ecommerce AI Deployment Scorecard | Winter Advisory',
  description: 'Score whether an ecommerce AI workflow is ready for deployment across owner, workflow clarity, data access, review controls, and measurement.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Deployment Scorecard | Winter Advisory',
    description: 'A practical readiness scorecard for ecommerce AI deployment leads deciding which workflow is ready for a controlled pilot.',
    url,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ecommerce AI Deployment Scorecard',
  url,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'A readiness scorecard for ecommerce AI workflows across ownership, workflow clarity, data access, review controls, and measurement.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Winter Advisory',
    url: 'https://winteradvisory.llc',
  },
}

export default function AiDeploymentScorecardPage() {
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
          <p className="font-microgramma text-xs uppercase text-cyan-200">AI deployment scorecard</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Is this ecommerce AI workflow ready to deploy?
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Score a potential AI pilot across the five things that determine whether it becomes production leverage or another stranded experiment: owner, workflow clarity, data, review, and measurement.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DeploymentScorecard />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">How to use the score</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The score is not a grade. It is a deployment filter.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: '8-10',
                copy: 'Ready for a controlled pilot. The next question is scope, timeline, and launch controls.',
              },
              {
                title: '5-7',
                copy: 'Promising but loose. Tighten ownership, data access, review gates, or measurement before implementation.',
              },
              {
                title: '0-4',
                copy: 'Not ready for build. Start with workflow discovery and stack inventory before tools or automation.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="font-microgramma text-3xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Discuss the result</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the score and the workflow.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              If the score exposed a real deployment question, share the workflow, stack, KPI, and timeline. The response can be specific because the context is specific.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Use Discuss this score above to carry the scorecard result into the workflow field automatically.</p>
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
