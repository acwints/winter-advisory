import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/contact'

export const metadata: Metadata = {
  title: 'Contact | Winter Advisory',
  description:
    'Tell Winter Advisory what you are deploying — share the workflow, systems, and timeline and get a scoped recommendation back.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Contact | Winter Advisory',
    description:
      'Tell Winter Advisory what you are deploying and get a scoped recommendation back.',
    url,
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <Header />

      <section className="relative px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(103,232,249,0.1),transparent_38%),linear-gradient(135deg,#05070a_0%,#0d1b1e_52%,#111318_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-microgramma text-xs uppercase text-cyan-200">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Tell us what you are deploying
            </h1>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Share the workflow, systems, and timeline and you will get a scoped
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
