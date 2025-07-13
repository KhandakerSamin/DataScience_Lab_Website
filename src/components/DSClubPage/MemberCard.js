// components/DSClubPage/MemberCard.js
"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function MemberCard({ member }) {
  return (
    <motion.div
      className="w-64 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative group w-full h-64">
        <img
          src={member.photo || '/placeholder.jpg'}
          alt={member.name || 'Club Member'}
          className="object-cover w-full h-full"
          onError={(e) => { e.target.src = '/placeholder.jpg'; }}
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin className="text-white hover:text-[#39B24A] text-2xl transition-colors" />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} title="Email">
              <FaEnvelope className="text-white hover:text-[#39B24A] text-2xl transition-colors" />
            </a>
          )}
          {member.website && (
            <a href={member.website} target="_blank" rel="noopener noreferrer" title="Website">
              <FaGlobe className="text-white hover:text-[#39B24A] text-2xl transition-colors" />
            </a>
          )}
        </motion.div>
      </div>
      <div className="text-center p-4">
        <h3 className="text-lg font-semibold text-[#1E1E1E]">{member.name || 'Unnamed Member'}</h3>
        <p className="text-sm text-[#09509E]">{member.position || 'Position'}</p>
      </div>
    </motion.div>
  );
}