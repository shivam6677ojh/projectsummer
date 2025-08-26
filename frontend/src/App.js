import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js';
import AddTrain from './pages/AddTrain.js';
import DelayedTrains from './pages/DelayedTrains.js';
import PlatformTimeline from './pages/PlatformTimeline.js';
import LoginPage from './pages/LoginPage.js';
import LandingPage from './pages/LandingPage.js';
import RegisterPage from './pages/RegisterPage.js';
import './App.css';
import FeedbackPage from './pages/FeedbackPage';
import { logoutUser, getCurrentUserProfile } from './utils/api';

function AppContent() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
    
    // Get current user profile
    const loadUserProfile = async () => {
      try {
        const user = await getCurrentUserProfile();
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to load user profile:', error);
        // If token is invalid, redirect to login
        handleLogout();
      }
    };
    
    loadUserProfile();
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.reload(); // Force reload to go back to landing
    }
  };

  return (
    <div className="app-layout">
      <nav className="top-nav">
        <Link to="/" style={{ margin: 10 }}>Dashboard</Link>
        <Link to="/add" style={{ margin: 10 }}>Add Train</Link>
        <Link to="/delayed" style={{ margin: 10 }}>Delayed Trains</Link>
        <Link to="/timeline" style={{ margin: 10 }}>Platform Timeline</Link>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode">
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>
      
      <div className="main-content">
        <aside className="sidebar">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <h3>{currentUser?.username || 'User'}</h3>
              <p>Logged In</p>
              {currentUser?.email && <p className="user-email">{currentUser.email}</p>}
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <button className="sidebar-btn" onClick={() => navigate('/feedback')}>
              💬 Feedback
            </button>
            <button className="sidebar-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </aside>
        
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTrain />} />
            <Route path="/delayed" element={<DelayedTrains />} />
            <Route path="/timeline" element={<PlatformTimeline />} />
            <Route path="/feedback" element={<FeedbackPage theme={theme} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2200);
    
    // Check if user is authenticated on app load
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
      setIsAuthenticated(true);
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username, token) => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', username);
  };

  const handleRegister = (userData) => {
    // Registration is now handled by the backend
    // This function is kept for compatibility but should be updated in RegisterPage
    return { success: true, message: 'Registration successful! Please login.' };
  };

  if (showLoader) {
    return (
      <div className="app-loader">
        <span className="loader-subtitle loader-text">Welcome to Train Management System</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (currentPage === 'landing') {
      return <LandingPage onNavigate={setCurrentPage} />;
    } else if (currentPage === 'register') {
      return <RegisterPage onRegister={handleRegister} onNavigate={setCurrentPage} />;
    } else if (currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
    } else {
      // Default to landing page
      return <LandingPage onNavigate={setCurrentPage} />;
    }
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
