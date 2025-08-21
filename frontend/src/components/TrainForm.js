import React, { useState } from 'react';

const TrainForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    arrival: '',
    departure: '',
    priority: 2,
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
      <input name="name" placeholder="Train Name" value={form.name} onChange={handleChange} required />
      <input name="arrival" placeholder="Arrival (HH:mm)" value={form.arrival} onChange={handleChange} required />
      <input name="departure" placeholder="Departure (HH:mm)" value={form.departure} onChange={handleChange} required />
      <select name="priority" value={form.priority} onChange={handleChange} required>
        <option value={1}>Rajdhani Express</option>
        <option value={2}>Shatabdi Express</option>
        <option value={3}>Duronto Express</option>
        <option value={4}>Vande Bharat Express</option>
        <option value={5}>Garib Rath</option>
        <option value={6}>Superfast Express</option>
        <option value={7}>Mail/Express</option>
        <option value={8}>Passenger Train</option>
        <option value={9}>Suburban Local</option>
        <option value={10}>Goods Train</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="On Time">On Time</option>
        {/* <option value="Delayed">Delayed</option> */}
      </select>
      <button className="form-btn" type="submit">Add Train</button>
    </form>
  );
};

export default TrainForm; 