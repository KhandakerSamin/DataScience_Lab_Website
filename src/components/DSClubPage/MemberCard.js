'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Instagram, Facebook, LinkedinIcon } from 'lucide-react';

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.31l5.74-6.57L0 .75h5.063l3.495 4.633L12.6.75ZM11.47 13.5h1.146L4.74 2.15H3.522l7.95 11.35Z" />
  </svg>
);


export default function MemberCard({ member }) {
  return (
    <motion.div
      className="group flex flex-col items-center text-center max-w-[300px] p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-[#09509E] dark:hover:border-gray-700 hover:-translate-y-1"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <img
          className="relative w-full h-full rounded-full object-cover ring-2 ring-white dark:ring-gray-800 group-hover:ring-[#09509E] dark:group-hover:ring-gray-700 transition-all duration-300"
          src={member.image || member.photo || 'https://placehold.co/200x200/E2E8F0/4A5568?text=' + (member.name ? member.name.split(' ').map(n => n[0]).join('') : 'TM')}
          alt={`Portrait of ${member.name || 'Team Member'}`}
          onError={(e) => { e.target.src = `https://placehold.co/200x200/E2E8F0/4A5568?text=${member.name ? member.name.split(' ').map(n => n[0]).join('') : 'TM'}`; }}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#09509E] dark:group-hover:text-blue-400 transition-colors duration-300">
        {member.name || 'Unnamed Member'}
      </h3>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-4 px-3 py-1 bg-green-100 dark:bg-gray-800 rounded-full">
        {member.role || member.position }
      </p>
      <div className="flex space-x-3">
        {member.twitter && (
          <a
            href={member.twitter}
            className="px-3 py-2 text-gray-400 hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-[#09509E] dark:hover:bg-[#09509E] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={`${member.name}'s Twitter profile`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
          </a>
        )}
        {member.instagram && (
          <a
            href={member.instagram}
            className="p-2 text-gray-400 hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={`${member.name}'s Instagram profile`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
        )}
        {member.facebook && (
          <a
            href={member.facebook}
            className="p-2 text-gray-400 hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-[#09509E] dark:hover:bg-[#09509E] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={`${member.name}'s Facebook profile`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
        )}
        {member.website && (
          <a
            href={member.website}
            className="p-2 text-gray-500 hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-[#09509E] dark:hover:bg-[#09509E] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={`${member.name}'s Website`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="p-2 text-gray-500 hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-[#09509E] dark:hover:bg-[#09509E] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={`${member.name}'s Email`}
          >
            <Mail />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            className="p-2 text-gray-500 hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-[#09509E] dark:hover:bg-[#09509E] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={`${member.name}'s LinkedIn profile`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </a>
        )}
      </div>
    </motion.div>
  );
}