"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 ${scrolled
          ? "bg-white/60 backdrop-blur-md border-gray-200 shadow-md"
          : "bg-white border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between font-outfit ">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Lab Logo" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="hover:text-[#09509E] font-medium">
            Home
          </Link>
          <Link href="/members" className="hover:text-[#09509E] font-medium">
            Project
          </Link>
          <Link href="/course" className="hover:text-[#09509E] font-medium">
            Publications
          </Link>

          <Link href="/members" className="hover:text-[#09509E] font-medium">
            Our Team
          </Link>
          <Link href="/course" className="hover:text-[#09509E] font-medium">
            Our Course
          </Link>
          <Link href="/news-events" className="hover:text-[#09509E] font-medium">
            Events
          </Link>

          {/* CTA Button */}
        </nav>
        <Link
          href="#"
          className=" rounded-sm border-2 border-[#09509E] bg-[#09509E] px-8 py-1.5 mt-1 hidden md:inline-block text-lg font-medium text-white hover:bg-transparent hover:text-[#09509E]   focus:ring-3 focus:outline-hidden"
        >
          Contact Us
        </Link>



        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          {mobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

        {/* Mobile Slide-out Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-5 flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-[#09509E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>

            <Link href="/members" className="hover:text-[#09509E] font-medium">
              Project
            </Link>
            <Link href="/course" className="hover:text-[#09509E] font-medium">
              Publications
            </Link>


            <Link
              href="/members"
              className="hover:text-[#09509E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              OUR TEAM
            </Link>
            <Link
              href="/course"
              className="hover:text-[#09509E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              OUR COURSE
            </Link>
            <Link
              href="/news-events"
              className="hover:text-[#09509E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              EVENTS
            </Link>

            <Link
              href="#"
              className="bg-[#09509E] text-white px-5 py-2 rounded  font-semibold transition text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Overlay when mobile menu open */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </header>
  );
}
