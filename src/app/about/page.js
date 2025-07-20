import projectsData from "@/data/projectsData";
import PnDSection from "@/components/P&Dpage/P&Dsection";

export default function ProjectDevelopmentPage() {
  const completed = projectsData.filter((p) => p.category === "Completed");
  const ongoing = projectsData.filter((p) => p.category === "Ongoing");

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Projects</h1>
      <PnDSection title="Featured Projects" projects={completed} />
      <PnDSection title="On Going Developments" projects={ongoing} />
    </main>
  );
}
