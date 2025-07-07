"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { X, ChevronRight, Home, FolderOpen, BookOpen, Users, GraduationCap, Calendar } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true)
      else setScrolled(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Project & Publications", href: "/members", icon: FolderOpen },
    { name: "Our Team", href: "/members", icon: Users },
    { name: "Contest & Dataset", href: "/course", icon: GraduationCap },
    { name: "Events & News", href: "/news-events", icon: Calendar },
  ]

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${scrolled
            ? "bg-white/80 backdrop-blur-md border-gray-200 shadow-lg"
            : "bg-white/95 backdrop-blur-sm border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4.5  flex items-center justify-between font-outfit">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 z-50">
            <img src="/logo.svg" alt="Lab Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation - NO ICONS */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#09509E] font-medium transition-all duration-200 relative group px-3 py-2 rounded-lg "
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#09509E] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Us Button - Your Design */}
          <Link href="/contact">
            <button className="hidden lg:inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-[#09509E] px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
              Contact Us
              <ChevronRight
                className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                size={24}
                strokeWidth={2}
              />
            </button>
          </Link>


          {/* Mobile Hamburger */}
          <button
            className="lg:hidden relative z-50 p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute top-0 left-0 w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${mobileMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
              ></span>
              <span
                className={`absolute top-2.5 left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`absolute top-5 left-0 w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Slide-out Menu - WITH ICONS */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Menu Header - No Logo */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 text-lg">Navigation Menu</h3>
              <p className="text-sm text-gray-500">Data Science Lab</p>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* Navigation Links - WITH ICONS */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 p-4 text-gray-700 hover:text-[#09509E] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 rounded-xl font-medium transition-all duration-200 group transform hover:scale-105"
                    onClick={closeMobileMenu}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: mobileMenuOpen ? "slideInRight 0.3s ease-out forwards" : "none",
                    }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#09509E]" />
                    </div>
                    <span className="flex-1">{item.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200 text-[#09509E]" />
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <Link href="/contact">
              <button className="hidden lg:inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-[#09509E] px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
                Contact Us
                <ChevronRight
                  className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                  size={24}
                  strokeWidth={2}
                />
              </button>
            </Link>

            {/* Additional Info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Always Active For You</span>
              </div>
              <p className="text-xs text-gray-400">Daffodil International University</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
