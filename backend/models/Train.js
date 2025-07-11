const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }, // Train name
  arrival: { type: String, required: true }, // Format: 'HH:mm'
  departure: { type: String, required: true }, // Format: 'HH:mm'
  priority: { type: Number, required: true }, // 1: Emergency, 2: Express, 3: Local
  platform: { type: Number, required: true },
  status: { type: String, enum: ['On Time', 'Delayed'], default: 'On Time' },
  username: { type: String, required: true } // User who created this train
});

// Compound index to ensure unique train ID per user
TrainSchema.index({ id: 1, username: 1 }, { unique: true });

module.exports = mongoose.model('Train', TrainSchema); 