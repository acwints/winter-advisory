"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Team() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      
      <div className="pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-32 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:items-start"
          >
            {/* Image Section - Now comes first on mobile/tablet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start h-full lg:col-span-2 order-1 lg:order-2"
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

            {/* About Section - Comes second on mobile/tablet */}
            <div className="flex flex-col gap-6 lg:col-span-3 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col w-full"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white text-center">Andrew Winter</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  Andrew is the Founder and sole Partner at Winter Advisory, a boutique consulting firm that helps all types of businesses, from startups to enterprises to investment firms, scale up their operations in the age of AI. He's also currently a Venture Partner at <a href="https://mbaventures.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">MBA Ventures</a> and the Co-Founder & CTO at <a href="https://banteegolf.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Bantee</a>, aka the Strava for golf. His experience spans venture capital, growth strategy, and product development across companies like <a href="https://classpass.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">ClassPass</a>, <a href="https://immeasurable.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Immeasurable</a>, and <a href="https://gateway.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">GatewayX</a>. As a self-taught developer, a huge data nerd, and an MBA candidate at Berkeley Haas, he brings both technical expertise and business acumen to every project.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-left">
                  Beyond his professional work, Andrew is an avid skier and golfer, finding inspiration in pushing boundaries and tackling difficult challenges. His wide-ranging experience is difficult to put in a single box, let alone on a resume 😉, but Andrew is a builder at the core who loves to solve complex problems with ambitious teams.
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
                    src="/images/george.gif"
                    alt="George Costanza from Seinfeld"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 