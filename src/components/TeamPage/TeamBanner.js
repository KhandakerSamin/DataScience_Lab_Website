// components/TeamBanner.js
"use client";

export default function TeamBanner() {
  return (
    <section className="relative w-full h-[400px] bg-white flex items-center justify-center text-center overflow-hidden">
      {/* Simple bubble background */}
      <div className="absolute inset-0">
        <div className="absolute w-32 h-32 bg-[#E0F0E8] rounded-full opacity-30 top-10 left-10"></div>
        <div className="absolute w-24 h-24 bg-[#D0E0F0] rounded-full opacity-20 top-20 right-20"></div>
        <div className="absolute w-40 h-40 bg-[#E0F0E8] rounded-full opacity-25 bottom-10 left-20"></div>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#39B24A] mb-2">
          Meet the Minds Behind the Data Science Lab
        </h1>
        <p className="text-lg md:text-xl text-black mt-4">
          Guided by Experience, Driven by Curiosity
        </p>
      </div>
    </section>
  );
}