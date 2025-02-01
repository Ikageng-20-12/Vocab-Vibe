import React, { useState, useCallback, useEffect } from 'react';
import { Mic, Timer, Download, Trash2, RefreshCw, ArrowRight, Save } from 'lucide-react';
import useAudioRecorder from '../components/AudioRecorder';
import { questions, Question } from '../data/questions';

const TakeTestPage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Blob | null>(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [currentPart, setCurrentPart] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordings, setRecordings] = useState<{ [key: string]: Blob }>({});
  const [testComplete, setTestComplete] = useState(false);

  const currentQuestions = questions.filter(q => q.part === currentPart);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordingComplete = useCallback((audioBlob: Blob) => {
    setCurrentRecording(audioBlob);
    setRecordings(prev => ({
      ...prev,
      [currentQuestion.id]: audioBlob
    }));
  }, [currentQuestion?.id]);

  const { startRecording, stopRecording } = useAudioRecorder({
    onRecordingComplete: handleRecordingComplete,
    isRecording,
    onRecordingStart: () => {
      setIsRecording(true);
      setTimeLeft(currentPart === 'part2' ? 120 : 60); // 2 minutes for Part 2, 1 minute for others
    },
    onRecordingStop: () => setIsRecording(false),
  });

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next part or complete test
      if (currentPart === 'part1') {
        setCurrentPart('part2');
        setCurrentQuestionIndex(0);
      } else if (currentPart === 'part2') {
        setCurrentPart('part3');
        setCurrentQuestionIndex(0);
      } else {
        setTestComplete(true);
      }
    }
    setCurrentRecording(null);
  };

  const handleDownload = (questionId: string) => {
    const blob = recordings[questionId];
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-recording-${questionId}.webm`;
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
    setCurrentRecording(null);
  };

  const handleDownloadAll = () => {
    Object.entries(recordings).forEach(([questionId, blob]) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-recording-${questionId}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const handleRestartTest = () => {
    setIsStarted(false);
    setIsRecording(false);
    setCurrentRecording(null);
    setTimeLeft(120);
    setCurrentPart('part1');
    setCurrentQuestionIndex(0);
    setRecordings({});
    setTestComplete(false);
  };

  if (testComplete) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Test Complete!</h2>
          <p className="text-gray-600 mb-8">
            You have completed all parts of the IELTS Speaking Test simulation.
          </p>
          <button
            onClick={handleDownloadAll}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
          >
            <Download size={20} className="mr-2" />
            Download All Recordings
          </button>
          <button
            onClick={handleRestartTest}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center mt-4"
          >
            <RefreshCw size={20} className="mr-2" />
            Restart Test
          </button>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              {isRecording && (
                <>
                  <Mic className="text-red-500 animate-pulse" size={24} />
                  <span className="text-red-500 font-medium">Recording...</span>
                </>
              )}
              <span className="font-medium text-gray-600">
                Part {currentPart.charAt(4)} - Question {currentQuestionIndex + 1}/{currentQuestions.length}
              </span>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <Timer size={20} className="text-gray-600" />
              <span className="ml-2 font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Question:</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700 whitespace-pre-line">{currentQuestion.text}</p>
              
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
          </div>

          <div className="flex space-x-4">
            {!currentRecording ? (
              <button
                onClick={startRecording}
                disabled={isRecording}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Mic size={20} className="mr-2" />
                Start Recording
              </button>
            ) : (
              <div className="flex-1 flex space-x-2">
                <button
                  onClick={() => handleDelete(currentQuestion.id)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Trash2 size={20} className="mr-2" />
                  Delete
                </button>
                <button
                  onClick={() => handleDownload(currentQuestion.id)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Download size={20} className="mr-2" />
                  Download
                </button>
                
              </div>
            )}
            
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Mic size={20} className="mr-2" />
                Stop Recording
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={!currentRecording}
                className={`flex-1 ${
                  currentRecording 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}
              >
                <ArrowRight size={20} className="mr-2" />
                Next Question
              </button>
            )}
          </div>

          {currentRecording && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Your Recording</h3>
              <audio 
                controls 
                src={URL.createObjectURL(currentRecording)} 
                className="w-full" 
              />
            </div>
          )}
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