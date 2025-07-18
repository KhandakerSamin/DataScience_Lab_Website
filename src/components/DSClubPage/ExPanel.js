"use client";

import TeamMemberCard from "../TeamPage/TeamMemberCard";

const facultyPanel = [
  {
    name: "Dr. Imran Mahmud",
    bio: "Associate Professor and Head",
    photo: "/path-to-imran.png",
  },
  {
    name: "Kaushik Sarker",
    bio: "Associate Professor & Associate Head, Advisor",
    photo: "/path-to-kaushik.png",
  },
  {
    name: "Mr. Md. Shohel Aman",
    bio: "Assistant Professor and Convener",
    photo: "/path-to-shohel.png",
  },
  {
    name: "Muabbir Hasan Sammak",
    bio: "Lecturer, Advisor",
    photo: "/path-to-muabbir.png",
  },
];

const studentPanel = [
  { name: "Md. Zunnum Islam", bio: "President", photo: "/path-to-zunnum.png" },
  { name: "Fahadul Islam", bio: "General Secretary", photo: "/path-to-fahadul.png" },
  { name: "Kowshik Sarkar", bio: "Vice-President", photo: "/path-to-kowshik.png" },
  { name: "Golam Mohiuddin Niloy", bio: "Vice-President", photo: "/path-to-niloy.png" },
  { name: "Kamrul Hassan Shakil", bio: "Treasurer", photo: "/path-to-kamrul.png" },
  { name: "Md. Aktaruzzaman", bio: "Joint Secretary", photo: "/path-to-aktar.png" },
  { name: "MD Tanim Rahman", bio: "Joint Secretary", photo: "/path-to-tanim.png" },
  { name: "Shahjabi Sardar", bio: "Organization Secretary - General", photo: "/path-to-shahjabi.png" },
  { name: "Rifat Ahamed Fahim", bio: "Organization Secretary - Office", photo: "/path-to-rifat.png" },
  { name: "Tanha Akter Mitu", bio: "Human Resource Secretary", photo: "/path-to-tanha.png" },
  { name: "Jahanara Islam Mridula", bio: "Women Affairs Secretary", photo: "/path-to-jahanara.png" },
  { name: "K M Ashfikul Islam Istiak", bio: "Program Organizer Secretary", photo: "/path-to-istiak.png" },
];

export default function ExPanel() {
  return (
    <div className="py-10 px-4 md:px-8 bg-gray-50 min-h-screen font-outfit max-w-[1220px] mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-[#39B24A]">
        Executive Panel
      </h2>

      {/* Faculty Section */}
      <div className="flex flex-col items-center gap-8 mb-16">
        <div className="max-w-[278px] mx-auto w-full">
          <TeamMemberCard member={facultyPanel[0]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {facultyPanel.slice(1).map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Student Panel Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {studentPanel.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}
