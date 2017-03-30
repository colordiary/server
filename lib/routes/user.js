const mongoose = require('mongoose');
const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const Mood = require('../models/mood');
const ensureAuth = require('../auth/ensure-auth')();
const weatherApi = require('./weather-api');

router
    .get('/', (req, res, next) => {
        const id = req.user.id;
        User.findById(id, '_id, username')
            .then(user => {
                if (!user) {
                    res.status(404).send({ error: 'that user not found' });
                } else {
                    res.send(user);
                }
            })
            .catch(next);
        //returns user obj with username, id, and email
    })
    .get('/moods', (req, res, next) => {

        const nId = (req.user.id);
        const query = { userId: nId };
        const date = req.query.date;
        console.log('DATE', date);
        if (date) query.date = date;
        Mood.find(query)
            .populate('color block')
            .then(moods => res.send(moods))
            .catch(next);
        //returns an array of all moods per user (not sorted)
    })
    //.get('/mood/week')
    //get by week (return an array of all moods for one week, moods to be sorted by day)
    //figure out how to group moods per day to send back to front-end
    //weekArray = [[sunday moods (9)],[monday moods (9)],[],[],[],[], []]

    //.get('/mood/month')
    //get by month (return an array of all moods one month)
    //use week as a test to see how data best comes back
    .post('/moods/add', ensureAuth, bodyParser, weatherApi, (req, res, next) => {
        let newEntry = {
            userId: req.user.id,
            date: req.body.date,
            color: req.body.color,
            comment: req.body.comment,
            block: req.body.block,
            weather: req.body.weather,
            zipcode: req.body.zipcode
        };

        let mood = new Mood(newEntry);
        mood.save();
        res.send(mood);        
 
        //posts a new mood that is associated with an existing user, date, location, 
    });
    
module.exports = router;
