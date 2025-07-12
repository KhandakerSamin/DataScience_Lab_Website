// app/team/page.js
import DeveloperSignature from '@/components/TeamPage/DeveloperSignature';
import TeamBanner from '@/components/TeamPage/TeamBanner';
import TeamMemberCard from '@/components/TeamPage/TeamMemberCard';

const teamMembers = [
  {
    name: 'Dr. John Doe',
    position: 'Chief Advisor',
    photo: '/chief.jpg',
    bio: 'Leading AI research with 20+ years of experience.',
    linkedin: 'https://linkedin.com',
    email: 'john.doe@example.com',
    website: 'https://johndoe.com',
  },
  {
    name: 'Jane Smith',
    position: 'Advisor',
    photo: '/advisor1.jpg',
    bio: 'Expert in machine learning and data analytics.',
    linkedin: 'https://linkedin.com',
    email: 'jane.smith@example.com',
  },
  {
    name: 'Alice Johnson',
    position: 'Lab Incharge',
    photo: '/lab-incharge.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Bob Wilson',
    position: 'Faculty',
    photo: '/faculty1.jpg',
    linkedin: 'https://linkedin.com',
    email: 'bob.wilson@example.com',
  },
  {
    name: 'Carol Brown',
    position: 'Student',
    photo: '/student1.jpg',
    github: 'https://github.com',
  },
  {
    name: 'David Lee',
    position: 'Lab Assistant',
    photo: '/assistant1.jpg',
    email: 'david.lee@example.com',
  },
];

export default function TeamPage() {
  const hierarchy = {
    'Chief Advisor': teamMembers.filter((m) => m.position === 'Chief Advisor'),
    Advisors: teamMembers.filter((m) => m.position === 'Advisor'),
    'Lab Incharge': teamMembers.filter((m) => m.position === 'Lab Incharge'),
    Faculty: teamMembers.filter((m) => m.position === 'Faculty'),
    Students: teamMembers.filter((m) => m.position === 'Student'),
    'Lab Assistants': teamMembers.filter((m) => m.position === 'Lab Assistant'),
  };

  return (
    <div className="bg-background min-h-screen">
      <TeamBanner />
      <div className="container mx-auto px-4 py-12">
        {Object.entries(hierarchy).map(([role, members], index) => (
          <div key={role} className="mb-12">
            <h2
              className="text-3xl font-bold text-textDark mb-6 border-l-4 border-primary pl-4"
              style={{ marginLeft: `${index * 20}px` }}
            >
              {role}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member, idx) => (
                <TeamMemberCard key={idx} member={member} />
              ))}
            </div>
          </div>
        ))}
        <DeveloperSignature />
      </div>
    </div>
  );
}