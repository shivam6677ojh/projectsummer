const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');


router.get('/test', (req, res) => {
  res.json({ message: 'Feedback server is running!' });
});

router.post('/', async (req, res) => {
  try {
    console.log('Received feedback request:', req.body);
    const { username, rating, category, comment, timestamp } = req.body;
    
    const feedback = new Feedback({
      username,
      rating,
      category,
      comment,
      timestamp
    });

    await feedback.save();
    console.log('Feedback saved successfully');
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ timestamp: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

module.exports = router; 