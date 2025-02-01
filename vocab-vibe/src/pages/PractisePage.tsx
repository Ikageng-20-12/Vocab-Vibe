import React, { useState } from 'react';
import { Mic, Play } from 'lucide-react';

const PracticePage = () => {
  const [selectedPart, setSelectedPart] = useState<string>('part1');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Practice Mode</h1>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Test Part</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['part1', 'part2', 'part3'].map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`p-4 rounded-lg border-2 ${
                  selectedPart === part
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-semibold mb-2">
                  Part {part.charAt(4)}
                </h3>
                <p className="text-sm text-gray-600">
                  {part === 'part1' && 'Introduction and interview'}
                  {part === 'part2' && 'Long turn speaking'}
                  {part === 'part3' && 'Discussion'}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Practice Questions</h2>
          <div className="space-y-4">
            <PracticeQuestion
              question="What do you do in your free time?"
              difficulty="Easy"
            />
            <PracticeQuestion
              question="Describe a place you like to visit on weekends."
              difficulty="Medium"
            />
            <PracticeQuestion
              question="How has technology changed the way we communicate?"
              difficulty="Hard"
            />
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Play size={20} className="mr-2" />
          Start Practice Session
        </button>
      </div>
    </div>
  );
};

const PracticeQuestion = ({ question, difficulty }: {
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center">
        <Mic size={20} className="text-gray-500 mr-3" />
        <p className="font-medium">{question}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${difficultyColors[difficulty]}`}>
        {difficulty}
      </span>
    </div>
  );
};

export default PracticePage;