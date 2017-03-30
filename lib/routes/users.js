const router = require('express').Router();
const Mood = require('../models/mood');

router
    .get('/moods', (req, res, next) => {
        const date = req.query.date;
        const query = '';
        Mood.find()
            .then(moods => res.send(moods))
            .catch(next);
    })
    .get('/moods/zip/:zipcode', (req, res, next) => {
        const zipcode = req.params.zipcode;
        Mood.find()
            .where('zipcode', zipcode)
            .populate('block color')
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/weather/:description', (req, res, next) => {
        const description = req.params.description;
        console.log('description', description);
        Mood.find()
            .where('weather.description', description)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);
    })
    .get('/moods/city/:city', (req, res, next) => {
        const city = req.params.city;
        Mood.find()
            .where('weather.city', city)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/state/:state', (req, res, next) => {
        const state = req.params.state;
        Mood.find()
            .where('weather.state', state)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);               
    })
    .get('/moods/country/:country', (req, res, next) => {
        const country = req.params.country;
        Mood.find()
            .where('weather.country', country)
            .populate('block color')            
            .then(moods => res.send(moods))
            .catch(next);               
    });     

module.exports = router;
