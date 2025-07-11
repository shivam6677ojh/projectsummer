import React, { useState } from 'react';

const TrainForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    id: '',
    arrival: '',
    departure: '',
    priority: 2,
    platform: 1,
    status: 'On Time',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="train-form" onSubmit={handleSubmit}>
      <input name="id" placeholder="Train ID" value={form.id} onChange={handleChange} required />
      <input name="arrival" placeholder="Arrival (HH:mm)" value={form.arrival} onChange={handleChange} required />
      <input name="departure" placeholder="Departure (HH:mm)" value={form.departure} onChange={handleChange} required />
      <select name="priority" value={form.priority} onChange={handleChange} required>
        <option value={1}>Rajdhani</option>
        <option value={2}>Express</option>
        <option value={3}>Local</option>
      </select>
      <input name="platform" type="number" placeholder="Platform" value={form.platform} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="On Time">On Time</option>
        <option value="Delayed">Delayed</option>
      </select>
      <button className="form-btn" type="submit">Add Train</button>
    </form>
  );
};

export default TrainForm; 