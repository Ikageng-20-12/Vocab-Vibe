import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import supabase from '../util/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'signin' | 'signup';
  onSignIn: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type, onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setFullName('');
      setError(null);
    }
  }, [isOpen, type]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Verify auth credentials
      const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // 2. Check profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (profileError || !profile) {
        console.error('Profile verification failed:', profileError);
        setError('Account verification failed');
        return;
      }

      // 3. Verify email confirmation
      if (authUser.user && !authUser.user.email_confirmed_at) {
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email,
        });
        setError('Please confirm your email first. New confirmation email sent.');
        return;
      }

      // 4. Success
      onSignIn();
      onClose();

    } catch (error) {
      console.error('Sign in error:', error);
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Create auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        // 2. Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: email,
            full_name: fullName,
            created_at: new Date().toISOString()
          }]);

        if (profileError) {
          console.error('Profile creation failed:', profileError);
          setError('Failed to create profile');
          return;
        }

        setError('Please check your email to confirm your account');
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md relative"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {type === 'signin' ? 'Welcome Back!' : 'Create Account'}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={type === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
              {type === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Processing...' : type === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;