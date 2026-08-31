import type { MetadataRoute } from 'next'

const pages = [
  {
    url: 'https://winteradvisory.llc',
    priority: 1,
  },
  {
    url: 'https://winteradvisory.llc/contact',
    priority: 0.9,
  },
  {
    url: 'https://winteradvisory.llc/sixam',
    priority: 0.7,
  },
  {
    url: 'https://winteradvisory.llc/sixam/privacy',
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
