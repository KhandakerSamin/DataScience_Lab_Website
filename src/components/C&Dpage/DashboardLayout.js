"use client"

import Image from "next/image"
import Link from "next/link"

export default function DashboardLayout({ children, activePage, setActivePage }) {
  const navigationItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "datasets", label: "Datasets", icon: "📊" },
    { id: "competitions", label: "Competitions", icon: "🏆" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  const handleNavigation = (pageId) => {
    setActivePage(pageId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link href="/">
              <Image
                src="/logo.svg"
                width={100}
                height={100}
                alt="Data Science Lab Logo"
              /></Link>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors flex items-center space-x-2">
            <span>💬</span>
            <span>Contact Us</span>
          </button>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Dashboard Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Dashboard</h2>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${isActive
                        ? "bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
