"use client"

import { useState } from "react"
import { projectsData } from "../../data/projectsData"
import PDSection from "../../components/P&Dpage/P&Dsection"
import FilterTabs from "@/components/P&Dpage/FilterTabs"
import Banner from "@/components/P&Dpage/Banner"

export default function ProjectDevelopmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Filter projects based on search term and active filter
  const searchFilteredProjects = projectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies?.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredProjects = searchFilteredProjects.filter((project) => {
    if (activeFilter === "all") return true
    if (activeFilter === "projects") return project.status === "completed"
    if (activeFilter === "developments") return project.status === "ongoing"
    return true
  })

  const completedProjects = filteredProjects.filter((project) => project.status === "completed")
  const ongoingProjects = filteredProjects.filter((project) => project.status === "ongoing")

  return (
    <div className="min-h-screen bg-gray-50 font-outfit">
      <Banner searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} resultCount={filteredProjects.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(activeFilter === "all" || activeFilter === "projects") && completedProjects.length > 0 && (
          <PDSection title="Our Projects" projects={completedProjects} startIndex={0} />
        )}

        {(activeFilter === "all" || activeFilter === "developments") && ongoingProjects.length > 0 && (
          <PDSection title="On Going Developments" projects={ongoingProjects} startIndex={completedProjects.length} />
        )}

        {filteredProjects.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
