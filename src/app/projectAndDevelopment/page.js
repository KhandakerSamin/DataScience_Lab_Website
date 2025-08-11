"use client"
import { useState, useEffect } from "react"
import Banner from "../../components/ProjectAndDevelopment/Banner"
import ProjectsSection from "../../components/ProjectAndDevelopment/ProjectsSection"
import FilterTabs from "../../components/ProjectAndDevelopment/FilterTabs"

// API base URL - adjust this to match your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function ProjectDevelopmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [projectsData, setProjectsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch projects data from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/projects`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success) {
          setProjectsData(result.data)
        } else {
          throw new Error(result.error || "Failed to fetch projects")
        }
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
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
          <p className="text-red-600 mb-4">Error loading projects: {error}</p>
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

  // Filter projects based on search term
  const searchFilteredProjects = projectsData.filter(
    (project) =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies?.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Filter projects based on active filter
  const filteredProjects = searchFilteredProjects.filter((project) => {
    if (activeFilter === "all") return true
    if (activeFilter === "projects") return project.status === "completed"
    if (activeFilter === "developments") return project.status === "ongoing"
    return true
  })

  const completedProjects = filteredProjects.filter((project) => project.status === "completed")
  const ongoingProjects = filteredProjects.filter((project) => project.status === "ongoing")

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} resultCount={filteredProjects.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(activeFilter === "all" || activeFilter === "projects") && completedProjects.length > 0 && (
          <ProjectsSection title="Our Projects" projects={completedProjects} startIndex={0} />
        )}

        {(activeFilter === "all" || activeFilter === "developments") && ongoingProjects.length > 0 && (
          <ProjectsSection
            title="On Going Developments"
            projects={ongoingProjects}
            startIndex={completedProjects.length}
          />
        )}

        {filteredProjects.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching &ldquo;{searchTerm}&rdquo;</p>
          </div>
        )}

        {filteredProjects.length === 0 && !searchTerm && projectsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects available</p>
          </div>
        )}
      </div>
    </div>
  )
}
