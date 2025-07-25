"use client"
import { ExternalLink, Download, Heart, Tag, Users } from "lucide-react"

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
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        <img
          src={dataset.image || "/placeholder.svg?height=200&width=300&text=Kaggle+Dataset"}
          alt={dataset.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(
              dataset.title.substring(0, 20),
            )}`
          }}
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {formatUpdatedTime(dataset.updatedDays)}
          </span>
        </div>

        {dataset.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Kaggle indicator */}
        <div className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={16} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
            {dataset.title}
          </h3>
          <span className="ml-3 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">
            {dataset.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{dataset.description}</p>

        {/* Author and Size */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {getInitials(dataset.author)}
            </div>
            <span className="text-sm text-gray-700 font-medium">{dataset.author}</span>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <span className="text-lg">💾</span>
            <span className="text-sm font-medium">{dataset.size}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Download size={14} />
            <span>{formatNumber(dataset.downloads)} downloads</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={14} />
            <span>{formatNumber(dataset.likes)} likes</span>
          </div>
        </div>

        {/* Topics/Tags */}
        {dataset.topics && dataset.topics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {dataset.topics.slice(0, 3).map((topic, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {topic}
                </span>
              ))}
              {dataset.topics.length > 3 && (
                <span className="text-xs text-gray-500">+{dataset.topics.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          {dataset.license && (
            <span className="flex items-center gap-1">
              <Tag size={12} />
              {dataset.license}
            </span>
          )}
          {dataset.collaborators > 0 && (
            <span className="flex items-center gap-1">
              <Users size={12} />
              {dataset.collaborators} collaborators
            </span>
          )}
        </div>

        {/* Call to Action */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <ExternalLink size={14} className="mr-2" />
            View on Kaggle
          </div>
        </div>
      </div>
    </div>
  )
}
