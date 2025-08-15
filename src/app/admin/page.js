"use client"
import LoginPage from "@/components/AdminDashboard/LogininPage"
import Sidebar from "@/components/AdminDashboard/SideBar"
import WelcomePage from "@/components/AdminDashboard/WelcoomePage"
import { useState, useEffect } from "react"


const ADMIN_PASSWORD = "123"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated")
    const authExpiry = localStorage.getItem("adminAuthExpiry")

    if (authStatus === "true" && authExpiry) {
      const now = new Date().getTime()
      const expiry = Number.parseInt(authExpiry)

      if (now < expiry) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminAuthExpiry")
      }
    }
  }, [])

  const handleLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      const expiry = new Date().getTime() + 30 * 60 * 1000 // 30 minutes
      localStorage.setItem("adminAuthenticated", "true")
      localStorage.setItem("adminAuthExpiry", expiry.toString())
      setLoginError("")
      return true
    } else {
      setLoginError("Invalid password")
      return false
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminAuthExpiry")
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} loginError={loginError} />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 lg:ml-64 h-full overflow-hidden">
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <button onClick={() => setIsMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="w-10" />
        </div>

        <WelcomePage />
      </div>
    </div>
  )
}
