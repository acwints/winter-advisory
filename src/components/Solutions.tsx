"use client"

import { motion } from 'framer-motion'
import { ChartBarIcon, LightBulbIcon, PresentationChartLineIcon, UserGroupIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const services = [
  {
    name: 'Sales Acceleration',
    description: 'Optimize your sales process and drive revenue growth through data-driven strategies and proven methodologies.',
    icon: PresentationChartLineIcon,
  },
  {
    name: 'Revenue Operations',
    description: 'Streamline your revenue engine by aligning sales, marketing and customer success with integrated systems and workflows.',
    icon: ChartBarIcon,
  },
  {
    name: 'Product Development',
    description: 'Build apps and websites (like this one) that deliver customer value while capturing market opportunities and driving business growth.',
    icon: LightBulbIcon,
  },
  {
    name: 'AI Engineering', 
    description: 'Build and deploy custom AI solutions that automate processes, enhance decision making, and create competitive advantages.',
    icon: CpuChipIcon,
  },
]

export function Solutions() {
  return (
    <div id="about" className="relative isolate overflow-hidden bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transforming Businesses Through Automation
          </h2>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
          >
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-900/50 shadow-lg border border-gray-800"
              >
                <Image
                  src="/images/2.JPG"
                  alt="About our consulting services"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
            <div className="flex flex-col gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {service.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300">{service.description}</dd>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 