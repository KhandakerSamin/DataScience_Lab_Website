"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Minimize2, Maximize2, CircleUserRound } from "lucide-react"
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

  // Function to clean and format text responses
  const cleanAndFormatText = (text, isFirstMessage) => {
    if (!text) return text

    let cleanedText = text
      // Remove markdown bold to simple emphasis
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove ** bold
      .replace(/__(.*?)__/g, "$1") // Remove __ bold

      // Convert markdown italic to simple text
      .replace(/\*(.*?)\*/g, "$1") // Remove * italic
      .replace(/_(.*?)_/g, "$1") // Remove _ italic

      // Remove headers but keep the text
      .replace(/^#{1,6}\s+/gm, "")

      // Handle code blocks - keep them as plain text with simple formatting
      .replace(/```[\w]*\n?([\s\S]*?)```/g, (match, code) => {
        return `\n--- Code ---\n${code.trim()}\n--- End Code ---\n`
      })

      // Remove inline code backticks but keep the content
      .replace(/`([^`]+)`/g, "$1")

      // Remove strikethrough
      .replace(/~~(.*?)~~/g, "$1")

      // Clean up links - keep just the text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Clean up extra whitespace
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    // Remove repetitive greetings for non-initial messages
    if (!isFirstMessage) {
      cleanedText = cleanedText
        .replace(
          /^😊\s*As ROBO, the AI assistant for the Data Science Lab at Daffodil International University, I'm ready to help you with any questions you have about DIU, the Data Science Lab, or anything else\.\s*What can I assist you with today\?\s*/i,
          ""
        )
        .replace(
          /^Hey there! 👋\s*I'm ROBO, your friendly AI assistant from the Data Science Lab at Daffodil International University!\s*/i,
          ""
        )
        .replace(/^Hello! I'm ROBO[^!]*!\s*/i, "")
        .replace(/^Hi! I'm ROBO[^!]*!\s*/i, "")
        .trim()
    }

    return cleanedText
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
      setTimeout(() => {
        setIsTyping(false)

        if (response.ok && data.response) {
          const botMessage = {
            id: Date.now() + 1,
            text: cleanAndFormatText(data.response, messages.length === 1),
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

        // Refocus the input field after message is processed
        if (isOpen && !isMinimized && inputRef.current) {
          inputRef.current.focus()
        }
      }, 800 + Math.random() * 700)
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

      // Refocus the input field after error
      if (isOpen && !isMinimized && inputRef.current) {
        inputRef.current.focus()
      }
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
      {/* Mobile Full Screen Chat (md:hidden) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-[#09509E]/70 via-[#07407A]/50 to-[#09509E]/70 backdrop-blur-md text-white p-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10 animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full translate-x-8 translate-y-8 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-lg rounded-xl flex items-center justify-center border-2 border-white/40">
                  <Image
                    src="/robo.svg"
                    alt="ROBO Assistant"
                    width={36}
                    height={36}
                    className="filter brightness-100 contrast-200"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">ROBO</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></div>
                    <p className="text-base text-green-100">DS Lab Assistant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-3 hover:bg-white/20 rounded-lg transition-all duration-200"
                  aria-label="Minimize chat"
                >
                  {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 hover:bg-white/20 rounded-lg transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Chat Content */}
          {!isMinimized && (
            <>
              {/* Mobile Quick Questions */}
              {messages.length === 1 && (
                <div className="p-5 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm border-b border-gray-100=s/50">
                  <p className="text-sm text-gray-600 mb-4 font-medium">Quick questions:</p>
                  <div className="grid grid-cols-1 gap-3">
                    {quickQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="text-left text-sm bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-4 py-3 hover:border-[#39B24A] hover:bg-green-50/80 transition-all duration-200 text-gray-700"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Messages Area */}
              <div className="flex-1 min-h-[400px] overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50/50 to-white/80 backdrop-blur-sm overflow-x-hidden">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-5 py-4 rounded-xl relative break-words ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#09509E] to-[#0a4a8a] text-white rounded-br-md shadow-lg"
                          : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-md shadow-md border border-gray-100/50"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/30">
                            <Image
                              src="/robo.svg"
                              alt="ROBO"
                              width={20}
                              height={20}
                              className="filter brightness-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                              {message.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-3">{formatTime(message.timestamp)}</p>
                          </div>
                        </div>
                      )}

                      {message.sender === "user" && (
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-base leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                              {message.text}
                            </p>
                            <p className="text-xs text-blue-100 mt-3">{formatTime(message.timestamp)}</p>
                          </div>
                          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CircleUserRound className="text-white w-5 h-5" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Mobile Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl rounded-bl-md shadow-md border border-gray-100/50 px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                          <Image
                            src="/robo.svg"
                            alt="ROBO"
                            width={20}
                            height={20}
                            className="filter brightness-110 animate-pulse"
                          />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#39B24A] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#39B24A] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#39B24A] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Mobile Input Area */}
              <div className="p-5 bg-white/90 backdrop-blur-sm border-t border-gray-100/50">
                <div className="flex items-end gap-4">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="w-full px-5 py-4 pr-12 border-2 border-gray-200/50 rounded-xl focus:ring-1 focus:ring-[#09509E] focus:border-[#09509E] outline-none resize-none text-base transition-all duration-200 bg-gray-50/80 focus:bg-white backdrop-blur-sm"
                      rows={1}
                      style={{ minHeight: "52px", maxHeight: "120px" }}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-14 h-14 mb-2.5 bg-gradient-to-r from-[#09509E] to-[#07407A] hover:from-[#07407A] hover:to-[#09509E] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">Powered by AI • Samin • Press Enter to send</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Desktop Compact Chat Widget (hidden md:block) */}
      {isOpen && (
        <div className="hidden md:block fixed bottom-6 right-4 md:right-6 w-96 md:w-[460px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-40 overflow-hidden">
          {/* Desktop Header */}
          <div className="bg-gradient-to-r from-[#09509E]/70 via-[#07407A]/50 to-[#09509E]/70 backdrop-blur-md text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8 animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full translate-x-6 translate-y-6 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-lg rounded-xl flex items-center justify-center border-2 border-white/40">
                  <Image
                    src="/robo.svg"
                    alt="ROBO Assistant"
                    width={32}
                    height={32}
                    className="filter brightness-100 contrast-200"
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
              <div className="flex items-center gap-2">
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

          {/* Desktop Chat Content */}
          {!isMinimized && (
            <>
              {/* Desktop Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm border-b border-gray-100/50">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Quick questions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.slice(0, 2).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="text-left text-sm bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-3 py-2 hover:border-[#39B24A] hover:bg-green-50/80 transition-all duration-200 text-gray-700"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop Messages Area */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/80 backdrop-blur-sm overflow-x-hidden">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-xl relative break-words ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#09509E] to-[#0a4a8a] text-white rounded-br-md shadow-lg"
                          : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-md shadow-md border border-gray-100/50"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/30">
                            <Image
                              src="/robo.svg"
                              alt="ROBO"
                              width={16}
                              height={16}
                              className="filter brightness-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                              {message.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{formatTime(message.timestamp)}</p>
                          </div>
                        </div>
                      )}

                      {message.sender === "user" && (
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere">
                              {message.text}
                            </p>
                            <p className="text-xs text-blue-100 mt-2">{formatTime(message.timestamp)}</p>
                          </div>
                          <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CircleUserRound className="text-white w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Desktop Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl rounded-bl-md shadow-md border border-gray-100/50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                          <Image
                            src="/robo.svg"
                            alt="ROBO"
                            width={16}
                            height={16}
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

              {/* Desktop Input Area */}
              <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-gray-100/50">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="w-full px-4 py-3 pr-10 border-2 border-gray-200/50 rounded-xl focus:ring-0.5 focus:ring-[#09509E] focus:border-[#09509E] outline-none resize-none text-sm transition-all duration-200 bg-gray-50/80 focus:bg-white backdrop-blur-sm"
                      rows={1}
                      style={{ minHeight: "44px", maxHeight: "100px" }}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-11 mb-[8px] h-11 bg-gradient-to-r from-[#09509E] to-[#07407A] hover:from-[#07407A] hover:to-[#09509E] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
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

      {/* Floating Action Button - Only show when chat is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 group transform hover:scale-105 border-2 border-white/60"
          aria-label="Open ROBO Assistant"
        >
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

          {/* Notification Badge - Hides on scroll */}
          {showNotification && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-opacity duration-300">
              <span className="text-[0.6rem] text-white font-semibold"></span>
            </div>
          )}
        </button>
      )}

      {/* Welcome Tooltip (only show on desktop when chat is closed) */}
      {!isOpen && showNotification && (
        <div className="hidden md:block fixed bottom-24 right-6 bg-white/90 backdrop-blur-lg text-gray-800 px-3 py-2 rounded-xl shadow-xl border border-white/20 text-sm z-30 animate-bounce max-w-xs transition-opacity duration-300">
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                <Image src="/robo.svg" alt="ROBO" width={14} height={14} className="filter brightness-110" />
              </div>
              <div>
                <p className="font-semibold text-[#39B24A] text-xs">Hi! I am ROBO </p>
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