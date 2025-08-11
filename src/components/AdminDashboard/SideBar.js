"use client"

import Link from "next/link"

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { key: "events", label: "Events & News", icon: "📅" },
    { key: "clubEvents", label: "Club Events", icon: "🎓" },
    { key: "projects", label: "Projects", icon: "💻" },
  ]

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-10">
      {/* Logo and Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Link href="/" className="flex items-center space-x-3 z-50">
            <img src="/logo.svg" alt="Lab Logo" className="h-12 w-auto" />
          </Link>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Navigation */}
      <nav className="mt-6 pb-20">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              activeTab === tab.key ? "bg-blue-50 border-r-4 border-blue-600 text-blue-700" : "text-gray-700"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
