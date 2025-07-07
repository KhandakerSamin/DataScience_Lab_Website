"use client"

import { Check, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])
  const sectionRef = useRef(null)

  const stats = [
    { number: 10, label: "Collaborations", suffix: "+" },
    { number: 50, label: "Team Members", suffix: "+" },
    { number: 20, label: "Publication", suffix: "+" },
    { number: 28, label: "Research Award", suffix: "+" },
  ]

  const skills = [
    "Perfect Time Management",
    "Perfect Knowledge about ML & AI Algorithm",
    "Easily understanding the Real-life Data",
    "Advance Programming Language Knowledge",
    "Advanced & Updated Technology",
    "24/7 Expert Lab Active Support",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 1
        const end = stat.number
        const duration = 2000 // 2 seconds
        const increment = end / (duration / 50)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            start = end
            clearInterval(timer)
          }

          setAnimatedStats((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(start)
            return newStats
          })
        }, 50)

        return () => clearInterval(timer)
      })
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="w-full bg-gray-50 font-outfit">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1220px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Statistics Cards */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl aspect-square flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#09509E] mb-2">
                    {animatedStats[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-[#03111F] font-semibold text-sm md:text-base lg:text-lg text-center leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-green-600 leading-tight">
                Our Expert Lab Students Have Special Skills
              </h2>

              <p className="text-gray-700 text-lg font-normal leading-relaxed">
                The Data Science Learning Goals Of Lab Experiences Include Enhancing Mastery Of Data Science Subject
                Matter, Developing Statistical Analysis, Increasing Understanding Of The Real-Life Data Complexity And
                Ambiguity Of Empirical Work
              </p>

              {/* Skills List */}
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              {/* More About Us Button */}
              <div className="pt-4">
                <button className="inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
                  More About Us
                  <ChevronRight
                    className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
