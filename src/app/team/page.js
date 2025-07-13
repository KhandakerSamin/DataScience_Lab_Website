// app/team/page.js
import TeamBanner from '@/components/TeamPage/TeamBanner';
import TeamMemberCard from '@/components/TeamPage/TeamMemberCard';

const teamMembers = [
  {
    name: 'Dr. John Doe',
    position: 'Chief Advisor',
    photo: '/soborkhan.jpg',
    bio: 'Leading AI research with 20+ years of experience.',
    linkedin: 'https://linkedin.com',
    email: 'john.doe@example.com',
    website: 'https://johndoe.com',
  },
  {
    name: 'Jane Smith',
    position: 'Advisor',
    photo: '/soborkhan.jpg',
    bio: 'Expert in machine learning and data analytics.',
    linkedin: 'https://linkedin.com',
    email: 'jane.smith@example.com',
  },
  {
    name: 'Alice Johnson',
    position: 'Advisor',
    photo: '/soborkhan.jpg',
    bio: 'Specialist in data visualization.',
    linkedin: 'https://linkedin.com',
    email: 'alice.johnson@example.com',
  },
  {
    name: 'Alice Johnson',
    position: 'Lab Incharge',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Bob Wilson',
    position: 'Faculty',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
    email: 'bob.wilson@example.com',
  },
  {
    name: 'Carol Brown',
    position: 'Faculty',
    photo: '/soborkhan.jpg',
    linkedin: 'https://linkedin.com',
    email: 'carol.brown@example.com',
  },
  {
    name: 'David Lee',
    position: 'Faculty',
    photo: '/soborkhan.jpg',
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
    name: 'Grace Taylor',
    position: 'Lab Associates',
    photo: '/soborkhan.jpg',
    email: 'grace.taylor@example.com',
  },
  {
    name: 'Henry Adams',
    position: 'Lab Associates',
    photo: '/soborkhan.jpg',
    email: 'henry.adams@example.com',
  },
];

export default function TeamPage() {
  const hierarchy = {
    'Chief Advisor': teamMembers.filter((m) => m.position === 'Chief Advisor'),
    Advisors: teamMembers.filter((m) => m.position === 'Advisor'),
    'Lab Incharge': teamMembers.filter((m) => m.position === 'Lab Incharge'),
    Faculty: teamMembers.filter((m) => m.position === 'Faculty'),
    'Lab Associates': teamMembers.filter((m) => m.position === 'Lab Associates'),
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
      <div className="container mx-auto px-4 py-12 ">
        {Object.entries(hierarchy).map(([role, members], index) => {
          const layout = getGridLayout(members);
          let startIdx = 0;

          return (
            <div key={role} className="mb-12">
              <h2
                className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4"
                style={{ marginLeft: `${index * 20}px` }}
              >
                {role}
              </h2>
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
          );
        })}
      </div>
    </div>
  );
}