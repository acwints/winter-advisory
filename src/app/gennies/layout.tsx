import type { ReactNode } from 'react'
import type { Viewport } from 'next'
import Link from 'next/link'

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5, userScalable: true }

export default function GenniesLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#faf7ef] px-6 py-16 text-[#10294a] sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/gennies/support" className="font-serif text-2xl">Gennies Nation</Link>
        <nav aria-label="Gennies Nation" className="mb-12 mt-6 flex gap-6 text-sm underline underline-offset-4">
          <Link className="py-3" href="/gennies/support">Support</Link>
          <Link className="py-3" href="/gennies/privacy">Privacy</Link>
        </nav>
        <article className="space-y-8 text-base leading-8 [&_h1]:font-serif [&_h1]:text-4xl [&_h1]:leading-tight [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-4">{children}</article>
      </div>
    </main>
  )
}
