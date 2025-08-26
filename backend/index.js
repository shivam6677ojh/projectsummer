const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

require('dotenv').config();

// Default environment variables if .env is not present
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/localtrain';
const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-make-it-long-and-random-123456789';

// Set JWT secret globally
process.env.JWT_SECRET = jwtSecret;

console.log('Connecting to MongoDB:', mongoURI);
console.log('JWT Secret configured:', jwtSecret ? 'Yes' : 'No');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.log('💡 Make sure MongoDB is running on your system');
    console.log('💡 Or update MONGODB_URI in your .env file');
  });

const trainRoutes = require('./routes/train');
const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);
app.use('/', trainRoutes);
app.use('/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Local Train Platform Management System API',
    status: 'running',
    endpoints: {
      auth: '/auth',
      trains: '/',
      feedback: '/feedback'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
}); 