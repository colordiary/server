const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const app = require('../lib/app');
const request = chai.request(app);
const token = require('../lib/auth/token');
const User = require('../lib/models/user');
const Mood = require('../lib/models/mood');
const Color = require('../lib/models/color');
const Block = require('../lib/models/block');
const weatherApi = require('../lib/routes/weather-api');
const apiKey = process.env.WEATHER_API_KEY;
const requestProxy = require('request-promise');

const newEntry = new Mood({
    userId: new mongoose.Types.ObjectId,
    date: new Date,
    color: new mongoose.Types.ObjectId,
    comment: 'it was a rainy monday',
    block: new mongoose.Types.ObjectId,
    weather: {},
    zipcode: 97239
})

describe('outside api for weather', () => {

    it('fuck', (res, req, next) => {
        requestProxy(`http://api.wunderground.com/api/${apiKey}/conditions/q/${newEntry.zipcode}.json`)
            .then(
                result => {
                    result = JSON.parse(result)
                    newEntry.weather = {
                        temp: result.current_observation.temperature_string,
                        feelsLike: result.current_observation.feelslike_string,
                        description: result.current_observation.weather,
                        location: result.current_observation.observation_location.full,
                        country: result.current_observation.observation_location.country
                    }
                }
            )
            .then(res => {
                res = newEntry;
                console.log(res)
            })
        })
    })

