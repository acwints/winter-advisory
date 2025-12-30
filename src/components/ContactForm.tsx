"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">Message Sent</h3>
        <p className="text-gray-400">We'll be in touch soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl bg-gray-800/50 px-4 py-3 text-white placeholder:text-gray-500 ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="Your name"
          disabled={status === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl bg-gray-800/50 px-4 py-3 text-white placeholder:text-gray-500 ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="your@email.com"
          disabled={status === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-xl bg-gray-800/50 px-4 py-3 text-white placeholder:text-gray-500 ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
          placeholder="How can we help?"
          disabled={status === 'submitting'}
        />
      </div>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm"
        >
          Something went wrong. Please try again or email us directly.
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-microgramma"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
