// app/team/page.js
import TeamBanner from '@/components/TeamPage/TeamBanner';
import TeamMemberCard from '@/components/TeamPage/TeamMemberCard';

const teamMembers = [
  {
    name: 'Dr. Md. Sabur Khan',
    position: 'Chief Advisor',
    photo: '/soborkhan.jpg',
    bio: 'Founder & Chairman Daffodil Family',
    linkedin: 'https://linkedin.com',
    email: 'john.doe@example.com',
    website: 'https://johndoe.com',
  },
  {
    name: 'Dr.Imran Mahamud',
    position: 'Advisor',
    photo: '/p1.png',
    bio: 'Associate Professor & Head Department of Software Engineering',
    linkedin: 'https://linkedin.com',
    email: 'jane.smith@example.com',
  },
  {
    name: 'Prof. Dr.Touhid Bhuiyan',
    position: 'Advisor',
    photo: '/t3.jpg',
    bio: 'Professor & Head Department of Computer Science and Engineering',
    linkedin: 'https://linkedin.com',
    email: 'alice.johnson@example.com',
  },
  {
    name: 'Md. Shohel Arman',
    position: 'Lab Incharge',
    bio:'Assistant Professor & Lab Incharge Data Science Lab',
    photo: '/p3.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Ms. Nusrat Jahan',
    position: 'Faculty',
    bio:'Assistant Professor',
    photo: '/t4.jpg',
    linkedin: 'https://linkedin.com',
    email: 'bob.wilson@example.com',
  },
  {
    name: 'Afsana Begum',
    position: 'Faculty',
    bio:'Assistant Professor & Coordinator M.Sc ',
    photo: '/t5.jpg',
    linkedin: 'https://linkedin.com',
    email: 'carol.brown@example.com',
  },
  {
    name: 'Ms. Farzana Sadia',
    bio:'Assistant Professor  ',
    position: 'Faculty',
    photo: '/t6.jpg',
    linkedin: 'https://linkedin.com',
    email: 'david.lee@example.com',
  },
  {
    name: 'Mr. Musabbir Hasan Sammak',
    position: 'Faculty',
    bio:'Lecturer (Senior Scale) ',
    photo: '/p4.png',
    linkedin: 'https://linkedin.com',
    email: 'david.lee@example.com',
  },
  {
    name: 'David Lee',
    position: 'Faculty',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
    email: 'david.lee@example.com',
  },
  {
    name: 'Eve Davis',
    position: 'Lab Members',
    photo: '/soborkhan.jpg',
    github: 'https://github.com',
  },
  {
    name: 'Frank Miller',
    position: 'Lab Members',
    photo: '/soborkhan.jpg',
    github: 'https://github.com',
  },
  {
    name: 'Eve Davis',
    position: 'Lab Members',
    photo: '/soborkhan.jpg',
    github: 'https://github.com',
  },
  {
    name: 'Frank Miller',
    position: 'Lab Members',
    photo: '/soborkhan.jpg',
    github: 'https://github.com',
  },
  {
    name: 'Eve Davis',
    position: 'Lab Members',
    photo: '/soborkhan.jpg',
    github: 'https://github.com',
  },
  {
    name: 'Frank Miller',
    position: 'Lab Members',
    photo: '/soborkhan.jpg',
    github: 'https://github.com',
  },
  {
    name: 'Shihab Howlader',
    position: 'Lab Associate',
    bio:'Lab Associates',
    photo: '/soborkhan.jpg',
    email: 'grace.taylor@example.com',
  },
  {
    name: 'Meherin Khandakar Priya',
    position: 'Lab Associate',
    bio:'Lab Associates',
    photo: '/soborkhan.jpg',
    email: 'henry.adams@example.com',
  },
  {
    name: 'Khandaker Samin Yeasar',
    position: 'Lab Associate',
    bio: "Lab Associates",
    photo: '/soborkhan.jpg',
    email: 'henry.adams@example.com',
  },
];

export const metadata = {
  title: "DIU | Data Science Lab Team",
  description: "Meet the team behind the Data Science Lab of Daffodil International University",
};

export default function TeamPage() {
  const hierarchy = {
    'Chief Advisor': teamMembers.filter((m) => m.position === 'Chief Advisor'),
    Advisors: teamMembers.filter((m) => m.position === 'Advisor'),
    'Lab Incharge': teamMembers.filter((m) => m.position === 'Lab Incharge'),
    Faculty: teamMembers.filter((m) => m.position === 'Faculty'),
    'Lab Associates': teamMembers.filter((m) => m.position === 'Lab Associate'),
    'Lab Members': teamMembers.filter((m) => m.position === 'Lab Members'),
  };

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
      <TeamBanner />
      <div className="container mx-auto px-4 py-12">
        {Object.entries(hierarchy).map(([role, members], index) => {
          const layout = getGridLayout(members);
          let startIdx = 0;

          return (
            <div key={role} className="mb-12">
              <h2
                className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4 ml-9"
               
              >
                {role}
              </h2>

              {/* Mobile View */}
              <div className="block lg:hidden space-y-6">
                {members.map((member, idx) => (
                  <div key={idx} className="flex justify-center">
                    <TeamMemberCard member={member} />
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block">
                {layout.rows.map((rowCount, rowIndex) => {
                  const endIdx = startIdx + rowCount;
                  const rowMembers = members.slice(startIdx, endIdx);
                  startIdx = endIdx;

                  return (
                    <div key={rowIndex} className="flex justify-center mb-6">
                      <div className={`grid grid-cols-${Math.min(rowCount, 4)} gap-6`}>
                        {rowMembers.map((member, idx) => (
                          <TeamMemberCard key={idx} member={member} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
