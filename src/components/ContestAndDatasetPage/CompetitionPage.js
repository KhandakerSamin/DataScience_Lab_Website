"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ExternalLink, RefreshCw } from "lucide-react"
import CompetitionCard from "./CompetitionCard"

// Mock data that works immediately
const MOCK_COMPETITIONS = [
  {
    id: "titanic",
    title: "Titanic - Machine Learning from Disaster",
    description: "Start here! Predict survival on the Titanic and get familiar with ML basics",
    organizationName: "Kaggle",
    category: "Getting Started",
    reward: "Knowledge",
    totalTeams: 15000,
    deadline: "2024-12-31T23:59:59Z",
    url: "https://www.kaggle.com/c/titanic",
  },
  {
    id: "house-prices",
    title: "House Prices - Advanced Regression Techniques",
    description: "Predict sales prices and practice feature engineering, RFs, and gradient boosting",
    organizationName: "Kaggle",
    category: "Getting Started",
    reward: "Knowledge",
    totalTeams: 8000,
    deadline: "2024-12-31T23:59:59Z",
    url: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques",
  },
  {
    id: "digit-recognizer",
    title: "Digit Recognizer",
    description: "Learn computer vision fundamentals with the famous MNIST data",
    organizationName: "Kaggle",
    category: "Computer Vision",
    reward: "Knowledge",
    totalTeams: 12000,
    deadline: "2024-12-31T23:59:59Z",
    url: "https://www.kaggle.com/c/digit-recognizer",
  },
  {
    id: "nlp-disaster",
    title: "Natural Language Processing with Disaster Tweets",
    description: "Predict which Tweets are about real disasters and which ones are not",
    organizationName: "Kaggle",
    category: "NLP",
    reward: "Knowledge",
    totalTeams: 6000,
    deadline: "2024-12-31T23:59:59Z",
    url: "https://www.kaggle.com/c/nlp-getting-started",
  },
  {
    id: "spaceship-titanic",
    title: "Spaceship Titanic",
    description: "Predict which passengers are transported to an alternate dimension",
    organizationName: "Kaggle",
    category: "Playground",
    reward: "Knowledge",
    totalTeams: 4500,
    deadline: "2024-12-31T23:59:59Z",
    url: "https://www.kaggle.com/c/spaceship-titanic",
  },
  {
    id: "store-sales",
    title: "Store Sales - Time Series Forecasting",
    description: "Use machine learning to predict grocery sales",
    organizationName: "Kaggle",
    category: "Forecasting",
    reward: "$15,000",
    totalTeams: 3200,
    deadline: "2024-12-31T23:59:59Z",
    url: "https://www.kaggle.com/c/store-sales-time-series-forecasting",
  },
]

export default function CompetitionPage() {
  const [competitions, setCompetitions] = useState(MOCK_COMPETITIONS)
  const [filteredCompetitions, setFilteredCompetitions] = useState(MOCK_COMPETITIONS)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All Competitions")
  const [sortBy, setSortBy] = useState("totalTeams")
  const [sortOrder, setSortOrder] = useState("desc")
  const [loading, setLoading] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [error, setError] = useState(null)
  const [totalCompetitions, setTotalCompetitions] = useState(MOCK_COMPETITIONS.length)

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
    "Forecasting",
  ]

  const sortOptions = [
    { value: "title", label: "Title" },
    { value: "organizationName", label: "Organization" },
    { value: "totalTeams", label: "Teams" },
    { value: "reward", label: "Prize" },
    { value: "deadline", label: "Deadline" },
  ]

  useEffect(() => {
    // Try to fetch real data, but fall back to mock data
    fetchCompetitions()
  }, [])

  useEffect(() => {
    filterAndSortCompetitions()
  }, [competitions, searchQuery, activeTab, sortBy, sortOrder])

  const fetchCompetitions = async () => {
    setLoading(true)
    setError(null)
    try {
      // Option 1: Try the combined API
      const response = await fetch("/api/kaggle-data?type=competitions")

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setCompetitions(data)
          setTotalCompetitions(data.length)
          console.log(`✅ Loaded ${data.length} real competitions from API`)
          setLoading(false)
          return
        }
      }

      // Fallback to mock data
      console.log("📝 Using mock competition data")
      setCompetitions(MOCK_COMPETITIONS)
      setTotalCompetitions(MOCK_COMPETITIONS.length)
    } catch (error) {
      console.log("📝 API failed, using mock data:", error.message)
      setCompetitions(MOCK_COMPETITIONS)
      setTotalCompetitions(MOCK_COMPETITIONS.length)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortCompetitions = () => {
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

  const handleHostCompetition = () => {
    window.open("https://www.kaggle.com/competitions/host", "_blank", "noopener,noreferrer")
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
              <span>Popular Competitions</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Explore popular competitions from the worlds largest data science community.{" "}
            <span className="text-[#09509E] font-medium">Click any competition to view on Kaggle.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleHostCompetition}
            className="bg-[#09509E] hover:bg-white hover:text-[#09509E] border-2 border-[#09509E] text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-200"
          >
            Host Competition
          </button>
          <Link href="/contact">
            <button className="hidden lg:inline-flex items-center gap-2 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-[#09509E] px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
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
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 lg:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#09509E]">{totalCompetitions.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Competitions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredCompetitions.length.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Showing</div>
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
            placeholder="Search competitions by title, organization, category..."
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
        {filteredCompetitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>

      {/* No Results */}
      {filteredCompetitions.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <span className="text-6xl">🏆</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No competitions found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or selected category.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
