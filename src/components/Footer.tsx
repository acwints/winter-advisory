"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const navigation = {
  social: [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('success')
    setEmail('')
  }

  if (!mounted) {
    return null
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Newsletter Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Stay in the Loop
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Subscribe to our newsletter for expert insights on business strategy and innovation.
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex max-w-md mx-auto gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-full bg-gray-800/50 px-4 py-3 text-white placeholder:text-gray-500 shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </div>
              {status === 'success' && (
                <p className="mt-4 text-sm text-blue-400">
                  Thanks for subscribing! We'll be in touch soon.
                </p>
              )}
            </form>
          </div>

          {/* Social Links */}
          <div className="mt-16 flex justify-center space-x-8">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-16 border-t border-gray-800 pt-8">
            <p className="text-center text-sm leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Winter Advisory. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 