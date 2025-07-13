// components/TeamPage/TeamMemberCard.js
"use client";

import { motion } from "framer-motion";
import { Globe, Mail, Linkedin } from "lucide-react";

export default function TeamMemberCard({ member }) {
  return (
    <motion.div
      className="w-68 rounded-lg overflow-hidden border-2 bg-green-50 hover:shadow-lg transition-shadow duration-300"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image section with glass effect on hover */}
      <div className="relative group w-full h-68">
        <img
          src={member.photo || '/placeholder.jpg'}
          alt={member.name || 'Team Member'}
          className="object-cover w-full h-full"
          onError={(e) => { e.target.src = '/placeholder.jpg'; }}
        />

        {/* Frosted glass hover effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center space-x-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              title="Website"
            >
              <Globe className="text-[#09509E] w-8 h-8 transition-colors hover:w-10 hover:h-10 hover:transition-all" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              title="Email"
            >
              <Mail className="text-[#09509E] w-8 h-8 transition-colors hover:w-10 hover:h-10 hover:transition-all" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin className="text-[#09509E] w-8 h-8 transition-colors hover:w-10 hover:h-10 hover:transition-all" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Name & Position */}
      <div className="text-center p-4">
        <h3 className="text-lg font-semibold text-[#1E1E1E]">{member.name || 'Unnamed Member'}</h3>
        <p className="text-sm text-[#09509E]">{member.bio || 'Position'}</p>
      </div>
    </motion.div>
  );
}
