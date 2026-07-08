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
    'AI deployment advisory — workflow audits, controlled pilots, and fractional deployment leadership for teams putting AI into production.',
  url: 'https://winteradvisory.llc',
  areaServed: 'Worldwide',
  serviceType: 'AI deployment consulting',
}

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
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">
              AI Forward Deployment
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              AI is coming. We can help.
            </h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-slate-300">
              Winter Advisory helps teams take AI from demo to production — auditing the
              workflows worth automating, running controlled pilots, and scaling only
              the deployments that produce evidence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Contact
              </Link>
              <a
                href="#chat"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Chat */}
      <section id="chat" className="relative scroll-mt-24 border-t border-white/10 px-6 py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.12),transparent_34%),linear-gradient(135deg,#05070a_0%,#091111_52%,#0e0f14_100%)]" />
        <div className="mx-auto max-w-7xl">
          <TerminalInterface />
        </div>
      </section>

      <Footer />
    </main>
  )
}
