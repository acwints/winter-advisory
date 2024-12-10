"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StarIcon } from '@heroicons/react/20/solid'

const products = [
  {
    name: 'Sheets CRM',
    description: 'A powerful CRM system built on Google Sheets, perfect for small businesses and startups.',
    image: '/products/sheets-crm.svg',
    price: 100,
    rating: 5,
    ratingCount: 100,
    href: '#',
  },
  {
    name: 'Calendar Automations',
    description: 'Streamline your scheduling with smart calendar automations and integrations.',
    image: '/products/calendar-automations.svg',
    price: 100,
    rating: 5,
    ratingCount: 100,
    href: '#',
  },
  {
    name: 'Growth Playbook',
    description: 'Comprehensive strategies and tactics for scaling your business effectively.',
    image: '/products/growth-playbook.svg',
    price: 100,
    rating: 5,
    ratingCount: 100,
    href: '#',
  },
  {
    name: 'Dashboard Template',
    description: 'Beautiful and functional dashboard templates for data visualization and analytics.',
    image: '/products/dashboard-template.svg',
    price: 100,
    rating: 5,
    ratingCount: 100,
    href: '#',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Shop() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      
      <div className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Digital Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Tools and templates to accelerate your business growth
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-gray-900/50 px-8 pb-8 pt-80 sm:pt-96 lg:pt-80"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden">
                  <h3 className="mt-3 w-full text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-x-2">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating ? 'text-yellow-400' : 'text-gray-600',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">({product.ratingCount} ratings)</p>
                  </div>
                  
                  <p className="mt-4 text-xl font-semibold text-white">
                    ${product.price}
                  </p>
                </div>
                
                <a
                  href={product.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                >
                  Buy now
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 