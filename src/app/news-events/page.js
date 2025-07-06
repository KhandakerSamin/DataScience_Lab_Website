"use client"

import { useState } from "react"
import { Search, Calendar, Clock, MapPin, Users, ArrowRight, Grid, List, BookOpen, Newspaper } from "lucide-react"
import Image from "next/image"

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const tabs = [
    { id: "all", name: "All", icon: Grid },
    { id: "news", name: "News", icon: Newspaper },
    { id: "events", name: "Events", icon: Calendar },
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "workshop", name: "Workshops" },
    { id: "seminar", name: "Seminars" },
    { id: "conference", name: "Conferences" },
    { id: "research", name: "Research" },
    { id: "announcement", name: "Announcements" },
  ]

  const newsEvents = [
    {
      id: 1,
      type: "event",
      title: "Workshop on AI & Machine Learning",
      description: "Join our comprehensive workshop covering the latest developments...",
      date: "2025-07-15",
      time: "09:00 AM",
      location: "Data Science Lab, DIU",
      category: "workshop",
      attendees: 50,
      image: "/workshop-ai.jpg",
      featured: true,
      status: "upcoming",
      organizer: "Data Science Lab",
      tags: ["AI", "Machine Learning", "Workshop"],
    },
    {
      id: 2,
      type: "event",
      title: "Seminar on ML Trends & Future Prospects",
      description: "Explore the cutting-edge trends in machine learning...",
      date: "2025-08-20",
      time: "02:00 PM",
      location: "Main Auditorium, DIU",
      category: "seminar",
      attendees: 200,
      image: "/seminar-ml.jpg",
      featured: false,
      status: "upcoming",
      organizer: "Research Department",
      tags: ["Machine Learning", "Trends", "Future Tech"],
    },
    {
      id: 3,
      type: "news",
      title: "Data Science Lab Wins National Research Award",
      description: "Our Data Science Lab has been recognized...",
      date: "2025-01-10",
      category: "announcement",
      image: "/award-news.jpg",
      featured: true,
      status: "published",
      author: "Research Team",
      tags: ["Award", "Recognition", "Research"],
    },
  ]

  const filteredItems = newsEvents.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesTab && matchesSearch && matchesCategory
  })

  const formatDate = (dateString ) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isUpcoming = (dateString) => new Date(dateString) > new Date()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            )
          })}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span className="capitalize">{item.category}</span>
                <span>{formatDate(item.date)}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.type === "event" && (
                <div className="text-sm text-gray-500 space-y-1">
                  {item.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{item.time}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.attendees && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>{item.attendees} attendees</span>
                    </div>
                  )}
                </div>
              )}
              {item.type === "news" && (
                <div className="text-sm text-gray-500">
                  <span>By {item.author}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                {item.type === "event" ? "Register Now" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
