import React from 'react';
import { Download, ChevronRight, TrendingUp } from 'lucide-react';

const ScoresPage = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Scores</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={20} className="mr-2" />
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ScoreCard title="Overall Band" score="7.5" trend="up" />
        <ScoreCard title="Fluency" score="7.0" trend="up" />
        <ScoreCard title="Vocabulary" score="7.5" trend="neutral" />
        <ScoreCard title="Grammar" score="8.0" trend="up" />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Test History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part 2
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part 3
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  date: '2024-03-15',
                  part1: '7.5',
                  part2: '7.0',
                  part3: '8.0',
                  overall: '7.5',
                },
                {
                  date: '2024-03-10',
                  part1: '7.0',
                  part2: '7.0',
                  part3: '7.5',
                  overall: '7.0',
                },
              ].map((test, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{test.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{test.part1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{test.part2}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{test.part3}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {test.overall}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ title, score, trend }: {
  title: string;
  score: string;
  trend: 'up' | 'down' | 'neutral';
}) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">{score}</span>
        <TrendingUp className={trendColors[trend]} size={24} />
      </div>
    </div>
  );
};

export default ScoresPage;