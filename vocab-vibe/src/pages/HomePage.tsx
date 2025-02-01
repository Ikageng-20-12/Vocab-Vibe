import React from 'react';
import { Play, Clock, Trophy, BookOpen } from 'lucide-react';

const HomePage = () => {
  const username = "John"; // This would come from auth context in a real app

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          icon={<Play className="text-green-500" />}
          title="Start a New Test"
          description="Begin a full IELTS speaking test simulation"
          link="/take-test"
        />
        <QuickActionCard
          icon={<Trophy className="text-yellow-500" />}
          title="View My Scores"
          description="Check your test history and progress"
          link="/scores"
        />
        <QuickActionCard
          icon={<BookOpen className="text-blue-500" />}
          title="Practice Mode"
          description="Practice specific parts of the test"
          link="/practice"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              date="Mar 15, 2024"
              title="Full Test"
              score="7.5"
            />
            <ActivityItem
              date="Mar 12, 2024"
              title="Practice - Part 2"
              score="7.0"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tips & Resources</h2>
          <div className="space-y-4">
            <TipItem
              title="Improve Your Fluency"
              description="Practice speaking without long pauses"
            />
            <TipItem
              title="Part 2 Strategy"
              description="Learn how to structure your long-turn speaking"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) => (
  <a
    href={link}
    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-lg font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </a>
);

const ActivityItem = ({ date, title, score }: {
  date: string;
  title: string;
  score: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
    <div className="flex items-center">
      <Clock size={16} className="text-gray-500 mr-2" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
      Score: {score}
    </div>
  </div>
);

const TipItem = ({ title, description }: {
  title: string;
  description: string;
}) => (
  <div className="border-l-4 border-blue-500 pl-4">
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default HomePage;