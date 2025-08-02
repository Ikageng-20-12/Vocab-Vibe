import React from 'react';
import { PracticeResult } from '../api/client';

const API_URL = "http://localhost:8000";

interface FeedbackDisplayProps {
  result: PracticeResult;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Your Speech:</h4>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
          {result.transcribed_text}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Feedback:</h4>
        <div className="text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-line">
          {result.feedback_text}
        </div>
      </div>

      {result.feedback_audio_url && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Audio Feedback:</h4>
          <audio
            controls
            src={`${API_URL}/temp/${result.feedback_audio_url}`}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;