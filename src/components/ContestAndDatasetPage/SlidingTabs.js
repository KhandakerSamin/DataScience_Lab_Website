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
    <div className="relative mb-8 font-outfit">
      <div className="flex items-center ">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`p-1.5 px-2 mr-1 rounded-l-full ${
            !canScrollLeft
             ? "opacity-50 cursor-not-allowed border-1 border-gray-300"
              : "bg-[#09509E] hover:text-black hover:bg-white text-white font-bold border-1 border-gray-300 focus:outline-none  "
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
          <div className="flex space-x-2 pb-2 pt-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 flex-shrink-0 transition-colors   ${
                  activeTab === tab
                    ? "bg-[#09509E] text-white "
                    : "bg-white text-gray-700 hover:text-white border border-gray-300 hover:bg-blue-800"
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
          className={` p-1.5 px-2 ml-1 rounded-r-full ${
            !canScrollRight
              ? "opacity-50 cursor-not-allowed border-1 border-gray-300"
              : "bg-[#09509E] hover:text-black hover:bg-white text-white font-bold border-1 border-gray-300 focus:outline-none  "
          }`}
        >
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  )
}
