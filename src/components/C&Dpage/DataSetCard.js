"use client"

export default function DatasetCard({ dataset }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatUpdatedTime = (days) => {
    if (days === 0) return "Updated today"
    if (days === 1) return "Updated 1 day ago"
    return `Updated ${days} days ago`
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="relative">
        <img
          src={dataset.image || "/placeholder.svg?height=200&width=300"}
          alt={dataset.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {formatUpdatedTime(dataset.updatedDays)}
        </span>
        {dataset.featured && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#09509E] transition-colors">
            {dataset.title}
          </h3>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{dataset.category}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{dataset.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
              {getInitials(dataset.author)}
            </div>
            <span className="text-sm text-gray-700">{dataset.author}</span>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <span className="text-lg">💾</span>
            <span className="text-sm font-medium">{dataset.size}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>📥 {dataset.downloads} downloads</span>
          <span>❤️ {dataset.likes} likes</span>
        </div>
      </div>
    </div>
  )
}
