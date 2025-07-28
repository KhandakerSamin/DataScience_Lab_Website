"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ExternalLink, ExternalLinkIcon, RefreshCw } from "lucide-react"
import CompetitionCard from "./CompetitionCard"

export default function CompetitionPage() {
  const [competitions, setCompetitions] = useState([])
  const [filteredCompetitions, setFilteredCompetitions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All Competitions")
  const [sortBy, setSortBy] = useState("totalTeams")
  const [sortOrder, setSortOrder] = useState("desc")
  const [loading, setLoading] = useState(true)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [error, setError] = useState(null)
  const [totalCompetitions, setTotalCompetitions] = useState(0)

  const tabs = [
    "All Competitions",
    "Featured",
    "Getting Started",
    "Research",
    "Community",
    "Playground",
    "Analytics",
    "Computer Vision",
    "NLP",
    "General",
  ]

  const sortOptions = [
    { value: "title", label: "Title" },
    { value: "organizationName", label: "Organization" },
    { value: "totalTeams", label: "Teams" },
    { value: "reward", label: "Prize" },
    { value: "deadline", label: "Deadline" },
  ]

  useEffect(() => {
    fetchCompetitions()
  }, [])

  useEffect(() => {
    filterAndSortCompetitions()
  }, [competitions, searchQuery, activeTab, sortBy, sortOrder])

  const fetchCompetitions = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("🏆 Fetching Kaggle competitions...")
      const response = await fetch("/api/kaggle-datasets?type=competitions")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Received ${data.length} competitions from Kaggle API`)

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API")
      }

      setCompetitions(data)
      setTotalCompetitions(data.length)
    } catch (error) {
      console.error("❌ Error fetching competitions:", error)
      setError(error.message)
      setCompetitions([])
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortCompetitions = () => {
    if (!Array.isArray(competitions)) {
      setFilteredCompetitions([])
      return
    }

    let filtered = [...competitions]

    if (searchQuery) {
      filtered = filtered.filter(
        (competition) =>
          competition.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          competition.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          competition.organizationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          competition.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (activeTab !== "All Competitions") {
      filtered = filtered.filter((competition) => competition.category === activeTab)
    }

    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredCompetitions(filtered)
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
      setSortOrder("desc")
    }
    setShowSortDropdown(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveTab("All Competitions")
    setSortBy("totalTeams")
    setSortOrder("desc")
  }

  // FIXED: Host Competition button handler
  const handleHostCompetition = (e) => {
    e.preventDefault()
    console.log("🚀 Opening Kaggle host competition page...")
    window.open("https://www.kaggle.com/c/about/host", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="p-6 font-outfit relative">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Kaggle Competitions</h1>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <ExternalLink size={16} />
              <span>Live from Kaggle API</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Explore {totalCompetitions.toLocaleString()}+ competitions from the worlds largest data science community.{" "}
            <span className="text-[#09509E] font-medium">Click any competition to view on Kaggle.</span>
          </p>
        </div>
        <div className="flex gap-3 max-h-14">
          <Link href="/contact">
            <button className="max-h-14 hidden lg:inline-flex items-center gap-2 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-[#09509E] px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
              Contact Us
              <ChevronRight
                className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                size={24}
                strokeWidth={2}
              />
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mb-6 bg-white rounded-lg p-3 lg:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#09509E]">
                {loading ? "..." : totalCompetitions.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">{loading ? "Loading..." : "Total Competitions"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {loading ? "..." : filteredCompetitions.length.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">{loading ? "Please wait" : "Showing"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{tabs.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
          <button
            onClick={fetchCompetitions}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#09509E] text-white rounded-lg hover:bg-white hover:text-[#09509E] hover:border-2 hover:border-[#09509E] transition-colors"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Loading..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search Kaggle competitions by title, organization, category..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:border focus:border-[#09509E]"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between transition-colors"
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
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-[#09509E] hover:text-white transition-colors duration-200"
          >
            <span>🔄</span>
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* FIXED: Host Competition Button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleHostCompetition}
          className="bg-[#09509E] flex items-center justify-center gap-3 hover:bg-white hover:text-[#09509E] border-2 border-[#09509E] text-white px-7 py-2 rounded-md text-lg font-medium transition-colors duration-200"
        >
          Host Competition
          <ExternalLinkIcon size={18} />
        </button>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-[#09509E] text-white"
                : "bg-gray-50 border border-[#09509E] text-black hover:bg-[#09509E] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-[#09509E]">{filteredCompetitions.length}</span> competition
          {filteredCompetitions.length !== 1 ? "s" : ""}
          {activeTab !== "All Competitions" && (
            <span>
              {" "}
              in <span className="font-medium text-gray-800">{activeTab}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {" "}
              matching &quot;<span className="font-medium text-gray-800">{searchQuery}</span>&quot;
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500">
          Sorted by {sortOptions.find((opt) => opt.value === sortBy)?.label} ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </p>
      </div>

      {/* Competition Grid */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse bg-white"
                >
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between mt-auto">
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
          : filteredCompetitions.map((competition) => {
              if (!competition || typeof competition !== "object") {
                return null
              }
              return <CompetitionCard key={competition.id} competition={competition} />
            })}
      </div>

      {/* No Results */}
      {filteredCompetitions.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <span className="text-6xl">🏆</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No competitions found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or selected category, or{" "}
            <button onClick={fetchCompetitions} className="text-[#09509E] hover:underline">
              refresh the data
            </button>
            .
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <span className="text-6xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading competitions</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchCompetitions}
            className="px-4 py-2 bg-[#09509E] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
