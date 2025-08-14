"use client"
import { useState } from "react"
import ModernFileUpload from "./MordernFileUpload"

export default function GalleryForm({ formData, setFormData, onSubmit, editingItem, uploading }) {
  const [imageUploading, setImageUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileSelect = async (file) => {
    setImageUploading(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append("image", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload image")
      }

      const result = await response.json()
      setFormData((prev) => ({
        ...prev,
        image: result.data.url,
      }))
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image: " + error.message)
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {editingItem ? "Edit Gallery Image" : "Add New Gallery Image"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="events">Events</option>
            <option value="workshops">Workshops</option>
            <option value="competitions">Competitions</option>
            <option value="activities">Activities</option>
            <option value="achievements">Achievements</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Order (for display)</label>
          <input
            type="number"
            name="order"
            value={formData.order || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image * (High Quality Recommended)</label>
        <ModernFileUpload onFileSelect={handleFileSelect} uploading={imageUploading} currentImage={formData.image} />
        <p className="text-sm text-gray-500 mt-1">
          Upload high-quality images for best gallery display. Recommended size: 1920x1080 or higher.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={uploading || imageUploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Saving..." : editingItem ? "Update Gallery Image" : "Add Gallery Image"}
        </button>
      </div>
    </form>
  )
}
