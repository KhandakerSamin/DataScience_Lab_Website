"use client"

import { Search } from "lucide-react"

export default function Banner({ searchTerm, onSearchChange }) {
  return (
    <div className="relative overflow-hidden bg-white py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/5 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-blue-500/5 rounded-full animate-bounce" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-3">Projects & Development</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
          Explore our innovative solutions in machine learning, web development, and cutting-edge technology
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex-shrink-0 pl-5">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects, technologies, topics..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 border-0 bg-transparent text-base px-4 py-4 text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 mt-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="font-medium">15+ Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="font-medium">8+ Technologies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="font-medium">5+ Research Papers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
