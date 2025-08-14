"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function DashboardLayout({ children, activePage, setActivePage }) {
  const navigationItems = [
    {
      id: "datasets",
      label: "Datasets",
      icon: "📊",
      description: "Data Collections",
    },
    {
      id: "competitions",
      label: "Competitions",
      icon: "🏆",
      description: "ML Contests",
    },


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
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen && isClient) {
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
        {/* Mobile Overlay */}
        {isSidebarOpen && isClient && (
          <div className="md:hidden fixed backdrop-blur-sm inset-0 bg-black/30 z-40" onClick={toggleSidebar} />
        )}

        {/* Mobile Header Bar */}
        {!isSidebarOpen && isClient && (
          <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="p-4">
              <button
                className="bg-white py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
                onClick={toggleSidebar}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className="flex items-center space-x-2">

                  <div>
                    <div className="text-xl font-semibold text-gray-800">Contest And Datasets</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`w-64 bg-white border-r border-gray-200 fixed top-0 left-0 h-full transition-transform duration-300 z-40 md:w-72 shadow-xl ${isSidebarOpen ? "open mobile-sidebar" : "mobile-sidebar"
            } md:translate-x-0 md:static`}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-2">

              <Link href="/" className="flex items-center space-x-3 z-50">
                <img src="/logo.svg" alt="Lab Logo" className="h-12 w-35" />
              </Link>
            </div>

            {/* Close button for mobile */}
            {isSidebarOpen && isClient && (
              <button
                className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="p-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavigation(item.id)
                      if (isSidebarOpen && isClient) toggleSidebar()
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${isActive
                        ? "bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                      }`}
                  >
                    <div
                      className={`text-xl transition-transform group-hover:scale-110 ${isActive ? "scale-110" : ""}`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${isActive ? "text-blue-700" : "text-gray-700"}`}>{item.label}</div>
                      <div className={`text-xs ${isActive ? "text-blue-500" : "text-gray-400"}`}>
                        {item.description}
                      </div>
                    </div>
                    {isActive && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </button>
                )
              })}
            </nav>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-xs text-gray-600">Active Projects</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`absolute top-0 right-0 bottom-0 overflow-y-auto px-6 transition-all duration-300 w-full md:w-[calc(100%-18rem)] md:left-72 ${!isSidebarOpen && isClient ? "pt-24 md:pt-8" : "py-8"
            }`}
        >
          {children}
        </main>
      </div>
    </>
  )
}
