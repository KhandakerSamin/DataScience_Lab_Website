"use client"

import { useState } from "react"
import { Filter, Calendar, Newspaper, Grid3X3 } from "lucide-react"

export default function FilterTabs({ activeFilter, onFilterChange, resultCount }) {
  const [selected, setSelected] = useState(activeFilter)

  const handleClick = (value) => {
    setSelected(value)
    onFilterChange(value)
  }

  return (
    <div className="bg-white border-b border-gray-200 top-0 z-10 shadow-sm font-outfit">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tab Buttons */}
          <div className="grid w-full md:w-auto grid-cols-3 bg-gray-100 rounded-xl p-1 h-12">
            <button
              onClick={() => handleClick("all")}
              className={`flex items-center justify-center gap-2 font-medium px-4 rounded-lg transition-all ${
                selected === "all"
                  ? "bg-[#09509E] text-white"
                  : "text-[#09509E] hover:bg-gray-200"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              All
            </button>
            <button
              onClick={() => handleClick("event")}
              className={`flex items-center justify-center gap-2 font-medium px-4 rounded-lg transition-all ${
                selected === "event"
                  ? "bg-[#09509E] text-white"
                  : "text-[#09509E] hover:bg-gray-200"
              }`}
            >
              <Calendar className="h-4 w-4" />
              Events
            </button>
            <button
              onClick={() => handleClick("news")}
              className={`flex items-center justify-center gap-2 font-medium px-4 rounded-lg transition-all ${
                selected === "news"
                  ? "bg-[#09509E] text-white"
                  : "text-[#09509E] hover:bg-gray-200"
              }`}
            >
              <Newspaper className="h-4 w-4" />
              News
            </button>
          </div>

          {/* Filter Info */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <p className="text-[#39B24A] font-bold">
              {resultCount} {resultCount === 1 ? "result" : "results"} found
            </p>
            <div className="flex items-center gap-2 text-sm text-[#09509E]/70">
              <Filter className="h-4 w-4" />
              Newest first
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
