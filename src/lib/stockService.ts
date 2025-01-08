import { StockPick } from './stockData'

// Use relative URL for API endpoint
const API_BASE_URL = '/api/stocks'

type StockResponse = {
  currentPrice: number
  yield?: number
  error?: string
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchStockData(symbol: string, date?: string): Promise<{
  currentPrice: number
  yield?: number
}> {
  try {
    const params = new URLSearchParams({
      symbol,
      ...(date && { date })
    })

    // Add a range parameter to ensure we get the correct price for the date
    if (date) {
      const targetDate = new Date(date)
      const startDate = new Date(targetDate)
      startDate.setDate(startDate.getDate() - 7) // Get a week of data to ensure we have valid prices
      params.append('range', `${Math.floor(startDate.getTime() / 1000)}-${Math.floor(targetDate.getTime() / 1000)}`)
    }

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: StockResponse = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return {
      currentPrice: data.currentPrice,
      yield: data.yield
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error)
    throw error
  }
}

export async function updateStockPrices(picks: StockPick[], date?: string): Promise<StockPick[]> {
  const batchSize = 3
  const updatedPicks: StockPick[] = []

  for (let i = 0; i < picks.length; i += batchSize) {
    const batch = picks.slice(i, i + batchSize)
    const batchResults = await Promise.all(
      batch.map(async (pick) => {
        try {
          const { currentPrice, yield: dividendYield } = await fetchStockData(pick.symbol, date)
          const priceChange = ((currentPrice - pick.startPrice) / pick.startPrice) * 100
          
          return {
            ...pick,
            currentPrice,
            priceChange,
            yield: dividendYield
          }
        } catch (error) {
          console.error(`Failed to update ${pick.symbol}:`, error)
          return {
            ...pick,
            currentPrice: pick.startPrice,
            priceChange: 0,
            yield: undefined
          }
        }
      })
    )
    updatedPicks.push(...batchResults)
    
    // Add delay between batches
    if (i + batchSize < picks.length) {
      await sleep(1000)
    }
  }
  
  return updatedPicks
} 