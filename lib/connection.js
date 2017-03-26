const mongoose = require('mongoose');
mongoose.Promise = Promise;


const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/colordiary';

mongoose.connect(dbUri);

// successful connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ', dbUri);
});

// connection throws error 
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection has error: ', err);
});

// disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection has disconnected');
});

// node process ends
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection was disconnected throught app termination');
        process.exit(0);
    });
});

module.exports = mongoose.connection;
