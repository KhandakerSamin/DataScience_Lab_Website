"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery() {
  const settings = {
    centerMode: true,
    centerPadding: "40px",
    slidesToShow: 3,
    infinite: true,
    arrows: true,
    dots: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
  ];

  return (
    <section className="py-16 px-4 md:px-10 text-center bg-gray-50 font-outfit">
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-[#39B24A] mb-4">Gallery</h2>

      {/* Description */}
      <p className="max-w-3xl mx-auto text-gray-600 mb-12 text-sm md:text-base leading-relaxed">
        This Club Is Supervised By The DATA SCIENCE LAB Which Is A Concern Of Department Of Software Engineering.
        Data Science Club Founded In August 2022. Our Mission Is To Help Students Of All Skill Levels Learn About
        Data Science And Machine Learning Through Tutorials, Presentations From Industry Professionals, And
        Hands-On Experience.
      </p>

      {/* Slider */}
      <div className="mx-auto max-w-6xl">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="px-2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-[250px] md:h-[300px] relative">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
