"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    content: 'Andrew\'s dedication to understanding our unique challenges and his ability to provide tailored solutions exceeded our expectations. His insights were invaluable!',
    author: 'Blaine Vess',
    authorLink: 'https://www.linkedin.com/in/blainevess',
    role: 'Founder, CEO @ ',
    company: 'Immeasurable',
    companyLink: 'https://immeasurable.com',
    image: '/images/vess.jpg'
  },
  {
    content: 'Working with Andrew has been transformative for our business. His innovative approach to problem-solving and deep industry expertise delivered remarkable results.',
    author: 'Jesse Pujji',
    authorLink: 'https://www.linkedin.com/in/jessepujji/',
    role: 'Founder, CEO @ ',
    company: 'GatewayX',
    companyLink: 'https://gateway.xyz',
    image: '/images/pujji.jpg'
  },
  {
    content: 'Andrew\'s strategic insights and hands-on guidance transformed our operations. His experience in scaling companies helped us navigate complex transitions seamlessly.',
    author: 'Porter Grieve',
    authorLink: 'https://www.linkedin.com/in/porter-g-9a4b8374/',
    role: 'Founder, CEO @ ',
    company: 'College Sports Co.',
    companyLink: 'https://collegesportsco.com',
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
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div className="-mt-1.5">
                      <div className="text-sm font-semibold leading-6 text-white">
                        <a 
                          href={testimonial.authorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors underline decoration-2 decoration-gray-600 hover:decoration-blue-400"
                        >
                          {testimonial.author}
                        </a>
                      </div>
                      <div className="text-sm leading-6 text-gray-400">
                        Founder, CEO
                      </div>
                      <div className="text-sm leading-6 text-gray-400">
                        @{' '}
                        <a 
                          href={testimonial.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors underline decoration-2 decoration-gray-600 hover:decoration-blue-400"
                        >
                          {testimonial.company}
                        </a>
                      </div>
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