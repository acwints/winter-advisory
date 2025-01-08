export type Contestant = 'A' | 'P' | 'R' | 'S' | 'D'

export type StockPick = {
  symbol: string
  name: string
  startPrice: number
  currentPrice: number
  priceChange: number
  startDate: string
}

export type ContestantPicks = {
  contestant: Contestant
  picks: StockPick[]
  total: {
    startValue: number
    currentValue: number
    percentageChange: number
  }
}

export type YearData = {
  year: number
  endDate: string
  picks: ContestantPicks[]
  grandTotal: {
    startValue: number
    currentValue: number
    percentageChange: number
  }
}

// Stock symbols and names for each contestant by year
export const contestantSelections: Record<number, Array<{ contestant: Contestant, picks: Array<{ symbol: string, name: string }> }>> = {
  2022: [
    {
      contestant: 'A',
      picks: [
        { symbol: 'ETH-USD', name: 'Ethereum' },
        { symbol: 'TSM', name: 'Taiwan Semiconductor' },
        { symbol: 'SNY', name: 'Sanofi' }
      ]
    },
    {
      contestant: 'P',
      picks: [
        { symbol: 'ETH-USD', name: 'Ethereum' },
        { symbol: 'SOL-USD', name: 'Solana' },
        { symbol: 'LUNC-USD', name: 'Terra Classic' }
      ]
    },
    {
      contestant: 'R',
      picks: [
        { symbol: 'GS', name: 'Goldman Sachs' },
        { symbol: 'ABNB', name: 'Airbnb Inc.' },
        { symbol: 'WMT', name: 'Walmart Inc.' }
      ]
    },
    {
      contestant: 'S',
      picks: [
        { symbol: 'GLD', name: 'Gold' },
        { symbol: 'COPX', name: 'Copper' },
        { symbol: 'SLV', name: 'Silver' }
      ]
    },
    {
      contestant: 'D',
      picks: [
        { symbol: '', name: '-' },
        { symbol: '', name: '-' },
        { symbol: '', name: '-' }
      ]
    }
  ],
  2023: [
    {
      contestant: 'S',
      picks: [
        { symbol: 'BTC-USD', name: 'Bitcoin' },
        { symbol: 'GLD', name: 'Gold' },
        { symbol: 'XOM', name: 'Exxon Mobil Corp' }
      ]
    },
    {
      contestant: 'A',
      picks: [
        { symbol: 'ETH-USD', name: 'Ethereum' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'SHOP', name: 'Shopify' }
      ]
    },
    {
      contestant: 'P',
      picks: [
        { symbol: 'COST', name: 'Costco Wholesale Corporation' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'DIS', name: 'The Walt Disney Company' }
      ]
    },
    {
      contestant: 'R',
      picks: [
        { symbol: 'LVMUY', name: 'LVMH' },
        { symbol: 'WMT', name: 'Walmart Inc.' },
        { symbol: 'CPWY', name: 'Compass Pathways' }
      ]
    },
    {
      contestant: 'D',
      picks: [
        { symbol: 'DFS', name: 'Discover Financial Services' },
        { symbol: 'VZ', name: 'Verizon' },
        { symbol: 'INTC', name: 'Intel Corporation' }
      ]
    }
  ],
  2024: [
    {
      contestant: 'S',
      picks: [
        { symbol: 'BTC-USD', name: 'Bitcoin' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation' },
        { symbol: 'PDD', name: 'PDD Holdings Inc - ADR' }
      ]
    },
    {
      contestant: 'P',
      picks: [
        { symbol: 'EXPE', name: 'Expedia Group Inc.' },
        { symbol: 'DIS', name: 'The Walt Disney Company' },
        { symbol: 'ACHR', name: 'Archer Aviation Inc' }
      ]
    },
    {
      contestant: 'A',
      picks: [
        { symbol: 'ETH-USD', name: 'Ethereum' },
        { symbol: 'BX', name: 'Blackstone' },
        { symbol: 'UAL', name: 'United Airlines Holdings Inc' }
      ]
    },
    {
      contestant: 'R',
      picks: [
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'WMT', name: 'Walmart Inc.' },
        { symbol: 'XOM', name: 'Exxon Mobil Corp' }
      ]
    },
    {
      contestant: 'D',
      picks: [
        { symbol: 'UBER', name: 'Uber Technologies Inc' },
        { symbol: 'DG', name: 'Dollar General Corp' },
        { symbol: 'FSTR', name: 'L.B. Foster Company' }
      ]
    }
  ],
  2025: [
    {
      contestant: 'A',
      picks: [
        { symbol: 'ETH-USD', name: 'Ethereum' },
        { symbol: 'UAL', name: 'United Airlines Holdings Inc' },
        { symbol: 'BUD', name: 'Anheuser-Busch InBev' }
      ]
    },
    {
      contestant: 'P',
      picks: [
        { symbol: '', name: '-' },
        { symbol: '', name: '-' },
        { symbol: '', name: '-' }
      ]
    },
    {
      contestant: 'R',
      picks: [
        { symbol: '', name: '-' },
        { symbol: '', name: '-' },
        { symbol: '', name: '-' }
      ]
    },
    {
      contestant: 'S',
      picks: [
        { symbol: '', name: '-' },
        { symbol: '', name: '-' },
        { symbol: '', name: '-' }
      ]
    },
    {
      contestant: 'D',
      picks: [
        { symbol: '', name: '-' },
        { symbol: '', name: '-' },
        { symbol: '', name: '-' }
      ]
    }
  ]
} 