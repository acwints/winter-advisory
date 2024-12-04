"use client"

import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/outline'

const tiers = [
  {
    name: 'Free Consultation',
    id: 'free',
    price: '0',
    description: 'Perfect for understanding your needs and exploring how we can help.',
    features: [
      '45-minute strategic consultation',
      'Initial business assessment',
      'High-level recommendations',
      'No commitment required'
    ],
    cta: 'Book Consultation',
    href: '#contact',
    featured: false,
  },
  {
    name: 'Deep Work',
    id: 'starter',
    price: '1,000',
    description: 'Focused consulting engagement to tackle specific challenges.',
    features: [
      '~5 hours of dedicated consulting',
      'Detailed problem analysis',
      'Strategic recommendations',
      'Implementation guidance',
    ],
    cta: 'Get Started',
    href: '#contact',
    featured: false,
  },
  {
    name: 'Comprehensive',
    id: 'professional',
    price: '10,000',
    description: 'In-depth engagement for significant organizational transformation.',
    features: [
      '~80 hours of consulting expertise',
      'Full strategic assessment',
      'Detailed implementation plan',
      'Regular progress reviews',
      'Priority support'
    ],
    cta: 'Contact Us',
    href: '#contact',
    featured: true,
  },
  {
    name: 'Custom',
    id: 'enterprise',
    price: 'Custom',
    description: 'Tailored solutions for complex organizational needs.',
    features: [
      'Custom scope and timeline',
      'Dedicated consulting team',
      'Enterprise-wide solutions',
      'Ongoing strategic partnership'
    ],
    cta: 'Discuss Options',
    href: '#contact',
    featured: false,
  },
]

export function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect consulting package for your business needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-4"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={`relative flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.featured ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className={`text-lg font-semibold leading-8 ${tier.featured ? 'text-blue-600' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                      Most Popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {tier.price !== 'Custom' && <span className="text-4xl font-bold tracking-tight text-gray-900">$</span>}
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                  {tier.price !== 'Custom' && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">/package</span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                className={`mt-8 block rounded-full px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 