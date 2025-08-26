const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  id: { 
    type: String, required: true 
  },
  name: { type: String, required: true }, 
  arrival: { type: String, required: true },
  departure: { type: String, required: true }, 
  priority: { type: Number, required: true }, 
  platform: { type: Number, required: true },
  status: { type: String, enum: ['On Time', 'Delayed'], default: 'On Time' },
  username: { type: String, required: true }
  },
  {timestamps: true}
);


TrainSchema.index({ id: 1, username: 1 }, { unique: true });

module.exports = mongoose.model('Train', TrainSchema); 