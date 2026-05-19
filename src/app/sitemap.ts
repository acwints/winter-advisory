import type { MetadataRoute } from 'next'

const pages = [
  {
    url: 'https://winteradvisory.llc',
    priority: 1,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-consultant',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-deployment-audit',
    priority: 0.95,
  },
  {
    url: 'https://winteradvisory.llc/resources',
    priority: 0.85,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-use-cases',
    priority: 0.85,
  },
  {
    url: 'https://winteradvisory.llc/ai-deployment-scorecard',
    priority: 0.85,
  },
  {
    url: 'https://winteradvisory.llc/ecommerce-ai-roi-calculator',
    priority: 0.85,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'weekly',
  }))
}
