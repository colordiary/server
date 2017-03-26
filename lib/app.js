const app = require('express')();
const morgan = require('morgan')('dev');
const errorHandler = require('./error-handler')();
const auth = require('./routes/auth-route');
//const ensureAuth = require('./auth/ensure-auth');
const user = require('./routes/user-route');

app.use(morgan);


app.use('/api/auth', auth);
app.use('/api/user/', user);


app.use(errorHandler);
module.exports = app;
