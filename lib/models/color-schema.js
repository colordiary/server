const mongoose = require('mongoose'),
    validators = require('mongoose-validators');
const Schema = mongoose.Schema;

var colorSchema = new Schema({
    color: {
        index: Number,
        path: String,
        hexColor: {
            type: String,
            validate: validators.isHexColor()
        },
        mood: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Color', colorSchema);