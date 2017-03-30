const router = require('express').Router();
const Color = require('../models/color');
const bodyParser = require('body-parser').json();

router
    .get('/', (req, res, next) => {
        Color.find()
            .then(color => res.send(color))
            .catch(next);
    })    
    .post('/', bodyParser, (req, res, next) => {
        new Color(req.body).save()
            .then(color => {
                res.send(color);
            })
            .catch(next);
    });
module.exports = router;