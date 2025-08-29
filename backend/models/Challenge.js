const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    testCases: [{
        input: { type: String, required: true },
        output: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
