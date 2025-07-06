export default function AboutHighlight() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - SVG or Image */}
        <div className="flex justify-center">
          <img
            src="/mission-graphic.svg"
            alt="Our Mission"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Side - Text Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Do</h2>
          <p className="text-gray-600 mb-6 text-lg">
            We are a research-driven lab exploring the frontiers of Data Science, AI, and Machine Learning through education, projects, and collaboration.
          </p>

          {/* Feature Highlights */}
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <img
                  src="/icons/ml.svg"
                  alt="ML Icon"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">AI & Machine Learning</h4>
                <p className="text-gray-600 text-sm">
                  Researching models to solve real-world problems in vision, language, and more.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <img
                  src="/icons/education.svg"
                  alt="Education Icon"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Student Mentorship</h4>
                <p className="text-gray-600 text-sm">
                  Guiding future researchers with hands-on experience and supervision.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <img
                  src="/icons/publication.svg"
                  alt="Publication Icon"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Publications & Projects</h4>
                <p className="text-gray-600 text-sm">
                  Publishing impactful research and building open-source tools for the community.
                </p>
              </div>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="mt-6">
            <a
              href="/about"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
