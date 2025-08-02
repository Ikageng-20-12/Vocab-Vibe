import React from 'react';
import { PracticeResult } from '../api/client';

interface PracticeHistoryProps {
  results: PracticeResult[];
}

const PracticeHistory: React.FC<PracticeHistoryProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Practice History</h3>
      {results.length === 0 ? (
        <p className="text-gray-500">No practice history available.</p>
      ) : (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Your Speech:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">
                  {result.transcribed_text}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Feedback:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded whitespace-pre-line">
                  {result.feedback_text}
                </p>
              </div>
              {result.feedback_audio_url && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Audio Feedback:</h4>
                  <audio
                    controls
                    src={`http://localhost:8000/temp/${result.feedback_audio_url}`}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticeHistory;