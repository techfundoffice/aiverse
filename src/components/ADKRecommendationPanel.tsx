import React, { useState } from 'react'
import { Search, Filter, Sparkles, Star, TrendingUp, Users, Zap } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface RecommendationResult {
  recommendation: string
  relevantTools: any[]
  totalToolsAnalyzed: number
  filters: {
    budget?: string
    experience_level?: string
    use_case?: string
  }
}

function ADKRecommendationPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RecommendationResult | null>(null)
  const [formData, setFormData] = useState({
    query: '',
    requirements: '',
    budget: 'medium',
    experience: 'intermediate',
    useCase: 'business'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await supabase.functions.invoke('adk-tool-recommendation-agent', {
        body: {
          userQuery: formData.query,
          userRequirements: formData.requirements,
          budget: formData.budget,
          experience_level: formData.experience,
          use_case: formData.useCase
        }
      })
      
      if (error) throw error
      setResult(data)
    } catch (error) {
      console.error('Recommendation error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 group"
        aria-label="Get AI Tool Recommendations"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:scale-105">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap">
              Smart Recommendations
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Smart AI Tool Recommendations</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Powered by ADK Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!result ? (
            /* Input Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What kind of AI tools are you looking for?
                </label>
                <textarea
                  value={formData.query}
                  onChange={(e) => setFormData({...formData, query: e.target.value})}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
                  rows={3}
                  placeholder="e.g., Content creation tools for my marketing agency..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specific Requirements
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
                  rows={2}
                  placeholder="e.g., Must integrate with Slack, support multiple languages..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
                  >
                    <option value="free">Free only</option>
                    <option value="low">Low ($0-50/month)</option>
                    <option value="medium">Medium ($50-200/month)</option>
                    <option value="high">High (No limit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Use Case
                  </label>
                  <select
                    value={formData.useCase}
                    onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
                  >
                    <option value="personal">Personal use</option>
                    <option value="business">Business</option>
                    <option value="agency">Agency/Client work</option>
                    <option value="startup">Startup</option>
                    <option value="education">Education</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.query}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Get Smart Recommendations</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Results */
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-semibold">Analysis Complete - {result.totalToolsAnalyzed} tools analyzed</span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {result.recommendation}
                  </div>
                </div>
              </div>

              {result.relevantTools.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Relevant Tools Found</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.relevantTools.slice(0, 6).map((tool, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{tool.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                            {tool.category}
                          </span>
                          {tool.popularity_score > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-gray-500">{tool.popularity_score}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  New Search
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ADKRecommendationPanel