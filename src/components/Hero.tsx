"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden pb-32 sm:pb-20">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1d4ed8] to-[#93c5fd] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-32 sm:pt-40 lg:pt-48 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none lg:flex lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:flex-1"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-5xl xl:text-6xl">
              Sales, GTM, and <span className="whitespace-nowrap">Product Solutions</span>{' '}<br />
              <span className="text-blue-400">for Your Business</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Winter Advisory empowers organizations to overcome complex challenges and achieve sustainable growth through operational efficiencies and innovative strategies.
            </p>
            <div className="mt-10 flex">
              <div className="flex-1"></div>
              <a
                href="#contact"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Schedule a Consultation
              </a>
              <div className="flex-1"></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 sm:mt-24 lg:mt-0 lg:flex-1"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/1.JPG"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1d4ed8] to-[#93c5fd] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
} 