import React, { useState, useEffect } from 'react';
import { loginUser } from '../utils/api';
import '../App.css';

const LoginPage = ({ onLogin, theme, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('LoginPage component mounted'); // Debug log
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted'); // Debug log
    
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginUser(username, password);
      console.log('Login successful:', response);
      onLogin(response.user.username, response.token);
      setError('');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'auto',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '400px',
        width: '90%',
        position: 'relative',
        margin: 'auto'
      }}>
        <h1 style={{ color: '#FFD700', fontSize: '2.5rem', margin: '0 0 10px 0', textAlign: 'center' }}>
          ⚡ Thunder Login ⚡
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '1rem', margin: '0 0 20px 0', textAlign: 'center' }}>
          Power up your train management experience
        </p>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'black',
                fontSize: '16px',
                marginBottom: '10px',
                boxSizing: 'border-box'
              }}
              autoFocus
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'black',
                fontSize: '16px',
                marginBottom: '10px',
                boxSizing: 'border-box'
              }}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF4500)',
              color: '#000',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            {loading ? '⚡ Powering Up...' : '⚡ Thunder Login ⚡'}
          </button>

          {error && (
            <div style={{
              background: 'rgba(255, 71, 87, 0.1)',
              border: '1px solid rgba(255, 71, 87, 0.3)',
              color: '#ff4757',
              padding: '12px',
              borderRadius: '8px',
              marginTop: '15px',
              textAlign: 'center'
            }}>
              ⚡ {error}
            </div>
          )}
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>
          <button 
            type="button" 
            onClick={() => onNavigate('register')}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFD700',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ⚡ Don't have an account? Register ⚡
          </button>
          <button 
            type="button" 
            onClick={() => onNavigate('landing')}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFD700',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ⚡ ← Back to Home ⚡
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;