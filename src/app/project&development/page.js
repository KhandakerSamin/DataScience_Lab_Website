import { projectsData } from "../../data/projectsData"
import PDSection from "../../components/P&Dpage/P&Dsection"

export default function ProjectDevelopmentPage() {
  const completedProjects = projectsData.filter((project) => project.status === "completed")
  const ongoingProjects = projectsData.filter((project) => project.status === "ongoing")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Projects & Development</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our innovative projects and ongoing developments in machine learning, web development, and
              cutting-edge technology solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Projects Section */}
        <PDSection title="Our Projects" projects={completedProjects} startIndex={0} />

        {/* On Going Developments Section */}
        <PDSection title="On Going Developments" projects={ongoingProjects} startIndex={completedProjects.length} />
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Want to collaborate on a project? Get in touch with us!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
