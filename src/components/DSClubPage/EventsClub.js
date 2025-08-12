"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function EventsClub() {
  const [expandedCard, setExpandedCard] = useState(null)
  const [registeredEvents, setRegisteredEvents] = useState(new Set())
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(3)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

  useEffect(() => {
    const fetchClubEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/api/clubEvents`)

        if (!response.ok) {
          throw new Error(`Failed to fetch events (${response.status})`)
        }

        const result = await response.json()

        if (result.success) {
          setEvents(result.data || [])
        } else {
          throw new Error(result.error || "Failed to fetch club events")
        }
      } catch (err) {
        console.error("Error fetching club events:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchClubEvents()
  }, [API_BASE_URL])

  const handleSeeMore = (eventId) => {
    setExpandedCard(expandedCard === eventId ? null : eventId)
  }

  const handleRegistration = (eventId, eventTitle) => {
    setRegisteredEvents((prev) => new Set([...prev, eventId]))
    alert(`✅ Successfully registered for: ${eventTitle}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isRegistrationOpen = (deadline) => {
    return new Date() < new Date(deadline)
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  const handleShowLess = () => {
    setVisibleCount(3)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="py-16 px-4 md:px-10 bg-gradient-to-br from-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39B24A]"></div>
          <p className="mt-4 text-gray-600">Loading club events...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="py-16 px-4 md:px-10 bg-gradient-to-br from-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Unable to Load Events</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#39B24A] hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const upcomingEvents = events.filter((event) => event.isUpcoming !== false)
  const hasMoreEvents = upcomingEvents.length > visibleCount
  const showingMoreThanInitial = visibleCount > 3

  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-br bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-[#39B24A] mb-4">🎓 Club Events</h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join our exciting workshops, seminars, and bootcamps designed to enhance your data science and machine
            learning skills.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.slice(0, visibleCount).map((event) => (
              <div
                key={event._id || event.id}
                className="bg-white rounded-2xl hover:shadow-md transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Top Row: Image + Heading/Basic Info */}
                <div className="flex flex-col md:flex-row p-6 md:p-8">
                  {/* Event Image */}
                  <div className="w-full md:w-80 md:flex-shrink-0 relative h-48 md:h-56 rounded-xl overflow-hidden mb-6 md:mb-0 md:mr-8">
                    <Image
                      src={event.image || "/placeholder.svg?height=224&width=320&query=workshop event"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {event.registeredCount && event.maxParticipants && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#09509E] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {event.registeredCount}/{event.maxParticipants}
                        </span>
                      </div>
                    )}
                    {/* Registration Status Badge */}
                    <div className="absolute top-4 left-4">
                      {event.registrationDeadline && isRegistrationOpen(event.registrationDeadline) ? (
                        <span className="bg-[#09509E] text-white px-3 py-1.5 rounded-full font-semibold">Open</span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Closed
                        </span>
                      )}
                    </div>
                    {/* Difficulty Badge */}
                    {event.difficulty && (
                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(event.difficulty)}`}
                        >
                          {event.difficulty}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Basic Info Section */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Title and Tags */}
                    <div>
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 lg:mb-0">{event.title}</h3>
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Date, Time, Location */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        {event.date && (
                          <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{formatDate(event.date)}</span>
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{event.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Short Description */}
                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {event.shortDescription || event.description}
                      </p>
                    </div>

                    {/* See More Button */}
                    <div>
                      <button
                        onClick={() => handleSeeMore(event._id || event.id)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                      >
                        {expandedCard === (event._id || event.id) ? "See Less ▲" : "See More Details ▼"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCard === (event._id || event.id) && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-6 border-t border-gray-200">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 md:p-8 space-y-8">
                        {/* Full Description */}
                        {event.fullDescription && (
                          <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                              <span className="text-3xl mr-3">📋</span>
                              About This Event
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-lg">{event.fullDescription}</p>
                          </div>
                        )}

                        {/* Registration Section */}
                        <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-8 text-center">
                          <h5 className="font-bold text-gray-800 mb-4 text-2xl">Ready to Join?</h5>
                          {event.registrationDeadline && (
                            <p className="text-gray-600 mb-6 text-lg">
                              Registration deadline:{" "}
                              <span className="font-semibold">{formatDate(event.registrationDeadline)}</span>
                            </p>
                          )}
                          {registeredEvents.has(event._id || event.id) ? (
                            <div className="bg-gray-100 text-gray-600 py-4 px-8 rounded-lg font-semibold inline-flex items-center text-lg">
                              <span className="text-green-500 mr-3 text-xl">✓</span>
                              Successfully Registered!
                            </div>
                          ) : event.registrationLink ? (
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#39B24A] hover:bg-green-600 text-white py-4 px-10 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-lg inline-block"
                            >
                              🎫 Register Now
                            </a>
                          ) : (
                            <button
                              onClick={() => handleRegistration(event._id || event.id, event.title)}
                              className="bg-[#39B24A] hover:bg-green-600 text-white py-4 px-10 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-lg"
                            >
                              🎫 Register Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Empty state
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Club Events Available</h3>
              <p className="text-gray-500">Check back soon for new workshops and seminars!</p>
            </div>
          )}
        </div>

        {/* Show More/Less Buttons */}
        {upcomingEvents.length > 0 && (
          <div className="mt-12 text-center space-x-4">
            {hasMoreEvents && (
              <button
                onClick={handleShowMore}
                className="bg-[#09509E] text-white py-3 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                <span>Show More Events ({upcomingEvents.length - visibleCount} remaining)</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            )}
            {showingMoreThanInitial && (
              <button
                onClick={handleShowLess}
                className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                <span>Show Less Events</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
