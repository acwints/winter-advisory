'use client'

import React, { useState, useEffect } from 'react'
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
import { contestantData } from '@/lib/stockData'
import { updateStockPrices } from '@/lib/stockService'
import type { YearData, ContestantPicks } from '@/lib/stockData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
        font: {
          family: 'Inter, system-ui, sans-serif',
          weight: 'bold' as const
        }
      }
    },
    title: {
      display: true,
      text: 'Performance by Contestant',
      color: '#ffffff',
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 16,
        weight: 'bold' as const
      }
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#ffffff',
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#ffffff',
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    }
  }
}

export function StocksDashboard() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [yearData, setYearData] = useState<YearData>(contestantData[2024])
  const years = Object.keys(contestantData).map(Number).sort((a, b) => b - a)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const updatePrices = async () => {
      const updatedPicks = await Promise.all(
        yearData.picks.map(async (contestantPick) => {
          const updatedStocks = await updateStockPrices(contestantPick.picks)
          const currentValue = updatedStocks.reduce((sum, stock) => sum + stock.currentPrice, 0)
          const startValue = updatedStocks.reduce((sum, stock) => sum + stock.startPrice, 0)
          const percentageChange = ((currentValue - startValue) / startValue) * 100

          return {
            ...contestantPick,
            picks: updatedStocks,
            total: {
              startValue,
              currentValue,
              percentageChange
            }
          }
        })
      )

      setYearData({
        ...yearData,
        picks: updatedPicks
      })
    }

    updatePrices()
  }, [selectedYear])

  const chartData = {
    labels: yearData.picks.map(p => p.contestant),
    datasets: [
      {
        label: 'Performance (%)',
        data: yearData.picks.map(p => p.total.percentageChange),
        backgroundColor: 'rgba(129, 140, 248, 0.8)',  // indigo-400
        borderColor: 'rgb(129, 140, 248)',           // indigo-400
        borderWidth: 1,
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 text-white rounded-lg">
      <div className="flex justify-between items-center mb-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Winter Family Stock Picking</h2>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="block w-32 rounded-md border-0 py-2 pl-4 pr-10 bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="mb-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="p-6 rounded-lg">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Company Name</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Start Price</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">
                {selectedYear === currentYear ? 'Current Price' : 'Close Price'}
              </th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Price Change</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Yield</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {yearData.picks.map((contestant) => {
              const standardizedPicks = Array(3).fill(null).map((_, index) => 
                contestant.picks[index] || {
                  symbol: '',
                  name: '-',
                  startPrice: 0,
                  currentPrice: 0,
                  priceChange: 0,
                  startDate: '',
                  yield: undefined
                }
              );

              return (
                <React.Fragment key={contestant.contestant}>
                  {standardizedPicks.map((stock, idx) => (
                    <tr key={`${contestant.contestant}-${idx}`}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        {idx === 0 ? contestant.contestant : ''}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {stock.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-right">
                        {stock.startPrice ? `$${stock.startPrice.toFixed(2)}` : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-right">
                        {stock.currentPrice ? `$${stock.currentPrice.toFixed(2)}` : '-'}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-right ${
                        stock.symbol ? (stock.priceChange >= 0 ? 'text-emerald-400' : 'text-red-400') : 'text-gray-300'
                      }`}>
                        {stock.symbol ? `${stock.priceChange.toFixed(2)}%` : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-right">
                        {stock.yield ? `${(stock.yield * 100).toFixed(2)}%` : '-'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-800">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-white sm:pl-0">Total</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white text-right font-medium">
                      {contestant.total.startValue ? `$${contestant.total.startValue.toFixed(2)}` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white text-right font-medium">
                      {contestant.total.currentValue ? `$${contestant.total.currentValue.toFixed(2)}` : '-'}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm text-right font-medium ${
                      contestant.total.startValue ? (contestant.total.percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400') : 'text-gray-300'
                    }`}>
                      {contestant.total.startValue ? `${contestant.total.percentageChange.toFixed(2)}%` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"></td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr className="bg-gray-800/50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-white sm:pl-0">Grand total</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"></td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-white text-right font-bold">${yearData.grandTotal.startValue.toFixed(2)}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-white text-right font-bold">${yearData.grandTotal.currentValue.toFixed(2)}</td>
              <td className={`whitespace-nowrap px-3 py-4 text-sm text-right font-bold ${
                yearData.grandTotal.percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {yearData.grandTotal.percentageChange.toFixed(2)}%
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
} 