import React, { useState, useCallback } from 'react';
import { Mic, Play, Download, Trash2, RefreshCw } from 'lucide-react';
import useAudioRecorder from '../components/AudioRecorder';
import { questions, Question } from '../data/questions';

const PracticePage = () => {
  const [selectedPart, setSelectedPart] = useState<string>('part1');
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<{ [key: string]: Blob }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackAudioUrl, setFeedbackAudioUrl] = useState<string | null>(null);

  const currentQuestions = questions.filter(q => q.part === selectedPart);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleRecordingComplete = useCallback((audioBlob: Blob) => {
    setRecordings(prev => ({
      ...prev,
      [currentQuestion.id]: audioBlob
    }));
  }, [currentQuestion.id]);

  const { startRecording, stopRecording } = useAudioRecorder({
    onRecordingComplete: handleRecordingComplete,
    isRecording,
    onRecordingStart: () => setIsRecording(true),
    onRecordingStop: () => setIsRecording(false),
  });

  const handleDownload = (questionId: string) => {
    const blob = recordings[questionId];
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `practice-recording-${questionId}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (questionId: string) => {
    setRecordings(prev => {
      const newRecordings = { ...prev };
      delete newRecordings[questionId];
      return newRecordings;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => 
      prev < currentQuestions.length - 1 ? prev + 1 : 0
    );
  };

  const handleRetake = () => {
    handleDelete(currentQuestion.id);
    startRecording();
  };

  const handleUploadAndAnalyze = async (questionId: string) => {
    const blob = recordings[questionId];
    const formData = new FormData();
    formData.append('file', blob, `practice-recording-${questionId}.webm`);

    try {
      const response = await fetch('http://localhost:8000/upload-audio/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFeedback(data.feedback_text);
      setFeedbackAudioUrl(data.feedback_audio_path);
    } catch (error) {
      console.error('Error uploading and analyzing audio:', error);
    }
  };

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
                onClick={() => {
                  setSelectedPart(part);
                  setCurrentQuestionIndex(0);
                }}
                className={`p-4 rounded-lg border-2 ${
                  selectedPart === part
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-semibold mb-2">Part {part.charAt(4)}</h3>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Current Question</h2>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <p className="text-lg whitespace-pre-line">{currentQuestion.text}</p>
            
            {currentQuestion.followUp && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Follow-up Questions:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {currentQuestion.followUp.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex-1 ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}
            >
              {isRecording ? (
                <>
                  <Mic size={20} className="mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play size={20} className="mr-2" />
                  Start Recording
                </>
              )}
            </button>
            
            <button
              onClick={handleNextQuestion}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              Next Question
            </button>
          </div>
        </div>

        {recordings[currentQuestion.id] && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Your Recording</h3>
            <audio 
              controls 
              src={URL.createObjectURL(recordings[currentQuestion.id])} 
              className="w-full mb-4" 
            />
            <div className="flex space-x-3">
              <button
                onClick={() => handleDownload(currentQuestion.id)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download
              </button>
              <button
                onClick={() => handleDelete(currentQuestion.id)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
              <button
                onClick={handleRetake}
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                <RefreshCw size={16} className="mr-2" />
                Retake
              </button>
              <button
                onClick={() => handleUploadAndAnalyze(currentQuestion.id)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Play size={16} className="mr-2" />
                Analyze
              </button>
            </div>
          </div>
        )}

        {feedback && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Feedback</h3>
            <p className="text-gray-700 mb-4">{feedback}</p>
            {feedbackAudioUrl && (
              <audio controls src={feedbackAudioUrl} className="w-full" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;