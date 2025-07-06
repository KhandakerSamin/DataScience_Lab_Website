"use client"

import { useState, useMemo } from "react"
import Banner from "./Banner"
import FilterTabs from "./FilterTabs"
import ContentGrid from "./ContentGrid"

// Sample data
const sampleData = [
  {
    id: 1,
    type: "event",
    title: "Machine Learning Workshop: Deep Learning Fundamentals",
    date: "2024-02-15",
    time: "10:00 AM - 4:00 PM",
    location: "Data Science Lab, Room 301",
    description:
      "Join us for an intensive workshop covering the fundamentals of deep learning, including neural networks, backpropagation, and practical implementations.",
    fullDescription:
      "This comprehensive workshop will cover the theoretical foundations and practical applications of deep learning. Participants will learn about neural network architectures, optimization techniques, and hands-on implementation using popular frameworks like TensorFlow and PyTorch. The session includes interactive coding exercises and real-world case studies from our recent research projects.",
    image: "/eventimage.jpg",
    tags: ["Workshop", "Deep Learning", "Hands-on"],
    speakers: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
    capacity: "50 participants",
  },
  {
    id: 2,
    type: "news",
    title: "Research Paper Published in Nature Machine Intelligence",
    date: "2024-02-10",
    description:
      "Our latest research on interpretable AI models has been accepted for publication in Nature Machine Intelligence.",
    fullDescription:
      "We are excited to announce that our groundbreaking research on developing interpretable artificial intelligence models has been accepted for publication in Nature Machine Intelligence. This work, led by our research team, introduces novel techniques for making complex AI models more transparent and explainable, addressing one of the most critical challenges in modern AI deployment.",
    image: "/newsimage.png",
    tags: ["Publication", "Research", "AI Ethics"],
    authors: ["Dr. Emily Watson", "Dr. James Liu", "Prof. Anna Kowalski"],
  },
  {
    id: 3,
    type: "event",
    title: "Data Visualization Masterclass",
    date: "2024-02-20",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    description: "Learn advanced data visualization techniques using D3.js, Plotly, and other cutting-edge tools.",
    fullDescription:
      "This masterclass will take your data visualization skills to the next level. We'll explore advanced techniques using D3.js for custom interactive visualizations, Plotly for scientific plotting, and emerging tools in the visualization ecosystem.",
    image: "/eventimage.jpg",
    tags: ["Masterclass", "Visualization", "D3.js"],
    speakers: ["Dr. Maria Gonzalez"],
    capacity: "100 participants",
  },
  {
    id: 4,
    type: "news",
    title: "New Partnership with Tech Industry Leaders",
    date: "2024-02-08",
    description:
      "We've established strategic partnerships with leading tech companies to enhance our research capabilities.",
    fullDescription:
      "We are thrilled to announce new strategic partnerships with several leading technology companies, including collaborations that will significantly enhance our research capabilities and provide unprecedented access to real-world datasets and computational resources.",
    image: "/newsimage.png",
    tags: ["Partnership", "Industry", "Collaboration"],
    partners: ["TechCorp", "DataSystems Inc.", "AI Innovations Ltd."],
  },
  {
    id: 5,
    type: "event",
    title: "AI Ethics Symposium",
    date: "2024-02-25",
    time: "9:00 AM - 6:00 PM",
    location: "University Auditorium",
    description: "A full-day symposium discussing the ethical implications of AI in modern society.",
    fullDescription:
      "Join leading experts, researchers, and industry professionals for a comprehensive discussion on AI ethics. This symposium will address critical questions about bias in AI systems, privacy concerns, algorithmic transparency, and the societal impact of artificial intelligence.",
    image: "/eventimage.jpg",
    tags: ["Symposium", "Ethics", "AI Policy"],
    speakers: ["Dr. Robert Kim", "Prof. Lisa Thompson", "Dr. Ahmed Hassan"],
    capacity: "200 participants",
  },
  {
    id: 6,
    type: "news",
    title: "Graduate Student Wins Best Paper Award",
    date: "2024-02-05",
    description: "Our PhD student received the Best Paper Award at the International Conference on Machine Learning.",
    fullDescription:
      "We are proud to announce that our PhD student, Alex Chen, has received the prestigious Best Paper Award at the International Conference on Machine Learning (ICML) for groundbreaking research on federated learning algorithms.",
    image: "/newsimage.png",
    tags: ["Award", "Student Achievement", "ICML"],
    student: "Alex Chen",
    advisor: "Prof. David Park",
  },
]

export default function NewsEventPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = sampleData

    // Apply type filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === activeFilter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchTerm, activeFilter])

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} resultCount={filteredData.length} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ContentGrid filteredData={filteredData} />
      </div>
    </div>
  )
}
