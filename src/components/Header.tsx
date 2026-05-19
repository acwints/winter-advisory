import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: 'Fit', href: '/#fit' },
  { label: 'Audit', href: '/#audit' },
  { label: 'Use cases', href: '/#use-cases' },
  { label: 'Programs', href: '/#programs' },
  { label: 'FAQ', href: '/#faq' },
]

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav
          className="flex items-center justify-between rounded-full border border-white/10 bg-[#05070a]/78 px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-5"
          aria-label="Global"
        >
          <Link href="/" className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Winter Advisory home</span>
            <Image
              src="/images/logo.png"
              alt="Winter Advisory"
              width={820}
              height={200}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="/ecommerce-ai-deployment-audit"
            className="rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-100 hover:bg-cyan-100 hover:text-slate-950"
          >
            Audit
          </a>
        </nav>

        <div className="mt-2 flex justify-center gap-2 md:hidden" aria-label="Section navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-[#05070a]/70 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur transition hover:border-cyan-200/50 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
