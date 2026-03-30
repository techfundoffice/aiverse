import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Sparkles, Minimize2, Maximize2, Send, User, Bot } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function AIAssistantChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
      // Add initial message if it's the first time opening
      if (messages.length === 0) {
        setMessages([{
          id: '1',
          role: 'assistant',
          content: "Hi! I'm your AI tool discovery assistant. I can help you find the perfect AI tools for any project. What are you working on?",
          timestamp: new Date()
        }])
      }
    }
  }

  const minimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('https://qrxvknkbjrkhbxjyzibd.supabase.co/functions/v1/ai-agent-chat-fallback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          query: input.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const result = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.data?.response || 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessageContent = (content: string) => {
    // Simple formatting for lists and bold text
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('•') || line.startsWith('-')) {
          return (
            <div key={index} className="ml-4 mb-1">
              {line}
            </div>
          )
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <div key={index} className="font-semibold mb-2">
              {line.slice(2, -2)}
            </div>
          )
        }
        return line && (
          <div key={index} className={line ? 'mb-2' : 'mb-1'}>
            {line}
          </div>
        )
      })
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
          <div className={`relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-300 ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-full md:w-96 lg:w-[28rem] h-[32rem] md:h-[36rem]'
          } max-w-full max-h-full flex flex-col`}>
            
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
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

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          )}
                        </div>
                        
                        {/* Message bubble */}
                        <div className={`p-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                        }`}>
                          <div className="text-sm leading-relaxed">
                            {formatMessageContent(message.content)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-md">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <div className="flex items-end gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about AI tools, get recommendations..."
                      className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistantChat