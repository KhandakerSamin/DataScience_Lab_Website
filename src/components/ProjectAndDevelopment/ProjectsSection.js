import ProjectCard from "./ProjectCard"

export default function ProjectsSection({ title, projects, startIndex = 0 }) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="w-24 h-1 bg-[#09509E] mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={startIndex + index} />
        ))}
      </div>
    </section>
  )
}
