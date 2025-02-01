import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import HomePage from './pages/HomePage';
import TakeTestPage from './pages/TakeTestPage';
import PracticePage from './pages/PractisePage';
import ScoresPage from './pages/ScorePage';
import ProfilePage from './pages/ProfilePage';
import ResourcesPage from './pages/ResourcesPage';
import LandingPage from './pages/LandingPage';
import SplashScreen from './components/SplashScreen';
import supabase from './util/supabaseClient';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <Router>
          {!isAuthenticated ? (
            <LandingPage onSignIn={() => setIsAuthenticated(true)} />
          ) : (
            <div className="flex min-h-screen bg-gray-100">
              <Sidebar />
              <main className="flex-1 ml-64">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/take-test" element={<TakeTestPage />} />
                  <Route path="/practice" element={<PracticePage />} />
                  <Route path="/scores" element={<ScoresPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                </Routes>
              </main>
            </div>
          )}
        </Router>
      )}
    </>
  );
}

export default App;