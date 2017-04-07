const router = require('express').Router();
const Mood = require('../models/mood');

router
    // These should all be same .get route:
    .get('/moods', (req, res, next) => {
        const query = req.query;
        let find = query.type ? Mood.distinct(query.type) : Mood.find();
        find = find.populate('block color');
        if(query.date) find = find.where('date', query.date);
        if(query.zipcode) find = find.where('zipcode', query.zipcode);
        if(query.description) find = find.where('weather.description', query.description);
        if(query.city) find = find.where('weather.city', query.city);
        if(query.state) find = find.where('weather.state', query.state);
        if(query.country) find = find.where('weather.country', query.country);
        
        find
            .then(moods => res.send(moods))
            .catch(next);
    });

module.exports = router;
