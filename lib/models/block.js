const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockSchema = new Schema({
    blockNumber: {
        type: Number,
        min: 0,
        max: 8,
        required: true
    },
    timeFrame: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Block', blockSchema); 