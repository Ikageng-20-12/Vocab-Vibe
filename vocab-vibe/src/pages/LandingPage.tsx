import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [authType, setAuthType] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            VocabVibe
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          SpeakWise – Speak Smarter, Score Higher!
        </p>

        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Join our community of IELTS aspirants and enhance your speaking skills through
          interactive practice sessions, real-time feedback, and personalized learning paths.
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => setAuthType('signup')}
          >
            Get Started
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600"
            onClick={() => setAuthType('signin')}
          >
            Sign In
          </motion.button>
        </div>
      </motion.div>

      <AuthModal
        isOpen={authType !== null}
        onClose={() => setAuthType(null)}
        type={authType || 'signin'}
      />
    </div>
  );
};

export default LandingPage;