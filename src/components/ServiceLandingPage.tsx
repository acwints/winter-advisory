import type { ReactNode } from 'react'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export type ServiceLandingPageContent = {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  proof: string[]
  outcomes: Array<{
    metric: string
    label: string
  }>
  painTitle: string
  pains: Array<{
    title: string
    copy: string
  }>
  deploymentTitle: string
  deploymentSteps: Array<{
    step: string
    title: string
    copy: string
  }>
  deliverables: string[]
  stack: string[]
  faq: Array<{
    question: string
    answer: string
  }>
  jsonLd: Record<string, unknown>
}

export function ServiceLandingPage({ content }: { content: ServiceLandingPageContent }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd) }}
      />
      <Header />

      <section className="relative px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#05070a_0%,#0d1b1e_48%,#111318_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">{content.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              {content.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{content.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                {content.primaryCta}
              </a>
              <a
                href="#deployment"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                {content.secondaryCta}
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl gap-3 border-y border-white/10 py-5 sm:grid-cols-3">
              {content.proof.map((item) => (
                <div key={item}>
                  <p className="font-microgramma text-[0.65rem] uppercase text-slate-500">Built around</p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#071014]/95 p-5 shadow-2xl shadow-black/40">
            <p className="font-microgramma text-xs uppercase text-amber-200">Pilot scorecard</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.outcomes.map((outcome) => (
                <div key={outcome.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-microgramma text-2xl text-white">{outcome.metric}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Why this matters</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">{content.painTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.pains.map((pain) => (
              <article key={pain.title} className="rounded-lg border border-white/10 bg-[#081115] p-6">
                <h3 className="text-xl font-semibold text-white">{pain.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{pain.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="deployment" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-microgramma text-xs uppercase text-cyan-200">Deployment path</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">{content.deploymentTitle}</h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The engagement is designed to create controlled production evidence before the team expands spend, scope, or autonomy.
              </p>
            </div>
            <div className="space-y-4">
              {content.deploymentSteps.map((item) => (
                <article key={item.step} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-[8rem_1fr]">
                  <p className="font-microgramma text-sm uppercase text-cyan-200">{item.step}</p>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Panel title="What you get">
            <div className="grid gap-2 sm:grid-cols-2">
              {content.deliverables.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-[#05070a] px-4 py-3 text-sm leading-6 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Stack-aware from day one">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {content.stack.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-[#05070a] px-4 py-3 text-sm font-medium text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Questions before the first deployment conversation.</h2>
          </div>
          <div className="space-y-3">
            {content.faq.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-white">{faq.question}</summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Start here</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the workflow you want deployed.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share the stack, owner, KPI, and timeline. The first response can be specific because the intake is specific.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Use this form for the highest-signal first conversation.</p>
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

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#081115] p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
