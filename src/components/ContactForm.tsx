"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const priorityOptions = [
  'Lifecycle marketing',
  'Customer experience',
  'Merchandising and catalog',
  'Operations and reporting',
  'Not sure yet',
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    role: '',
    commerceStack: '',
    orderVolume: '',
    priority: priorityOptions[0],
    pilotKpi: '',
    timeline: '',
    message: '',
    sourcePath: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    scoreSummary: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    function loadSourceContext() {
      const params = new URLSearchParams(window.location.search)
      const scoreSummary = window.localStorage.getItem('winter-advisory-score-summary') || ''

      setFormData(prev => ({
        ...prev,
        message: scoreSummary || prev.message,
        sourcePath: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer,
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        scoreSummary,
      }))
    }

    loadSourceContext()
    window.addEventListener('winter-advisory-score', loadSourceContext)

    return () => {
      window.removeEventListener('winter-advisory-score', loadSourceContext)
    }
  }, [])

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
      window.localStorage.removeItem('winter-advisory-score-summary')
      setFormData({
        name: '',
        email: '',
        company: '',
        website: '',
        role: '',
        commerceStack: '',
        orderVolume: '',
        priority: priorityOptions[0],
        pilotKpi: '',
        timeline: '',
        message: '',
        sourcePath: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        scoreSummary: '',
      })
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 text-center"
      >
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10">
          <svg className="h-8 w-8 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-white">Audit request received</h3>
        <p className="text-slate-400">I will review the workflow, source context, and scorecard details if included.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="field-input"
            placeholder="Jane Operator"
            disabled={status === 'submitting'}
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="field-input"
            placeholder="jane@brand.com"
            disabled={status === 'submitting'}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="field-input"
            placeholder="Brand name"
            disabled={status === 'submitting'}
          />
        </Field>

        <Field label="Website" htmlFor="website">
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="field-input"
            placeholder="https://brand.com"
            disabled={status === 'submitting'}
          />
        </Field>
      </div>

      <Field label="Deployment priority" htmlFor="priority">
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="field-input appearance-none"
          disabled={status === 'submitting'}
        >
          {priorityOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>

      <Field label="Workflow to deploy" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="field-input resize-none"
          placeholder="What should AI help your team do? Mention the stack, owner, and what would make a pilot worth expanding."
          disabled={status === 'submitting'}
        />
      </Field>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200"
        >
          Something went wrong. Please email andrew@winteradvisory.llc directly.
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-cyan-200 px-6 py-3.5 font-microgramma text-sm uppercase text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Request audit'}
      </button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  )
}
