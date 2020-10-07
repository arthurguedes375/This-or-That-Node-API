const mongoose = require('mongoose');

const Game = mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    secound: {
        type: String,
        required: true,
    },
    firstVotes: {
        type: Number,
        default: 0,
    },
    secoundVotes: {
        type: Number,
        default: 0,
    },
    firstPercentage: {
        type: Number,
        default: 0,
    },
    secoundPercentage: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Game', Game, 'Game');