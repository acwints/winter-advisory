import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://www.winteradvisory.ai/sixam/privacy'

export const metadata: Metadata = {
  title: '6AM Privacy Policy | Winter Advisory',
  description:
    'How the 6AM iPhone and Apple Watch app handles Apple Health sleep data and alarm information.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: '6AM Privacy Policy | Winter Advisory',
    description:
      'How 6AM handles Apple Health sleep data and Apple Watch alarm information.',
    url,
    type: 'website',
  },
}

const sections = [
  {
    title: 'Health data',
    body: 'With your permission, 6AM reads Sleep Analysis data from Apple Health to calculate and display wake-time trends. This processing happens on your iPhone. 6AM does not write to or modify Apple Health data.',
  },
  {
    title: 'Alarm information',
    body: '6AM stores the next scheduled wake time locally on your Apple Watch so it can recover the alarm state. This information is not sent to Winter Advisory or any third party.',
  },
  {
    title: 'Collection and sharing',
    body: '6AM does not collect personal data, use third-party analytics, show advertising, track you across apps or websites, or send Health data to a server. Winter Advisory does not sell or share data from 6AM.',
  },
  {
    title: 'Your control',
    body: 'You can revoke 6AM’s access to Sleep data at any time in Apple Health settings. Removing the app deletes its locally stored app data in accordance with Apple’s platform behavior.',
  },
]

export default function SixAMPrivacyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <Header />

      <section className="relative px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(103,232,249,0.1),transparent_38%),linear-gradient(135deg,#05070a_0%,#0d1b1e_52%,#111318_100%)]" />
        <div className="mx-auto max-w-4xl">
          <p className="font-microgramma text-xs uppercase text-cyan-200">
            6AM Privacy
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-slate-500">Effective August 31, 2026</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            6AM is designed so your sleep and wake information stays on your
            devices. This policy explains the limited data access the app needs
            to provide its features.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">{section.body}</p>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Questions about this policy can be sent to{' '}
                <a
                  href="mailto:andrew@winteradvisory.llc"
                  className="font-semibold text-cyan-100 transition hover:text-white"
                >
                  andrew@winteradvisory.llc
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-12 border-t border-white/10 pt-8 text-sm text-slate-500">
            Return to{' '}
            <Link
              href="/sixam"
              className="font-semibold text-cyan-100 transition hover:text-white"
            >
              6AM Support
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
