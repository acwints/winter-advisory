"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Team() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      
      <div className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start"
          >
            {/* Image Section - Takes up 1 column */}
            <div className="relative rounded-2xl border-2 border-white/50 p-0">
              <Image
                src="/images/ski.jpg"
                alt="Team member skiing"
                width={800}
                height={1600}
                className="aspect-[1/2] w-full rounded-2xl object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>

            {/* About Section - Takes up 2 columns */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white">Andrew Winter</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  With over a decade of experience in business strategy and digital transformation, our founder brings a unique perspective to every client engagement. Having worked with Fortune 500 companies and innovative startups alike, they understand the diverse challenges businesses face in today's rapidly evolving landscape.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  Beyond their professional expertise, they're an avid skier and outdoor enthusiast, finding inspiration in nature's challenges and bringing that same spirit of adventure and determination to their consulting work. This unique combination of professional excellence and personal passion enables them to build strong, authentic relationships with clients while delivering exceptional results. As George Costanza would say...
                </p>
                <div className="mt-6 relative aspect-[16/9] w-full max-w-[500px] overflow-hidden rounded-lg mx-auto">
                  <Image
                    src="https://media1.tenor.com/m/EOuS8MPVU1UAAAAC/seinfeld-george.gif"
                    alt="George Costanza from Seinfeld"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 