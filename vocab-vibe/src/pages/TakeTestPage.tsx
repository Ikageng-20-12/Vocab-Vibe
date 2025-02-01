import React, { useState } from 'react';
import { Mic, Timer } from 'lucide-react';

const TakeTestPage = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">IELTS Speaking Test</h1>

      {!isStarted ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Test Instructions</h2>
          
          <div className="space-y-6 mb-8">
            <TestPart
              part="Part 1"
              duration="4-5 minutes"
              description="Introduction and interview about familiar topics"
            />
            <TestPart
              part="Part 2"
              duration="3-4 minutes"
              description="Individual long turn speaking about a particular topic"
            />
            <TestPart
              part="Part 3"
              duration="4-5 minutes"
              description="Two-way discussion about more abstract topics"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <h3 className="font-semibold text-blue-800 mb-2">Tips for Success</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Speak clearly and at a natural pace</li>
              <li>Use a variety of vocabulary and grammar structures</li>
              <li>Stay on topic and provide relevant examples</li>
              <li>Don't worry about making small mistakes</li>
            </ul>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Begin Test
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Mic className="text-red-500 animate-pulse" size={24} />
              <span className="ml-2 text-red-500 font-medium">Recording...</span>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <Timer size={20} className="text-gray-600" />
              <span className="ml-2 font-mono text-lg">02:00</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Question:</h2>
            <p className="text-lg text-gray-700">
              Tell me about your hometown. What do you like most about it?
            </p>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Stop Recording
            </button>
            <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TestPart = ({ part, duration, description }: {
  part: string;
  duration: string;
  description: string;
}) => (
  <div className="border-l-4 border-blue-500 pl-4">
    <h3 className="font-semibold text-lg">{part}</h3>
    <p className="text-gray-600">Duration: {duration}</p>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default TakeTestPage;