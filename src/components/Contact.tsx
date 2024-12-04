"use client"

import { motion } from 'framer-motion'
import Script from 'next/script'

export function Contact() {
  return (
    <div id="contact" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Schedule a Consultation
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Book a meeting with our consultants to discuss how we can help your business grow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl rounded-3xl ring-1 ring-gray-200"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 p-8 lg:p-12">
            <div className="calendly-inline-widget min-h-[700px]" data-url="https://calendly.com/andrew-c-winter"></div>
            <Script src="https://assets.calendly.com/assets/external/widget.js" async />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <h3 className="text-base font-semibold leading-7 text-blue-600">Get in Touch</h3>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Prefer to email? Reach out to us at{' '}
            <a
              href="mailto:contact@winteradvisory.com"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              contact@winteradvisory.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
} 