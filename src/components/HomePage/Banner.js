"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function Banner() {
  return (
    <section className="relative bg-gray-50 -mt-16 py-[200px] font-outfit overflow-hidden">
      {/* Background Triangular Shapes */}
      <div className="absolute inset-0 hidden md:hidden lg:hidden overflow-hidden">
        {/* Top Right Triangle */}
        <div className="absolute top-0 -right-45 w-1/2 h-2/3 bg-green-100 opacity-60 transform rotate-12 origin-top-right rounded-bl-full"></div>

        {/* Bottom Left Triangle */}
        <div className="absolute bottom-0 -left-10 w-1/3 h-2/4 bg-green-50 opacity-60 transform  origin-bottom-left rounded-tr-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We Analyze & Visualize Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#39B24A] leading-tight">
                We Analyze & Visualize
                <br />
                The Real Life Data For Increasing
                <br />
                The Companies Businesses
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                First Time Providing Data Service In Bangladesh, Powered By Data Science Lab Of Daffodil International
                University, Dhaka, Bangladesh
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

            {/* Right SVG Illustration */}
            <div className="relative flex justify-end">
              <div className="relative w-full max-w-sm">
                <Image
                  src="/svg1.svg"
                  alt="Data Analysis Illustration"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data Driven Approach Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left SVG Illustration */}
            <div className="relative flex justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-sm">
                <Image
                  src="/svg2.svg"
                  alt="Data Driven Approach Illustration"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#39B24A] leading-tight">
                To Data Driven Approach
                <br />
                Data Mining, Visualization &<br />
                Optimization
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                A Data-Driven Approach Is When Decisions Are Based On Analysis And Interpretation Of Hard Data Rather
                Than Observation. A Data-Driven Approach Ensures That Solutions And Plans Are Supported By Data Of
                Factual Information, And Not Just Hunches, Intuition, Or Observation Alone.
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
          </div>
        </div>
      </div>
    </section>
  )
}
