"use client"

export default function DebugInfo({ activePage, setActivePage }) {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
      <div>Active Page: {activePage}</div>
      <div className="flex gap-2 mt-2">
        <button onClick={() => setActivePage("datasets")} className="bg-blue-500 px-2 py-1 rounded">
          Datasets
        </button>
        <button onClick={() => setActivePage("competitions")} className="bg-green-500 px-2 py-1 rounded">
          Competitions
        </button>
      </div>
    </div>
  )
}
