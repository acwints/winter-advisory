"use client"

import { motion } from 'framer-motion'

const testimonials = [
  {
    content: 'Winter Advisory\'s strategic insights transformed our operations. Their expertise in change management helped us navigate complex transitions seamlessly.',
    author: 'Sarah Chen',
    role: 'CEO, TechVision Inc.',
  },
  {
    content: 'The team\'s dedication to understanding our unique challenges and providing tailored solutions exceeded our expectations. Highly recommended!',
    author: 'Michael Rodriguez',
    role: 'COO, Global Solutions Ltd.',
  },
  {
    content: 'Working with Winter Advisory has been instrumental in our growth. Their innovative approach to problem-solving delivered remarkable results.',
    author: 'Emily Thompson',
    role: 'Director of Operations, Innovate Corp',
  },
]

export function Testimonials() {
  return (
    <div id="testimonials" className="bg-gray-900/50 py-24 sm:py-32">
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
            See what our clients say about their experience working with Winter Advisory.
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
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600">
                      <span className="text-sm font-semibold leading-6 text-white">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
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