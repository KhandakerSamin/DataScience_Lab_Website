"use client"

import CompetitionPage from "@/components/C&Dpage/CompetitionPage"
import DashboardLayout from "@/components/C&Dpage/DashboardLayout"
import DatasetPage from "@/components/C&Dpage/DataSetPage"
import DebugInfo from "@/components/C&Dpage/DebugInfo"
import { useState } from "react"


export default function ContestDatasetPage() {
  const [activePage, setActivePage] = useState("datasets")

  const renderContent = () => {
    console.log("Rendering content for:", activePage) // Debug log

    switch (activePage) {
      case "datasets":
        return <DatasetPage />
      case "competitions":
        return <CompetitionPage />
      case "home":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome to Data Science Lab</h1>
            <p className="text-gray-600 mt-4">Select a section from the sidebar to get started.</p>
          </div>
        )
      case "analytics":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-4">Analytics features coming soon.</p>
          </div>
        )
      case "community":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Community</h1>
            <p className="text-gray-600 mt-4">Community features coming soon.</p>
          </div>
        )
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600 mt-4">Settings panel coming soon.</p>
          </div>
        )
      default:
        return <DatasetPage />
    }
  }

  return (
    <>
      <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
        {renderContent()}
      </DashboardLayout>
      {/* <DebugInfo activePage={activePage} setActivePage={setActivePage} /> */}
    </>
  )
}
