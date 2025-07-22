// app/ds-club/page.js

import About from "@/components/DSClubPage/AboutUs";
import Banner from "@/components/DSClubPage/Banner";
import EventsClub from "@/components/DSClubPage/EventsClub";
import ExPanel from "@/components/DSClubPage/ExPanel";
import Gallery from "@/components/DSClubPage/Gallery";
import MemberCard from "@/components/DSClubPage/MemberCard";
import Events from "@/components/HomePage/Events";

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

export const metadata = {
  title: "DIU | Data Science Club",
  description: "Data Science Club of Daffodil International University",
};

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
    <div className="bg-background min-h-screen bg-gray-50">
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <About />
        <EventsClub />
        <ExPanel />

<Gallery />

        </div>

      </div>

  );
}