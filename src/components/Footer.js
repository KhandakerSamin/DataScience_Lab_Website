"use client"

import Image from "next/image"
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-green-100 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1 mr-8">
            <div className="flex items-start ">
              <div className="w-35 h-35 relative">
                <Image
                  src="/logo.svg"
                  alt="Data Science Lab Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              We are a team of out-of-the-box thinkers, with deep expertise in analytics. Our research aims to make
              sense of large amounts of data.
            </p>
          </div>

          {/* Services */}
          <div className="ml-5">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 mt-10">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  Data Science
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  Machine Learning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  Deep Learning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  Big Data
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 mt-10">Community</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#09509E] transition-colors duration-200">
                  What We Do?
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 mt-10">Contact Us</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 text-sm">Daffodil Smart City, Ashulia, Dhaka</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">
                  Email:{" "}
                  <a href="mailto:arman.swe@diu.edu.bd" className="text-[#09509E] hover:underline">
                    arman.swe@diu.edu.bd
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">
                  Phone:{" "}
                  <a href="tel:+8801673383289" className="text-[#09509E] hover:underline">
                    +880-1673383289
                  </a>
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-3 pt-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-[#09509E] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#09509E] rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#09509E] rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#09509E] rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#09509E] rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 All Rights Reserved By{" "}
            <a
              href="https://daffodilvarsity.edu.bd"
              className="text-[#09509E] hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Daffodil International University
            </a>
          </p>
          <p className="text-xs text-gray-600 mt-2 hover:text-blue-500 "><Link href="/https://www.linkedin.com/in/khandakersaminyeasar">@ Samin.Dev</Link></p>
        </div>
      </div>
    </footer>
  )
}
