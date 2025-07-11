const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT || 5000;
const db = process.env.MONGODB_URI;

// Replace with your actual MongoDB connection string
// const mongoURI = 'mongodb+srv://shivam:1234@cluster0.0dnrgyi.mongodb.net/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const trainRoutes = require('./routes/train');
const feedbackRoutes = require('./routes/feedback');

app.use('/', trainRoutes);
app.use('/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Local Train Platform Management System API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 