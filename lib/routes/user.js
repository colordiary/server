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
    // you should combine modified queries as same get route:
    .get('/moods', (req, res, next) => {
        const query = { userId: req.user.id };
        const date = req.query.date;
        if (date) query.date = date;
        else {
            const month = req.query.month;
            if (month) {
                const findDate = new Date(month);
                const year = findDate.getFullYear();
                const month = findDate.getMonth();
                query.date = { 
                    $gte: new Date(year, month, 1), 
                    $lte: new Date(year, month + 1, 0) 
                };
            }
        }

        Mood.find(query)
            .populate('color block')
            .lean()
            .then(moods => res.send(moods))
            .catch(next);
    })
    // This should have been query param on above route, not a separate route
    .get('/moods/month', (req, res, next) => {
        const nId = (req.user.id);
        const findDate = new Date(req.query.month);

        // good work here!
        // except:
        // 1) don't repeat yourself:
        const year = findDate.getFullYear();
        const month = findDate.getMonth();
        // 2) don't use let when it's a const
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        const query = { userId: nId, date: { $gte: startDate, $lte: endDate } };

        Mood.find(query)
            .populate('color block')
            .lean()
            .then(moods => res.send(moods))
            .catch(next);
    })
    // a post to a resource is an add, DON'T put that fact in the route name
    .post('/moods', ensureAuth, bodyParser, weatherApi, (req, res, next) => {
        // mongoose will already prevent undefined fields from being saved.
        // so just pass the body to the model after adding the user id
        const mood = req.body;
        mood.userId = req.userId;

        // mood.save() is async, wait till it's done to respond:
        new Mood(mood)
            .save()
            .then(mood => {
                res.status(201).send(mood);
            })
            .catch(next);
    });

module.exports = router;
