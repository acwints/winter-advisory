'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { contestantSelections } from '@/lib/stockData'
import { updateStockPrices } from '@/lib/stockService'
import type { YearData, ContestantPicks, StockPick } from '@/lib/stockData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
)

function useWindowSize() {
  const [size, setSize] = useState<{ width: number | undefined; height: number | undefined }>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount

  return size;
}

function useChartOptions(isMobile: boolean) {
  return useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#111827',
          font: {
            family: 'Inter var, sans-serif',
            weight: 'bold' as 'bold',
            size: isMobile ? 10 : 12
          },
          padding: isMobile ? 8 : 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: 'Inter var, sans-serif',
          weight: 'normal' as 'normal'
        },
        titleFont: {
          family: 'Inter var, sans-serif',
          weight: 'bold' as 'bold'
        },
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.raw.toFixed(2)}%`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#374151',
          font: {
            family: 'Inter var, sans-serif',
            size: isMobile ? 10 : 12
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 6 : 8
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        border: {
          dash: [4, 4]
        },
        ticks: {
          color: '#374151',
          font: {
            family: 'Inter var, sans-serif',
            size: isMobile ? 10 : 12
          },
          callback: (value: number | string) => `${value}%`,
          maxTicksLimit: 6
        }
      }
    }
  }), [isMobile])
}

const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="animate-pulse space-y-4">
        <div className="relative w-full h-full bg-gray-50 rounded-xl border border-gray-100">
          <div className="absolute left-0 top-8 bottom-8 w-16 flex flex-col justify-between p-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 w-12 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          
          <div className="absolute left-20 right-8 top-8 bottom-8 flex items-end justify-around">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="w-16 bg-gray-200 rounded-lg transition-all duration-500"
                style={{ height: `${Math.random() * 60 + 20}%` }}
              ></div>
            ))}
          </div>

          <div className="absolute top-2 left-0 right-0">
            <div className="flex justify-center space-x-4">
              <div className="h-3 w-32 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StocksDashboard() {
  const { width } = useWindowSize()
  const isMobile = width ? width < 640 : false
  const chartOptions = useChartOptions(isMobile)
  
  const [selectedYear, setSelectedYear] = useState(2024)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [yearData, setYearData] = useState<YearData>(() => createEmptyYearData())
  
  const years = useMemo(() => {
    return Object.keys(contestantSelections)
      .map(Number)
      .sort((a, b) => b - a)
  }, [])

  function createEmptyYearData(): YearData {
    const year = selectedYear
    const contestants = contestantSelections[year]
    
    if (!contestants) {
      return {
        year,
        endDate: `${year}-12-31`,
        picks: [],
        grandTotal: { startValue: 0, currentValue: 0, percentageChange: 0 }
      }
    }

    return {
      year,
      endDate: `${year}-12-31`,
      picks: contestants.map(contestant => ({
        contestant: contestant.contestant,
        picks: contestant.picks.map(stock => ({
          ...stock,
          startPrice: 0,
          currentPrice: 0,
          priceChange: 0,
          startDate: `${year}-01-02`
        })),
        total: {
          startValue: 0,
          currentValue: 0,
          percentageChange: 0
        }
      })),
      grandTotal: {
        startValue: 0,
        currentValue: 0,
        percentageChange: 0
      }
    }
  }

  const updatePrices = useCallback(async () => {
    if (isLoading) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const year = selectedYear
      const contestants = contestantSelections[year]
      
      if (!contestants) {
        throw new Error('No contestant data available for the selected year')
      }

      const startDate = `${year}-01-02`
      const endDate = selectedYear === 2025 ? undefined : `${year}-12-31`

      const updatedPicks = await Promise.all(
        contestants.map(async (contestant) => {
          try {
            const updatedStocks = await Promise.all(
              contestant.picks.map(async (stock) => {
                try {
                  if (!stock.symbol) {
                    return {
                      ...stock,
                      startPrice: 0,
                      currentPrice: 0,
                      priceChange: 0,
                      startDate
                    } as StockPick
                  }

                  const startPriceData = await updateStockPrices([{
                    ...stock,
                    startPrice: 0,
                    currentPrice: 0,
                    priceChange: 0,
                    startDate
                  } as StockPick], startDate)

                  const currentPriceData = await updateStockPrices([{
                    ...stock,
                    startPrice: 0,
                    currentPrice: 0,
                    priceChange: 0,
                    startDate
                  } as StockPick], endDate)

                  const startPrice = startPriceData[0].currentPrice
                  const currentPrice = currentPriceData[0].currentPrice
                  const priceChange = ((currentPrice - startPrice) / startPrice) * 100
                  
                  return {
                    ...stock,
                    startDate,
                    startPrice,
                    currentPrice,
                    priceChange
                  } as StockPick
                } catch (error) {
                  console.error(`Failed to update ${stock.symbol}:`, error)
                  return {
                    ...stock,
                    startPrice: 0,
                    currentPrice: 0,
                    priceChange: 0,
                    startDate
                  } as StockPick
                }
              })
            )

            const total = calculateTotal(updatedStocks)
            return {
              contestant: contestant.contestant,
              picks: updatedStocks,
              total
            } as ContestantPicks
          } catch (err) {
            console.error(`Error updating prices for contestant ${contestant.contestant}:`, err)
            return {
              contestant: contestant.contestant,
              picks: contestant.picks.map(stock => ({
                ...stock,
                startPrice: 0,
                currentPrice: 0,
                priceChange: 0,
                startDate
              } as StockPick)),
              total: {
                startValue: 0,
                currentValue: 0,
                percentageChange: 0
              }
            } as ContestantPicks
          }
        })
      )

      setYearData({
        year,
        endDate: endDate || '2025-12-31',
        picks: updatedPicks,
        grandTotal: {
          startValue: 0,
          currentValue: 0,
          percentageChange: 0
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update stock prices')
      console.error('Error updating prices:', err)
    } finally {
      setIsLoading(false)
    }
  }, [selectedYear, isLoading])

  useEffect(() => {
    updatePrices()
  }, [selectedYear])

  const calculateTotal = (picks: StockPick[]) => {
    const validPicks = picks.filter(stock => stock.symbol !== '')
    if (validPicks.length === 0) return { startValue: 0, currentValue: 0, percentageChange: 0 }
    
    const averagePercentageChange = validPicks.reduce((sum, stock) => sum + stock.priceChange, 0) / validPicks.length
    return {
      startValue: 0,
      currentValue: 0,
      percentageChange: averagePercentageChange
    }
  }

  const chartData = {
    labels: yearData.picks
      .sort((a, b) => b.total.percentageChange - a.total.percentageChange)
      .map(p => p.contestant),
    datasets: [
      {
        label: 'Performance',
        data: yearData.picks
          .sort((a, b) => b.total.percentageChange - a.total.percentageChange)
          .map(p => p.total.percentageChange),
        backgroundColor: (context: any) => {
          const value = context.raw
          return value >= 0 
            ? 'rgba(16, 185, 129, 0.95)'
            : 'rgba(239, 68, 68, 0.95)'
        },
        borderColor: (context: any) => {
          const value = context.raw
          return value >= 0 
            ? 'rgb(4, 120, 87)'
            : 'rgb(185, 28, 28)'
        },
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: (context: any) => {
          const value = context.raw
          return value >= 0 
            ? 'rgba(16, 185, 129, 1)'
            : 'rgba(239, 68, 68, 1)'
        },
      },
    ],
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-auto">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full sm:w-auto px-4 py-2.5 bg-white text-gray-900 rounded-lg shadow-sm border border-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-colors duration-200"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year === 2025 ? 'Current Year (2025)' : `Year ${year}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 transition-all duration-200 hover:shadow-xl">
        {isLoading ? (
          <div className="h-[300px] sm:h-[400px] md:h-[500px]">
            <LoadingSkeleton />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px]">
            <div className="text-center space-y-2">
              <div className="text-red-500 font-medium">{error}</div>
              <button 
                onClick={updatePrices}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                         transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="h-[300px] sm:h-[400px] md:h-[500px]">
            <Bar options={chartOptions} data={chartData} />
          </div>
        )}
      </div>

      <div className="sm:hidden divide-y divide-gray-200 bg-white rounded-xl shadow-lg border border-gray-100">
        {yearData.picks
          .sort((a, b) => b.total.percentageChange - a.total.percentageChange)
          .map((contestant, rankIndex) => (
            <div key={`${contestant.contestant}-${selectedYear}`} 
                 className="p-4 space-y-4 transition-colors duration-200 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full 
                                 text-sm font-semibold border border-indigo-100">
                    {rankIndex + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{contestant.contestant}</h3>
                </div>
                <span className={`text-lg font-semibold ${
                  contestant.total.percentageChange >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {contestant.total.percentageChange.toFixed(2)}%
                </span>
              </div>
              
              <div className="space-y-3">
                {contestant.picks.map((stock, idx) => (
                  <div key={`${contestant.contestant}-${stock.symbol || idx}-${selectedYear}-mobile`} 
                       className="bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 line-clamp-1">{stock.name}</span>
                      <span className="text-indigo-600 font-medium shrink-0 ml-2">{stock.symbol || '-'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-sm space-y-2 sm:space-y-0">
                      <div className="space-y-1 sm:space-y-0 sm:space-x-4">
                        <span className="text-gray-600 block sm:inline">Start: {stock.symbol ? formatPrice(stock.startPrice) : '-'}</span>
                        <span className="text-gray-600 block sm:inline">{selectedYear === 2025 ? 'Current' : 'Close'}: {stock.symbol ? formatPrice(stock.currentPrice) : '-'}</span>
                      </div>
                      <span className={`font-medium ${
                        stock.priceChange >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stock.symbol ? `${stock.priceChange.toFixed(2)}%` : '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="hidden sm:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900">Rank</th>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ticker</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Start</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                {selectedYear === 2025 ? 'Current' : 'Close'}
              </th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {yearData.picks
              .sort((a, b) => b.total.percentageChange - a.total.percentageChange)
              .map((contestant, rankIndex) => (
                <React.Fragment key={`${contestant.contestant}-${selectedYear}`}>
                  {contestant.picks.map((stock, idx) => (
                    <tr key={`${contestant.contestant}-${stock.symbol || idx}-${selectedYear}`} 
                        className="transition-colors duration-200 hover:bg-gray-50">
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-center text-sm font-medium text-gray-900">
                        {idx === 0 && (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-50 text-indigo-600 
                                         rounded-full text-sm font-semibold border border-indigo-100">
                            {rankIndex + 1}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {idx === 0 ? contestant.contestant : ''}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">{stock.name}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-indigo-600">{stock.symbol || '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 text-right">
                        {stock.symbol ? formatPrice(stock.startPrice) : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 text-right">
                        {stock.symbol ? formatPrice(stock.currentPrice) : '-'}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-3 text-sm text-right font-medium ${
                        stock.priceChange >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stock.symbol ? `${stock.priceChange.toFixed(2)}%` : '-'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="whitespace-nowrap py-3 pl-4 text-sm font-semibold text-gray-900">
                      Total for {contestant.contestant}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-3 text-sm text-right font-semibold ${
                      contestant.total.percentageChange >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {contestant.total.percentageChange.toFixed(2)}%
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}