"use client"
import { useState, useEffect } from "react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function WelcomePage() {
  const [stats, setStats] = useState({
    events: 0,
    projects: 0,
    clubEvents: 0,
    team: 0,
    clubMembers: 0,
    gallery: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const endpoints = ["events", "projects", "clubEvents", "team", "clubMembers", "gallery"]
      const promises = endpoints.map((endpoint) =>
        fetch(`${API_BASE_URL}/api/${endpoint}`)
          .then((res) => res.json())
          .then((data) => ({ [endpoint]: data.data?.length || 0 }))
          .catch(() => ({ [endpoint]: 0 })),
      )

      const results = await Promise.all(promises)
      const newStats = results.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      setStats(newStats)
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: "Events & News", count: stats.events, icon: "📅", color: "bg-blue-500" },
    { title: "Projects", count: stats.projects, icon: "💼", color: "bg-green-500" },
    { title: "Club Events", count: stats.clubEvents, icon: "🎓", color: "bg-purple-500" },
    { title: "Team Members", count: stats.team, icon: "👥", color: "bg-orange-500" },
    { title: "Club Members", count: stats.clubMembers, icon: "🏆", color: "bg-red-500" },
    { title: "Gallery Images", count: stats.gallery, icon: "🖼️", color: "bg-pink-500" },
  ]

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Data Science Lab content from here</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div> : stat.count}
                  </p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg text-2xl`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/events"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mr-3">📅</span>
              <div>
                <h3 className="font-medium text-gray-900">Manage Events</h3>
                <p className="text-sm text-gray-600">Add or edit events and news</p>
              </div>
            </a>
            <a
              href="/admin/projects"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mr-3">💼</span>
              <div>
                <h3 className="font-medium text-gray-900">Manage Projects</h3>
                <p className="text-sm text-gray-600">Showcase your projects</p>
              </div>
            </a>
            <a
              href="/admin/team"
              className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mr-3">👥</span>
              <div>
                <h3 className="font-medium text-gray-900">Manage Team</h3>
                <p className="text-sm text-gray-600">Add team members</p>
              </div>
            </a>
            <a
              href="/admin/club-events"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span className="text-2xl mr-3">🎓</span>
              <div>
                <h3 className="font-medium text-gray-900">Club Events</h3>
                <p className="text-sm text-gray-600">Manage workshops & bootcamps</p>
              </div>
            </a>
            <a
              href="/admin/club-members"
              className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <span className="text-2xl mr-3">🏆</span>
              <div>
                <h3 className="font-medium text-gray-900">Club Members</h3>
                <p className="text-sm text-gray-600">Manage club membership</p>
              </div>
            </a>
            <a
              href="/admin/gallery"
              className="flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
            >
              <span className="text-2xl mr-3">🖼️</span>
              <div>
                <h3 className="font-medium text-gray-900">Gallery</h3>
                <p className="text-sm text-gray-600">Manage image gallery</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
