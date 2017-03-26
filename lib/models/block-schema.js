const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockSchema = new Schema({
    blockNumber: {
        type: Number,
        required: true
    },
    timeFrame: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Block', blockSchema); 