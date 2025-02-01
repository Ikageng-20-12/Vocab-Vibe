import React, { useState } from 'react';
import { Download, ChevronRight, TrendingUp, Clock, Volume2, Mic, BookOpen } from 'lucide-react';

interface TestScore {
  date: string;
  part1: string;
  part2: string;
  part3: string;
  overall: string;
  details: {
    fluency: number;
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    coherence: number;
  };
  recordings: {
    [key: string]: string; // questionId -> recording URL
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

const ScoresPage = () => {
  const [selectedTest, setSelectedTest] = useState<TestScore | null>(null);

  const mockTestScores: TestScore[] = [
    {
      date: '2024-03-15',
      part1: '7.5',
      part2: '7.0',
      part3: '8.0',
      overall: '7.5',
      details: {
        fluency: 7.5,
        pronunciation: 7.0,
        vocabulary: 8.0,
        grammar: 7.5,
        coherence: 7.0
      },
      recordings: {
        'p1_1': 'recording1.webm',
        'p2_1': 'recording2.webm',
        'p3_1': 'recording3.webm'
      },
      feedback: {
        strengths: [
          'Excellent use of advanced vocabulary',
          'Good development of ideas',
          'Natural flow in conversation'
        ],
        improvements: [
          'Work on pronunciation of specific sounds',
          'Use more complex grammatical structures',
          'Improve topic coherence in Part 2'
        ]
      }
    },
    {
      date: '2024-03-10',
      part1: '7.0',
      part2: '7.0',
      part3: '7.5',
      overall: '7.0',
      details: {
        fluency: 7.0,
        pronunciation: 7.0,
        vocabulary: 7.5,
        grammar: 7.0,
        coherence: 6.5
      },
      recordings: {
        'p1_1': 'recording4.webm',
        'p2_1': 'recording5.webm',
        'p3_1': 'recording6.webm'
      },
      feedback: {
        strengths: [
          'Good basic vocabulary usage',
          'Clear pronunciation of most sounds',
          'Appropriate responses to questions'
        ],
        improvements: [
          'Expand vocabulary range',
          'Work on speaking fluency',
          'Develop ideas more fully in Part 2'
        ]
      }
    }
  ];

  const averageScores = {
    overall: '7.5',
    fluency: '7.0',
    vocabulary: '7.5',
    grammar: '8.0'
  };

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF report
    console.log('Downloading report...');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My IELTS Progress</h1>
        <button 
          onClick={handleDownloadReport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} className="mr-2" />
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ScoreCard title="Overall Band" score={averageScores.overall} trend="up" icon={BookOpen} />
        <ScoreCard title="Fluency" score={averageScores.fluency} trend="up" icon={Clock} />
        <ScoreCard title="Vocabulary" score={averageScores.vocabulary} trend="neutral" icon={Volume2} />
        <ScoreCard title="Grammar" score={averageScores.grammar} trend="up" icon={Mic} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                  {mockTestScores.map((test, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedTest(test)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{test.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{test.part1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{test.part2}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{test.part3}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{test.overall}</td>
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

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
          <div className="space-y-4">
            {selectedTest ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Test Date: {selectedTest.date}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedTest.details).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                        <div className="text-lg font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-green-600 mb-2">Strengths</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedTest.feedback.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-orange-600 mb-2">Areas for Improvement</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedTest.feedback.improvements.map((improvement, i) => (
                        <li key={i}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Recordings</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedTest.recordings).map(([id, url]) => (
                      <div key={id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">Recording {id}</span>
                        <audio controls src={url} className="h-8" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a test to view detailed analysis
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ 
  title, 
  score, 
  trend,
  icon: Icon 
}: {
  title: string;
  score: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-2">
        <Icon className="text-blue-500 mr-2" size={20} />
        <h3 className="text-gray-600 text-sm">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">{score}</span>
        <TrendingUp className={trendColors[trend]} size={24} />
      </div>
    </div>
  );
};

export default ScoresPage;