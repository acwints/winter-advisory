import type { ReactNode } from 'react'
import type { Viewport } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function SixAMLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100">
      <Header />
      <main id="sixam-content" className="mx-auto max-w-3xl px-6 pb-20 pt-32 sm:pt-40">
        <p className="font-microgramma text-sm uppercase tracking-wide text-cyan-200">6AM · Winter Advisory</p>
        <nav aria-label="6AM" className="mb-10 mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link className="py-2 text-cyan-100 underline underline-offset-4 hover:text-white" href="/6am/support">Support</Link>
          <Link className="py-2 text-cyan-100 underline underline-offset-4 hover:text-white" href="/6am/privacy">Privacy</Link>
          <Link className="py-2 text-cyan-100 underline underline-offset-4 hover:text-white" href="/6am/terms">Terms</Link>
        </nav>
        <article className="space-y-8 text-base leading-8 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_a]:text-cyan-100 [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </article>
        <p className="mt-12 border-t border-white/10 pt-8 text-sm leading-7 text-slate-300">
          Questions? <a className="break-words text-cyan-100 underline underline-offset-4" href="mailto:andrew@winteradvisory.llc?subject=6AM%20support">andrew@winteradvisory.llc</a>
        </p>
      </main>
      <Footer />
    </div>
  )
}
