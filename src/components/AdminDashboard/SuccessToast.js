"use client"
import { useState, useEffect } from "react"

export default function SuccessToast({ isOpen, onClose, message, type = "success" }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-sm transform transition-all duration-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } ${type === "success" ? "border-green-500" : type === "error" ? "border-red-500" : "border-blue-500"}`}
      >
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              type === "success" ? "bg-green-100" : type === "error" ? "bg-red-100" : "bg-blue-100"
            }`}
          >
            {type === "success" && (
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {type === "error" && (
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <p
            className={`text-sm font-medium ${
              type === "success" ? "text-green-800" : type === "error" ? "text-red-800" : "text-blue-800"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
