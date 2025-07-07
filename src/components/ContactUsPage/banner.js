"use client"

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-white py-12 px-4 font-outfit">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-[#39B24A]/10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-16 right-20 w-12 h-12 bg-[#09509E]/10 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-8 left-1/4 w-20 h-20 bg-[#39B24A]/10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-12 right-1/3 w-14 h-14 bg-[#09509E]/10 rounded-full animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        ></div>

        {/* Flowing lines */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 200" fill="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39B24A" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#39B24A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#39B24A" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#09509E" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#09509E" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#09509E" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q250,75 500,100 T1000,100"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,125 Q300,100 600,125 T1000,125"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Data Science themed illustrations */}
        <div className="absolute top-12 right-16 opacity-20">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="30" stroke="#39B24A" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="50" cy="50" r="3" fill="#09509E" />
            <circle cx="35" cy="35" r="2" fill="#39B24A" />
            <circle cx="65" cy="35" r="2" fill="#39B24A" />
            <circle cx="35" cy="65" r="2" fill="#39B24A" />
            <circle cx="65" cy="65" r="2" fill="#39B24A" />
          </svg>
        </div>

        <div className="absolute bottom-8 left-16 opacity-20">
          <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
            <rect x="15" y="70" width="6" height="20" fill="#39B24A" />
            <rect x="30" y="60" width="6" height="30" fill="#09509E" />
            <rect x="45" y="50" width="6" height="40" fill="#39B24A" />
            <rect x="60" y="40" width="6" height="50" fill="#09509E" />
            <rect x="75" y="30" width="6" height="60" fill="#39B24A" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-5xl font-bold text-[#39B24A] mb-4 leading-tight">
          Lets work together
          <br />
          <span className="text-gray-600">- on your next project.</span>
        </h1>

        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
          Ready to transform your data into actionable insights? Our team of data science experts is here to help you
          unlock the power of your data and drive meaningful results.
        </p>
      </div>
    </div>
  )
}
