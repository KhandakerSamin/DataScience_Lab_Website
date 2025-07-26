"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen &&
        isClient
      ) {
        setIsSidebarOpen(false)
      }
    }
    if (isClient) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isSidebarOpen, isClient])

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
        @media (max-width: 767px) {
          .mobile-sidebar {
            transform: translateX(-100%);
          }
          .mobile-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 w-full font-outfit relative h-screen overflow-hidden">
        {/* Hamburger Menu for Mobile */}
        {!isSidebarOpen && isClient && (
          <button
            className="md:hidden fixed top-4 left-4 z-50 bg-white py-1 px-2 rounded-md"
            onClick={toggleSidebar}
          >
            <span className="text-2xl">☰</span>
          </button>
        )}

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`w-64 bg-white border-r border-gray-200 fixed top-0 left-0 h-full transition-transform duration-300 z-40 md:w-72 ${
            isSidebarOpen ? "open mobile-sidebar" : "mobile-sidebar"
          } md:translate-x-0 md:static`}
        >
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
            <nav className="space-y-2 mt-6">
              {navigationItems.map((item) => {
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavigation(item.id)
                      if (isSidebarOpen && isClient) toggleSidebar()
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-blue-50 border-l-4 border-[#09509E] text-[#09509E] font-medium"
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
        <main
          className={`absolute top-0 right-0 bottom-0 overflow-y-auto px-6 py-8 transition-all duration-300 w-full md:w-[calc(100%-18rem)] md:left-72`}
        >
          {children}
        </main>
      </div>
    </>
  )
}
