import React, { useState } from 'react';
import TrainForm from '../components/TrainForm';
import { addTrain } from '../utils/api';

const AddTrain = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddTrain = async (train) => {
    setMessage('');
    setError('');
    try {
      await addTrain(train);
      setMessage('Train added successfully!');
    } catch (err) {
      setError('Failed to add train');
    }
  };

  return (
    <div className="container">
      <h1>Add Train</h1>
      <TrainForm onSubmit={handleAddTrain} />
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddTrain; 