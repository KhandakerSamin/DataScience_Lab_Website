"use client"

import { useState } from "react"
import { Filter, Calendar, Newspaper, Grid3X3 } from "lucide-react"

export default function FilterTabs({ activeFilter, onFilterChange, resultCount }) {
  const filters = [
    { value: "all", label: "All", icon: Grid3X3 },
    { value: "event", label: "Events", icon: Calendar },
    { value: "news", label: "News", icon: Newspaper },
  ]

  return (
    <div className="bg-white border-b border-gray-200 ">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Custom tab-like buttons */}
          <div className="grid grid-cols-3 w-full md:w-auto bg-gray-100 p-1 rounded-md">
            {filters.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onFilterChange(value)}
                className={`flex items-center justify-center gap-2 px-6 py-2 font-medium rounded-md transition-colors duration-200
                  ${activeFilter === value
                    ? "bg-[#09509E] text-white"
                    : "text-[#09509E] hover:bg-[#09509E]/10"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

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
