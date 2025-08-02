import { useState, useCallback, useEffect } from 'react';
import { Mic, Timer, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import useAudioRecorder from '../components/AudioRecorder';
import { questions } from '../data/questions';
import Modal from 'react-modal';

const API_URL = "http://localhost:8000";

const TakeTestPage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Blob | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPart, setCurrentPart] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordings, setRecordings] = useState<{ [key: string]: Blob }>({});
  const [testComplete, setTestComplete] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackAudioUrl, setFeedbackAudioUrl] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false); // For Part 2 preparation time

  const currentQuestions = questions.filter(q => q.part === currentPart);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((isRecording || isPreparing) && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (isPreparing) {
              setIsPreparing(false);
              startRecording(); // Start recording after preparation time
            } else {
              stopRecording();
              handleNextQuestion();
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, isPreparing, timeLeft]);

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
    onRecordingStart: () => setIsRecording(true),
    onRecordingStop: () => setIsRecording(false),
  });

  const handleNextQuestion = () => {
    stopRecording();
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next part or complete test
      if (currentPart === 'part1') {
        setCurrentPart('part2');
        setCurrentQuestionIndex(0);
        setIsPreparing(true); // Start preparation time for Part 2
        setTimeLeft(60); // 1 minute preparation time
      } else if (currentPart === 'part2') {
        setCurrentPart('part3');
        setCurrentQuestionIndex(0);
      } else {
        setTestComplete(true);
        handleUploadAndAnalyzeAll(); // Upload and analyze all recordings at the end of the test
      }
    }
    setCurrentRecording(null);
  };

  const handleDone = () => {
    stopRecording();
    setTestComplete(true);
    handleUploadAndAnalyzeAll(); // Upload and analyze all recordings at the end of the test
  };

  // Use a backend endpoint for test mode analysis (multi–file upload)
  const handleUploadAndAnalyzeAll = async () => {
    try {
      const formData = new FormData();
      Object.entries(recordings).forEach(([questionId, blob]) => {
        formData.append('files', blob, `test-recording-${questionId}.webm`);
      });

      const response = await fetch(`${API_URL}/upload-test-audio/`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFeedback(data.feedback_text);
      setFeedbackAudioUrl(data.feedback_audio_path);
      setIsFeedbackModalOpen(true);
    } catch (error) {
      console.error('Error uploading and analyzing audio:', error);
    }
  };

  const handleRestartTest = () => {
    setIsStarted(false);
    setIsRecording(false);
    setCurrentRecording(null);
    setTimeLeft(0);
    setCurrentPart('part1');
    setCurrentQuestionIndex(0);
    setRecordings({});
    setTestComplete(false);
    setFeedback(null);
    setFeedbackAudioUrl(null);
    setIsPreparing(false);
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
            onClick={() => setIsFeedbackModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <CheckCircle size={20} className="mr-2" />
            View Feedback
          </button>
          <button
            onClick={handleRestartTest}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center mt-4"
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Full IELTS Speaking Test</h1>

      {!isStarted ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Test Instructions</h2>
          <p className="text-gray-700 mb-6">
            Test Mode: Full IELTS Speaking Test with 3 sections:
            <br />
            • Part 1: Introduction
            <br />
            • Part 2: Long Turn (Cue Card Activity)
            <br />
            • Part 3: Two-Way Discussion
            <br />
            At the end of the test, you will receive feedback on your speaking performance.
          </p>
          <div className="space-y-6 mb-8">
            <TestPart
              part="Introduction"
              duration="4-5 minutes"
              description="Interview about familiar topics."
            />
            <TestPart
              part="Long Turn"
              duration="3-4 minutes"
              description="Prepare and speak on a cue card topic for a long turn."
            />
            <TestPart
              part="Two-Way Discussion"
              duration="4-5 minutes"
              description="Engage in a discussion on more abstract topics."
            />
          </div>
          <button
            onClick={() => {
              setIsStarted(true);
              startRecording();
              setTimeLeft(60); // 1 minute for Part 1 questions
            }}
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
              {isPreparing && (
                <>
                  <Timer className="text-blue-500" size={24} />
                  <span className="text-blue-500 font-medium">Preparing...</span>
                </>
              )}
              <span className="font-medium text-gray-600">
                {currentPart === 'part1' ? 'Introduction' : currentPart === 'part2' ? 'Long Turn' : 'Two-Way Discussion'} - Question {currentQuestionIndex + 1}/{currentQuestions.length}
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
            <button
              onClick={handleNextQuestion}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ArrowRight size={20} className="mr-2" />
              Next Question
            </button>
            {currentPart === 'part3' && currentQuestionIndex === currentQuestions.length - 1 && (
              <button
                onClick={handleDone}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <CheckCircle size={20} className="mr-2" />
                Done
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

      <Modal
        isOpen={isFeedbackModalOpen}
        onRequestClose={() => setIsFeedbackModalOpen(false)}
        contentLabel="Feedback Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          {feedback && <p className="text-gray-700 mb-4">{feedback}</p>}
          {feedbackAudioUrl && (
            <audio controls src={`${API_URL}/${feedbackAudioUrl}`} className="w-full" />
          )}
          <button
            onClick={() => setIsFeedbackModalOpen(false)}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
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