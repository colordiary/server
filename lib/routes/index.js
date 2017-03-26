// practice from treehouse
// this could become auth-route
const express = require('express');
const router = express.Router();
const User = require('../models/user-schema');

// GET /register

// GET / for landing page
router.get('/', (req, res, next) => {
    //return res.render('index', { title: 'Home'});
    return res.send('okay');
});

router.get('/signup', function (req, res, next) {
    return res.send('User creater: ');
});