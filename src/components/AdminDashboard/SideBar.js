"use client"

import Link from "next/link"

export default function Sidebar({ activeTab, setActiveTab, onLogout, isMobileOpen, setIsMobileOpen }) {
  const tabs = [
    { key: "events", label: "Events & News", icon: "📅" },
    { key: "clubEvents", label: "Club Events", icon: "🎓" },
    { key: "projects", label: "Projects", icon: "💻" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:z-10`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

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
              onClick={() => {
                setActiveTab(tab.key)
                setIsMobileOpen(false) // Close mobile menu when tab is selected
              }}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === tab.key ? "bg-blue-50 border-r-4 border-blue-600 text-blue-700" : "text-gray-700"
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
    </>
  )
}
