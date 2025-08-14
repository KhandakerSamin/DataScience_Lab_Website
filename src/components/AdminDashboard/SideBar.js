"use client"
import { useRouter, usePathname } from "next/navigation"
import {
  Home,
  Calendar,
  GraduationCap,
  Laptop,
  Users,
  Trophy,
  ImageIcon,
  ArrowLeft,
  X,
} from "lucide-react"
import Link from "next/link"

export default function Sidebar({ onLogout, isMobileOpen, setIsMobileOpen }) {
  const router = useRouter()
  const pathname = usePathname() // Get current URL path

  const navigationItems = [
    { key: "dashboard", label: "Dashboard", icon: Home, href: "/admin" },
    { key: "events", label: "Events & News", icon: Calendar, href: "/admin/events" },
    { key: "clubEvents", label: "Club Events", icon: GraduationCap, href: "/admin/club-events" },
    { key: "projects", label: "Projects", icon: Laptop, href: "/admin/projects" },
    { key: "team", label: "Team Members", icon: Users, href: "/admin/team" },
    { key: "clubMembers", label: "Club Members", icon: Trophy, href: "/admin/club-members" },
    { key: "gallery", label: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
    { key: "home", label: "Back To Home", icon: ArrowLeft, href: "/" },
  ]

  const handleNavigation = (href) => {
    router.push(href)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:z-10`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo and Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Link href="/" className="flex items-center space-x-3 z-50">
            <img src="/logo.svg" alt="Lab Logo" className="h-12 w-auto" />
          </Link>
          </div>
          <h2 className="text-md font-normal text-gray-800">Admin Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="mt-6 pb-20 overflow-y-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href // Auto check from URL

            return (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors relative border-l-4 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-transparent"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 ${
                    isActive ? "text-[#09509E]" : "text-gray-500 group-hover:text-[#09509E]"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            )
          })}
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
