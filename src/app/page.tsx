import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const proofSlots = [
  {
    name: 'Approved client name',
    label: 'Enterprise AI roadmap',
    metric: '90 days',
    detail: 'Executive strategy, workflow inventory, and production pilot plan for a cross-functional team.',
  },
  {
    name: 'Approved client name',
    label: 'Automation portfolio',
    metric: '34 flows',
    detail: 'Prioritized operational automations with risk controls, ownership, and measurable handoff paths.',
  },
  {
    name: 'Approved project name',
    label: 'Applied AI launch',
    metric: 'v1 shipped',
    detail: 'Prototype-to-production advisory across model selection, UX, evaluation, and deployment readiness.',
  },
]

const services = [
  {
    eyebrow: '01',
    title: 'AI strategy that survives contact with operations',
    copy: 'Map where AI can actually move margin, speed, quality, or leverage. Leave with a ranked portfolio, decision rules, and a practical path to execution.',
  },
  {
    eyebrow: '02',
    title: 'Workflow automation with executive-grade controls',
    copy: 'Design agents, automations, and internal tools around real handoffs, failure modes, and business owners instead of novelty demos.',
  },
  {
    eyebrow: '03',
    title: 'Implementation advisory for teams building fast',
    copy: 'Move from ambiguous idea to shippable system with architecture guidance, evaluation loops, vendor selection, and launch discipline.',
  },
  {
    eyebrow: '04',
    title: 'Operator enablement for leaders and builders',
    copy: 'Equip teams to use AI with taste: better prompts, sharper review loops, measurable adoption, and a shared language for risk.',
  },
]

const process = [
  {
    step: 'Diagnose',
    title: 'Find the leverage',
    copy: 'Interview operators, inspect workflows, and identify where intelligence, judgment, or repetition is constraining the business.',
  },
  {
    step: 'Design',
    title: 'Shape the system',
    copy: 'Define the workflow, data boundaries, model choices, evaluation criteria, owner roles, and human review loops.',
  },
  {
    step: 'Deploy',
    title: 'Make it real',
    copy: 'Prototype, harden, measure, and hand off with enough documentation and operating rhythm for the team to keep improving it.',
  },
]

const telemetry = [
  ['Workflow readiness', '86%'],
  ['Risk controls mapped', '14'],
  ['Pilot backlog', '12'],
  ['Exec decisions pending', '03'],
]

function CommandCenter() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute inset-4 rounded-[2rem] border border-cyan-300/10 bg-cyan-300/5 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#071014]/90 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-microgramma text-[0.62rem] uppercase text-cyan-200">Winter Advisory OS</p>
            <p className="mt-1 text-sm text-slate-400">Applied AI operating picture</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            Live advisory
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {telemetry.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="mt-3 font-microgramma text-2xl text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 px-4 pb-4">
          <div className="rounded-2xl border border-amber-200/20 bg-amber-200/[0.06] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-amber-100">Strategy artifact</p>
              <span className="rounded-full bg-amber-200/10 px-2.5 py-1 text-[0.68rem] uppercase text-amber-100">Board ready</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 rounded-full bg-amber-100/70" />
              <div className="h-2 w-4/5 rounded-full bg-amber-100/35" />
              <div className="h-2 w-2/3 rounded-full bg-amber-100/20" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Risk checks</p>
              <div className="mt-4 space-y-3">
                {['Data boundary', 'Human review', 'Evaluation loop'].map((item) => (
                  <div key={item} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{item}</span>
                    <span className="text-cyan-200">mapped</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/[0.06] p-4">
              <p className="text-sm font-semibold text-white">Next move</p>
              <p className="mt-3 text-3xl font-semibold text-cyan-100">Pilot sprint</p>
              <p className="mt-2 text-sm text-slate-400">Two weeks to working evidence.</p>
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
      <Header />

      <section className="relative px-6 pb-24 pt-36 sm:pt-40 lg:px-8 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#05070a_0%,#0d1b1e_42%,#130f18_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
        <div className="absolute left-1/2 top-28 -z-10 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full border border-white/5 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.16),rgba(244,114,182,0.06)_35%,transparent_66%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.86fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">AI advisory for serious operators</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Turn AI ambition into operating advantage.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory helps leadership teams identify the right AI bets, build the systems that matter, and ship them with the controls required for real work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Start a conversation
              </a>
              <a
                href="#proof"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                See the advisory model
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/10 py-5">
              {['Strategy', 'Systems', 'Enablement'].map((item) => (
                <div key={item}>
                  <p className="font-microgramma text-[0.65rem] uppercase text-slate-500">Focus</p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <CommandCenter />
        </div>
      </section>

      <section id="proof" className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-microgramma text-xs uppercase text-amber-200">Proof-ready credibility</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
                Built to showcase approved client results when they are ready.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              These slots are intentionally neutral placeholders: polished enough for the design, honest enough for launch, and easy to replace with approved names.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {proofSlots.map((slot) => (
              <article key={slot.label} className="rounded-3xl border border-white/10 bg-[#081115] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{slot.name}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{slot.label}</h3>
                  </div>
                  <span className="font-microgramma text-lg text-cyan-200">{slot.metric}</span>
                </div>
                <p className="mt-8 text-sm leading-6 text-slate-400">{slot.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Engagements</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Advisory for the work between strategy decks and production systems.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="bg-[#05070a] p-7 sm:p-8">
                <p className="font-microgramma text-xs text-amber-200">{service.eyebrow}</p>
                <h3 className="mt-5 text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#071014] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-microgramma text-xs uppercase text-amber-200">Operating model</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Diagnose the business. Design the system. Deploy the advantage.
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-400">
                The work is structured enough for executive confidence and flexible enough for the messy reality of teams, tools, data, and incentives.
              </p>
            </div>

            <div className="space-y-4">
              {process.map((item) => (
                <article key={item.step} className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-[9rem_1fr]">
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

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Start here</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the hard AI questions.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share what you are trying to change, where the organization is stuck, and what would make the next quarter meaningfully different.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an advisory conversation</h3>
            <p className="mt-2 text-sm text-slate-400">A concise note is perfect. The form still routes to the existing Winter Advisory intake sheet.</p>
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
