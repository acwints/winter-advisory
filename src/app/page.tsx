import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TerminalInterface } from '@/components/TerminalInterface'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Winter Advisory Terminal',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <TerminalInterface />
      <Footer />
    </main>
  )
}
