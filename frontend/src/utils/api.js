// Placeholder for API utility functions

const API_BASE = 'http://localhost:5000';

const getUsername = () => {
  const username = localStorage.getItem('currentUser');
  console.log('Current username:', username);
  return username;
};

export const fetchTrains = async () => {
  const username = getUsername();
  console.log('Fetching trains for user:', username);
  try {
    const res = await fetch(`${API_BASE}/trains?username=${username}`);
    if (!res.ok) {
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
  const username = getUsername();
  console.log('Adding train for user:', username, train);
  try {
    const res = await fetch(`${API_BASE}/add`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-username': username
      },
      body: JSON.stringify({ ...train, username }),
    });
    if (!res.ok) {
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
  const username = getUsername();
  console.log('Deleting train for user:', username, trainId);
  try {
    const res = await fetch(`${API_BASE}/train/${trainId}?username=${username}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
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
  const username = getUsername();
  console.log('Fetching delayed trains for user:', username);
  try {
    const res = await fetch(`${API_BASE}/delayed?username=${username}`);
    if (!res.ok) {
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
  const username = getUsername();
  console.log('Fetching platforms for user:', username);
  try {
    const res = await fetch(`${API_BASE}/platforms?username=${username}`);
    if (!res.ok) {
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

