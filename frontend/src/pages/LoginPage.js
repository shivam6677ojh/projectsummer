import React, { useState, useEffect } from 'react';
import '../App.css';

const LoginPage = ({ onLogin, theme, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ username: false, password: false });
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    if (onLogin(username, password)) {
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className={`login-container${theme === 'dark' ? ' dark-mode' : ''}`}> 
      <form 
        className={`login-form${fadeIn ? ' fade-in' : ''}`}
        onSubmit={handleSubmit}
        aria-label="Login form"
      >
        <div className="login-logo" aria-label="App Logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#6a82fb"/>
            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" dy=".3em">LT</text>
          </svg>
        </div>
        <h1 className="login-title">Sign In</h1>
        <p className="login-subtitle">Welcome back! Please login to your account</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, username: true }))}
          className={touched.username && !username ? 'input-error' : ''}
          autoFocus
          aria-label="Username"
        />
        {touched.username && !username && (
          <div className="field-error">Username is required</div>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
          className={touched.password && !password ? 'input-error' : ''}
          aria-label="Password"
        />
        {touched.password && !password && (
          <div className="field-error">Password is required</div>
        )}
        <button className="form-btn login-btn" type="submit" aria-label="Login">Login</button>
        {error && <div className="error" role="alert">{error}</div>}
        <div className="login-links">
          <button 
            type="button" 
            className="link-btn" 
            onClick={() => onNavigate('register')}
            aria-label="Go to register page"
          >
            Don't have an account? Register
          </button>
          <button 
            type="button" 
            className="back-btn" 
            onClick={() => onNavigate('landing')}
            aria-label="Back to home"
          >
            ← Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 