"use client"

import { useState } from "react"
import Image from "next/image"

export default function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 p-6`}>
        {/* Image Section */}
        <div className="md:w-1/2 flex-shrink-0">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {isExpanded ? "Show Less" : "Learn More"}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Links Section */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Links</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(project.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-4 py-3 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm font-medium"
              >
                <LinkIcon type={key} />
                <span className="capitalize">
                  {key === "live"
                    ? "Live Demo"
                    : key === "frontend"
                      ? "Frontend Code"
                      : key === "backend"
                        ? "Backend Code"
                        : key === "api"
                          ? "API Documentation"
                          : key === "paper"
                            ? "Research Paper"
                            : key === "demo"
                              ? "Demo"
                              : key === "prototype"
                                ? "Prototype"
                                : key === "hardware"
                                  ? "Hardware Code"
                                  : key === "documentation"
                                    ? "Documentation"
                                    : key}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LinkIcon({ type }) {
  const iconClass = "w-4 h-4"

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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
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
