"use client"
import { useState, useEffect } from "react"

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events")
  const [data, setData] = useState({
    events: [],
    projects: [],
    clubEvents: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})

  // Fetch data for active tab
  useEffect(() => {
    fetchData(activeTab)
  }, [activeTab])

  const fetchData = async (type) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/${type}`)
      const result = await response.json()

      if (result.success) {
        setData((prev) => ({
          ...prev,
          [type]: result.data,
        }))
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const url = editingItem
        ? `${API_BASE_URL}/api/${activeTab}/${editingItem._id}`
        : `${API_BASE_URL}/api/${activeTab}`

      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setShowForm(false)
        setEditingItem(null)
        setFormData({})
        fetchData(activeTab)
        alert(editingItem ? "Item updated successfully!" : "Item created successfully!")
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      alert("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/${activeTab}/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        fetchData(activeTab)
        alert("Item deleted successfully!")
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      alert("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    // Handle links object for projects
    if (activeTab === "projects" && item.links) {
      setFormData({
        ...item,
        demoLink: item.links.demo || "",
        githubLink: item.links.github || "",
        researchPaperLink: item.links.researchPaper || "",
        liveLink: item.links.live || "",
        frontendLink: item.links.frontend || "",
        backendLink: item.links.backend || "",
      })
    } else {
      setFormData(item)
    }
    setShowForm(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayInputChange = (e, fieldName) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value.split(",").map((item) => item.trim()),
    }))
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingItem(null)
    setFormData({})
  }

  const getFormFields = () => {
    switch (activeTab) {
      case "events":
        return [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "type", label: "Type", type: "select", options: ["event", "news"], required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "time", label: "Time", type: "text" },
          { name: "location", label: "Location", type: "text" },
          { name: "description", label: "Description", type: "textarea", required: true },
          { name: "fullDescription", label: "Full Description", type: "textarea" },
          { name: "image", label: "Image URL", type: "text" },
          { name: "tags", label: "Tags (comma separated)", type: "text", isArray: true },
          { name: "speakers", label: "Speakers (comma separated)", type: "text", isArray: true },
          { name: "capacity", label: "Capacity", type: "text" },
          { name: "registrationLink", label: "Registration Form Link (Google Form)", type: "url" },
        ]
      case "clubEvents":
        return [
          { name: "title", label: "Event Title", type: "text", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "time", label: "Time", type: "text", required: true },
          { name: "location", label: "Location", type: "text", required: true },
          { name: "shortDescription", label: "Short Description", type: "textarea", required: true },
          { name: "fullDescription", label: "Full Description", type: "textarea" },
          { name: "image", label: "Image URL", type: "text" },
          { name: "instructor", label: "Instructor", type: "text" },
          { name: "instructorBio", label: "Instructor Bio", type: "textarea" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "price", label: "Price", type: "text" },
          {
            name: "difficulty",
            label: "Difficulty",
            type: "select",
            options: ["Beginner", "Intermediate", "Advanced"],
          },
          { name: "maxParticipants", label: "Max Participants", type: "number" },
          { name: "registrationDeadline", label: "Registration Deadline", type: "date" },
          { name: "prerequisites", label: "Prerequisites", type: "textarea" },
          { name: "tags", label: "Tags (comma separated)", type: "text", isArray: true },
          { name: "outcomes", label: "Learning Outcomes (comma separated)", type: "text", isArray: true },
          { name: "materials", label: "Materials Needed (comma separated)", type: "text", isArray: true },
          { name: "certificate", label: "Certificate Provided", type: "select", options: ["true", "false"] },
          { name: "registrationLink", label: "Registration Form Link (Google Form)", type: "url" },
        ]
      case "projects":
        return [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea", required: true },
          { name: "image", label: "Image URL", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["completed", "ongoing"], required: true },
          { name: "technologies", label: "Technologies (comma separated)", type: "text", isArray: true },
          { name: "duration", label: "Duration", type: "text" },
          { name: "teamSize", label: "Team Size", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "demoLink", label: "Demo Link", type: "url" },
          { name: "githubLink", label: "GitHub Repository Link", type: "url" },
          { name: "researchPaperLink", label: "Research Paper Link", type: "url" },
          { name: "liveLink", label: "Live Project Link", type: "url" },
          { name: "frontendLink", label: "Frontend Repository Link", type: "url" },
          { name: "backendLink", label: "Backend Repository Link", type: "url" },
        ]
      default:
        return []
    }
  }

  const renderTable = () => {
    const currentData = data[activeTab] || []

    if (currentData.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No {activeTab} found</p>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
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
            {currentData.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {(item.description || item.shortDescription)?.substring(0, 100)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.type === "event" || item.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : item.type === "news" || item.status === "ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.type || item.status || new Date(item.date).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activeTab === "clubEvents" ? (
                    item.registrationLink ? (
                      <a
                        href={item.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Form Link
                      </a>
                    ) : (
                      "No Link"
                    )
                  ) : (
                    new Date(item.createdAt || item.date).toLocaleDateString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderForm = () => {
    const fields = getFormFields()

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
          <div className="mt-3">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? "Edit" : "Add New"} {activeTab === "clubEvents" ? "Club Event" : activeTab.slice(0, -1)}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={field.isArray ? (formData[field.name] || []).join(", ") : formData[field.name] || ""}
                      onChange={field.isArray ? (e) => handleArrayInputChange(e, field.name) : handleInputChange}
                      required={field.required}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option === "true" ? "Yes" : option === "false" ? "No" : option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.isArray ? (formData[field.name] || []).join(", ") : formData[field.name] || ""}
                      onChange={field.isArray ? (e) => handleArrayInputChange(e, field.name) : handleInputChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your DS Lab data</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { key: "events", label: "Events & News" },
              { key: "clubEvents", label: "Club Events" },
              { key: "projects", label: "Projects" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Manage {activeTab === "clubEvents" ? "Club Events" : activeTab === "events" ? "Events & News" : "Projects"}
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Add New {activeTab === "clubEvents" ? "Club Event" : activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Data Table */}
        {!loading && renderTable()}

        {/* Form Modal */}
        {showForm && renderForm()}
      </div>
    </div>
  )
}
