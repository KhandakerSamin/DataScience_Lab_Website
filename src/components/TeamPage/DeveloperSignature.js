// components/DeveloperSignature.js
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function DeveloperSignature() {
  return (
    <section className="bg-action text-white py-8 text-center rounded-lg shadow-lg mt-12">
      <p className="text-lg">
        Designed and Developed by <strong>Your Name</strong>
      </p>
      <div className="flex justify-center space-x-6 mt-4">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-2xl hover:text-primary transition-colors" />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl hover:text-primary transition-colors" />
        </a>
        <a href="mailto:your.email@example.com">
          <FaEnvelope className="text-2xl hover:text-primary transition-colors" />
        </a>
      </div>
    </section>
  );
}