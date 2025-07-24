"use client"
import { useState, useEffect } from "react"
import WebsiteLoader from "./WebsiteLoader"

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Super fast - 0.8 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <WebsiteLoader onLoadingComplete={() => setIsLoading(false)} />}
      <div style={{ display: isLoading ? "none" : "block" }}>{children}</div>
    </>
  )
}
