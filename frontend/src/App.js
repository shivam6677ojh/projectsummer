import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTrain from './pages/AddTrain';
import DelayedTrains from './pages/DelayedTrains';
import PlatformTimeline from './pages/PlatformTimeline';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import FeedbackPage from './pages/FeedbackPage';

function AppContent() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
    window.location.reload(); // Force reload to go back to landing
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
              <h3>{localStorage.getItem('currentUser') || 'User'}</h3>
              <p>Logged In</p>
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
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('auth', 'true');
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  };

  const handleRegister = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Username or email already exists.' };
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Registration successful! Please login.' };
  };

  if (showLoader) {
    return (
      <div className="app-loader">
        <span className="loader-text">Welcome</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (currentPage === 'landing') {
      return <LandingPage onNavigate={setCurrentPage} />;
    } else if (currentPage === 'register') {
      return <RegisterPage onRegister={handleRegister} onNavigate={setCurrentPage} />;
    } else {
      return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
    }
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
