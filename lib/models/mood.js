const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moodSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    },
    comment: {
        type: String
    },
    block: {
        type: Schema.Types.ObjectId,
        ref: 'Block',
        required: true
    },
    weather: {
        type: Schema.Types.Mixed
    },
    zipcode: {
        type: Number
    }
});

module.exports = mongoose.model('Mood', moodSchema);