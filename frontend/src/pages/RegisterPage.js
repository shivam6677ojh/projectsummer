import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    
    if (validateForm()) {
      const result = onRegister(formData);
      if (result.success) {
        setMessage(result.message);
        setTimeout(() => onNavigate('login'), 2000);
      } else {
        setMessage(result.message);
      }
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
    <div className={`register-container${theme === 'dark' ? ' dark-mode' : ''}`}>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p className="register-subtitle">Create your account to access the train management system</p>
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'input-error' : ''}
        />
        {errors.username && <div className="field-error">{errors.username}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <div className="field-error">{errors.password}</div>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'input-error' : ''}
        />
        {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}

        <button className="form-btn" type="submit">Register</button>
        
        {message && (
          <div className={message.includes('successful') ? 'success' : 'error'}>
            {message}
          </div>
        )}

        <button 
          type="button" 
          className="back-btn" 
          onClick={() => onNavigate('landing')}
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
};

export default RegisterPage; 