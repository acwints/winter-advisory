"use client"

import { motion } from 'framer-motion'
import { useState, useCallback, useEffect, useMemo } from 'react'

type VideoContent = {
  src: string
  name: string
  title: string
  company: string
  linkedIn: string
  website: string
}

type PlaceholderContent = {
  title: string
  description?: string
}

type Card = {
  type: 'video'
  content: VideoContent
} | {
  type: 'placeholder'
  content: PlaceholderContent
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 640)
  }, [])

  const cards: Card[] = useMemo(() => [
    {
      type: 'video',
      content: {
        src: '/images/andrew_testimonial.mp4',
        name: 'Vernon Foster',
        title: 'Founder / CEO',
        company: 'WebinarRev',
        linkedIn: 'https://www.linkedin.com/in/vernontfoster/',
        website: 'https://webinarrev.co/'
      }
    },
    {
      type: 'placeholder',
      content: {
        title: 'Coming Soon'
      }
    },
    {
      type: 'placeholder',
      content: {
        title: 'Coming Soon'
      }
    }
  ], [])

  const rotateLeft = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }, [cards.length])

  const rotateRight = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }, [cards.length])

  // Add keyboard navigation
  useEffect(() => {
    if (!mounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') rotateLeft()
      if (e.key === 'ArrowRight') rotateRight()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mounted, rotateLeft, rotateRight])

  const getCardStyle = (index: number) => {
    const positions = [
      { // Left position
        transform: `translateX(${isMobile ? '-85%' : '-100%'}) scale(${isMobile ? '0.75' : '0.85'}) translateZ(-400px) rotateY(25deg)`,
        opacity: 0.4,
        zIndex: 1
      },
      { // Center position
        transform: 'translateX(0) scale(1) translateZ(0) rotateY(0deg)',
        opacity: 1,
        zIndex: 2
      },
      { // Right position
        transform: `translateX(${isMobile ? '85%' : '100%'}) scale(${isMobile ? '0.75' : '0.85'}) translateZ(-400px) rotateY(-25deg)`,
        opacity: 0.4,
        zIndex: 1
      }
    ]

    const position = (index - currentIndex + cards.length) % cards.length
    const visualPosition = position > 1 ? position - cards.length : position
    return positions[visualPosition + 1] || positions[1]
  }

  // Add window resize handler
  useEffect(() => {
    if (!mounted) return

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mounted])

  return (
    <div id="testimonials" className="bg-gray-900/30 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            See what our clients say about working with Andrew.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 sm:mt-8"
        >
          {/* Carousel Container */}
          <div className="relative mx-auto max-w-[1200px] h-[500px] sm:h-[640px] perspective-[1200px] overflow-hidden">
            {/* Navigation Buttons */}
            <button
              onClick={rotateLeft}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 text-white/60 hover:text-white hover:bg-white/10 focus:bg-white/10 rounded-full transition-all outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={rotateRight}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 text-white/60 hover:text-white hover:bg-white/10 focus:bg-white/10 rounded-full transition-all outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Cards Container */}
            <div className="absolute inset-0 flex items-center justify-center preserve-3d">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="absolute w-[280px] sm:w-[360px] aspect-[9/16] transition-all duration-700 ease-out will-change-transform"
                  style={{
                    ...getCardStyle(index),
                    transform: `${getCardStyle(index).transform} translateY(${isMobile ? '10%' : '0'})`
                  }}
                >
                  {card.type === 'video' ? (
                    <div className="w-full h-full bg-gray-900/30 rounded-3xl overflow-hidden shadow-xl shadow-gray-900/50 ring-1 ring-gray-800">
                      <div className="relative w-full h-full">
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          playsInline
                          preload="metadata"
                          loop
                        >
                          <source src={card.content.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Video Caption */}
                        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none">
                          <div className="flex flex-col items-center text-center space-y-1.5">
                            <div className="text-base font-semibold leading-6 text-white">
                              <a 
                                href={card.content.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors underline decoration-2 decoration-white/60 hover:decoration-blue-400 pointer-events-auto"
                              >
                                {card.content.name}
                              </a>
                            </div>
                            <div className="text-sm leading-6 text-white/90">
                              {card.content.title}
                            </div>
                            <div className="text-sm leading-6 text-white/90">
                              @
                              <a 
                                href={card.content.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors underline decoration-2 decoration-white/60 hover:decoration-blue-400 pointer-events-auto"
                              >
                                {card.content.company}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-3xl bg-gray-900/20 ring-1 ring-gray-800 flex items-center justify-center group hover:bg-gray-900/30 transition-all">
                      <div className="text-center p-6">
                        <div className="text-xl font-semibold text-white/80 mb-2 group-hover:text-white/90 transition-colors">
                          {card.content.title}
                        </div>
                        {card.content.description && (
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{card.content.description}</p>
                        )}
                        <div className="mt-4 w-3 h-3 rounded-full bg-blue-500/40 mx-auto animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 