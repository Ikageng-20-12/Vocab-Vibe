import axios from 'axios';

const API_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export interface PracticeResult {
  transcribed_text: string;
  feedback_text: string;
  feedback_audio_url: string;
}

export interface TestResult {
  transcribed_text: string;
  feedback_text: string;
  feedback_audio_url: string;
  scores?: {
    fluency: number;
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    coherence: number;
  };
  part?: string;
}

export interface TestScore {
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
    [key: string]: string;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

export const uploadTestAudio = async (recordings: { [key: string]: Blob }): Promise<TestResult> => {
  const formData = new FormData();
  Object.entries(recordings).forEach(([questionId, blob]) => {
    formData.append('files', blob, `test-recording-${questionId}.webm`);
  });

  try {
    const response = await apiClient.post('/upload-audio/', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading test audio:', error);
    throw error;
  }
};

export const getTestScores = async (): Promise<TestScore[]> => {
  try {
    const response = await apiClient.get('/test-scores/');
    return response.data;
  } catch (error) {
    console.error('Error fetching test scores:', error);
    throw error;
  }
};

export const uploadPracticeAudio = async (audioBlob: Blob): Promise<PracticeResult> => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'practice-recording.webm');

  try {
    const response = await apiClient.post('/upload-audio/', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading practice audio:', error);
    throw error;
  }
};

export const getPracticeResults = async (): Promise<PracticeResult[]> => {
  try {
    const response = await apiClient.get('/practice-tests/');
    return response.data;
  } catch (error) {
    console.error('Error fetching practice results:', error);
    throw error;
  }
};