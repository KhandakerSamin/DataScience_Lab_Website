"use client"
import { ExternalLink, Users, Trophy, Clock, Building } from "lucide-react"

export default function CompetitionCard({ competition }) {
  if (!competition) return null

  const { id, title, description, organizationName, category, reward, totalTeams, deadline, url, imageUrl } =
    competition

  const formatDeadline = (deadline) => {
    if (!deadline) return "Active"
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return "Ended"
    } else if (diffDays === 0) {
      return "Ends today"
    } else if (diffDays <= 30) {
      return `${diffDays} days left`
    } else {
      return "Active"
    }
  }

  const formatReward = (reward) => {
    if (!reward || reward === "Knowledge") return "Knowledge"
    if (typeof reward === "string" && reward.includes("$")) {
      return reward
    }
    return `$${reward}`
  }

  const getStatusColor = (deadline) => {
    if (!deadline) return "text-green-600"
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return "text-red-600"
    } else if (diffDays <= 7) {
      return "text-orange-600"
    } else {
      return "text-green-600"
    }
  }

  // FIXED: Better URL handling and debugging
  const handleCardClick = (e) => {
    e.preventDefault()
    console.log(`🔗 Competition Details:`)
    console.log(`   Title: ${title}`)
    console.log(`   ID: ${id}`)
    console.log(`   URL: ${url}`)

    // Try multiple URL formats
    const urlsToTry = [
      url, // Original URL from API
      `https://www.kaggle.com/competitions/${id}`, // Standard format
      `https://www.kaggle.com/c/${id}`, // Alternative format
      `https://www.kaggle.com/competitions`, // Fallback to competitions page
    ]

    // Use the first valid URL
    for (const testUrl of urlsToTry) {
      if (testUrl && testUrl.includes("kaggle.com")) {
        console.log(`🚀 Opening: ${testUrl}`)
        window.open(testUrl, "_blank", "noopener,noreferrer")
        return
      }
    }

    // Final fallback
    console.log("🚀 Opening Kaggle competitions page as fallback")
    window.open("https://www.kaggle.com/competitions", "_blank", "noopener,noreferrer")
  }

  // Generate a nice placeholder image
  const placeholderImage = imageUrl || `/placeholder.svg?height=160&width=300&text=${encodeURIComponent(title)}`

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-all duration-200 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick(e)
        }
      }}
    >
      {/* Competition Header with Image */}
      <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 relative overflow-hidden">
        {/* Background Image */}
        <img
          src={placeholderImage || "/placeholder.svg"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = "none"
          }}
        />

        {/* Trophy Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Trophy className="text-white opacity-40" size={48} />
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded text-xs font-medium">
            {category || "Competition"}
          </span>
        </div>

        {/* External Link Icon */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white bg-opacity-90 rounded-full p-1">
            <ExternalLink className="text-gray-800" size={14} />
          </div>
        </div>

        {/* Organization Badge */}
        {organizationName && organizationName !== "Kaggle" && (
          <div className="absolute bottom-2 left-2">
            <div className="flex items-center gap-1 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded text-xs">
              <Building size={10} />
              <span>{organizationName}</span>
            </div>
          </div>
        )}
      </div>

      {/* Competition Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-[#09509E] transition-colors">
          {title || "Untitled Competition"}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {description || "No description available"}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-600">
              <Users size={12} />
              <span>{totalTeams?.toLocaleString() || "0"}</span>
            </span>
            <span className={`flex items-center gap-1 ${getStatusColor(deadline)}`}>
              <Clock size={12} />
              <span>{formatDeadline(deadline)}</span>
            </span>
          </div>
          <div className="font-semibold text-green-600">{formatReward(reward)}</div>
        </div>
      </div>
    </div>
  )
}
