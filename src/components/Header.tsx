import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8" aria-label="Global">
        <Link href="/" className="-m-1.5 p-1.5">
          <Image
            src="/images/logo.png"
            alt="Winter Advisory"
            width={800}
            height={200}
            priority
            className="h-16 w-auto"
          />
        </Link>
      </nav>
    </header>
  )
}
