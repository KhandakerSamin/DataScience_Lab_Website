"use client"

import { useState, useEffect } from "react"
import SlidingTabs from "./SlidingTabs"

export default function CompetitionPage() {
  const [competitions, setCompetitions] = useState([])
  const [filteredCompetitions, setFilteredCompetitions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All Topics")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [loading, setLoading] = useState(true)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const tabs = [
    "All Topics",
    "Algorithms",
    "Database",
    "Shell",
    "Concurrency",
    "JavaScript",
    "Pandas",
    "Math",
    "Machine Learning",
    "Data Structures",
    "Statistics",
    "Python",
  ]

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "success", label: "Success Rate" },
    { value: "level", label: "Level" },
    { value: "attempted", label: "Attempted" },
  ]

  useEffect(() => {
    fetchCompetitions()
  }, [])

  useEffect(() => {
    filterAndSortCompetitions()
  }, [competitions, searchQuery, activeTab, sortBy, sortOrder])

  const fetchCompetitions = async () => {
    try {
      const mockData = [
        { id: 1, sl: "4A", name: "Watermellon", success: "82.1%", level: "Easy", attempted: 8909, topic: "Algorithms" },
        {
          id: 2,
          sl: "3B",
          name: "Binary Search Tree",
          success: "75.3%",
          level: "Medium",
          attempted: 6543,
          topic: "Algorithms",
        },
        { id: 3, sl: "5C", name: "SQL Joins", success: "89.7%", level: "Easy", attempted: 12456, topic: "Database" },
        { id: 4, sl: "2A", name: "Shell Scripting", success: "67.8%", level: "Hard", attempted: 3421, topic: "Shell" },
        {
          id: 5,
          sl: "1D",
          name: "Thread Safety",
          success: "45.2%",
          level: "Hard",
          attempted: 2109,
          topic: "Concurrency",
        },
        {
          id: 6,
          sl: "6E",
          name: "Array Methods",
          success: "91.4%",
          level: "Easy",
          attempted: 15678,
          topic: "JavaScript",
        },
        {
          id: 7,
          sl: "4F",
          name: "Data Manipulation",
          success: "78.9%",
          level: "Medium",
          attempted: 7890,
          topic: "Pandas",
        },
        { id: 8, sl: "3G", name: "Linear Algebra", success: "56.7%", level: "Hard", attempted: 4567, topic: "Math" },
        {
          id: 9,
          sl: "5H",
          name: "Sorting Algorithms",
          success: "84.3%",
          level: "Medium",
          attempted: 9876,
          topic: "Algorithms",
        },
        {
          id: 10,
          sl: "2I",
          name: "Database Indexing",
          success: "72.1%",
          level: "Medium",
          attempted: 5432,
          topic: "Database",
        },
        {
          id: 11,
          sl: "1J",
          name: "File Permissions",
          success: "88.5%",
          level: "Easy",
          attempted: 11234,
          topic: "Shell",
        },
        {
          id: 12,
          sl: "6K",
          name: "Async Programming",
          success: "63.9%",
          level: "Hard",
          attempted: 3876,
          topic: "JavaScript",
        },
        {
          id: 13,
          sl: "4L",
          name: "DataFrame Operations",
          success: "80.2%",
          level: "Medium",
          attempted: 6789,
          topic: "Pandas",
        },
        {
          id: 14,
          sl: "3M",
          name: "Statistics Basics",
          success: "92.6%",
          level: "Easy",
          attempted: 13567,
          topic: "Math",
        },
      ]

      setCompetitions(mockData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching competitions:", error)
      setLoading(false)
    }
  }

  const filterAndSortCompetitions = () => {
    let filtered = [...competitions]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (competition) =>
          competition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          competition.sl.toLowerCase().includes(searchQuery.toLowerCase()) ||
          competition.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          competition.level.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by topic tab
    if (activeTab !== "All Topics") {
      filtered = filtered.filter((competition) => competition.topic === activeTab)
    }

    // Sort competitions
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "success") {
        aValue = Number.parseFloat(a.success.replace("%", ""))
        bValue = Number.parseFloat(b.success.replace("%", ""))
      } else if (sortBy === "level") {
        const levelOrder = { Easy: 1, Medium: 2, Hard: 3 }
        aValue = levelOrder[a.level]
        bValue = levelOrder[b.level]
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
      setSortOrder("asc")
    }
    setShowSortDropdown(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveTab("All Topics")
    setSortBy("name")
    setSortOrder("asc")
  }

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "hard":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Competitions</h1>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet consectetur. Eget potenti aenean in nisl fermentum in lectus. Nunc diam non sed eu
          duis fames tempus sed nisl.
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search competitions by name, topic, level..."
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
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? "s" : ""}
          {activeTab !== "All Topics" && ` in ${activeTab}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        <p className="text-sm text-gray-500">
          Sorted by {sortOptions.find((opt) => opt.value === sortBy)?.label} ({sortOrder === "asc" ? "↑" : "↓"})
        </p>
      </div>

      {/* Competition Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th
                className="font-semibold text-gray-700 py-4 px-6 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("sl")}
              >
                # Sl {sortBy === "sl" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="font-semibold text-gray-700 py-4 px-6 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="font-semibold text-gray-700 py-4 px-6 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("success")}
              >
                Success {sortBy === "success" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="font-semibold text-gray-700 py-4 px-6 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("level")}
              >
                Level {sortBy === "level" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="font-semibold text-gray-700 py-4 px-6 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("attempted")}
              >
                Attempted {sortBy === "attempted" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetitions.map((competition, index) => (
              <tr
                key={competition.id}
                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
              >
                <td className="py-4 px-6 font-medium text-gray-600">{competition.sl}</td>
                <td className="py-4 px-6">
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium hover:underline">
                    {competition.name}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-medium">{competition.success}</td>
                <td className="py-4 px-6 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                      competition.level,
                    )}`}
                  >
                    {competition.level}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-medium text-gray-700">
                  {competition.attempted.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCompetitions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <span className="text-6xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No competitions found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or selected topic.</p>
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
