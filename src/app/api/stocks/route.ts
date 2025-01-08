import { NextResponse } from 'next/server'

const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/'
const RATE_LIMIT_DELAY = 1000
const MAX_RETRIES = 3

type YahooFinanceResponse = {
  chart: {
    result: [{
      meta: {
        regularMarketPrice: number
        dividendYield?: number
      }
      timestamp: number[]
      indicators: {
        quote: [{
          close: (number | null)[]
        }]
      }
    }] | undefined
    error?: {
      code: string
      description: string
    }
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchYahooData(url: string, retries = 0): Promise<Response> {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  }

  try {
    const response = await fetch(url, { headers })
    
    if (response.status === 429 && retries < MAX_RETRIES) {
      await sleep(RATE_LIMIT_DELAY * (retries + 1))
      return fetchYahooData(url, retries + 1)
    }
    
    return response
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await sleep(RATE_LIMIT_DELAY * (retries + 1))
      return fetchYahooData(url, retries + 1)
    }
    throw error
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const date = searchParams.get('date')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 })
  }

  try {
    // Handle European stock symbols by replacing dot with dash
    const formattedSymbol = symbol.replace('.', '-')
    const encodedSymbol = encodeURIComponent(formattedSymbol)
    
    let url: string
    if (date) {
      const endDate = new Date(date)
      const startDate = new Date(date)
      startDate.setDate(startDate.getDate() - 7)

      // Ensure we're using UTC timestamps to avoid timezone issues
      const period1 = Math.floor(startDate.getTime() / 1000)
      const period2 = Math.floor(endDate.getTime() / 1000)

      url = `${YAHOO_BASE_URL}${encodedSymbol}?period1=${period1}&period2=${period2}&interval=1d&includePrePost=false&events=div`
    } else {
      url = `${YAHOO_BASE_URL}${encodedSymbol}?interval=1d&range=1d&includePrePost=false&events=div`
    }

    console.log('Fetching URL:', url) // Add logging to debug the URL

    const response = await fetchYahooData(url)
    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`)
    }

    const data: YahooFinanceResponse = await response.json()
    
    if (data.chart.error) {
      return NextResponse.json({ error: data.chart.error.description }, { status: 500 })
    }

    const result = data.chart.result?.[0]
    if (!result) {
      return NextResponse.json({ error: 'No data available' }, { status: 404 })
    }

    // Get the last valid close price from the data
    const closes = result.indicators.quote[0].close
    const lastValidClose = closes.findLast(price => price !== null)
    
    if (lastValidClose === undefined) {
      return NextResponse.json({ error: 'No valid closing price found' }, { status: 404 })
    }

    console.log(`Stock data for ${symbol}:`, {
      regularMarketPrice: lastValidClose,
      dividendYield: result.meta.dividendYield,
      date: date || 'current'
    })

    return NextResponse.json({
      currentPrice: lastValidClose,
      yield: result.meta.dividendYield || null
    })

  } catch (error) {
    console.error('Error fetching stock data:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
} 