const apiKey = process.env.WEATHER_API_KEY;
const requestProxy = require('request-promise');
//when it's done:
//save the weather data on req.weather
module.exports = function weatherApi(req, res, next) {
    requestProxy(`http://api.wunderground.com/api/${apiKey}/conditions/q/${req.body.zipcode}.json`)
        .then(
            result => {
                result = JSON.parse(result)
                req.body.weather = {
                    temp: result.current_observation.temperature_string,
                    description: result.current_observation.weather,
                    city: result.current_observation.display_location.city,
                    state: result.current_observation.display_location.state,
                    country: result.current_observation.display_location.country
                };
                console.log(req.body.weather);

                next();
            }
        )
        .catch(error => next(error));
};