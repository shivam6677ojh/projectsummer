import React, { useState, useEffect } from 'react';
import { registerUser } from '../utils/api';
import '../App.css';

const RegisterPage = ({ onRegister, onNavigate, theme }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    console.log('RegisterPage component mounted'); // Debug log
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(formData.username, formData.email, formData.password);
      console.log('Registration successful:', response);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => onNavigate('login'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
        maxWidth: '450px',
        width: '90%',
        position: 'relative',
        margin: 'auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="thunderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FF4500', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M30 5 L20 25 L35 25 L25 45 L40 25 L30 5" fill="url(#thunderGradient)" stroke="#FFD700" strokeWidth="2"/>
              <circle cx="30" cy="30" r="25" fill="none" stroke="url(#thunderGradient)" strokeWidth="3" opacity="0.3"/>
            </svg>
          </div>
          <h1 style={{ color: '#FFD700', fontSize: '2.5rem', margin: '0 0 10px 0' }}>
            ⚡ Thunder Register ⚡
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: '1rem', margin: 0 }}>
            Join the thunder-powered train management system
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '15px',
                border: errors.username ? '2px solid #ff4757' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '5px',
                boxSizing: 'border-box'
              }}
              autoFocus
              disabled={loading}
            />
            {errors.username && (
              <div style={{ color: '#ff4757', fontSize: '14px', marginTop: '5px' }}>
                ⚡ {errors.username}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '15px',
                border: errors.email ? '2px solid #ff4757' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '5px',
                boxSizing: 'border-box'
              }}
              disabled={loading}
            />
            {errors.email && (
              <div style={{ color: '#ff4757', fontSize: '14px', marginTop: '5px' }}>
                ⚡ {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '15px 50px 15px 15px',
                  border: errors.password ? '2px solid #ff4757' : '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '16px',
                  marginBottom: '5px',
                  boxSizing: 'border-box'
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#FFD700',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <div style={{ color: '#ff4757', fontSize: '14px', marginTop: '5px' }}>
                ⚡ {errors.password}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '15px 50px 15px 15px',
                  border: errors.confirmPassword ? '2px solid #ff4757' : '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '16px',
                  marginBottom: '5px',
                  boxSizing: 'border-box'
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#FFD700',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <div style={{ color: '#ff4757', fontSize: '14px', marginTop: '5px' }}>
                ⚡ {errors.confirmPassword}
              </div>
            )}
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
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '15px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? '⚡ Creating Account...' : '⚡ Thunder Register ⚡'}
          </button>

          {message && (
            <div style={{
              background: message.includes('successful') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 71, 87, 0.1)',
              border: `1px solid ${message.includes('successful') ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 71, 87, 0.3)'}`,
              color: message.includes('successful') ? '#4caf50' : '#ff4757',
              padding: '12px',
              borderRadius: '8px',
              marginTop: '15px',
              textAlign: 'center'
            }}>
              ⚡ {message}
            </div>
          )}
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>
          <button 
            type="button" 
            onClick={() => onNavigate('login')}
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
            ⚡ Already have an account? Login ⚡
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

export default RegisterPage; 