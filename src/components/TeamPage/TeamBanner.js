// components/TeamBanner.js
"use client";

export default function TeamBanner() {
  return (
    <section className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-white flex items-center justify-center text-center overflow-hidden px-4">
      {/* Background bubbles */}
      <div className="absolute inset-0">
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-[#E0F0E8] rounded-full opacity-30 top-4 left-4 sm:top-10 sm:left-10"></div>
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-[#D0E0F0] rounded-full opacity-20 top-16 right-6 sm:top-20 sm:right-20"></div>
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-[#E0F0E8] rounded-full opacity-25 bottom-6 left-10 sm:bottom-10 sm:left-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#39B24A] mb-2 leading-tight">
          Meet the Minds Behind the Data Science Lab
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-black mt-4">
          Guided by Experience, Driven by Curiosity
        </p>
      </div>
    </section>
  );
}
