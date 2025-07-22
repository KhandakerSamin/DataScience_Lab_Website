"use client"
import Slider from "react-slick"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Gallery() {
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    arrows: true,
    dots: true,
    speed: 800,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "60px",
        },
      },
    ],
  }

  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
  ]

  return (
    <>
      <style jsx>{`
        .gallery-section {
          background: #f9fafb; /* gray-50 equivalent */
          min-height: 100vh;
          animation: slideIn 1s ease-out;
        }

        .slider-container {
          perspective: 1200px;
          perspective-origin: center center;
        }

        .slick-list {
          overflow: visible;
          padding: 0 100px;
        }

        @media (max-width: 768px) {
          .slick-list {
            padding: 0 50px;
          }
        }

        .slick-track {
          display: flex;
          align-items: center;
        }

        .slick-slide {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }

        .slick-slide > div {
          padding: 0 15px;
        }

        .slick-center .image-container {
          transform: translateZ(0) scale(1.1);
          z-index: 10;
          opacity: 1;
          filter: brightness(1) blur(0px);
        }

        .slick-slide:not(.slick-center) .image-container {
          transform: rotateY(45deg) translateZ(-100px) scale(0.8);
          opacity: 0.6;
          filter: brightness(0.7) blur(1px);
        }

        .slick-center + .slick-slide .image-container,
        .slick-slide:nth-child(1) .image-container {
          transform: rotateY(-45deg) translateZ(-100px) scale(0.8);
        }

        .slick-center ~ .slick-slide:nth-child(3) .image-container {
          transform: rotateY(45deg) translateZ(-100px) scale(0.8);
        }

        .image-container {
          width: 300px;
          height: 400px;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* reduced shadow */
          position: relative;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .image-container {
            width: 250px;
            height: 320px;
          }
        }

        .image-container:hover {
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.2); /* blue hover shadow */
        }

        .slick-dots {
          bottom: -60px;
          z-index: 20;
        }

        .slick-dots li {
          margin: 0 8px;
        }

        .slick-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .slick-dots li button:before {
          display: none;
        }

        .slick-dots li.slick-active button {
          background: #39b24a;
          border-color: rgba(57, 178, 74, 0.5);
          transform: scale(1.2);
        }

        .slick-prev,
        .slick-next {
          z-index: 20;
          width: 50px;
          height: 50px;
          background: rgba(59, 130, 246, 0.8); /* blue-500 with opacity */
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .slick-prev {
          left: 20px;
        }

        .slick-next {
          right: 20px;
        }

        .slick-prev:hover,
        .slick-next:hover {
          background: rgba(59, 130, 246, 1); /* solid blue-500 */
          transform: scale(1.1);
        }

        .slick-prev:before,
        .slick-next:before {
          color: white;
          font-size: 20px;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .slick-prev,
          .slick-next {
            width: 40px;
            height: 40px;
          }

          .slick-prev {
            left: 10px;
          }

          .slick-next {
            right: 10px;
          }

          .slick-prev:before,
          .slick-next:before {
            font-size: 16px;
          }
        }

        * {
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="gallery-section py-16 px-4 md:px-10 text-center flex flex-col justify-center font-sans">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#39B24A] mb-4 drop-shadow-lg">Gallery</h2>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-gray-600 mb-16 text-sm md:text-base leading-relaxed opacity-90">
          This Club Is Supervised By The DATA SCIENCE LAB Which Is A Concern Of Department Of Software Engineering. Data
          Science Club Founded In August 2022. Our Mission Is To Help Students Of All Skill Levels Learn About Data
          Science And Machine Learning Through Tutorials, Presentations From Industry Professionals, And Hands-On
          Experience.
        </p>

        {/* Slider */}
        <div className="slider-container mx-auto max-w-6xl">
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index}>
                <div className="image-container">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}
