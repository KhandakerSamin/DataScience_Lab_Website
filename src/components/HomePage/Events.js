"use client"

import { Calendar, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { eventsNewsData } from "../../data/eventsData"

export default function Events() {
  // Get all events first
  const allEvents = eventsNewsData.filter((item) => item.type === "event")
  console.log("All events found:", allEvents.length)
  console.log("All events:", allEvents)

  // Get future events
  const futureEvents = allEvents.filter((item) => new Date(item.date) >= new Date())
  console.log("Future events found:", futureEvents.length)
  console.log("Future events:", futureEvents)

  // Get top 3 upcoming events
  const upcomingEvents = futureEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date (earliest first)
    .slice(0, 3) // Take only first 3

  console.log("Final upcoming events to display:", upcomingEvents.length)
  console.log("Upcoming events:", upcomingEvents)

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // If no upcoming events, show recent events
  if (upcomingEvents.length === 0) {
    console.log("No upcoming events found, showing recent events instead")
    const recentEvents = allEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

    return (
      <section className="w-full bg-gray-50 font-outfit">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#39B24A] mb-6">Our Recent Events</h2>
              <p className="text-gray-700 text-lg md:text-xl font-normal max-w-4xl mx-auto leading-relaxed">
                Check out our recent events and stay tuned for upcoming announcements!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full"
                >
                  <div className="relative overflow-hidden h-48 bg-gray-200 group">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-[#09509E] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{event.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <Link
                        href="/news-events"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 group/link"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                      <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-[#09509E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-green-600 via-[#09509E] to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/news-events">
                <button className="inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
                  View All Events
                  <ChevronRight
                    className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-gray-50 font-outfit">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#39B24A] mb-6">Our Latest Events</h2>
            <p className="text-gray-700 text-lg md:text-xl font-normal max-w-4xl mx-auto leading-relaxed">
              The Editors At Solutions Review Have Compiled This List Of The Best Data Science Events And Conferences To
              Attend This Year, So Mark Your Calendar!
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 bg-gray-200 group">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-[#09509E] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{event.description}</p>

                  {/* Read More Link - Always at bottom */}
                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      href="/news-events"
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                    {/* Decorative Element */}
                    <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-[#09509E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Bottom Border Accent */}
                <div className="h-1 bg-gradient-to-r from-green-600 via-[#09509E] to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="text-center mt-12">
            <Link href="/news-events">
              <button className="inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
                View All Events
                <ChevronRight
                  className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                  size={24}
                  strokeWidth={2}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
