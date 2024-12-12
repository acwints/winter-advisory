"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    content: 'Andrew\'s dedication to understanding our unique challenges and his ability to provide tailored solutions exceeded our expectations. His insights were invaluable!',
    author: 'Blaine Vess',
    role: 'Founder, CEO @ Immeasurable',
    image: '/images/vess.jpg'
  },
  {
    content: 'Working with Andrew has been transformative for our business. His innovative approach to problem-solving and deep industry expertise delivered remarkable results.',
    author: 'Jesse Pujji',
    role: 'Founder, CEO @ GatewayX',
    image: '/images/pujji.jpg'
  },
  {
    content: 'Andrew\'s strategic insights and hands-on guidance transformed our operations. His experience in scaling companies helped us navigate complex transitions seamlessly.',
    author: 'Porter Grieve',
    role: 'Founder, CEO @ College Sports Co.',
    image: '/images/grieve.jpg'
  },
]

export function Testimonials() {
  return (
    <div id="testimonials" className="bg-gray-900/30 py-16 sm:py-24">
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
          <p className="mt-6 text-lg leading-8 text-gray-300">
            See what our clients say about working with Andrew.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative isolate flex flex-col justify-between bg-gray-900/30 shadow-xl shadow-gray-900/50 p-8 ring-1 ring-gray-800 rounded-3xl"
              >
                <div>
                  <div className="flex gap-x-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-6 text-white">{testimonial.author}</div>
                      <div className="text-sm leading-6 text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="mt-8 text-base leading-7 text-gray-300">
                    <p>"{testimonial.content}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 