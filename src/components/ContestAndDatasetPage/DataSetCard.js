"use client"
import { ExternalLink, Download, Heart } from "lucide-react"

export default function DatasetCard({ dataset }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const formatUpdatedTime = (days) => {
    if (days === 0) return "Updated today"
    if (days === 1) return "Updated 1 day ago"
    if (days < 30) return `Updated ${days} days ago`
    if (days < 365) return `Updated ${Math.floor(days / 30)} months ago`
    return `Updated ${Math.floor(days / 365)} years ago`
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const handleCardClick = () => {
    if (dataset.kaggleUrl) {
      window.open(dataset.kaggleUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200 flex flex-col"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-36 bg-gradient-to-br from-blue-50 to-indigo-100">
        <img
          src={dataset.image || "/placeholder.svg?height=150&width=300&text=Kaggle+Dataset"}
          alt={dataset.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `/placeholder.svg?height=150&width=300&text=${encodeURIComponent(
              dataset.title.substring(0, 20),
            )}`
          }}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {formatUpdatedTime(dataset.updatedDays)}
          </span>
        </div>
        {dataset.featured && (
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Title & Category */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
              {dataset.title}
            </h3>
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
              {dataset.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">{dataset.description}</p>

          {/* Author and Size */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {getInitials(dataset.author)}
              </div>
              <span className="text-xs text-gray-700 font-medium">{dataset.author}</span>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <span className="text-base">💾</span>
              <span className="text-xs font-medium">{dataset.size}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Download size={12} />
              <span>{formatNumber(dataset.downloads)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={12} />
              <span>{formatNumber(dataset.likes)}</span>
            </div>
          </div>

          {/* Tags */}
          {dataset.topics && dataset.topics.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1">
                {dataset.topics.slice(0, 2).map((topic, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                    {topic}
                  </span>
                ))}
                {dataset.topics.length > 2 && (
                  <span className="text-xs text-gray-500">+{dataset.topics.length - 2}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-auto border-t border-gray-100 pt-2">
          <div className="flex items-center justify-center text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors">
            <ExternalLink size={12} className="mr-1" />
            View on Kaggle
          </div>
        </div>
      </div>
    </div>
  )
}
