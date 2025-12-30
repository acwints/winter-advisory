"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!mounted) return

    e.preventDefault()
    const element = document.querySelector('#contact')
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900/80 backdrop-blur-sm'
    } border-b border-gray-800`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
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
        </div>
        <div>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all hover:scale-105 uppercase tracking-wider font-microgramma"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
