"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      quote:
        "We must remember that there was once prosperous time in our lives and it is up to us to bring it back or maintain it",
      name: "Dr. Md. Sabur Khan",
      title: "Founder & Chairman, Daffodil Family",
      image: "/soborkhan.jpg",
    },
    {
      id: 2,
      quote:
        "I try to make myself happy because I know that if I'm not happy, my colleagues are not happy and my shareholders are not happy and my customers are not happy.",
      name: "Jack Ma",
      title: "Founder Of Alibaba Group",
      image: "/jackma.jpg",
    },
    {
      id: 3,
      quote: "When something is important enough, you do it even if the odds are not in your favour.",
      name: "Elon Musk",
      title: "Founder Of Tesla & SpaceX",
      image: "/elonmusk.jpg",
    },
  ]

  // Auto-transition every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleTestimonialChange = (index) => {
    setCurrentTestimonial(index)
  }

  return (
    <section className="relative bg-blue-50 py-20 font-outfit">
      {/* Background Accent Shape */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-1/2 h-full bg-green-100 rotate-6 origin-top-left rounded-br-full opacity-30 -z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h5 className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-2">Testimonials</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
            Some Important
            <br />
            Motivational Speech
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="grid md:grid-cols-2 mr-10 items-center gap-12">
          {/* Client Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-80 h-96 rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-gray-100">
              <Image
                src={testimonials[currentTestimonial].image || "/placeholder.svg?height=400&width=320"}
                alt={testimonials[currentTestimonial].name}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 320px"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=400&width=320"
                }}
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="space-y-6 mr-20">
            {/* Quote Section */}
            <div className="space-y-4">
              {/* Large Quote Icon */}
              <div className="flex items-start">
                <Quote size={64} className="text-blue-400 flex-shrink-0 mr-2" strokeWidth={1.5} />
              </div>

              {/* Quote Text */}
              <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium">
                {testimonials[currentTestimonial].quote}
              </blockquote>
            </div>

            {/* Client Info */}
            <div className="space-y-1">
              <h4 className="text-lg md:text-xl font-semibold text-green-600">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-sm md:text-base text-gray-500 font-medium">{testimonials[currentTestimonial].title}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialChange(index)}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                    index === currentTestimonial
                      ? "bg-blue-600 border-blue-600 shadow-md"
                      : "bg-transparent border-gray-300 hover:border-blue-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
