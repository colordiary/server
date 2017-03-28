const mongoose = require('mongoose');
const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user-schema');
const Mood = require('../models/mood-schema');
const ensureAuth = require('../auth/ensure-auth')();
const weatherApi = require('./weather-api');

router
    .get('/', ensureAuth, (req, res, next) => {
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
    })
    .get('/:id', ensureAuth, (req, res, next) => {
        const id = req.params.id;
        User.findById(id)
            .then(user => {
                if (!user) {
                    res.status(404).send({ error: 'that user not found' });
                } else {
                    res.send(user);
                }
            })
            .catch(next);
    })
    .post('/add', ensureAuth, bodyParser, weatherApi, (req, res, next) => {
        console.log('weather', req.body.weather);
        let newEntry = {
            userId: mongoose.Types.ObjectId(req.user.id),
            date: req.body.date,
            color: mongoose.Types.ObjectId(req.body.color),
            comment: req.body.comment,
            block: mongoose.Types.ObjectId(req.body.block),
            weather: req.body.weather,
            zipcode: req.body.zipcode  
        };
        let mood = new Mood(newEntry);
        res.send(mood);
    });
module.exports = router;
