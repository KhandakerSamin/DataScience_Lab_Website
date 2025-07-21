"use client"

import { useState } from "react"
import Image from "next/image"
import { CornerRightDown, CornerRightUp } from "lucide-react"

export default function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  console.log("ProjectCard rendering:", { projectId: project?.id, title: project?.title, index })

  if (!project) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: Project data is missing
      </div>
    )
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-md">
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 p-8`}>
        {/* Image Section */}
        <div className="md:w-1/2 flex-shrink-0">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg?height=300&width=400"}
              alt={project.title || "Project image"}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">{project.title}</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{project.description}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={toggleExpanded}
              className="inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group"
            >
              {isExpanded ? "Show Less" : "See More"}
              {isExpanded ? (
                <CornerRightUp
                  className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                  size={24}
                  strokeWidth={2}
                />
              ) : (
                <CornerRightDown
                  className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                  size={24}
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Links Section */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">Duration</h5>
              <p className="text-gray-600 text-sm">{project.duration}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">Team Size</h5>
              <p className="text-gray-600 text-sm">{project.teamSize}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">Category</h5>
              <p className="text-gray-600 text-sm">{project.category}</p>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h5 className="font-semibold text-gray-800 mb-3">Technologies Used</h5>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
          {project.links && Object.keys(project.links).length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(project.links).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-4 py-3 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm font-medium group"
                  >
                    <LinkIcon type={key} />
                    <span className="capitalize">{getLinkLabel(key)}</span>
                    <svg
                      className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function getLinkLabel(key) {
  const labels = {
    live: "Live Demo",
    frontend: "Frontend Code",
    backend: "Backend Code",
    api: "API Documentation",
    paper: "Research Paper",
    demo: "Demo",
    prototype: "Prototype",
    hardware: "Hardware Code",
    documentation: "Documentation",
  }
  return labels[key] || key
}

function LinkIcon({ type }) {
  const iconClass = "w-5 h-5"

  switch (type) {
    case "live":
    case "demo":
    case "prototype":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
          />
        </svg>
      )
    case "frontend":
    case "backend":
    case "hardware":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    case "paper":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      )
    case "documentation":
    case "api":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      )
  }
}
