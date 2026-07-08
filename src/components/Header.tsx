import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav
          className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-[#05070a]/78 px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-6"
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

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-white sm:px-5 sm:text-sm"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
