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
    })
    .get('/moods', (req, res, next) => {
        const nId = (req.user.id);
        const query = { userId: nId };
        const date = req.query.date;
        if (date) query.date = date;
        Mood.find(query)
            .populate('color block')
            .then(moods => res.send(moods))
            .catch(next);
    })
    .get('/moods/month', (req, res, next) => {
        const nId = (req.user.id);
        const findDate = new Date(req.query.month);

        let startDate = new Date(findDate.getFullYear(), findDate.getMonth(), 1);
        let endDate = new Date(findDate.getFullYear(), findDate.getMonth() + 1, 0);
        const query = { userId: nId, date: { $gte: startDate, $lte: endDate } };

        Mood.find(query)
            .populate('color block')
            .then(moods => res.send(moods))
            .catch(next);
    })
    .post('/moods/add', ensureAuth, bodyParser, weatherApi, (req, res, next) => {
        let newEntry = {
            userId: req.user.id,
            date: req.body.date,
            color: req.body.colorId,
            comment: req.body.comment,
            block: req.body.blockId,
            weather: req.body.weather,
            zipcode: req.body.zipcode
        };

        let mood = new Mood(newEntry);
        mood.save();
        res.status(201).send(mood);
    });

module.exports = router;
