"use client"

import { useState, useMemo } from "react"
import Banner from "./Banner"
import FilterTabs from "./FilterTabs"
import ContentGrid from "./ContentGrid"
import { eventsNewsData } from "../../data/eventsData"

export default function NewsEventPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
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
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    }

    // Final sort: upcoming first (soonest to latest), then past (most recent to oldest)
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      const isUpcomingA = dateA >= today
      const isUpcomingB = dateB >= today

      if (isUpcomingA && !isUpcomingB) return -1 // A is upcoming, B is past → A first
      if (!isUpcomingA && isUpcomingB) return 1  // B is upcoming, A is past → B first

      // If both upcoming, sort soonest first
      if (isUpcomingA && isUpcomingB) {
        return dateA - dateB
      }

      // If both past, sort most recent past first
      return dateB - dateA
    })
  }, [searchTerm, activeFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        resultCount={filteredData.length}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ContentGrid filteredData={filteredData} />
      </div>
    </div>
  )
}
