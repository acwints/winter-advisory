import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://www.winteradvisory.ai/sixam'

export const metadata: Metadata = {
  title: '6AM Support | Winter Advisory',
  description:
    'Setup help, troubleshooting, and privacy information for the 6AM iPhone and Apple Watch app.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: '6AM Support | Winter Advisory',
    description:
      'Setup help for the private wake-time analytics and Apple Watch wake-notification app.',
    url,
    type: 'website',
  },
}

const supportSections = [
  {
    title: 'Connect Apple Health',
    body: 'Open 6AM on your iPhone, choose Connect Apple Health, and allow read access to Sleep. Your wake-time dashboard will update from qualifying overnight sleep sessions recorded in Apple Health.',
  },
  {
    title: 'Turn on wake taps',
    body: 'On iPhone, tap Turn On Wake Taps and allow notifications, sounds, and Time Sensitive Notifications. 6AM schedules eleven weekday notifications, one per minute from 5:55 through 6:05 a.m.',
  },
  {
    title: 'Receive taps on Apple Watch',
    body: 'Wear your charged, unlocked Watch and keep the paired iPhone locked or asleep. Confirm that the Watch mirrors 6AM notifications from iPhone. Each notification is a one-shot alert with no snooze or Stop action.',
  },
  {
    title: 'If a wake tap does not arrive',
    body: 'Check notification and Time Sensitive settings for 6AM, confirm the Watch is unlocked and connected, and confirm the iPhone is locked or asleep. Apple controls notification forwarding, the precise haptic, and display wake behavior.',
  },
]

export default function SixAMSupportPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <Header />

      <section className="relative px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(103,232,249,0.1),transparent_38%),linear-gradient(135deg,#05070a_0%,#0d1b1e_52%,#111318_100%)]" />
        <div className="mx-auto max-w-4xl">
          <p className="font-microgramma text-xs uppercase text-cyan-200">
            6AM Support
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            A gentle weekday wake sequence with private wake-time analytics
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            6AM pairs eleven one-minute wake notifications from 5:55 through
            6:05 with an iPhone dashboard that summarizes wake times recorded in
            Apple Health. Health data is processed on your devices and is never
            sent to Winter Advisory.
          </p>

          <div className="mt-12 grid gap-5">
            {supportSections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-12 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-semibold text-white">Still need help?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Email{' '}
              <a
                href="mailto:andrew@winteradvisory.llc"
                className="font-semibold text-cyan-100 transition hover:text-white"
              >
                andrew@winteradvisory.llc
              </a>{' '}
              with your iPhone model, Apple Watch model, and OS versions. Do not
              include screenshots or exports containing private Health data.
            </p>
            <p className="mt-5 text-sm text-slate-500">
              Read the{' '}
              <Link
                href="/sixam/privacy"
                className="font-semibold text-cyan-100 transition hover:text-white"
              >
                6AM Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  )
}
