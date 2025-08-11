"use client"

import ModernFileUpload from "./MordernFileUpload"

export default function ProjectForm({
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

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech)
    setFormData((prev) => ({ ...prev, technologies }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{editingItem ? "Edit" : "Add New"} Project</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              name="status"
              value={formData.status || "ongoing"}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category || ""}
              onChange={handleInputChange}
              placeholder="e.g., Web Development, Research"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration || ""}
              onChange={handleInputChange}
              placeholder="e.g., 6 months"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
            <input
              type="text"
              name="teamSize"
              value={formData.teamSize || ""}
              onChange={handleInputChange}
              placeholder="e.g., 4 members"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
          <input
            type="text"
            value={formData.technologies?.join(", ") || ""}
            onChange={handleTechnologiesChange}
            placeholder="React, Node.js, MongoDB, Python"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Project Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demo Link</label>
              <input
                type="url"
                name="demoLink"
                value={formData.demoLink || ""}
                onChange={handleInputChange}
                placeholder="https://demo.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Live Link</label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink || ""}
                onChange={handleInputChange}
                placeholder="https://live.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Link</label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink || ""}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frontend Link</label>
              <input
                type="url"
                name="frontendLink"
                value={formData.frontendLink || ""}
                onChange={handleInputChange}
                placeholder="https://github.com/username/frontend"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backend Link</label>
              <input
                type="url"
                name="backendLink"
                value={formData.backendLink || ""}
                onChange={handleInputChange}
                placeholder="https://github.com/username/backend"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Research Paper Link</label>
              <input
                type="url"
                name="researchPaperLink"
                value={formData.researchPaperLink || ""}
                onChange={handleInputChange}
                placeholder="https://example.com/paper.pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
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
            {editingItem ? "Update" : "Create"} Project
          </button>
        </div>
      </form>
    </div>
  )
}
