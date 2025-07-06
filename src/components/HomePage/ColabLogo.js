"use client"

import { useState } from "react"

const academiaLogos = [
  { name: "Daffodil University", src: "/bannerlogo1.png", alt: "Daffodil University" },
  { name: "ULAB", src: "/bannerlogo2.png", alt: "University of Liberal Arts Bangladesh" },
  { name: "Daffodil University", src: "/bannerlogo1.png", alt: "Daffodil University" },
  { name: "ULAB", src: "/bannerlogo2.png", alt: "University of Liberal Arts Bangladesh" },
  { name: "Daffodil University", src:"/bannerlogo1.png", alt: "Daffodil University" },
]

const partnerLogos = [
  { name: "Umlong", src: "/bannerlogo2.png", alt: "Umlong" },
  { name: "Ghurni", src: "/bannerlogo1.png", alt: "Ghurni" },
  { name: "CEGIS", src: "/bannerlogo2.png", alt: "CEGIS" },
  { name: "Umlong", src: "/bannerlogo1.png", alt: "Umlong" },
  { name: "Ghurni", src: "/bannerlogo2.png", alt: "Ghurni" },
]

function LogoRow({ logos, title, direction = "left" }) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <div className="w-full overflow-hidden  font-outfit">
      <h3 className="text-center text-[18px] font-normal text-gray-700 my-3 ">{title}</h3>
      <div
        className="flex gap-10 w-fit "
        style={{
          animation: isPaused
            ? "none"
            : direction === "left"
              ? "scrollLeft 30s linear infinite"
              : "scrollRight 30s linear infinite",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center p-2  hover:shadow-md hover:border-2 "
            style={{ minWidth: "90px", height: "50px" }}
          >
            <img
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              className="max-w-full max-h-full  filter transition-all duration-300"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=60&width=120"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ColabLogo() {
  return (
    <section className="relative z-20 -mt-10 mb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl py-4 px-6 backdrop-blur-sm border border-gray-200">
          <div className="max-w-5xl mx-auto pb-4">
            <LogoRow logos={academiaLogos} title="Collaboration With Academia" direction="left" />
            <div className="mt-2 mb-1 border-t border-gray-300 border-dashed"></div>

            <LogoRow logos={partnerLogos} title="Collaboration With Industry" direction="right" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
