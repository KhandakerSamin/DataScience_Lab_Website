"use client"

import { Search } from "lucide-react"

export default function Banner({ searchTerm, onSearchChange }) {
  return (
    <div className="relative overflow-hidden bg-white py-12 px-4">
      {/* Minimal animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#39B24A]/5 rounded-full animate-pulse" />
        <div
          className="absolute top-20 right-20 w-24 h-24 bg-[#09509E]/5 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-16 left-1/4 w-16 h-16 bg-[#39B24A]/8 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-[#09509E]/6 rounded-full animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-32 left-1/3 w-12 h-12 border-2 border-[#39B24A]/10 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-32 right-1/4 w-8 h-8 border-2 border-[#09509E]/10 rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 400" fill="none">
          <path
            d="M0,200 Q250,150 500,200 T1000,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,250 Q300,200 600,250 T1000,250"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39B24A" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#39B24A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#39B24A" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#09509E" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#09509E" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#09509E" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#39B24A] mb-3">Events & News</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
          Stay updated with our latest research, workshops, and developments
        </p>

        {/* Replaced Input (no shadcn) */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-200 transition-colors duration-300">
              <div className="flex-shrink-0 pl-5">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events, news, topics..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 border-0 bg-transparent text-base px-4 py-4 text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 mt-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#09509E] rounded-full" />
            <span className="font-medium">50+ Research Papers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#09509E] rounded-full" />
            <span className="font-medium">25+ Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#09509E] rounded-full" />
            <span className="font-medium">100+ Participants</span>
          </div>
        </div>
      </div>
    </div>
  )
}
