"use client"

import { useState, useEffect } from "react"
import SlidingTabs from "./SlidingTabs"
import DatasetCard from "./DataSetCard"

export default function DatasetPage() {
  const [datasets, setDatasets] = useState([])
  const [filteredDatasets, setFilteredDatasets] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All Datasets")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [loading, setLoading] = useState(true)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const tabs = [
    "All Datasets",
    "Computer Science",
    "Education",
    "Classification",
    "Computer Vision",
    "NLP",
    "Data Visualization",
    "Pre-Trained Models",
    "Machine Learning",
    "Deep Learning",
    "Statistics",
    "Finance",
    "Healthcare",
    "Transportation",
    "Entertainment",
  ]

  const sortOptions = [
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "size", label: "Size" },
    { value: "downloads", label: "Downloads" },
    { value: "likes", label: "Likes" },
    { value: "updatedDays", label: "Last Updated" },
  ]

  useEffect(() => {
    fetchDatasets()
  }, [])

  useEffect(() => {
    filterAndSortDatasets()
  }, [datasets, searchQuery, activeTab, sortBy, sortOrder])

  const fetchDatasets = async () => {
    try {
      const response = await fetch("/api/dataset")
      const data = await response.json()
      setDatasets(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching datasets:", error)
      setLoading(false)
    }
  }

  const filterAndSortDatasets = () => {
    let filtered = [...datasets]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (dataset) =>
          dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category tab
    if (activeTab !== "All Datasets") {
      filtered = filtered.filter((dataset) => dataset.category === activeTab)
    }

    // Sort datasets
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "size") {
        aValue = convertSizeToBytes(a.size)
        bValue = convertSizeToBytes(b.size)
      } else if (sortBy === "updatedDays") {
        aValue = a.updatedDays
        bValue = b.updatedDays
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredDatasets(filtered)
  }

  const convertSizeToBytes = (size) => {
    const units = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024 }
    const match = size.match(/^([\d.]+)\s*([A-Z]+)$/i)
    if (match) {
      const value = Number.parseFloat(match[1])
      const unit = match[2].toUpperCase()
      return value * (units[unit] || 1)
    }
    return 0
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
    setShowSortDropdown(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveTab("All Datasets")
    setSortBy("title")
    setSortOrder("asc")
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Datasets</h1>
        <p className="text-gray-600 text-lg">
          Explore, analyze, and share quality data.{" "}
          <a href="#" className="text-blue-600 underline">
            Learn more
          </a>{" "}
          about data types, creating, and collaborating.
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search datasets by title, author, category..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              <span>Sort by {sortOptions.find((opt) => opt.value === sortBy)?.label}</span>
              <span>▼</span>
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSort(option.value)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && <span>{sortOrder === "asc" ? "↑" : "↓"}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>🔄</span>
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Sliding Tabs */}
      <SlidingTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? "s" : ""}
          {activeTab !== "All Datasets" && ` in ${activeTab}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        <p className="text-sm text-gray-500">
          Sorted by {sortOptions.find((opt) => opt.value === sortBy)?.label} ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </p>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <span className="text-6xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No datasets found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or selected category.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
