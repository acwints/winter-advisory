import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StocksDashboard } from './StocksDashboard'

export default function StocksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-center mb-8">Annual Stock Picking Contest</h1>
        <StocksDashboard />
      </div>
      <Footer />
    </main>
  )
} 