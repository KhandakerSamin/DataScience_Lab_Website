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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="w-full font-outfit border border-gray-200 hover:border-[#09509E]/40 transition-all duration-300 hover:shadow-lg bg-white overflow-hidden group rounded-xl">
      <div className="flex h-64">
        {/* Image */}
        <div className="w-80 h-full relative flex-shrink-0 overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#09509E] text-white text-xs px-3 py-1 rounded-md font-medium shadow-sm">
              {item.type === "event" ? "Event" : "News"}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content */}
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
              {item.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 border border-[#09509E]/30 text-[#09509E] rounded-full">
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

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {item.type === "event" && item.capacity && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{item.capacity}</span>
              </div>
            )}
            {item.type === "news" && item.authors && (
              <div className="flex items-center gap-1">
                <span>By {item.authors[0]}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400">{item.type === "event" ? "Upcoming" : "Published"}</div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 bg-white">
          <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-700 mb-6 leading-relaxed text-base">{item.fullDescription}</p>

            {item.type === "event" && (
              <div className="space-y-3 mb-6">
                {item.speakers && (
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="font-semibold text-[#39B24A] min-w-fit">Speakers:</span>
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
              <div className="space-y-3 mb-6">
                {item.authors && (
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="font-semibold text-[#39B24A] min-w-fit">Authors:</span>
                    <span className="text-gray-700">{item.authors.join(", ")}</span>
                  </div>
                )}
                {item.student && (
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="font-semibold text-[#39B24A] min-w-fit">Student:</span>
                    <span className="text-gray-700">{item.student}</span>
                  </div>
                )}
                {item.advisor && (
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="font-semibold text-[#39B24A] min-w-fit">Advisor:</span>
                    <span className="text-gray-700">{item.advisor}</span>
                  </div>
                )}
                {item.partners && (
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="font-semibold text-[#39B24A] min-w-fit">Partners:</span>
                    <span className="text-gray-700">{item.partners.join(", ")}</span>
                  </div>
                )}
              </div>
            )}

            {item.type === "event" && (
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="bg-[#09509E] hover:bg-[#0a4a8a] text-white font-medium px-6 py-2 rounded-md flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Register Now
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={toggleExpanded}
                className="text-[#39B24A] hover:text-[#2E8B3C] font-bold text-sm transition-colors duration-200"
              >
                Show less
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
