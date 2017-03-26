const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user-schema');
const ensureAuth = require('../auth/ensure-auth')();


router
    .get('/', (req, res, next) => {
        User.find()
            .then(users => res.send(users))
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
    });
module.exports = router;
