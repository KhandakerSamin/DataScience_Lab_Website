"use client"

import { useState } from "react"

const academiaLogos = [
  { name: "Daffodil University", src: "/bannerlogo1.png", alt: "Daffodil University" },
  { name: "ULAB", src: "/logo-acc.png", alt: "University of Liberal Arts Bangladesh" },
  { name: "Daffodil University", src: "/logo-acc2.png", alt: "Daffodil University" },
]

const partnerLogos = [
  { name: "Umlong", src: "/logo-ind.jpg", alt: "Umlong" },
  { name: "Ghurni", src: "/logo-ind2.png", alt: "Ghurni" },
  { name: "Ghurni", src: "/logo-ind3.png", alt: "Ghurni" }
]

function LogoRow({ logos, title, direction = "left" }) {
  const [isPaused, setIsPaused] = useState(false)

  // Create enough duplicates for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="w-full overflow-hidden font-outfit">
      <h3 className="text-center text-[18px] font-normal text-gray-700 my-3">
        {title}
      </h3>
      
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div
          className="flex gap-6 sm:gap-10 w-fit"
          style={{
            animation: direction === "left"
              ? "scrollLeft 40s linear infinite"
              : "scrollRight 40s linear infinite",
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center p-2 hover:border hover:border-gray-300 transition-all duration-300"
              style={{ minWidth: "90px", height: "50px" }}
            >
              <img
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className="max-w-full max-h-full filter transition-all duration-300"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=60&width=120"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ColabLogo() {
  return (
    <section className="relative z-20 -mt-10 mb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl py-4 px-6 backdrop-blur-sm border border-gray-200">
          
          <div className="max-w-5xl mx-auto pb-4">
            {/* Academia Section */}
            <LogoRow 
              logos={academiaLogos} 
              title="Collaboration With Academia" 
              direction="left" 
            />
            
            {/* Divider */}
            <div className="mt-2 mb-1 border-t border-gray-300 border-dashed"></div>
            
            {/* Industry Section */}
            <LogoRow 
              logos={partnerLogos} 
              title="Collaboration With Industry" 
              direction="right" 
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Ensure smooth animation on all devices */
        @media (prefers-reduced-motion: no-preference) {
          .flex[style*="animation"] {
            will-change: transform;
          }
        }

        /* Pause animations for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .flex[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}