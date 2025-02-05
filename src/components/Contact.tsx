"use client"

import { motion } from 'framer-motion'
import type { FC } from 'react'

export const Contact: FC = () => {
  return (
    <div id="contact" className="bg-gray-900/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Contact
          </h2>
          <p className="mt-8 text-lg leading-8 text-gray-300">
            Ready to transform your business? Get in touch to discuss how we can help your organization grow.
          </p>
          <p className="mt-8 text-lg leading-8 text-gray-300">
              Email me directly at{' '}
              <a
                href="mailto:andrew@winteradvisory.llc"
                className="font-semibold text-blue-400 hover:text-blue-300"
              >
                andrew@winteradvisory.llc
              </a>
            </p>
        </motion.div>
      </div>
    </div>
  )
} 