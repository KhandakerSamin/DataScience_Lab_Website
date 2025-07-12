// components/TeamMemberCard.js
"use client";

import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaGlobe, FaGithub } from 'react-icons/fa';

export default function TeamMemberCard({ member }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-divider"
    >
      <img
        src={member.photo || '/placeholder.jpg'}
        alt={member.name}
        className="w-24 h-24 rounded-full object-cover border-4 border-action mb-4"
      />
      <h3 className="text-xl font-bold text-textDark">{member.name}</h3>
      <p className="text-textSecondary mb-2">{member.position}</p>
      {member.bio && <p className="text-sm text-textSecondary mb-4">{member.bio}</p>}
      <div className="flex space-x-4">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-action hover:text-primary text-2xl transition-colors" />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}>
            <FaEnvelope className="text-red-500 hover:text-primary text-2xl transition-colors" />
          </a>
        )}
        {member.website && (
          <a href={member.website} target="_blank" rel="noopener noreferrer">
            <FaGlobe className="text-primary hover:text-action text-2xl transition-colors" />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-textDark hover:text-primary text-2xl transition-colors" />
          </a>
        )}
      </div>
    </motion.div>
  );
}