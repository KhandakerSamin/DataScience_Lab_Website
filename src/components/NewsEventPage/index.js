"use client"
import { useState, useMemo, useEffect } from "react"
import Banner from "./Banner"
import FilterTabs from "./FilterTabs"
import ContentGrid from "./ContentGrid"

// API base URL - adjust this to match your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function NewsEventPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [eventsNewsData, setEventsNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch events and news data from backend
  useEffect(() => {
    const fetchEventsNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/events`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success) {
          setEventsNewsData(result.data)
        } else {
          throw new Error(result.error || "Failed to fetch events and news")
        }
      } catch (err) {
        console.error("Error fetching events and news:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEventsNews()
  }, [])

  const today = new Date()

  const filteredData = useMemo(() => {
    let filtered = eventsNewsData

    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === activeFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Final sort: upcoming first (soonest to latest), then past (most recent to oldest)
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      const isUpcomingA = dateA >= today
      const isUpcomingB = dateB >= today

      if (isUpcomingA && !isUpcomingB) return -1 // A is upcoming, B is past → A first
      if (!isUpcomingA && isUpcomingB) return 1 // B is upcoming, A is past → B first

      // If both upcoming, sort soonest first
      if (isUpcomingA && isUpcomingB) {
        return dateA - dateB
      }

      // If both past, sort most recent past first
      return dateB - dateA
    })
  }, [searchTerm, activeFilter, eventsNewsData])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events and news...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">Error loading events and news: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} resultCount={filteredData.length} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredData.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {activeFilter === "all" ? "events or news" : activeFilter} found matching &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
        )}

        {filteredData.length === 0 && !searchTerm && eventsNewsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events or news available</p>
          </div>
        )}

        {filteredData.length > 0 && <ContentGrid filteredData={filteredData} />}
      </div>
    </div>
  )
}
