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
    { id: "settings", label: "Settings", icon: "⚙" },
  ]

  const handleNavigation = (pageId) => {
    setActivePage(pageId)
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen overflow-x-hidden w-full font-outfit">
        {/* Sidebar + Main Content */}
        <div className="flex w-full max-w-[100vw] overflow-hidden">
          {/* Fixed Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 min-h-screen shrink-0 fixed top-0 left-0 h-full">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-15 ml-2 mt-6">
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    width={135}
                    height={135}
                    alt="Data Science Lab Logo"
                  />
                </Link>
              </div>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = activePage === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-blue-50 border-l-4 border-blue-600 text-[#09509E] font-medium"
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

          {/* Main Content with Scroll */}
          <main className="flex-1 ml-72 px-6 py-0 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}