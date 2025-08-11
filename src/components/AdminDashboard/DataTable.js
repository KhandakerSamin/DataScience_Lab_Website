"use client"

export default function DataTable({ data, activeTab, onEdit, onDelete }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <p className="text-gray-500 text-lg">No {activeTab} found</p>
        <p className="text-gray-400 text-sm">Click &quot;Add New&quot; to create your first entry</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden top-0 z-">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeTab === "events" ? "Type" : activeTab === "projects" ? "Status" : "Date"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeTab === "clubEvents" ? "Registration" : "Created"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {item.image && (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {(item.description || item.shortDescription)?.substring(0, 80)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      activeTab === "events"
                        ? item.type === "event"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                        : activeTab === "projects"
                          ? item.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {activeTab === "events" ? item.type : activeTab === "projects" ? item.status : item.date}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activeTab === "clubEvents"
                    ? item.registrationLink
                      ? "✅ Available"
                      : "❌ No Link"
                    : new Date(item.createdAt || item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
