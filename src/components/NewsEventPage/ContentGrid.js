"use client"

import EventCard from "./EventCard"

export default function ContentGrid({ filteredData }) {
  if (filteredData.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-[#09509E]/10 rounded-full flex items-center justify-center">
            <div className="text-[#09509E] text-2xl">🔍</div>
          </div>
          <h3 className="text-xl font-semibold text-[#09509E] mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters to find what you are looking for.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {filteredData.map((item) => (
        <EventCard key={item.id} item={item} />
      ))}
    </div>
  )
}
