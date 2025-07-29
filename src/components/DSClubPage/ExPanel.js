"use client";
import MemberCard from "./MemberCard"


const facultyPanel = [
  {
    name: "Dr. Imran Mahmud",
    bio: "Associate Professor and Head",
    photo: "/p1.png",
  },
  {
    name: "Kaushik Sarker",
    bio: "Associate Professor & Associate Head, Advisor",
    photo: "/p2.png",
  },
  {
    name: "Mr. Md. Shohel Aman",
    bio: "Assistant Professor and Convener",
    photo: "/p3.png",
  },
  {
    name: "Muabbir Hasan Sammak",
    bio: "Lecturer, Advisor",
    photo: "/p4.png",
  },
];

const studentPanel = [
  { name: "Md. Zunnum Islam", bio: "President", photo: "/p5.png" },
  { name: "Fahadul Islam", bio: "General Secretary", photo: "/p6.jpg" },
  { name: "Kowshik Sarkar", bio: "Vice-President", photo: "/p7.png" },
  { name: "Golam Mohiuddin Niloy", bio: "Vice-President", photo: "/p8.jpg" },
  { name: "Kamrul Hassan Shakil", bio: "Treasurer", photo: "/p9.jpg" },
  { name: "Md. Aktaruzzaman", bio: "Joint Secretary", photo: "/p10.jpg" },
  { name: "MD Tanim Rahman", bio: "Joint Secretary", photo: "/p11.jpg" },
  { name: "Shahjabi Sardar", bio: "Organization Secretary - General", photo: "/p12.jpg" },
  { name: "Rifat Ahamed Fahim", bio: "Organization Secretary - Office", photo: "/p13.png" },
  { name: "Tanha Akter Mitu", bio: "Human Resource Secretary", photo: "/p14.jpg" },
  { name: "Jahanara Islam Mridula", bio: "Women Affairs Secretary", photo: "/p15.jpg" },
  { name: "K M Ashfikul Islam Istiak", bio: "Program Organizer Secretary", photo: "/p16.jpg" },
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
          <MemberCard member={facultyPanel[0]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {facultyPanel.slice(1).map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Student Panel Section */}
      <div className="grid grid-cols-1 ml-11.5 sm:ml-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {studentPanel.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}
