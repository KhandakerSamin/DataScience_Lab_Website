"use client"

import ModernFileUpload from "./MordernFileUpload"

export default function ClubEventForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editingItem,
  uploadingImage,
  onFileChange,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (fieldName, value) => {
    const array = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
    setFormData((prev) => ({ ...prev, [fieldName]: array }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{editingItem ? "Edit" : "Add New"} Club Event</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="text"
              name="time"
              value={formData.time || ""}
              onChange={handleInputChange}
              placeholder="e.g., 10:00 AM - 4:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty || "Beginner"}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration || ""}
              onChange={handleInputChange}
              placeholder="e.g., 3 hours"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price || ""}
              onChange={handleInputChange}
              placeholder="e.g., Free or $50"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline</label>
            <input
              type="date"
              name="registrationDeadline"
              value={formData.registrationDeadline || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Link</label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink || ""}
            onChange={handleInputChange}
            placeholder="Google Form or registration URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription || ""}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription || ""}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags?.join(", ") || ""}
              onChange={(e) => handleArrayChange("tags", e.target.value)}
              placeholder="Workshop, Python, Machine Learning"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
            <input
              type="text"
              name="prerequisites"
              value={formData.prerequisites || ""}
              onChange={handleInputChange}
              placeholder="Basic programming knowledge"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Learning Outcomes (comma separated)</label>
          <textarea
            value={formData.outcomes?.join(", ") || ""}
            onChange={(e) => handleArrayChange("outcomes", e.target.value)}
            rows="3"
            placeholder="Learn Python basics, Build ML models, Understand data analysis"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Materials Needed (comma separated)</label>
          <textarea
            value={formData.materials?.join(", ") || ""}
            onChange={(e) => handleArrayChange("materials", e.target.value)}
            rows="2"
            placeholder="Laptop, Python installed, Jupyter notebook"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
          <ModernFileUpload onFileSelect={onFileChange} currentImage={formData.image} uploading={uploadingImage} />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploadingImage}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {editingItem ? "Update" : "Create"} Club Event
          </button>
        </div>
      </form>
    </div>
  )
}
