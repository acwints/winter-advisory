import type { MetadataRoute } from 'next'

const pages = [
  {
    url: 'https://www.winteradvisory.ai/6am/terms',
    priority: 0.5,
  },
  {
    url: 'https://winteradvisory.llc',
    priority: 1,
  },
  {
    url: 'https://winteradvisory.llc/contact',
    priority: 0.9,
  },
  {
    url: 'https://www.winteradvisory.ai/6am/support',
    priority: 0.7,
  },
  {
    url: 'https://www.winteradvisory.ai/6am/privacy',
    priority: 0.5,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'weekly',
  }))
}
