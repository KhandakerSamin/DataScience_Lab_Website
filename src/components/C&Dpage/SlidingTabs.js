"use client"

import { useState, useRef, useEffect } from "react"

export default function SlidingTabs({ tabs, activeTab, onTabChange }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    checkScrollability()
  }, [])

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" })
      setTimeout(checkScrollability, 300)
    }
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" })
      setTimeout(checkScrollability, 300)
    }
  }

  return (
    <div className="relative mb-8">
      <div className="flex items-center">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`mr-2 p-2 rounded-lg ${
            !canScrollLeft
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
        >
          <span className="text-lg">←</span>
        </button>

        {/* Tabs Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScrollability}
        >
          <div className="flex space-x-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeTab === tab
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`ml-2 p-2 rounded-lg ${
            !canScrollRight
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
        >
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  )
}
