const express = require('express');
const router = express.Router();
const Train = require('../models/Train.js');
const auth = require('../middleware/auth');
const { assignPlatform } = require('../utils/scheduler.js');

router.post('/add', auth, async (req, res) => {
  try {
    const newTrain = req.body;
    const username = req.user.username;
    
    if (!newTrain.name || typeof newTrain.name !== 'string' || !newTrain.name.trim()) {
      return res.status(400).json({ error: 'Train name is required' });
    }

    const { platform, delayed, inconvenienceMsg } = await assignPlatform(Train, newTrain, username);
    if (!platform) {
      return res.status(409).json({ error: inconvenienceMsg || 'No platform available for this time slot.' });
    }

    newTrain.platform = platform;
    newTrain.status = 'On Time';
    newTrain.username = username;

    if (delayed) {
      await Train.findOneAndUpdate({ id: delayed.id, username }, { status: 'Delayed' });
    }

    const train = new Train(newTrain);
    await train.save();

    if (inconvenienceMsg) {
      return res.status(201).json({ ...train.toObject(), inconvenienceMsg });
    }
    res.status(201).json(train);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/trains', auth, async (req, res) => {
  try {
    const username = req.user.username;
    console.log(`Fetching trains for user: ${username}`);
    const trains = await Train.find({ username });
    console.log(`Found ${trains.length} trains for user ${username}:`, trains);
    res.json(trains);
  } catch (err) {
    console.error('Error in GET /trains:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/train/:id', auth, async (req, res) => {
  try {
    const username = req.user.username;
    const result = await Train.deleteOne({ id: req.params.id, username });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/delayed', auth, async (req, res) => {
  try {
    const username = req.user.username;
    const delayed = await Train.find({ status: 'Delayed', username });
    res.json(delayed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/train/reschedule/:id', auth, async (req, res) => {
  try {
    const username = req.user.username;
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

router.get('/platforms', auth, async (req, res) => {
  try {
    const username = req.user.username;
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