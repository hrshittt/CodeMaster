const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile (protected route)
router.get('/profile', auth, async (req, res) => {
  try {
    res.json(req.user.toPublicJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile (protected route)
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['username', 'email'];
    const isValidOperation = Object.keys(updates).every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    Object.keys(updates).forEach(update => {
      req.user[update] = updates[update];
    });

    await req.user.save();
    res.json({
      message: 'Profile updated successfully',
      user: req.user.toPublicJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch User Progress (public route)
router.get('/:username/progress', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      username: user.username,
      score: user.score,
      solvedChallenges: user.solvedChallenges,
      progress: user.progress,
      achievements: user.achievements
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user statistics (protected route)
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = {
      totalScore: req.user.score,
      solvedChallenges: req.user.solvedChallenges,
      achievements: req.user.achievements.length,
      joinDate: req.user.createdAt,
      lastActive: req.user.lastActive
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
