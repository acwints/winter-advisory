import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
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
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Contact
              </Link>
              <Link
                href="#intake"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
              >
                Try the intake terminal
              </Link>
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

      {/* Intake terminal */}
      <section id="intake" className="relative scroll-mt-24 border-t border-white/10 px-6 py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.12),transparent_34%),linear-gradient(135deg,#05070a_0%,#091111_52%,#0e0f14_100%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Intake terminal</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Skip the discovery call
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              The terminal answers service, pricing, and fit questions, then drafts your
              inquiry for review — no meeting required.
            </p>
          </div>
          <div className="mt-10">
            <TerminalInterface />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 border-t border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Tell us what you are deploying
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Share the workflow, stack, and timeline and you will get a scoped
              recommendation back — not a sales sequence. Prefer email?{' '}
              <a
                href="mailto:andrew@winteradvisory.llc"
                className="font-semibold text-cyan-100 transition hover:text-white"
              >
                andrew@winteradvisory.llc
              </a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
