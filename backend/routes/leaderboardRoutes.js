const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

// Fetch Leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ score: -1 });
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
