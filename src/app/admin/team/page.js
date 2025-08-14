"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import TeamForm from "../../../components/AdminDashboard/TeamForm"
import TeamCard from "../../../components/AdminDashboard/TeamCard"
import Toast from "../../../components/AdminDashboard/Toast"
import ConfirmDialog from "../../../components/AdminDashboard/ConfirmDialog"
import Sidebar from "@/components/AdminDashboard/SideBar"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function TeamPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [team, setTeam] = useState([])
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
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
        router.push("/admin")
      }
    } else {
      router.push("/admin")
    }
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeam()
    }
  }, [isAuthenticated])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/team`)
      if (!response.ok) throw new Error("Failed to fetch team")
      const result = await response.json()
      setTeam(result.data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      showToast("Failed to fetch team: " + err.message, "error")
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
      showToast("Failed to upload image: " + err.message, "error")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!formData.name || !formData.position) {
        showToast("Please fill in all required fields (name and position)", "error")
        return
      }

      const { _id, createdAt, updatedAt, ...cleanFormData } = formData

      const url = editingItem ? `${API_BASE_URL}/api/team/${editingItem._id}` : `${API_BASE_URL}/api/team`

      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFormData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${editingItem ? "update" : "create"} team member`)
      }

      await fetchTeam()
      setShowForm(false)
      setEditingItem(null)
      setFormData({})
      setError(null)

      showToast(`Team member ${editingItem ? "updated" : "created"} successfully!`, "success")
    } catch (err) {
      showToast("Error: " + err.message, "error")
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setShowForm(true)
    scrollToTop()
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete team member")
      }

      await fetchTeam()
      showToast("Team member deleted successfully!", "success")
    } catch (err) {
      showToast("Error deleting team member: " + err.message, "error")
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
    scrollToTop()
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingItem(null)
    setFormData({})
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminAuthExpiry")
    router.push("/admin")
  }

  if (!isAuthenticated) {
    return <div>Redirecting...</div>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 lg:ml-64 h-full overflow-hidden">
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <button onClick={() => setIsMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Team Members</h1>
          <div className="w-10" />
        </div>

        <div className="h-full overflow-y-auto">
          <div className="px-4 lg:px-6 py-4 max-w-full">
            {/* Header */}
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Team Members</h1>
                <p className="text-gray-600 text-sm lg:text-base">Manage your team members</p>
              </div>
              <button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors flex-shrink-0 w-full sm:w-auto"
              >
                Add New Member
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
                <TeamForm
                  formData={formData}
                  setFormData={setFormData}
                  onFileChange={handleFileChange}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelForm}
                  editingItem={editingItem}
                  uploadingImage={uploadingImage}
                />
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            )}

            {/* Team Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {team.map((member) => (
                  <TeamCard key={member._id} member={member} onEdit={handleEdit} onDelete={handleDeleteClick} />
                ))}
                {team.length === 0 && !loading && (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Team Members</h3>
                    <p className="text-gray-500">Add your first team member to get started.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
      />

      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={closeToast} />
    </div>
  )
}
