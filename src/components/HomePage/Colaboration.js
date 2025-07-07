"use client"

import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"

export default function CollaborationCTASection() {
  return (
    <section className="w-full bg-gray-50 font-poppins py-[200px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with relative positioning for robot */}
        <div className="relative">
          {/* Main Green Card */}
          <div className="bg-green-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-8 lg:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#09509E] leading-tight">To Collaborate With Us</h2>

                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  Our Expert Teachers, Lab Students Are Always Active For You.
                </p>

                <div className="pt-2">
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

              {/* Right side - empty space for robot positioning */}
              <div className="hidden lg:block"></div>
            </div>
          </div>

          {/* Robot SVG - Positioned outside the box */}
          <div className="hidden lg:inline-block absolute top-2/5 right-1/17 transform -translate-y-1/2 translate-x-8 lg:translate-x-12">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <Image src="/robo.svg" alt="Collaboration Robot Illustration" fill className="object-contain" priority />
            </div>
          </div>

          {/* Mobile Robot - Positioned differently on mobile */}
          <div className="lg:hidden flex justify-center mt-8">
            <div className="relative w-48 h-48">
              <Image src="/robo.svg" alt="Collaboration Robot Illustration" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
