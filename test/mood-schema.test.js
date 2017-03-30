const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assert = require('chai').assert;
const User = require('../lib/models/user');
const Mood = require('../lib/models/mood');
const Color = require('../lib/models/color');
const Block = require('../lib/models/block');


describe('saves new user, color, and block number so we can test and populate the mood schema', () => {
    
    it('fails if missing required field', (done) => {

        failMood = new Mood({
            date: new Date,
            comment: 'it was a rainy monday',
            weather: {description: 'partly cloudy'},
            zipcode: 97239        
        })
        //expecting test to fail w/o required fields
        //validate function throws error which means passing test
        failMood.validate(err => {
            if (err) done();
            else done('fail');
        })
    })

    it('tests the mood schema with each field populated', (done) => {
        //saving new color
        const colorOne = new Color({
            index: 0,
            path: '/assets/blue1.svg',
            hexColor: '#8181FC',
            mood: 'sad',
        })
        //saving new block
        const blockOne = new Block({
            blockNumber: 0,
            timeFrame: 'morning'
        })
        //populating the mood schema and testing
        correctMood = new Mood({
            userId: new mongoose.Types.ObjectId,
            date: new Date,
            color: new mongoose.Types.ObjectId,
            comment: 'it was a rainy monday',
            block: new mongoose.Types.ObjectId,
            weather: {description: 'partly cloudy'},
            zipcode: 97239        
        })
        assert.isDefined(correctMood.userId)
        assert.isDefined(correctMood.date)
        assert.isDefined(correctMood.color)
        assert.isDefined(correctMood.block)
        
        correctMood.validate(err => {
            if (!err) done();
            else done(err);
        });
    })
});
