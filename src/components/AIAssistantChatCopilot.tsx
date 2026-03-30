import React, { useState } from 'react'
import { CopilotChat } from '@copilotkit/react-ui'
import { MessageSquare, X, Sparkles, Minimize2, Maximize2 } from 'lucide-react'
import '@copilotkit/react-ui/styles.css'

function AIAssistantChatCopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open AIverse Assistant"
        >
          <div className="relative">
            {/* Main button with neumorphic styling */}
            <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:scale-105">
              <MessageSquare className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            
            {/* Animated sparkle indicator */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap">
                AIverse Assistant
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
          {/* Backdrop for mobile */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm md:hidden" 
            onClick={toggleChat}
          ></div>
          
          {/* Chat Container */}
          <div className={`relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-300 overflow-hidden ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-full md:w-96 lg:w-[28rem] h-[32rem] md:h-[36rem]'
          } max-w-full max-h-full flex flex-col`}>
            
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white/50 dark:bg-gray-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">AIverse Assistant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI Tool Expert</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={minimizeChat}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Minimize2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Chat Content - CopilotKit Integration */}
            {!isMinimized && (
              <div className="flex-1 copilot-chat-container">
                <CopilotChat
                  instructions={`You are AIverse Assistant, an expert AI consultant powered by advanced ADK (Agent Development Kit) technology, specialized in helping users discover and choose the best AI tools for their needs.

Your enhanced capabilities:

🤖 **Smart Recommendations**: Use "recommend" or "suggest" to get personalized tool recommendations based on your specific needs, budget, and experience level

🔄 **Tool Comparisons**: Use "compare" or "vs" to get detailed side-by-side analysis of different AI tools with pros, cons, and use case recommendations

📈 **Market Trends**: Ask about "trends", "popular", or "latest" tools to get real-time market analysis and emerging technology insights

🎯 **Intelligent Routing**: Your questions are automatically routed to specialized AI agents for the most accurate and detailed responses

Your role:
- Provide intelligent recommendations from a database of 1000+ AI tools
- Help users compare AI tools and features with detailed analysis
- Match tools to specific use cases and requirements
- Offer practical implementation advice and best practices
- Provide market insights and trend analysis
- Stay current with 2025 AI tool developments

Example queries:
- "I need AI tools for content creation with a medium budget"
- "Compare ChatGPT vs Claude for writing assistance"
- "What are the latest trends in AI design tools?"
- "Recommend productivity tools for a small startup"

Always be helpful, specific, and focus on real value for users. Leverage the power of ADK agents for comprehensive, data-driven responses.`}
                  labels={{
                    title: "AIverse Assistant",
                    initial: "Hi! I'm your AI tool discovery assistant powered by ADK (Agent Development Kit) technology. I have access to specialized AI agents for recommendations, comparisons, and trend analysis.\n\n🎯 Try these commands:\n\u2022 \"Recommend tools for...\" - Get personalized suggestions\n\u2022 \"Compare Tool A vs Tool B\" - Detailed analysis\n\u2022 \"Latest trends in...\" - Market insights\n\nWhat can I help you discover today?",
                    placeholder: "Ask for recommendations, comparisons, or trends..."
                  }}
                  className="copilot-chat-custom h-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistantChatCopilot