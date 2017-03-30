const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const app = require('../lib/app');
const token = require('../lib/auth/token');
const User = require('../lib/models/user');
const Mood = require('../lib/models/mood');
const Color = require('../lib/models/color');
const Block = require('../lib/models/block');
const Token = require('../lib/auth/token');

process.env.DB_URL = 'mongodb://localhost:27017/colordiary-test';
require('../lib/connection');


describe('posts a new entry with weather added to it', () => {
    
    let token = '';
    
    const request = chai.request(app);

    before(() => mongoose.connection.dropDatabase());

    const test = new User({ 
        username: 'colordiary',
        email: 'not correct email format',
        password: 'password',
    }).save();
    
    const newEntry = new Mood({
        userId: test._id,
        date: new Date,
        color: new mongoose.Types.ObjectId,
        comment: 'it was a rainy monday',
        block: new mongoose.Types.ObjectId,
        weather: {},
        zipcode: 97239
    })

    before(() => {
        return User.findById( test._id )
            .then(user => {
                return Token.sign(user);
            })
            .then(data => {
                console.log(data)
                return token = data;

            });
    });

    it('', () => {
       return request('/api/user/add')
        .set('Authorization', process.env.TOKEN)
        .send(newEntry)
        .then(res => {
            res = res.body;
            console.log(res.body)
        })
        .then(res => {
            res.body = newEntry;
        })
    })
})


