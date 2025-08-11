"use client"

import { useState, useEffect } from "react"
import { Calendar, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function Events() {
  const [eventsNewsData, setEventsNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/events`)
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        const result = await response.json()
        setEventsNewsData(result.data || [])
      } catch (err) {
        setError(err.message)
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="w-full bg-gray-50 font-outfit">
        <div className="py-[200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1220px] mx-auto text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39B24A]"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full bg-gray-50 font-outfit">
        <div className="py-[200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1220px] mx-auto text-center">
            <p className="text-red-600 mb-4">Error loading events: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#39B24A] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Get all events first
  const allEvents = eventsNewsData.filter((item) => item.type === "event")
  console.log("All events found:", allEvents.length)
  console.log("All events:", allEvents)

  if (allEvents.length === 0) {
    return (
      <section className="w-full bg-gray-50 font-outfit">
        <div className="py-[200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1220px] mx-auto text-center">
            <div className="text-gray-400 text-6xl mb-6">📅</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">No Events Available</h2>
            <p className="text-gray-500 text-lg mb-8">
              We don&apos;t have any events scheduled at the moment. Check back soon for exciting updates!
            </p>
            <Link href="/news-events">
              <button className="inline-flex items-center gap-2 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-6 py-3 rounded-full text-lg font-normal transition-colors duration-200 group">
                View All News & Events
                <ChevronRight
                  className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                  size={24}
                  strokeWidth={2}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

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

    if (recentEvents.length === 0) {
      return (
        <section className="w-full bg-gray-50 font-outfit">
          <div className="py-[200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1220px] mx-auto text-center">
              <div className="text-gray-400 text-6xl mb-6">📅</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">No Upcoming Events</h2>
              <p className="text-gray-500 text-lg mb-8">
                We don&apos;t have any upcoming events scheduled at the moment. Stay tuned for exciting announcements!
              </p>
              <Link href="/news-events">
                <button className="inline-flex items-center gap-2 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-6 py-3 rounded-full text-lg font-normal transition-colors duration-200 group">
                  View All News & Events
                  <ChevronRight
                    className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="w-full bg-gray-50 font-outfit">
        <div className="py-[200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1220px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#39B24A] mb-6">Our Recent Events</h2>
              <p className="text-gray-700 text-lg md:text-xl font-normal max-w-4xl mx-auto leading-relaxed">
                Check out our recent events and stay tuned for upcoming announcements!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentEvents.map((event, index) => (
                <div
                  key={event.id || `recent-event-${index}`}
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
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Past Event</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{event.description}</p>
                    {event.registrationLink && (
                      <div className="mb-4">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Register Now
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
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
      <div className="py-[200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1220px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-4xl font-bold text-[#39B24A] mb-6">Our Latest Events</h2>
            <p className="text-gray-700 text-lg md:text-xl font-normal max-w-4xl mx-auto leading-relaxed">
              The Editors At Solutions Review Have Compiled This List Of The Best Data Science Events And Conferences To
              Attend This Year, So Mark Your Calendar!
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id || `upcoming-event-${index}`}
                className="bg-white rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full"
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
                  {event.registrationLink && (
                    <div className="mb-4">
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
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
