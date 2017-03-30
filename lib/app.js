require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')('dev');
const errorHandler = require('./error-handler')();
const auth = require('./routes/auth');
const ensureAuth = require('./auth/ensure-auth')();
const user = require('./routes/user');
const block = require('./routes/blocks');
const color = require('./routes/colors');
// const mood = require('./routes/mood');
const users = require('./routes/users');

app.use(morgan);

app.use(express.static('public'));

// app.use('/api/mood', mood);
app.use('/api/color', color);
app.use('/api/block', block);

app.use('/api/auth', auth);
app.use('/api/user', ensureAuth, user);

app.use('/api/users', users);



app.use(errorHandler);
module.exports = app;
