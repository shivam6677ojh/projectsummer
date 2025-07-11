const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const { assignPlatform } = require('../utils/scheduler');

// POST /train/add - Add a train with advanced scheduling
router.post('/add', async (req, res) => {
  try {
    const newTrain = req.body;
    const username = req.body.username || req.headers['x-username'];
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    if (!newTrain.name || typeof newTrain.name !== 'string' || !newTrain.name.trim()) {
      return res.status(400).json({ error: 'Train name is required' });
    }

    // Try to assign a platform
    const { platform, delayed } = await assignPlatform(Train, newTrain, username);
    if (!platform) {
      return res.status(409).json({ error: 'No platform available for this time slot.' });
    }
    
    newTrain.platform = platform;
    newTrain.status = 'On Time';
    newTrain.username = username;
    
    // If a lower-priority train is delayed, update its status
    if (delayed) {
      await Train.findOneAndUpdate({ id: delayed.id, username }, { status: 'Delayed' });
    }
    
    const train = new Train(newTrain);
    await train.save();
    res.status(201).json(train);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /trains - Get all scheduled trains for the user
router.get('/trains', async (req, res) => {
  try {
    const username = req.query.username || req.headers['x-username'];
    
    console.log('GET /trains - Request received');
    console.log('Query params:', req.query);
    console.log('Headers:', req.headers);
    console.log('Username from query:', req.query.username);
    console.log('Username from headers:', req.headers['x-username']);
    console.log('Final username:', username);
    
    if (!username) {
      console.log('No username provided, returning error');
      return res.status(400).json({ error: 'Username is required' });
    }
    
    console.log(`Fetching trains for user: ${username}`);
    const trains = await Train.find({ username });
    console.log(`Found ${trains.length} trains for user ${username}:`, trains);
    res.json(trains);
  } catch (err) {
    console.error('Error in GET /trains:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /train/:id - Cancel a train
router.delete('/train/:id', async (req, res) => {
  try {
    const username = req.query.username || req.headers['x-username'];
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    const result = await Train.deleteOne({ id: req.params.id, username });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /delayed - List delayed trains for the user
router.get('/delayed', async (req, res) => {
  try {
    const username = req.query.username || req.headers['x-username'];
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    const delayed = await Train.find({ status: 'Delayed', username });
    res.json(delayed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /train/reschedule/:id - Reschedule a train
router.put('/train/reschedule/:id', async (req, res) => {
  try {
    const username = req.body.username || req.headers['x-username'];
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    const updated = await Train.findOneAndUpdate(
      { id: req.params.id, username },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /platforms - Platform-wise schedule for the user
router.get('/platforms', async (req, res) => {
  try {
    const username = req.query.username || req.headers['x-username'];
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    const trains = await Train.find({ username });
    const platforms = {};
    trains.forEach(train => {
      if (!platforms[train.platform]) platforms[train.platform] = [];
      platforms[train.platform].push(train);
    });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 