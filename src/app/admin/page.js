"use client"
import { useState, useEffect } from "react"
import DataTable from "../../components/AdminDashboard/DataTable"
import EventForm from "../../components/AdminDashboard/EventForm"
import ProjectForm from "../../components/AdminDashboard/ProjectForm"
import ClubEventForm from "../../components/AdminDashboard/ClubEventForm"
import Toast from "../../components/AdminDashboard/Toast"
import ConfirmDialog from "../../components/AdminDashboard/ConfirmDialog"
import LoginPage from "@/components/AdminDashboard/LogininPage"
import Sidebar from "@/components/AdminDashboard/SideBar"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
const ADMIN_PASSWORD = "dslab2025admin"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

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
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
  }

  const closeToast = () => {
    setToast({ show: false, message: "", type: "success" })
  }

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated")
    const authExpiry = localStorage.getItem("adminAuthExpiry")

    if (authStatus === "true" && authExpiry) {
      const now = new Date().getTime()
      const expiry = Number.parseInt(authExpiry)

      if (now < expiry) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminAuthExpiry")
      }
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData(activeTab)
    }
  }, [isAuthenticated, activeTab])

  const handleLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      const expiry = new Date().getTime() + 30 * 60 * 1000 // 30 minutes instead of 8 hours
      localStorage.setItem("adminAuthenticated", "true")
      localStorage.setItem("adminAuthExpiry", expiry.toString())
      setLoginError("")
      setLoginAttempts(0)
      return true
    } else {
      setLoginError("Invalid password")
      return false
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminAuthExpiry")
    setPassword("")
    setLoginAttempts(0)
    showToast("Logged out successfully", "success")
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
      console.log("Uploading file:", file.name, "Size:", file.size)

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formDataUpload,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload image")
      }

      const result = await response.json()
      console.log("Upload response:", result)

      if (result.success && result.data && result.data.url) {
        const imageUrl = result.data.url
        const filename = result.data.filename

        // Test if the image URL is accessible
        try {
          const testResponse = await fetch(`${API_BASE_URL}/api/verify-image/${filename}`)
          const verifyResult = await testResponse.json()

          if (!verifyResult.exists) {
            console.warn("Uploaded image file does not exist on server:", filename)
            showToast("Warning: Image uploaded but may not be accessible", "warning")
          }
        } catch (verifyError) {
          console.warn("Could not verify image existence:", verifyError)
        }

        setFormData((prev) => ({ ...prev, image: imageUrl }))
        console.log("Image URL set in form data:", imageUrl)
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

      if (cleanFormData.image) {
        console.log("Submitting with image URL:", cleanFormData.image)
      }

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

      if (result.data && cleanFormData.image) {
        console.log("Saved item image verification:", {
          submitted: cleanFormData.image,
          saved: result.data.image,
          match: cleanFormData.image === result.data.image,
        })
      }

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

  const handleDeleteClick = (item) => {
    setItemToDelete(item)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (itemToDelete) {
      await handleDelete(itemToDelete._id)
      setShowDeleteDialog(false)
      setItemToDelete(null)
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
    return <LoginPage onLogin={handleLogin} loginError={loginError} />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 lg:ml-64 h-full overflow-hidden">
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <button onClick={() => setIsMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="w-10" />
        </div>

        <div className="h-full overflow-y-auto">
          <div className="px-4 lg:px-6 py-4 max-w-full">
            {/* Header */}
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {activeTab === "events" ? "Events & News" : activeTab === "clubEvents" ? "Club Events" : "Projects"}
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Manage your {activeTab === "clubEvents" ? "club events" : activeTab}
                </p>
              </div>
              <button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors flex-shrink-0 w-full sm:w-auto"
              >
                Add New
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Error: {error}
              </div>
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
              <div className="overflow-x-auto">
                <DataTable
                  data={data[activeTab] || []}
                  activeTab={activeTab}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={closeToast} />
    </div>
  )
}
