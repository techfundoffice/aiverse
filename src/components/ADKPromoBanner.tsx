import React, { useState } from 'react'
import { Sparkles, Code, Zap, ArrowRight, Copy, Check } from 'lucide-react'

function ADKPromoBanner() {
  const [copied, setCopied] = useState(false)
  const command = 'npx copilotkit@latest create -f adk'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl mb-8">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header with icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-6 w-6" />
              <span className="font-semibold text-sm uppercase tracking-wider">New Integration</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Delight users by combining ADK Agents with Fancy Frontends using AG-UI
          </h1>

          {/* Value proposition */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            Build sophisticated AI agents on the backend and give them a production-ready, collaborative frontend with minimal effort.
          </p>

          {/* Command snippet */}
          <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700 shadow-inner max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold text-sm">Get Started</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors duration-200"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <code className="text-white font-mono text-lg block break-all">
              {command}
            </code>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Generative UI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dynamic interfaces</p>
            </div>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Shared State</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Synchronized data</p>
            </div>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Human-in-Loop</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive workflows</p>
            </div>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Frontend Tools</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ready components</p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://docs.copilotkit.ai/adk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Learn More</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/CopilotKit/CopilotKit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold rounded-2xl border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <span>View on GitHub</span>
              <Code className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ADKPromoBanner