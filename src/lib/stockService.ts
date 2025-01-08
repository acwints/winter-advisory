import { StockPick } from './stockData'

const BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/'

type YahooFinanceResponse = {
  chart: {
    result: [{
      meta: {
        regularMarketPrice: number
        dividendYield?: number
      }
    }]
  }
}

export async function fetchStockData(symbol: string): Promise<{
  currentPrice: number
  yield?: number
}> {
  try {
    const response = await fetch(`${BASE_URL}${symbol}?interval=1d&range=1d`)
    const data: YahooFinanceResponse = await response.json()
    
    return {
      currentPrice: data.chart.result[0].meta.regularMarketPrice,
      yield: data.chart.result[0].meta.dividendYield
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error)
    throw error
  }
}

export async function updateStockPrices(picks: StockPick[]): Promise<StockPick[]> {
  const updatedPicks = await Promise.all(
    picks.map(async (pick) => {
      try {
        const { currentPrice, yield: dividendYield } = await fetchStockData(pick.symbol)
        const priceChange = ((currentPrice - pick.startPrice) / pick.startPrice) * 100
        
        return {
          ...pick,
          currentPrice,
          priceChange,
          yield: dividendYield
        }
      } catch (error) {
        console.error(`Failed to update ${pick.symbol}:`, error)
        return pick
      }
    })
  )
  
  return updatedPicks
} 