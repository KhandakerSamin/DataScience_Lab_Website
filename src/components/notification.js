"use client"
import { CheckCircle, AlertCircle, X } from "lucide-react"
import { useEffect } from "react"

export default function Notification({ type, message, onClose, isVisible }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const isSuccess = type === "success"
  const bgColor = isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
  const textColor = isSuccess ? "text-green-800" : "text-red-800"
  const iconColor = isSuccess ? "text-green-600" : "text-red-600"

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
        className={`${bgColor} border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-2 duration-300`}
      >
        {isSuccess ? (
          <CheckCircle className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
        ) : (
          <AlertCircle className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
        )}
        <div className="flex-1">
          <p className={`${textColor} font-medium`}>
            {isSuccess ? "Message Sent Successfully!" : "Error Sending Message"}
          </p>
          <p className={`${textColor.replace("800", "700")} text-sm mt-1`}>{message}</p>
        </div>
        <button onClick={onClose} className={`${iconColor} hover:${iconColor.replace("600", "800")} transition-colors`}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
