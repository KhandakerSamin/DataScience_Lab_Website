"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ExternalLink, RefreshCw } from "lucide-react"
import DatasetCard from "./DataSetCard"

export default function DatasetPage() {
  const [datasets, setDatasets] = useState([])
  const [filteredDatasets, setFilteredDatasets] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All Datasets")
  const [sortBy, setSortBy] = useState("updatedDays")
  const [sortOrder, setSortOrder] = useState("asc")
  const [loading, setLoading] = useState(true)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [error, setError] = useState(null)
  const [totalDatasets, setTotalDatasets] = useState(0)

  const tabs = [
    "All Datasets",
    "Computer Science",
    "Education",
    "Classification",
    "Computer Vision",
    "NLP",
    "Data Visualization",
    "Pre-Trained Model",
  ]

  const sortOptions = [
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "size", label: "Size" },
    { value: "downloads", label: "Downloads" },
    { value: "likes", label: "Likes" },
    { value: "updatedDays", label: "Recent Update" },
  ]

  useEffect(() => {
    fetchDatasets()
  }, [])

  useEffect(() => {
    filterAndSortDatasets()
  }, [datasets, searchQuery, activeTab, sortBy, sortOrder])

  const fetchDatasets = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Fetching Kaggle datasets...")
      const response = await fetch("/api/kaggle-datasets")

      if (!response.ok) {
        const errorHeader = response.headers.get("X-Error")
        throw new Error(errorHeader || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`Received ${data.length} datasets from Kaggle`)

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API")
      }

      setDatasets(data)
      setTotalDatasets(data.length)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching datasets:", error)
      setError(error.message)
      setLoading(false)
      setDatasets([])
    }
  }

  const filterAndSortDatasets = () => {
    if (!Array.isArray(datasets)) {
      setFilteredDatasets([])
      return
    }

    let filtered = [...datasets]

    if (searchQuery) {
      filtered = filtered.filter(
        (dataset) =>
          dataset.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.topics?.some(
            (topic) =>
              typeof topic === "string" &&
              topic.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    }

    if (activeTab !== "All Datasets") {
      filtered = filtered.filter((dataset) => dataset.category === activeTab)
    }

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
    if (!size || typeof size !== "string") return 0
    const units = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024, TB: 1024 * 1024 * 1024 * 1024 }
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
      setSortOrder(field === "updatedDays" ? "asc" : "desc")
    }
    setShowSortDropdown(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveTab("All Datasets")
    setSortBy("updatedDays")
    setSortOrder("asc")
  }

  return (
    <div className="p-6 font-outfit">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Kaggle Datasets</h1>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <ExternalLink size={16} />
              <span>Live from Kaggle API</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Explore {totalDatasets.toLocaleString()}+ datasets from the worlds largest data science community.{" "}
            <span className="text-[#09509E] font-medium">Click any dataset to view on Kaggle.</span>
          </p>
        </div>
        <div>
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
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#09509E]">{totalDatasets.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Datasets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredDatasets.length.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Showing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{tabs.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
          <button
            onClick={fetchDatasets}
            className="flex items-center gap-2 px-4 py-2 bg-[#09509E] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search Kaggle datasets by title, author, category, or topics..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-[#09509E]">{filteredDatasets.length}</span> dataset
          {filteredDatasets.length !== 1 ? "s" : ""}
          {activeTab !== "All Datasets" && (
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

      {/* Dataset Grid */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredDatasets.map((dataset) => {
          if (!dataset || typeof dataset !== "object") {
            return null
          }
          return <DatasetCard key={dataset.id} dataset={dataset} />
        })}
      </div>

      {/* No Results */}
      {filteredDatasets.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <span className="text-6xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No datasets found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or selected category, or{" "}
            <button onClick={fetchDatasets} className="text-[#09509E] hover:underline">
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
    </div>
  )
}