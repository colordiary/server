const router = require('express').Router();
const Mood = require('../models/mood');

router
    .get('/moods', (req, res, next) => {
        Mood.find()
            .populate('block color')
            .then(moods => res.send(moods))
            .catch(next);
    })
    .get('/moods/date', (req, res, next) => {
        const date = req.query.date;
        Mood.find()
            .where('date', date)
            .populate('block color')
            .then(moods => res.send(moods))
            .catch(next);
    })
    .get('/moods/zipcode', (req, res, next) => {
        const zipcode = req.query.zipcode;
        Mood.find()
            .where('zipcode', zipcode)
            .populate('block color')
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/description', (req, res, next) => {
        const description = req.query.description;
        console.log('description', description);
        Mood.find()
            .where('weather.description', description)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);
    })
    .get('/moods/city', (req, res, next) => {
        const city = req.query.city;
        Mood.find()
            .where('weather.city', city)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/state', (req, res, next) => {
        const state = req.query.state;
        Mood.find()
            .where('weather.state', state)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/country', (req, res, next) => {
        const country = req.query.country;
        Mood.find()
            .where('weather.country', country)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/types', (req, res, next) => {
        const type = req.query.type;
        Mood.distinct(type)
        .then(moods => res.send(moods))
        .catch(next);
    });

module.exports = router;
