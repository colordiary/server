const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var colorSchema = new Schema({
    color: {
        index: Number,
        path: String,
        hexColor: {
            type: String,
            required: true
        },
        mood: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Color', colorSchema);