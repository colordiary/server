const mongoose = require('mongoose');
const router = require('express').Router();
const Mood = require('../models/mood-schema');

router
    .get('/all', (req, res, next) => {
        Mood.find()
        .then(moods => res.send(moods))
        .catch(next);
    })
    .get('/:zipcode', (req, res, next) => {
        const zipcode = req.params.zipcode;
        Mood.find({zipcode: zipcode}, function (error, moods) {
            if (!zipcode) {
                res.status(404).send({ error: 'that zipcode not found' });
            } else {
                res.send(moods);
            }
        });

    });

module.exports = router;
