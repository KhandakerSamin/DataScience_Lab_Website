"use client"

import { useState, useEffect } from "react"
import TeamBanner from "@/components/TeamPage/TeamBanner"
import TeamMemberCard from "@/components/TeamPage/TeamMemberCard"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const timestamp = new Date().getTime()
      const response = await fetch(`${API_BASE_URL}/api/team?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setTeamMembers(result.data)
      } else {
        throw new Error(result.error || "Failed to fetch team members")
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-background min-h-screen bg-gray-50">
        <TeamBanner />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading team members...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen bg-gray-50">
        <TeamBanner />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Team</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchTeamMembers}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (teamMembers.length === 0) {
    return (
      <div className="bg-background min-h-screen bg-gray-50">
        <TeamBanner />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Team Members Found</h3>
              <p className="text-gray-600">Team information will be available soon.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Group team members by position
  const hierarchy = {
    "Chief Advisor": teamMembers.filter((m) => m.position === "Chief Advisor"),
    Advisors: teamMembers.filter((m) => m.position === "Advisor"),
    "Lab Incharge": teamMembers.filter((m) => m.position === "Lab Incharge"),
    Faculty: teamMembers.filter((m) => m.position === "Faculty"),
    "Lab Associates": teamMembers.filter((m) => m.position === "Lab Associate"),
    "Lab Members": teamMembers.filter((m) => m.position === "Lab Members"),
  }

  const getGridLayout = (members) => {
    const count = members.length
    if (count <= 5) {
      return { rows: [Math.min(3, count), Math.max(0, count - 3)] }
    } else if (count > 8) {
      return {
        rows: Array(Math.ceil(count / 4))
          .fill()
          .map(() => 4)
          .slice(0, -1)
          .concat([count % 4 || 4]),
      }
    } else {
      return { rows: [3, count - 3] }
    }
  }

  return (
    <div className="bg-background min-h-screen bg-gray-50">
      <TeamBanner />
      <div className="container mx-auto px-4 py-12">
        {/* <div className="flex justify-end mb-6">
          <button
            onClick={fetchTeamMembers}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            disabled={loading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div> */}

        {Object.entries(hierarchy).map(([role, members], index) => {
          if (members.length === 0) return null

          const layout = getGridLayout(members)
          let startIdx = 0

          return (
            <div key={role} className="mb-12">
              <h2 className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4 ml-9">{role}</h2>

              {/* Mobile View */}
              <div className="block lg:hidden space-y-6">
                {members.map((member, idx) => (
                  <div key={member._id || idx} className="flex justify-center">
                    <TeamMemberCard member={member} />
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block">
                {layout.rows.map((rowCount, rowIndex) => {
                  const endIdx = startIdx + rowCount
                  const rowMembers = members.slice(startIdx, endIdx)
                  startIdx = endIdx

                  return (
                    <div key={rowIndex} className="flex justify-center mb-6">
                      <div className={`grid grid-cols-${Math.min(rowCount, 4)} gap-6`}>
                        {rowMembers.map((member, idx) => (
                          <TeamMemberCard key={member._id || idx} member={member} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
