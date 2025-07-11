import React, { useState } from 'react';
import '../App.css';

const LoginPage = ({ onLogin, theme, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ username: false, password: false });

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
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="login-subtitle">Welcome back! Please login to your account</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, username: true }))}
          className={touched.username && !username ? 'input-error' : ''}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
          className={touched.password && !password ? 'input-error' : ''}
        />
        <button className="form-btn" type="submit">Login</button>
        {error && <div className="error">{error}</div>}
        
        <div className="login-links">
          <button 
            type="button" 
            className="link-btn" 
            onClick={() => onNavigate('register')}
          >
            Don't have an account? Register
          </button>
          <button 
            type="button" 
            className="back-btn" 
            onClick={() => onNavigate('landing')}
          >
            ← Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 