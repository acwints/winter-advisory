export type Contestant = 'A' | 'P' | 'R' | 'S' | 'D'

export type StockPick = {
  symbol: string
  name: string
  startPrice: number
  currentPrice: number
  priceChange: number
  yield?: number
  startDate: string  // ISO date string
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
  endDate: string  // ISO date string for last trading day
  picks: ContestantPicks[]
  grandTotal: {
    startValue: number
    currentValue: number
    percentageChange: number
  }
}

export const contestantData: Record<number, YearData> = {
  2022: {
    year: 2022,
    endDate: '2022-12-30',  // Last trading day of 2022
    picks: [
      {
        contestant: 'A',
        picks: [
          { symbol: 'ETH-USD', name: 'Ethereum', startPrice: 3829.13, currentPrice: 2453.38, priceChange: -68.67, startDate: '2022-01-03' },
          { symbol: 'TSM', name: 'Taiwan Semiconductor', startPrice: 128.80, currentPrice: 128.94, priceChange: -40.99, startDate: '2022-01-03' },
          { symbol: 'SNY', name: 'Sanofi', startPrice: 50.69, currentPrice: 46.11, priceChange: -4.22, startDate: '2022-01-03' }
        ],
        total: {
          startValue: 4008.62,
          currentValue: 2628.43,
          percentageChange: -37.96
        }
      },
      {
        contestant: 'P',
        picks: [
          { symbol: 'ETH-USD', name: 'Ethereum', startPrice: 3829.13, currentPrice: 2453.38, priceChange: -68.67, startDate: '2022-01-03' },
          { symbol: 'SOL-USD', name: 'Solana', startPrice: 104.00, currentPrice: 65.66, priceChange: -94.44, startDate: '2022-01-03' },
          { symbol: 'LUNA-USD', name: 'Terra', startPrice: 0, currentPrice: 0, priceChange: 0, startDate: '2022-01-03' }
        ],
        total: {
          startValue: 3933.13,
          currentValue: 2519.04,
          percentageChange: -81.56
        }
      },
      {
        contestant: 'R',
        picks: [
          { symbol: 'GS', name: 'Goldman Sachs', startPrice: 395.33, currentPrice: 386.29, priceChange: -13.13, startDate: '2022-01-03' },
          { symbol: 'ABNB', name: 'Airbnb Inc.', startPrice: 172.68, currentPrice: 150.06, priceChange: -50.64, startDate: '2022-01-03' },
          { symbol: 'WMT', name: 'Walmart Inc.', startPrice: 144.65, currentPrice: 170.49, priceChange: -1.73, startDate: '2022-01-03' }
        ],
        total: {
          startValue: 712.66,
          currentValue: 706.84,
          percentageChange: -21.83
        }
      },
      {
        contestant: 'S',
        picks: [
          { symbol: 'GLD', name: 'Gold', startPrice: 168.33, currentPrice: 187.88, priceChange: 0.31, startDate: '2022-01-03' },
          { symbol: 'COPX', name: 'Copper', startPrice: 26.96, currentPrice: 23.09, priceChange: -14.09, startDate: '2022-01-03' },
          { symbol: 'SLV', name: 'Silver', startPrice: 21.18, currentPrice: 20.43, priceChange: 3.73, startDate: '2022-01-03' }
        ],
        total: {
          startValue: 216.47,
          currentValue: 231.40,
          percentageChange: -3.35
        }
      }
    ],
    grandTotal: {
      startValue: 8870.88,
      currentValue: 6085.71,
      percentageChange: -32.05
    }
  },
  2023: {
    year: 2023,
    endDate: '2023-12-29',  // Last trading day of 2023
    picks: [
      {
        contestant: 'S',
        picks: [
          { symbol: 'BTC-USD', name: 'Bitcoin', startPrice: 16675.80, currentPrice: 45318.90, priceChange: 152.24, startDate: '2023-01-02' },
          { symbol: 'GLD', name: 'Gold', startPrice: 171.06, currentPrice: 187.88, priceChange: 11.76, startDate: '2023-01-02' },
          { symbol: 'XOM', name: 'Exxon Mobil Corp', startPrice: 106.51, currentPrice: 103.10, priceChange: -6.13, startDate: '2023-01-02' }
        ],
        total: {
          startValue: 16953.37,
          currentValue: 45609.88,
          percentageChange: 52.62
        }
      },
      {
        contestant: 'A',
        picks: [
          { symbol: 'ETH-USD', name: 'Ethereum', startPrice: 1576.62, currentPrice: 2453.38, priceChange: 45.84, startDate: '2023-01-02' },
          { symbol: 'MSFT', name: 'Microsoft Corporation', startPrice: 239.58, currentPrice: 414.37, priceChange: 56.96, startDate: '2023-01-02' },
          { symbol: 'SHOP', name: 'Shopify', startPrice: 35.68, currentPrice: 90.38, priceChange: 118.33, startDate: '2023-01-02' }
        ],
        total: {
          startValue: 1851.88,
          currentValue: 2958.13,
          percentageChange: 73.71
        }
      },
      {
        contestant: 'P',
        picks: [
          { symbol: 'COST', name: 'Costco Wholesale Corporation', startPrice: 453.28, currentPrice: 726.48, priceChange: 45.62, startDate: '2023-01-02' },
          { symbol: 'MSFT', name: 'Microsoft Corporation', startPrice: 239.58, currentPrice: 414.37, priceChange: 56.96, startDate: '2023-01-02' },
          { symbol: 'DIS', name: 'The Walt Disney Company', startPrice: 88.97, currentPrice: 109.27, priceChange: 1.48, startDate: '2023-01-02' }
        ],
        total: {
          startValue: 781.83,
          currentValue: 1250.12,
          percentageChange: 34.69
        }
      },
      {
        contestant: 'R',
        picks: [
          { symbol: 'LVMH.PA', name: 'LVMH', startPrice: 148.39, currentPrice: 172.97, priceChange: 9.48, startDate: '2023-01-02' },
          { symbol: 'WMT', name: 'Walmart Inc.', startPrice: 143.60, currentPrice: 170.49, priceChange: 9.78, startDate: '2023-01-02' },
          { symbol: 'CPWY', name: 'Compass Pathways', startPrice: 7.72, currentPrice: 10.85, priceChange: 13.34, startDate: '2023-01-02' }
        ],
        total: {
          startValue: 299.71,
          currentValue: 354.31,
          percentageChange: 10.87
        }
      },
      {
        contestant: 'D',
        picks: [
          { symbol: 'DFS', name: 'Discover Financial Services', startPrice: 96.99, currentPrice: 108.28, priceChange: 15.89, startDate: '2023-01-02' },
          { symbol: 'VZ', name: 'Verizon', startPrice: 40.12, currentPrice: 39.60, priceChange: -6.03, startDate: '2023-01-02' },
          { symbol: 'INTC', name: 'Intel Corporation', startPrice: 26.73, currentPrice: 42.46, priceChange: 87.99, startDate: '2023-01-02' }
        ],
        total: {
          startValue: 163.84,
          currentValue: 190.34,
          percentageChange: 32.62
        }
      }
    ],
    grandTotal: {
      startValue: 20050.63,
      currentValue: 50362.78,
      percentageChange: 40.90
    }
  },
  2024: {
    year: 2024,
    endDate: '2024-12-31',  // Last trading day will be updated
    picks: [
      {
        contestant: 'S',
        picks: [
          { symbol: 'BTC-USD', name: 'Bitcoin', startPrice: 42844.30, currentPrice: 45318.90, priceChange: 5.78, startDate: '2024-01-02' },
          { symbol: 'NVDA', name: 'NVIDIA Corporation', startPrice: 475.69, currentPrice: 698.68, priceChange: 46.88, startDate: '2024-01-02' },
          { symbol: 'PDD', name: 'PDD Holdings Inc - ADR', startPrice: 148.95, currentPrice: 127.79, priceChange: -14.21, startDate: '2024-01-02' }
        ],
        total: {
          startValue: 43468.94,
          currentValue: 46145.37,
          percentageChange: 12.82
        }
      },
      {
        contestant: 'P',
        picks: [
          { symbol: 'EXPE', name: 'Expedia Group Inc.', startPrice: 144.99, currentPrice: 155.94, priceChange: 7.55, startDate: '2024-01-02' },
          { symbol: 'DIS', name: 'The Walt Disney Company', startPrice: 91.65, currentPrice: 109.27, priceChange: 19.23, startDate: '2024-01-02' },
          { symbol: 'ACHR', name: 'Archer Aviation Inc', startPrice: 5.59, currentPrice: 5.11, priceChange: -8.59, startDate: '2024-01-02' }
        ],
        total: {
          startValue: 242.23,
          currentValue: 270.32,
          percentageChange: 6.06
        }
      },
      {
        contestant: 'A',
        picks: [
          { symbol: 'ETH-USD', name: 'Ethereum', startPrice: 2211.23, currentPrice: 2453.38, priceChange: 10.95, startDate: '2024-01-02' },
          { symbol: 'BX', name: 'Blackstone', startPrice: 122.35, currentPrice: 125.88, priceChange: 2.89, startDate: '2024-01-02' },
          { symbol: 'UAL', name: 'United Airlines Holdings Inc', startPrice: 39.53, currentPrice: 40.86, priceChange: 3.36, startDate: '2024-01-02' }
        ],
        total: {
          startValue: 2373.11,
          currentValue: 2620.12,
          percentageChange: 5.73
        }
      },
      {
        contestant: 'R',
        picks: [
          { symbol: 'MSFT', name: 'Microsoft Corporation', startPrice: 402.56, currentPrice: 414.37, priceChange: 2.93, startDate: '2024-01-02' },
          { symbol: 'WMT', name: 'Walmart Inc.', startPrice: 160.50, currentPrice: 170.49, priceChange: 6.22, startDate: '2024-01-02' },
          { symbol: 'XOM', name: 'Exxon Mobil Corp', startPrice: 99.60, currentPrice: 103.10, priceChange: 3.51, startDate: '2024-01-02' }
        ],
        total: {
          startValue: 662.66,
          currentValue: 687.96,
          percentageChange: 4.22
        }
      },
      {
        contestant: 'D',
        picks: [],
        total: {
          startValue: 0,
          currentValue: 0,
          percentageChange: 0
        }
      }
    ],
    grandTotal: {
      startValue: 46746.94,
      currentValue: 49723.77,
      percentageChange: 7.21
    }
  }
} 