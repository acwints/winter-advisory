"use client"

import { motion } from 'framer-motion'
import Script from 'next/script'

export function Contact() {
  return (
    <div id="contact" className="bg-gray-900/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-24 lg:items-start">
          {/* Left Column - Text Content */}
          <div className="lg:sticky lg:top-32 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-center">
                Let's Chat
              </h2>
              <p className="mt-8 text-lg leading-8 text-gray-300">
                Book a meeting to discuss how we can help your business grow.
              </p>
            </motion.div>

            <div className="my-16"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 lg:mt-32"
            >
              <h3 className="text-xl font-semibold leading-7 text-blue-400 text-center">Get in Touch</h3>
              <p className="mt-6 text-base leading-7 text-gray-300">
                Prefer to email? Reach out directly via {' '}
                <a
                  href="mailto:andrew@winteradvisory.llc"
                  className="font-semibold text-blue-400 hover:text-blue-300"
                >
                  andrew@winteradvisory.llc
                </a>
              </p>
            </motion.div>
          </div>

          {/* Right Column - Calendly Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 lg:mt-0 h-[800px] lg:h-[1000px] lg:col-span-2"
          >
            <div className="rounded-3xl ring-1 ring-gray-800 lg:rounded-xl bg-gray-900/50 h-full">
              <div className="h-full">
                <div 
                  className="calendly-inline-widget w-full h-full rounded-2xl overflow-hidden" 
                  data-url="https://calendly.com/andrew-c-winter?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=3b82f6"
                ></div>
                <Script src="https://assets.calendly.com/assets/external/widget.js" async />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 