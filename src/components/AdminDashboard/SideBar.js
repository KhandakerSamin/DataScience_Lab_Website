"use client"
import { useRouter } from "next/navigation"

export default function Sidebar({ onLogout, isMobileOpen, setIsMobileOpen }) {
  const router = useRouter()

  const navigationItems = [
    { key: "home", label: "Home", icon: "🏠", href: "/" },
    { key: "dashboard", label: "Dashboard", icon: "🏠", href: "/admin" },
    { key: "events", label: "Events & News", icon: "📅", href: "/admin/events" },
    { key: "clubEvents", label: "Club Events", icon: "🎓", href: "/admin/club-events" },
    { key: "projects", label: "Projects", icon: "💻", href: "/admin/projects" },
    { key: "team", label: "Team Members", icon: "👥", href: "/admin/team" },
    { key: "clubMembers", label: "Club Members", icon: "🏆", href: "/admin/club-members" },
    { key: "gallery", label: "Gallery", icon: "🖼️", href: "/admin/gallery" },
  ]

  const handleNavigation = (href) => {
    router.push(href)
    setIsMobileOpen(false) // Close mobile menu when navigating
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
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
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DS</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">DS Lab</h1>
              <p className="text-sm text-gray-500">Data Science Club</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="mt-6 pb-20 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.href)}
              className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 hover:text-blue-600"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
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
