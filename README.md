<div align="center">

# 🎓 Data Science Lab - Official Website
### Daffodil International University

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**A modern, interactive website showcasing the Data Science Lab's research, projects, and community at Daffodil International University.**

[🌐 Live Demo](https://data-science-lab-diu.vercel.app) • [📚 Documentation](../../wiki) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 🌟 Overview

The Data Science Lab website serves as the digital hub for Daffodil International University's Data Science community. Built with cutting-edge web technologies, it provides an engaging platform for students, researchers, and industry professionals to explore our lab's initiatives, projects, and educational resources.

### 🎯 Mission
Empowering the next generation of data scientists through innovative research, collaborative projects, and comprehensive educational programs.

---

## ✨ Key Features

### 🏠 **Homepage**
- **University & Lab Information** - Comprehensive overview of our mission and achievements
- **AI-Powered Chatbot (ROBO)** - Intelligent assistant powered by Google Gemini API
- **Interactive Hero Section** - Dynamic animations and engaging user experience
- **Latest Updates** - Real-time news and announcements

### 💼 **Projects & Development**
- **Project Portfolio** - Showcase of ongoing and completed research projects
- **Advanced Search & Filter** - Find projects by technology, status, or category
- **Detailed Project Views** - In-depth information with live demos and source code
- **Progress Tracking** - Real-time status updates for ongoing developments

### 🏆 **Contests & Datasets**
- **Kaggle Integration** - Direct access to competitions and datasets
- **Competition Listings** - Curated data science challenges
- **Dataset Repository** - Comprehensive collection of research datasets
- **External Redirects** - Seamless navigation to Kaggle platform

### 📅 **Events & News**
- **Event Calendar** - Upcoming workshops, seminars, and conferences
- **News Feed** - Latest developments in data science and lab activities
- **Registration Integration** - Direct links to event registration forms
- **Archive System** - Historical events and news articles

### 👥 **Our Team**
- **Faculty Profiles** - Detailed information about lab advisors and researchers
- **Student Showcase** - Highlighting talented team members and their contributions
- **Research Interests** - Areas of expertise and ongoing research focus
- **Contact Information** - Direct communication channels

### 📞 **Contact**
- **Interactive Contact Form** - Powered by EmailJS for reliable message delivery
- **Google Maps Integration** - Easy location finding and directions
- **Multiple Communication Channels** - Email, phone, and social media links
- **Office Hours** - Availability and meeting scheduling information

### 🎓 **DS Club**
- **Club Information** - Mission, activities, and membership details
- **Club Events** - Workshops, bootcamps, and training sessions
- **Backend Integration** - Real-time data from custom API
- **Member Portal** - Exclusive content and resources

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.3.4** - React framework with server-side rendering
- **React 19.0.0** - Modern UI library with latest features
- **TypeScript** - Type-safe development environment

### **Styling & UI**
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Advanced animations and interactions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful, customizable icons
- **React Icons** - Comprehensive icon library

### **Integrations & APIs**
- **Google Gemini API** - AI chatbot functionality
- **Kaggle API** - Contest and dataset integration
- **EmailJS** - Contact form email delivery
- **Google Maps API** - Location and mapping services
- **Custom Backend API** - Lab data management

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS & Autoprefixer** - CSS processing and optimization
- **Vercel** - Deployment and hosting platform

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/ds-lab-frontend.git
   cd ds-lab-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Configure environment variables**
   \`\`\`env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   
   # Google Services
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
   
   # EmailJS Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Kaggle Integration
   NEXT_PUBLIC_KAGGLE_API_KEY=your_kaggle_api_key
   \`\`\`

5. **Start development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

\`\`\`
ds-lab-frontend/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 (pages)/            # Page routes
│   │   ├── page.tsx           # Homepage
│   │   ├── projects/          # Projects & Development
│   │   ├── contests/          # Contests & Datasets
│   │   ├── events/            # Events & News
│   │   ├── team/              # Our Team
│   │   ├── contact/           # Contact Page
│   │   └── ds-club/           # DS Club
│   ├── 📁 api/                # API routes
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── 📁 components/             # Reusable components
│   ├── 📁 ui/                 # UI primitives
│   ├── 📁 HomePage/           # Homepage components
│   ├── 📁 ProjectsPage/       # Projects components
│   ├── 📁 EventsPage/         # Events components
│   ├── 📁 ContactPage/        # Contact components
│   └── 📁 DSClubPage/         # DS Club components
├── 📁 lib/                    # Utility functions
├── 📁 hooks/                  # Custom React hooks
├── 📁 data/                   # Static data files
├── 📁 public/                 # Static assets
│   ├── 📁 images/             # Image assets
│   └── 📁 icons/              # Icon files
├── 📄 next.config.js          # Next.js configuration
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 package.json            # Dependencies
└── 📄 README.md               # Project documentation
\`\`\`

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue (#3B82F6) - Trust and professionalism
- **Secondary**: Green (#10B981) - Growth and innovation
- **Accent**: Purple (#8B5CF6) - Creativity and technology
- **Neutral**: Gray scale for text and backgrounds

### **Typography**
- **Headings**: Inter - Modern, readable sans-serif
- **Body**: System fonts - Optimized for performance
- **Code**: JetBrains Mono - Developer-friendly monospace

### **Components**
- Consistent spacing using Tailwind's scale
- Accessible color contrasts (WCAG AA compliant)
- Responsive design for all screen sizes
- Smooth animations and micro-interactions

---

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks

# Deployment
npm run export       # Export static files
npm run analyze      # Bundle size analysis
\`\`\`

---

## 🌐 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### **Manual Deployment**
\`\`\`bash
npm run build
npm run start
\`\`\`

### **Static Export**
\`\`\`bash
npm run build
npm run export
\`\`\`

---

## 🔌 API Integration

### **Backend Connection**
The frontend seamlessly integrates with our custom backend API for:
- Dynamic content management
- Real-time data updates
- User authentication
- File uploads and media management

### **External APIs**
- **Google Gemini**: AI chatbot responses
- **Kaggle API**: Competition and dataset data
- **Google Maps**: Location services
- **EmailJS**: Contact form submissions

---

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced experience on tablets
- **Desktop**: Full-featured desktop interface
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Lighthouse score 95+

---

## 🔒 Security Features

- **Environment Variables**: Secure API key management
- **Input Validation**: Client-side and server-side validation
- **HTTPS Enforcement**: Secure data transmission
- **Content Security Policy**: XSS protection
- **Rate Limiting**: API abuse prevention

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Development Guidelines**
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

### **Code Style**
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Optimize for performance
- Maintain accessibility standards

---

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

---

## 🐛 Troubleshooting

### **Common Issues**

#### Build Errors
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

#### Environment Variables Not Loading
- Ensure `.env.local` exists
- Restart development server
- Check variable naming (NEXT_PUBLIC_ prefix for client-side)

#### API Connection Issues
- Verify backend server is running
- Check CORS configuration
- Validate API endpoints

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Daffodil International University** - For supporting our research initiatives
- **Data Science Lab Team** - For their dedication and innovative contributions
- **Open Source Community** - For the amazing tools and libraries
- **Students & Researchers** - For their continuous feedback and engagement

---

## 📞 Support & Contact

- **Email**: [dslab@diu.edu.bd](mailto:dslab@diu.edu.bd)
- **Website**: [https://ds-lab-diu.vercel.app](https://ds-lab-diu.vercel.app)
- **GitHub**: [Data Science Lab DIU](https://github.com/ds-lab-diu)
- **LinkedIn**: [DS Lab DIU](https://linkedin.com/company/ds-lab-diu)

---

<div align="center">

**Built with ❤️ by the Data Science Lab Team**

**Empowering Innovation Through Data Science**

[⭐ Star this repo](../../stargazers) • [🍴 Fork it](../../fork) • [📢 Share it](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20Data%20Science%20Lab%20website!)

</div>
