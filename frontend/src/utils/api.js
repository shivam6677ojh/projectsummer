// Placeholder for API utility functions

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

console.log('API Base URL:', API_BASE); // Debug log

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get current user from localStorage
const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// Set auth headers for requests
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Test API connection
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', API_BASE);
    const res = await fetch(`${API_BASE}/`);
    const data = await res.json();
    console.log('API test response:', data);
    return data;
  } catch (error) {
    console.error('API connection test failed:', error);
    throw error;
  }
};

// Authentication API calls
export const loginUser = async (username, password) => {
  try {
    console.log('Attempting login for user:', username);
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
    });
    
    console.log('Login response status:', res.status);
    
    if (!res.ok) {
      const error = await res.json();
      console.error('Login error response:', error);
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await res.json();
    console.log('Login successful:', data);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    console.log('Attempting registration for user:', username);
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    console.log('Registration response status:', res.status);
    
    if (!res.ok) {
      const error = await res.json();
      console.error('Registration error response:', error);
      throw new Error(error.message || 'Registration failed');
    }
    
    const data = await res.json();
    console.log('Registration successful:', data);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = getAuthToken();
    if (token) {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }
};

export const getCurrentUserProfile = async () => {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      throw new Error('Failed to get user profile');
    }
    
    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

// Train API calls
export const fetchTrains = async () => {
  try {
    const res = await fetch(`${API_BASE}/trains`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Fetched trains:', data);
    return data;
  } catch (error) {
    console.error('Error fetching trains:', error);
    throw error;
  }
};

export const addTrain = async (train) => {
  try {
    const res = await fetch(`${API_BASE}/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(train),
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Added train:', data);
    return data;
  } catch (error) {
    console.error('Error adding train:', error);
    throw error;
  }
};

export const deleteTrain = async (trainId) => {
  try {
    const res = await fetch(`${API_BASE}/train/${trainId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Deleted train:', data);
    return data;
  } catch (error) {
    console.error('Error deleting train:', error);
    throw error;
  }
};

export const fetchDelayedTrains = async () => {
  try {
    const res = await fetch(`${API_BASE}/delayed`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Fetched delayed trains:', data);
    return data;
  } catch (error) {
    console.error('Error fetching delayed trains:', error);
    throw error;
  }
};

export const fetchPlatforms = async () => {
  try {
    const res = await fetch(`${API_BASE}/platforms`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Fetched platforms:', data);
    return data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
};

export const markTrainDelayed = async (trainId) => {
  try {
    const res = await fetch(`${API_BASE}/train/reschedule/${trainId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: 'Delayed' }),
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Marked train as delayed:', data);
    return data;
  } catch (error) {
    console.error('Error marking train as delayed:', error);
    throw error;
  }
};

