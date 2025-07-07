"use client";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lab Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((m, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <h3 className="font-bold">{m.name}</h3>
            <p className="text-sm text-gray-500">{m.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
