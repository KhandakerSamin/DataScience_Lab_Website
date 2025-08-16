"use client";
import { useState, useEffect } from "react";
import MemberCard from "./MemberCard";

export default function ExPanel() {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [studentMembers, setStudentMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamic API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  useEffect(() => {
    fetchClubMembers();
  }, []);

  const fetchClubMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/clubMembers`);

      if (!response.ok) {
        throw new Error("Failed to fetch club members");
      }

      const result = await response.json();

      if (result.success) {
        const faculty = result.data.filter(
          (member) => member.category === "faculty"
        );
        const students = result.data.filter(
          (member) => member.category === "student"
        );

        setFacultyMembers(faculty);
        setStudentMembers(students);
      }
    } catch (error) {
      console.error("Error fetching club members:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 px-4 md:px-8 bg-gray-50 min-h-screen font-outfit max-w-[1220px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-[#39B24A]">
          Executive Panel
        </h2>
        <div className="text-center">Loading club members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 px-4 md:px-8 bg-gray-50 min-h-screen font-outfit max-w-[1220px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-[#39B24A]">
          Executive Panel
        </h2>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-8 bg-gray-50 min-h-screen font-outfit max-w-[1220px] mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-[#39B24A]">
        Executive Panel
      </h2>

      {/* Faculty Section */}
      {facultyMembers.length > 0 && (
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="max-w-[278px] mx-auto w-full">
            <MemberCard member={facultyMembers[0]} />
          </div>
          {facultyMembers.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {facultyMembers.slice(1).map((member, index) => (
                <MemberCard key={member._id || index} member={member} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Student Panel Section */}
      {studentMembers.length > 0 && (
        <div className="grid grid-cols-1 ml-11.5 sm:ml-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {studentMembers.map((member, index) => (
            <MemberCard key={member._id || index} member={member} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {facultyMembers.length === 0 && studentMembers.length === 0 && (
        <div className="text-center text-gray-500">
          No club members found. Add members through the admin dashboard.
        </div>
      )}
    </div>
  );
}
