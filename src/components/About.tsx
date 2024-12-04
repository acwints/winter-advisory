"use client"

import { motion } from 'framer-motion'
import { ChartBarIcon, LightBulbIcon, PresentationChartLineIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Strategic Planning',
    description: 'Develop comprehensive strategies aligned with your business objectives and market opportunities.',
    icon: PresentationChartLineIcon,
  },
  {
    name: 'Performance Optimization',
    description: 'Enhance operational efficiency and maximize resource utilization through data-driven insights.',
    icon: ChartBarIcon,
  },
  {
    name: 'Innovation Management',
    description: 'Foster a culture of innovation and implement frameworks for sustainable growth.',
    icon: LightBulbIcon,
  },
  {
    name: 'Change Management',
    description: 'Guide organizations through transformational changes while maintaining team alignment and productivity.',
    icon: UserGroupIcon,
  },
]

export function About() {
  return (
    <div id="about" className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl lg:mx-0"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Transforming Businesses Through Expert Consulting
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Winter Advisory, we combine industry expertise with innovative methodologies to help businesses thrive in today's dynamic market environment.
          </p>
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
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {service.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{service.description}</dd>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
              >
                {/* Placeholder for about image 1 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 shadow-lg lg:aspect-[4/3] lg:h-[400px]"
              >
                {/* Placeholder for about image 2 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 