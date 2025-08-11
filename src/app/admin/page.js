"use client"
import { useState, useEffect } from "react"
import DataTable from "../../components/AdminDashboard/DataTable"
import EventForm from "../../components/AdminDashboard/EventForm"
import ProjectForm from "../../components/AdminDashboard/ProjectForm"
import ClubEventForm from "../../components/AdminDashboard/ClubEventForm"
import Sidebar from "@/components/AdminDashboard/SideBar"
import Toast from "@/components/AdminDashboard/Toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
const ADMIN_PASSWORD = "dslab2025admin"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
  }

  const closeToast = () => {
    setToast({ show: false, message: "", type: "success" })
  }

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData(activeTab)
    }
  }, [isAuthenticated, activeTab])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuthenticated", "true")
      setLoginError("")
    } else {
      setLoginError("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuthenticated")
    setPassword("")
  }

  const fetchData = async (type) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/${type}`)
      if (!response.ok) throw new Error(`Failed to fetch ${type}`)
      const result = await response.json()
      setData((prev) => ({ ...prev, [type]: result.data || [] }))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (file) => {
    if (!file) return

    setUploadingImage(true)
    const formDataUpload = new FormData()
    formDataUpload.append("image", file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formDataUpload,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload image")
      }

      const result = await response.json()
      if (result.success && result.data && result.data.url) {
        setFormData((prev) => ({ ...prev, image: result.data.url }))
        showToast("Image uploaded successfully!", "success")
      } else {
        throw new Error("Invalid response format from server")
      }
    } catch (err) {
      console.error("Image upload error:", err)
      showToast("Failed to upload image: " + err.message, "error")
      setError("Failed to upload image: " + err.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const validateFormData = () => {
    if (activeTab === "events") {
      if (!formData.title || !formData.description) {
        showToast("Please fill in all required fields (title and description)", "error")
        return false
      }
    } else if (activeTab === "clubEvents") {
      if (!formData.title || !formData.date || !formData.shortDescription) {
        showToast("Please fill in all required fields (title, date, and short description)", "error")
        return false
      }
    } else if (activeTab === "projects") {
      if (!formData.title || !formData.description) {
        showToast("Please fill in all required fields (title and description)", "error")
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!validateFormData()) {
        return
      }

      const { _id, createdAt, updatedAt, ...cleanFormData } = formData

      const url = editingItem
        ? `${API_BASE_URL}/api/${activeTab}/${editingItem._id}`
        : `${API_BASE_URL}/api/${activeTab}`

      const method = editingItem ? "PUT" : "POST"

      console.log("Submitting to:", url, "Method:", method, "Data:", cleanFormData)

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFormData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Server error response:", errorData)
        throw new Error(errorData.error || `Failed to ${editingItem ? "update" : "create"} item`)
      }

      const result = await response.json()
      console.log("Success response:", result)

      await fetchData(activeTab)
      setShowForm(false)
      setEditingItem(null)
      setFormData({})
      setError(null)

      showToast(`${editingItem ? "Updated" : "Created"} successfully!`, "success")
    } catch (err) {
      console.error("Submit error:", err)
      showToast("Error: " + err.message, "error")
      setError(err.message)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      console.log("Deleting item with ID:", id)

      const response = await fetch(`${API_BASE_URL}/api/${activeTab}/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete item")
      }

      const result = await response.json()
      console.log("Delete success:", result)

      await fetchData(activeTab)
      setError(null)
      showToast("Deleted successfully!", "success")
    } catch (err) {
      console.error("Delete error:", err)
      showToast("Error deleting item: " + err.message, "error")
      setError(err.message)
    }
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setFormData({})
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingItem(null)
    setFormData({})
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">DS</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-gray-600">Enter password to access dashboard</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Admin Password"
              />
            </div>
            {loginError && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">{loginError}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 ml-64 h-full overflow-x-hidden">
        <div className="px-6 py-0 max-w-full">
          {/* Header */}
          <div className="mb-4 flex justify-between items-center pt-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "events" ? "Events & News" : activeTab === "clubEvents" ? "Club Events" : "Projects"}
              </h1>
              <p className="text-gray-600">Manage your {activeTab === "clubEvents" ? "club events" : activeTab}</p>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex-shrink-0"
            >
              Add New
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">Error: {error}</div>
          )}

          {/* Form */}
          {showForm && (
            <div className="mb-6">
              {activeTab === "events" && (
                <EventForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelForm}
                  editingItem={editingItem}
                  uploadingImage={uploadingImage}
                  onFileChange={handleFileChange}
                />
              )}
              {activeTab === "projects" && (
                <ProjectForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelForm}
                  editingItem={editingItem}
                  uploadingImage={uploadingImage}
                  onFileChange={handleFileChange}
                />
              )}
              {activeTab === "clubEvents" && (
                <ClubEventForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelForm}
                  editingItem={editingItem}
                  uploadingImage={uploadingImage}
                  onFileChange={handleFileChange}
                />
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Data Table */}
          {!loading && (
            <DataTable data={data[activeTab] || []} activeTab={activeTab} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={closeToast} />
    </div>
  )
}
