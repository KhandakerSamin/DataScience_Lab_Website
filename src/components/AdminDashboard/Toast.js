"use client"
import { useEffect } from "react"

export default function Toast({ message, type = "success", show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"
  const icon = type === "success" ? "✓" : "✕"

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in`}
      >
        <span className="text-lg font-bold">{icon}</span>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  )
}
