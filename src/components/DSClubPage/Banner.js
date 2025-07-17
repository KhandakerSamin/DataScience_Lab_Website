"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center text-center overflow-hidden font-outfit">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/DsClub.jpg')" }} // Replace with actual image path
      >
        {/* Green overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-700/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          Join Our Club
        </h1>
        <p className="text-white text-sm md:text-lg mb-6">
          First Time Providing Data Service in Bangladesh, Powered by Data Science Club <br />
          Of Daffodil International University, Dhaka, Bangladesh
        </p>
                  <Link href="/contact">
            <button className="hidden lg:inline-flex items-center gap-2 ml-0.5 text-white bg-[#09509E] pointer  border-2 border-[#09509E] px-5 py-2 rounded-full text-lg font-normal transition-colors duration-200 group">
              Register Now
              <ChevronRight
                className="text-[#09509E] bg-white  rounded-full p-1 transition-colors duration-200"
                size={24}
                strokeWidth={2}
              />
            </button>
          </Link>
      </div>
    </section>
  );
}

