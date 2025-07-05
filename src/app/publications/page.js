"use client";
import { useEffect, useState } from "react";

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch("/api/publications")
      .then((res) => res.json())
      .then((data) => setPublications(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Publications</h1>
      <ul className="space-y-3">
        {publications.map((pub, i) => (
          <li key={i}>
            <a href={pub.link} target="_blank" className="text-blue-600 underline">
              {pub.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
