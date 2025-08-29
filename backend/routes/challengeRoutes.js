const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// Fetch All Challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit Solution (Placeholder)
router.post('/:id/submit', (req, res) => {
    res.json({ message: 'Solution submitted (logic to be implemented)' });
});

module.exports = router;
