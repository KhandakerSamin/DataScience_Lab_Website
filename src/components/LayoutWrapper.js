"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  
  // Define routes where Navbar and Footer should be hidden
  const hiddenRoutes = ["/login", "/admin", "/contest&dataset","/admin/events", "/admin/club-members", "/admin/projects", "/admin/team", "/admin/gallery","/admin/club-events"]
  const hideLayout = hiddenRoutes.includes(pathname)

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && <Footer />}
    </>
  )
}
