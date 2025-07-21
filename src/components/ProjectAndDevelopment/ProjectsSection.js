import ProjectCard from "./ProjectCard"

export default function ProjectsSection({ title, projects, startIndex = 0 }) {
  console.log("ProjectsSection received:", { title, projects: projects?.length, startIndex })

  if (!projects || projects.length === 0) {
    return (
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No projects available in this category.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="w-24 h-1 bg-[#09509E] mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        {projects.map((project, index) => {
          console.log("Rendering project:", project.id, project.title)
          return <ProjectCard key={project.id} project={project} index={startIndex + index} />
        })}
      </div>
    </section>
  )
}
