import { StocksDashboard } from './StocksDashboard'

export default function StocksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Annual Stock Picking Contest</h1>
      <StocksDashboard />
    </main>
  )
} 