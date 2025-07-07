"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function EventCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  return (
    <div className="w-full border border-gray-200 hover:border-[#09509E]/40 transition-all duration-300 hover:shadow-lg bg-white overflow-hidden group rounded-xl">
      <div className="p-0">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-64">
          <div className="w-80 h-full relative flex-shrink-0 overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute top-4 left-4">
              <span
                className={
                  item.type === "event"
                    ? "bg-[#09509E] text-white text-xs font-medium px-3 py-1 rounded shadow-sm"
                    : "bg-[#2E8B3C] text-white text-xs font-medium px-3 py-1 rounded shadow-sm"
                }
              >
                {item.type === "event" ? "Event" : "News"}
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#09509E] font-medium mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(item.date)}
                </div>
                {item.time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {item.time}
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#39B24A] leading-tight mb-3 line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">{item.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-[#09509E]/30 text-[#09509E] px-2 py-0.5 rounded hover:bg-[#09509E]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {!isExpanded && (
              <button
                onClick={toggleExpanded}
                className="text-[#39B24A] hover:text-[#2E8B3C] font-bold text-sm transition-colors duration-200 text-left"
              >
                See more...
              </button>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="w-full h-48 relative overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-[#09509E] text-white text-xs font-medium px-2 py-1 rounded shadow-sm">
                {item.type === "event" ? "Event" : "News"}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-2 text-xs text-[#09509E] font-medium mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(item.date)}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {item.time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[150px]">{item.location}</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#39B24A] leading-tight mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">{item.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-[#09509E]/30 text-[#09509E] px-2 py-0.5 rounded hover:bg-[#09509E]/5"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 2 && (
                <span className="text-xs border border-gray-300 text-gray-500 px-2 py-0.5 rounded">+{item.tags.length - 2}</span>
              )}
            </div>

            {!isExpanded && (
              <button
                onClick={toggleExpanded}
                className="text-[#39B24A] hover:text-[#2E8B3C] font-bold text-sm transition-colors duration-200"
              >
                See more...
              </button>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
              {item.type === "event" && item.capacity && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">{item.capacity}</span>
                  <span className="sm:hidden">{item.capacity.split(" ")[0]}</span>
                </div>
              )}
              {item.type === "news" && item.authors && (
                <div className="flex items-center gap-1">
                  <span className="truncate max-w-[120px] md:max-w-none">By {item.authors[0]}</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400">{item.type === "event" ? "Upcoming" : "Published"}</div>
          </div>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-4 md:px-6 pb-4 md:pb-6 bg-white">
            <div className="mt-4 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{item.fullDescription}</p>

              {item.type === "event" && (
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {item.speakers && (
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <span className="font-semibold text-[#39B24A] text-sm md:text-base">Speakers:</span>
                      <span className="text-gray-700">{item.speakers.join(", ")}</span>
                    </div>
                  )}
                  {item.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#39B24A]" />
                      <span className="text-gray-700">{item.capacity}</span>
                    </div>
                  )}
                </div>
              )}

              {item.type === "news" && (
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {item.authors && (
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <span className="font-semibold text-[#39B24A]">Authors:</span>
                      <span className="text-gray-700">{item.authors.join(", ")}</span>
                    </div>
                  )}
                  {item.student && (
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <span className="font-semibold text-[#39B24A]">Student:</span>
                      <span className="text-gray-700">{item.student}</span>
                    </div>
                  )}
                  {item.advisor && (
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <span className="font-semibold text-[#39B24A]">Advisor:</span>
                      <span className="text-gray-700">{item.advisor}</span>
                    </div>
                  )}
                  {item.partners && (
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                      <span className="font-semibold text-[#39B24A]">Partners:</span>
                      <span className="text-gray-700">{item.partners.join(", ")}</span>
                    </div>
                  )}
                </div>
              )}

              {item.type === "event" && (
                <div className="flex flex-wrap gap-3 mb-4 md:mb-6">
                  <button className="bg-[#09509E] hover:bg-[#0a4a8a] text-white font-medium px-4 md:px-6 py-2 rounded text-sm md:text-base w-full md:w-auto">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Register Now
                    </div>
                  </button>
                </div>
              )}

              <div className="pt-3 md:pt-4 border-t border-gray-200">
                <button
                  onClick={toggleExpanded}
                  className="text-red-400 hover:text-red-600 font-bold text-sm transition-colors duration-200"
                >
                  Show less
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
