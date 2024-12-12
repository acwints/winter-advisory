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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-32 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:items-start"
          >

            {/* About Section - Takes up 3 columns */}
            <div className="flex flex-col gap-6 lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col w-full"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white text-center">Andrew Winter</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  With over a decade of experience in business strategy and digital transformation, Andrew brings a unique perspective to every client engagement. As a former Director of Sales at Snowflake and early employee at several successful startups, he has helped companies scale from seed stage through IPO. His deep expertise spans sales acceleration, revenue operations, and AI-driven automation.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  Beyond his professional expertise, Andrew is an avid backcountry skier and mountaineer, finding inspiration in pushing boundaries and tackling ambitious challenges. He brings this same spirit of calculated risk-taking and relentless drive to his consulting work. By combining technical knowledge with authentic relationship building, Andrew helps clients transform their businesses through innovative solutions and data-driven strategies.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  In other words...
                </p>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-6 relative aspect-[16/9] w-full max-w-[500px] overflow-hidden rounded-lg mx-auto border-2 border-white/50"
                >
                  <Image
                    src="https://media1.tenor.com/m/EOuS8MPVU1UAAAAC/seinfeld-george.gif"
                    alt="George Costanza from Seinfeld"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>

             {/* Image Section - Takes up 2 columns */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="flex items-center justify-start h-full lg:col-span-2"
             >
              <div className="relative w-fit">
                <Image
                  src="/images/ski.webp"
                  alt="Team member skiing"
                  width={300}
                  height={600}
                  className="aspect-[1/2] rounded-2xl object-cover border-2 border-white/50"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 