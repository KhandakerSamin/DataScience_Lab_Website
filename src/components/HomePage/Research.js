import { Users, FileSearch, ChevronRight, FileBadge2 } from "lucide-react"

export default function ResearchSection() {
  return (
    <section className="bg-green-50 w-full py-[200px] px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-[1220px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-bold font-700 text-green-600 mb-6 ">Research</h2>
          <p className="text-gray-700 text-lg font-normal md:text-xl max-w-4xl mx-auto leading-relaxed">
            We Are A Team Of Out-Of-The-Box Thinkers, With Deep Expertise In Analytics.We Love To Expand The Boundaries
            On Research With Our Own Data.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Research Team Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-[#09509E]" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4 ">Research Team</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-normal">
                We Are A Team Of Out-Of-The-Box Thinkers, With Deep Expertise In Analytics.We Love To Expand The
                Boundaries On Research With Our Own Data.
              </p>
            </div>
            <button className="inline-flex items-center  gap-2 text-black  hover:text-white hover:bg-[#09509E] border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
              Read More
              <ChevronRight className="text-white bg-[#09509E] group-hover:bg-white group-hover:text-[#09509E] rounded-full p-1 transition-colors duration-200" size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Research Topic Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <FileSearch className="w-12 h-12 text-[#09509E]" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4 ">Research Topic</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We Are A Team Of Out-Of-The-Box Thinkers, With Deep Expertise In Analytics.We Love To Expand The
                Boundaries On Research With Our Own Data.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-black hover:text-white hover:bg-[#09509E] border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
              Read More
              <ChevronRight className="text-white bg-[#09509E] group-hover:bg-white group-hover:text-[#09509E] rounded-full p-1 transition-colors duration-200" size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Research Publication Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-4">
                <FileBadge2 strokeWidth={2} className="w-12 h-12 text-[#09509E]" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Research Publication</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We Are A Team Of Out-Of-The-Box Thinkers, With Deep Expertise In Analytics.We Love To Expand The
                Boundaries On Research With Our Own Data.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-black hover:text-white hover:bg-[#09509E] border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
              Read More
              <ChevronRight className="text-white bg-[#09509E] group-hover:bg-white group-hover:text-[#09509E] rounded-full p-1 transition-colors duration-200" size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
