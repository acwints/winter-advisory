import type { MetadataRoute } from 'next'

const pages = [
  {
    url: 'https://winteradvisory.llc',
    priority: 1,
  },
  {
    url: 'https://winteradvisory.llc/resources',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-consultant',
    priority: 0.98,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-automation',
    priority: 0.98,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-deployment-audit',
    priority: 0.98,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-audit-sample-deliverables',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-roadmap',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-roi-calculator',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-vendor-selection-guide',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-agents',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ai-deployment-scorecard',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-pilot-brief-template',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-use-cases',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/shopify-ai-consultant',
    priority: 0.9,
  },
  {
    url: 'https://winteradvisory.llc/klaviyo-ai-automation',
    priority: 0.9,
  },
  {
    url: 'https://winteradvisory.llc/gorgias-ai-implementation',
    priority: 0.9,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'weekly',
  }))
}
