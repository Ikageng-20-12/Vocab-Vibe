import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;