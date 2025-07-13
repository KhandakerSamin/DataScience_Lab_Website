// app/ds-club/page.js

import About from "@/components/DSClubPage/AboutUs";
import Banner from "@/components/DSClubPage/Banner";
import MemberCard from "@/components/DSClubPage/MemberCard";

const executivePanel = [
  {
    name: 'Dr. Imran Mahmud',
    position: 'Associate Professor and Head',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Kaushik Sarker',
    position: 'Associate Professor & Associate Head, Advisor',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Mr. Md. Shohel Arman',
    position: 'Assistant Professor and Convener',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Musabbir Hasan Sammak',
    position: 'Lecturer, Advisor',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Md. Zunnun Islam',
    position: 'President',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Fahadul Islam',
    position: 'General Secretary',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Kowshik Sarkar',
    position: 'Vice-President',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Golam Mohiuddin Niloy',
    position: 'Vice-President',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Kamrul Hassan Shakil',
    position: 'Treasurer',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Md. Aktaruzzaman',
    position: 'Joint Secretary',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'MD Tanim Rahman',
    position: 'Joint Secretary',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Shahbaj Sardar',
    position: 'Organization Secretary - General',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Rifat Ahamed Fahim',
    position: 'Organization Secretary - Office',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Tanha Akter Mitu',
    position: 'Human Resource Secretary',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Jahanara Islam Mridula',
    position: 'Women Affairs Secretary',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'K.M Ashiful Islam Istiak',
    position: 'Program Organizer Secretary',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
  },
];

export default function DSClubPage() {
  const getGridLayout = (members) => {
    const count = members.length;
    if (count <= 5) {
      return { rows: [Math.min(3, count), Math.max(0, count - 3)] };
    } else if (count > 8) {
      return { rows: Array(Math.ceil(count / 4)).fill().map(() => 4).slice(0, -1).concat([count % 4 || 4]) };
    } else {
      return { rows: [3, count - 3] };
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <About />
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4">
            Executive Panel
          </h2>
          {getGridLayout(executivePanel).rows.map((rowCount, rowIndex) => {
            const startIdx = rowIndex * 4;
            const endIdx = startIdx + rowCount;
            const rowMembers = executivePanel.slice(startIdx, endIdx);

            return (
              <div key={rowIndex} className="flex justify-center mb-6">
                <div className={`grid grid-cols-${Math.min(rowCount, 4)} gap-6`}>
                  {rowMembers.map((member, idx) => (
                    <MemberCard key={idx} member={member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for gallery images - replace with actual image components */}
            <div className="w-64 h-64 bg-[#E0E0E0] rounded-lg"></div>
            <div className="w-64 h-64 bg-[#E0E0E0] rounded-lg"></div>
            <div className="w-64 h-64 bg-[#E0E0E0] rounded-lg"></div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4">
            Registration
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-[#555555] text-base mb-4">
              Please read carefully<br />
              To register, go to the registration link.<br />
              Fill out the form with appropriate information<br />
              Pay 205 BDT for Membership.<br />
              You can pay through Nagad, bKash, or Rocket to 01798356513 (Personal).<br />
              Complete the form and send us the transaction ID.<br />
              You will get a confirmation email shortly.<br />
              For any further query, please email dsclub@diu.edu.bd
            </p>
            <a
              href="https://example.com/register" // Replace with actual registration link
              className="inline-block bg-[#09509E] text-white px-6 py-3 rounded-lg hover:bg-[#39B24A] transition-colors duration-300"
            >
              Register Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}