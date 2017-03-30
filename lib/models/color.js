const mongoose = require('mongoose');
//const validator = require('node-mongoose-validator');
const Schema = mongoose.Schema;

var colorSchema = new Schema({
    color: {
        index: Number,
        path: String,
        hexColor: {
            type: String,
            required: true
            //validate: validator.$notEmpty({ msg: 'Please provide a name.' })
        },
        mood: {
            type: String,
            required: true,
            //validate: validator.$notEmpty({ msg: 'Please provide a mood' })
        }
    }
});

module.exports = mongoose.model('Color', colorSchema);