"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Campus() {
  const [showVideo, setShowVideo] = useState(false)

  const handlePlayClick = () => {
    console.log("Play button clicked!") // Debug log
    setShowVideo(true)
  }

  // Fixed: Extract only the video ID from your YouTube URL
  // From: https://youtu.be/4voAuvAzB8Y?si=DzwlqHGEu5YGqHeD
  // Video ID is: 4voAuvAzB8Y
  const youtubeVideoId = "4voAuvAzB8Y"

  return (
    <section className="w-full bg-blue-50 font-outfit">
      <div className="py-[200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1220px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-green-600 leading-tight">
              Our Modern Green Campus
              <br />
              With Advanced Technology Lab
            </h2>
          </div>

          {/* Campus Video/Image Container */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              {!showVideo ? (
                // Thumbnail Image with Play Button
                <>
                  <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] group">
                    <Image
                      src="/diuphoto.png"
                      alt="Daffodil University Campus Aerial View"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      onClick={handlePlayClick}
                      className="group/play bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-6 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/50 cursor-pointer"
                      aria-label="Play campus video"
                      type="button"
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-green-600 ml-1 transition-colors duration-200" />
                    </button>
                  </div>

                  {/* Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Campus Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Sustainable Green Campus</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Experience our eco-friendly campus with state-of-the-art facilities, lush green spaces, and
                        cutting-edge technology labs designed for modern education.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // YouTube Video Player
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&rel=0&showinfo=0&modestbranding=1`}
                    title="Campus Tour Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-3xl"
                  ></iframe>
                </div>
              )}
            </div>

            {/* Debug Info - Remove this after testing */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Video State: {showVideo ? "Video Playing" : "Thumbnail Showing"}</p>
            </div>

            {/* Campus Features */}
            
          </div>
        </div>
      </div>
    </section>
  )
}
