"use client";

import { Club } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
const persons = [{
  name: "Aria Rossi",
  title: "Lead Architect",
  img: "gallery1.jpg"
}, {
  name: "Leo Carter",
  title: "Creative Director",
  img: "gallery2.jpg"
}, {
  name: "Mia Chen",
  title: "Senior Developer",
  img: "gallery3.jpg"
}, {
  name: "Kai Tanaka",
  title: "UX/UI Designer",
  img: "gallery4.jpg"
}, {
  name: "Zoe Williams",
  title: "Project Manager",
  img: "gallery5.jpg"
}, {
  name: "Ethan Hunt",
  title: "Marketing Head",
  img: "gallery6.jpg"
}, {
  name: "Chloe Garcia",
  title: "Data Scientist",
  img: "gallery3.jpg"
}, {
  name: "Noah King",
  title: "Brand Strategist",
  img: "gallery1.jpg"
}, {
  name: "Ava Martinez",
  title: "Content Creator",
  img: "gallery5.jpg"
}];
function ClubGallery() {
  const [activeItem, setActiveItem] = useState(Math.floor(persons.length / 2));
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    wrapperRef.current.style.setProperty("--transition", "600ms cubic-bezier(0.22, 0.61, 0.36, 1)");
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);
  return <div className="w-full mx-auto max-w-[1250px] font-sans my-[200px]">
    <h2 className="text-3xl text-center md:text-6xl font-bold text-[#39B24A] mb-20 drop-shadow-lg">Gallery</h2>

    <p className="max-w-5xl text-center mx-auto text-gray-600 mb-16 text-sm md:text-base leading-relaxed opacity-90">
      This Club Is Supervised By The DATA SCIENCE LAB Which Is A Concern Of Department Of Software Engineering. Data
      Science Club Founded In August 2022. Our Mission Is To Help Students Of All Skill Levels Learn About Data
      Science And Machine Learning Through Tutorials, Presentations From Industry Professionals, And Hands-On
      Experience.
    </p>
    <div className="w-full max-w-7xl p-4 sm:p-6 md:p-8">
      <ul ref={wrapperRef} className="flex w-full flex-col gap-2 md:h-[640px] md:flex-row md:gap-[1.5%]">
        {persons.map((person, index) => <li onClick={() => setActiveItem(index)} aria-current={activeItem === index} className={classNames("relative group cursor-pointer transition-all duration-500 ease-in-out", "md:w-[8%]", "md:[&[aria-current='true']]:w-[48%]", "md:[transition:width_var(--transition,300ms_ease_in)]")} key={person.name}>
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:z-10 transform-gpu">
            <img className={classNames("absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-500 ease-in-out", activeItem === index ? "scale-105 grayscale-0" : "scale-100 grayscale")} src={person.img} alt={person.name} width="590" height="640" />
            <div className={classNames("absolute inset-0 transition-opacity duration-500", activeItem === index ? "opacity-100" : "opacity-0", "bg-gradient-to-t from-black/70 via-black/30 to-transparent", "md:absolute")} />
            <div className={classNames("absolute bottom-0 left-0 w-full p-6 text-white transition-[transform,opacity] duration-700 ease-in-out md:p-8", activeItem === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}>
              {/* <p className="text-sm font-light uppercase tracking-widest text-gray-200 md:text-base">
                {person.title}
              </p>
              <p className="text-2xl font-bold tracking-tight md:text-5xl" style={{
                textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
              }}>
                {person.name}
              </p> */}
            </div>
          </div>
        </li>)}
      </ul>
    </div>
  </div>;
}
export default ClubGallery;