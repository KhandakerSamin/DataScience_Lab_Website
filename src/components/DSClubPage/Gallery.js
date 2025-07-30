"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClubGallery from "./ClubGallery";

export default function Gallery() {

  return (
    <>

      <section className="gallery-section mx-auto py-16 px-4 md:px-10 text-center flex flex-col justify-center font-sans">
        <h2 className="text-3xl md:text-5xl font-bold text-[#39B24A] mb-4 drop-shadow-lg">Gallery</h2>

        <p className="max-w-3xl mx-auto text-gray-600 mb-16 text-sm md:text-base leading-relaxed opacity-90">
          This Club Is Supervised By The DATA SCIENCE LAB Which Is A Concern Of Department Of Software Engineering. Data
          Science Club Founded In August 2022. Our Mission Is To Help Students Of All Skill Levels Learn About Data
          Science And Machine Learning Through Tutorials, Presentations From Industry Professionals, And Hands-On
          Experience.
        </p>

        <div className="slider-container mx-auto max-w-6xl">
          <ClubGallery />
        </div>
      </section>
    </>
  );
}