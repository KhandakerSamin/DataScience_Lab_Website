"use client"

import { ArrowRight, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Hero() {
  const [rotatingTextIndex, setRotatingTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Rotating text options for the dynamic part
  const rotatingTexts = [
    "Data Scientific Solution",
    "AI & Machine Learning",
    "Business Intelligence",
    "Advanced Analytics",
  ]

  useEffect(() => {
    const currentFullText = rotatingTexts[rotatingTextIndex]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          if (currentLetterIndex < currentFullText.length) {
            setDisplayedText(currentFullText.substring(0, currentLetterIndex + 1))
            setCurrentLetterIndex((prev) => prev + 1)
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          // Deleting backward
          if (currentLetterIndex > 0) {
            setDisplayedText(currentFullText.substring(0, currentLetterIndex - 1))
            setCurrentLetterIndex((prev) => prev - 1)
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false)
            setRotatingTextIndex((prev) => (prev + 1) % rotatingTexts.length)
          }
        }
      },
      isDeleting ? 50 : 150,
    ) // Faster when deleting, slower when typing

    return () => clearTimeout(timer)
  }, [currentLetterIndex, isDeleting, rotatingTextIndex, rotatingTexts])

  return (
    <section className="w-full bg-gray-50 font-outfit overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[600px] py-12 lg:py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Static Headline + Animated Text */}
              <h1 className="text-3xl md:text-4xl lg:text-[50px] font-bold leading-tight">
                {/* Static part - no animation */}
                <div className="text-green-600 ">
                  Upgrade Your  Business
                  <span className="text-[#09509E]"> With</span>
                </div>

                {/* Typewriter animated part */}
                <div className="text-green-600 min-h-[1.4em] relative">
                  <span className="inline-block">
                    {displayedText}
                    {/* Blinking cursor */}
                    <span className="inline-block w-1 h-12 bg-green-600 ml-1 animate-pulse"></span>
                  </span>
                </div>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                First Time Providing Data Service In Bangladesh, Powered By Data Science Lab Of Daffodil International
                University, Dhaka, Bangladesh
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button className="inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] hover:text-[#09509E] hover:bg-white border-2 border-blue-800 px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
                Join Us
                <ChevronRight
                  className="text-[#09509E] bg-white group-hover:bg-[#09509E] group-hover:text-white rounded-full p-1 transition-colors duration-200"
                  size={24}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-r from-blue-100 to-green-100 rounded-full opacity-30 blur-3xl animate-pulse"></div>
            </div>

            {/* SVG Illustration */}
            <div className="relative z-10 w-full max-w-lg">
              <div className="relative animate-float">
                <Image
                  src="/hero.svg"
                  alt="Data Science Illustration"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
              </div>

              <div
                className="absolute -bottom-6 -right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>

              <div
                className="absolute top-8 -right-8 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
