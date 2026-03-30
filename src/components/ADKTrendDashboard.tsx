import React, { useState, useEffect } from 'react'
import { TrendingUp, BarChart3, Calendar, Filter, Sparkles, ArrowUp, ArrowDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface TrendData {
  analysis: string
  statistics: {
    totalTools: number
    categoryStats: Record<string, any>
    monthlyStats: Record<string, any>
    topTools: any[]
  }
  parameters: {
    category?: string
    timeframe?: string
    analysisType?: string
  }
}

function ADKTrendDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [trendData, setTrendData] = useState<TrendData | null>(null)
  const [filters, setFilters] = useState({
    category: 'all',
    timeframe: 'month',
    analysisType: 'general'
  })

  const loadTrends = async () => {
    setLoading(true)
    
    try {
      const { data, error } = await supabase.functions.invoke('adk-trend-analysis-agent', {
        body: filters
      })
      
      if (error) throw error
      setTrendData(data)
    } catch (error) {
      console.error('Trend analysis error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !trendData) {
      loadTrends()
    }
  }, [isOpen])

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'artificial-intelligence', label: 'AI & ML' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'writing', label: 'Writing' },
    { value: 'video', label: 'Video' },
    { value: 'development', label: 'Development' }
  ]

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 group"
        aria-label="View AI Tools Trends"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-green-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:scale-105">
            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
            <TrendingUp className="h-3 w-3 text-white" />
          </div>
          
          <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap">
              Market Trends
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Tools Market Trends</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time analysis powered by ADK</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeframe
              </label>
              <select
                value={filters.timeframe}
                onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-green-500"
              >
                {timeframes.map(tf => (
                  <option key={tf.value} value={tf.value}>{tf.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={loadTrends}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    <span>Update Trends</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && !trendData ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Analyzing market trends...</p>
              </div>
            </div>
          ) : trendData ? (
            <div className="p-6 space-y-6">
              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Tools</p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{trendData.statistics.totalTools}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">Categories</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-300">{Object.keys(trendData.statistics.categoryStats).length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Time Period</p>
                      <p className="text-lg font-bold text-purple-800 dark:text-purple-300 capitalize">{filters.timeframe}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Top Tools</p>
                      <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">{trendData.statistics.topTools.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Text */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Market Analysis
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {trendData.analysis}
                  </div>
                </div>
              </div>

              {/* Top Performing Tools */}
              {trendData.statistics.topTools.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Performing Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trendData.statistics.topTools.slice(0, 6).map((tool, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{tool.name}</h4>
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <ArrowUp className="h-4 w-4" />
                            <span className="text-sm font-medium">{tool.popularity}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tool.category}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Created: {new Date(tool.created).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Click "Update Trends" to see the latest market analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ADKTrendDashboard