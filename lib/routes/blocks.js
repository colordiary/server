const router = require('express').Router();
const Block = require('../models/block');
const bodyParser = require('body-parser').json();

router
    .get('/', (req, res, next) => {
        console.log('this is block ', req.body);
        Block.find()
            .then(block => res.send(block))
            .catch(next);
    })    
    .post('/', bodyParser, (req, res, next) => {
        new Block(req.body).save()
            .then(block => {
                res.send(block);
            })
            .catch(next);
    });
module.exports = router;