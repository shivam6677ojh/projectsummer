import React from 'react';
import '../App.css';

const LandingPage = ({ onNavigate, theme }) => {
  return (
    <div className={`landing-container${theme === 'dark' ? ' dark-mode' : ''}`}>
      <div className="landing-content">
        <h1 className="landing-title">Train Management System</h1>
        <p className="landing-subtitle">Efficiently manage train schedules, track delays, and monitor platform timelines</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>🚂 Dashboard</h3>
            <p>View all trains in a comprehensive dashboard with real-time updates</p>
          </div>
          <div className="feature-card">
            <h3>➕ Add Trains</h3>
            <p>Easily add new trains with arrival, departure, priority, and platform details</p>
          </div>
          <div className="feature-card">
            <h3>⏰ Delayed Trains</h3>
            <p>Track and monitor delayed trains with status updates</p>
          </div>
          <div className="feature-card">
            <h3>📊 Platform Timeline</h3>
            <p>Visualize platform schedules and train movements across different platforms</p>
          </div>
        </div>

        <div className="landing-buttons">
          <button className="landing-btn primary" onClick={() => onNavigate('login')}>
            Login
          </button>
          <button className="landing-btn secondary" onClick={() => onNavigate('register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 