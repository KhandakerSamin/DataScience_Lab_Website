"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GalleryForm from "../../../components/AdminDashboard/GalleryForm"
import Toast from "../../../components/AdminDashboard/Toast"
import ConfirmDialog from "../../../components/AdminDashboard/ConfirmDialog"
import Sidebar from "@/components/AdminDashboard/SideBar"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export default function GalleryPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [gallery, setGallery] = useState([])
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
      fetchGallery()
    }
  }, [isAuthenticated])

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/gallery`)
      if (!response.ok) throw new Error("Failed to fetch gallery")
      const result = await response.json()
      setGallery(result.data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      showToast("Failed to fetch gallery: " + err.message, "error")
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
      if (!formData.title || !formData.image) {
        showToast("Please fill in all required fields (title and image)", "error")
        return
      }

      const { _id, createdAt, updatedAt, ...cleanFormData } = formData

      const url = editingItem ? `${API_BASE_URL}/api/gallery/${editingItem._id}` : `${API_BASE_URL}/api/gallery`

      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFormData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${editingItem ? "update" : "create"} gallery item`)
      }

      await fetchGallery()
      setShowForm(false)
      setEditingItem(null)
      setFormData({})
      setError(null)

      showToast(`Gallery item ${editingItem ? "updated" : "created"} successfully!`, "success")
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
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete gallery item")
      }

      await fetchGallery()
      showToast("Gallery item deleted successfully!", "success")
    } catch (err) {
      showToast("Error deleting gallery item: " + err.message, "error")
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
          <h1 className="text-lg font-semibold">Gallery</h1>
          <div className="w-10" />
        </div>

        <div className="h-full overflow-y-auto">
          <div className="px-4 lg:px-6 py-4 max-w-full">
            {/* Header */}
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Gallery</h1>
                <p className="text-gray-600 text-sm lg:text-base">Manage your gallery images</p>
              </div>
              <button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors flex-shrink-0 w-full sm:w-auto"
              >
                Add New Image
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
                <GalleryForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={handleCancelForm}
                  editingItem={editingItem}
                  uploadingImage={uploadingImage}
                  onFileChange={handleFileChange}
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

            {/* Gallery Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gallery.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={item.image || "/placeholder.svg?height=300&width=300"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {item.category || "General"}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && !loading && (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Images</h3>
                    <p className="text-gray-500">Add your first image to get started.</p>
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
        title="Delete Gallery Item"
        message="Are you sure you want to delete this image? This action cannot be undone."
      />

      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={closeToast} />
    </div>
  )
}
