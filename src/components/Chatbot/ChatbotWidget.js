"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Minimize2, Maximize2, Volume2, VolumeX, CircleUserRound } from "lucide-react"
import Image from "next/image"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm ROBO, your AI assistant for the Data Science Lab at Daffodil International University. I can help with lab information and answer general questions too! How can I assist you today? 🤖",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showNotification, setShowNotification] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  // Hide notification on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowNotification(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Show notification again after some time of no scrolling
  useEffect(() => {
    if (!showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(true)
      }, 3000) // Show again after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const playNotificationSound = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
      } catch (error) {
        console.log("Audio not supported")
      }
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()

      // Simulate typing delay for better UX
      setTimeout(
        () => {
          setIsTyping(false)

          if (response.ok && data.response) {
            const botMessage = {
              id: Date.now() + 1,
              text: data.response,
              sender: "bot",
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botMessage])
            playNotificationSound()
          } else {
            const errorMessage = {
              id: Date.now() + 1,
              text: "I apologize, but I'm having some technical difficulties. Please try asking your question again, or feel free to contact us directly at datasciencelab@daffodilvarsity.edu.bd 📧",
              sender: "bot",
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
          }
        },
        800 + Math.random() * 700,
      ) // Random delay between 0.8-1.5 seconds
    } catch (error) {
      console.error("Error:", error)
      setIsTyping(false)
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm currently experiencing connectivity issues. Please try again in a moment, or contact us directly at datasciencelab@daffodilvarsity.edu.bd for immediate assistance. 🔧",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const quickQuestions = [
    "What programs do you offer?",
    "Who is the lab in-charge?",
    "What are the admission requirements?",
    "Tell me about research areas",
    "What facilities do you have?",
    "How can I contact you?",
  ]

  return (
    <>
      {/* Compact Modern Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-28 right-4 md:right-6 w-80 md:w-88 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-40 overflow-hidden">
          {/* Redesigned Header */}
          <div className="bg-gradient-to-r from-[#09509E]/70 via-[#07407A]/50 to-[#09509E]/70 backdrop-blur-md text-white p-3 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full translate-x-6 translate-y-6 animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-lg rounded-xl flex items-center justify-center border-2 border-white/40">
                  <Image
                    src="/robo.svg"
                    alt="ROBO Assistant"
                    width={28}
                    height={28}
                    className="filter brightness-100  contrast-200"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ROBO</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <p className="text-sm text-green-100">DS Lab Assistant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
                  aria-label="Minimize chat"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Quick Questions (shown when no messages) */}
              {messages.length === 1 && (
                <div className="p-3 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm border-b border-gray-100/50">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="text-left text-xs bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-2.5 py-1.5 hover:border-[#39B24A] hover:bg-green-50/80 transition-all duration-200 text-gray-700"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compact Messages Area */}
              <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50/50 to-white/80 backdrop-blur-sm overflow-x-hidden">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-xl relative break-words ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#09509E] to-[#0a4a8a] text-white rounded-br-md shadow-lg"
                          : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-md shadow-md border border-gray-100/50"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/30">
                            <Image
                              src="/robo.svg"
                              alt="ROBO"
                              width={14}
                              height={14}
                              className="filter brightness-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                              {message.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</p>
                          </div>
                        </div>
                      )}

                      {message.sender === "user" && (
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                              {message.text}
                            </p>
                            <p className="text-xs text-blue-100 mt-1">{formatTime(message.timestamp)}</p>
                          </div>
                          <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CircleUserRound className="text-white"/>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Compact Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl rounded-bl-md shadow-md border border-gray-100/50 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                          <Image
                            src="/robo.svg"
                            alt="ROBO"
                            width={14}
                            height={14}
                            className="filter brightness-110 animate-pulse"
                          />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-[#39B24A] rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 bg-[#39B24A] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-[#39B24A] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Compact Input Area */}
              <div className="p-3 bg-white/90 backdrop-blur-sm border-t border-gray-100/50">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="w-full px-3 py-2 pr-10 border-2 border-gray-200/50 rounded-xl focus:ring-0.5 focus:ring-[#09509E] focus:border-[#09509E] outline-none resize-none text-sm transition-all duration-200 bg-gray-50/80 focus:bg-white backdrop-blur-sm"
                      rows={1}
                      style={{ minHeight: "40px", maxHeight: "100px" }}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-10 mb-1.5 h-10 bg-gradient-to-r from-[#09509E] to-[#07407A] hover:from-[#07407A] hover:to-[#09509E] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">Powered by AI • Samin • Press Enter to send</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modern Floating Action Button with Consistent Styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 group transform hover:scale-105 border-2 border-white/60"
        aria-label="Open ROBO Assistant"
      >
        {isOpen ? (
          <svg
            className="w-7 h-7 text-[#09509E] transition-transform group-hover:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <Image
              src="/robo.svg"
              alt="ROBO Assistant"
              width={32}
              height={32}
              className="filter brightness-110 group-hover:scale-105 rounded-full"
            />
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
          </div>
        )}

        {/* Notification Badge - Hides on scroll */}
        {!isOpen && showNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-opacity duration-300">
            <span className="text-[0.6rem] text-white font-semibold">!</span>
          </div>
        )}
      </button>

      {/* Compact Welcome Tooltip */}
      {!isOpen && showNotification && (
        <div className="fixed bottom-24 right-6 bg-white/90 backdrop-blur-lg text-gray-800 px-3 py-2 rounded-xl shadow-xl border border-white/20 text-sm z-30 animate-bounce max-w-xs transition-opacity duration-300">
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                <Image src="/robo.svg" alt="ROBO" width={14} height={14} className="filter brightness-110" />
              </div>
              <div>
                <p className="font-semibold text-[#39B24A] text-xs">Hi! I am ROBO 🤖</p>
                <p className="text-xs text-gray-600">Ask me anything!</p>
              </div>
            </div>
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-1 right-6 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white/90"></div>
          </div>
        </div>
      )}
    </>
  )
}