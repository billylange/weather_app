const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=7a6661bb4d7ffc3c5dee203d709253a3&query=' + latitude + ',' + longitude +'&units=m'

  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      // console.log(response.body.current);
      callback(undefined, {
        description: body.current.weather_descriptions,
        temperature: {
          actual: body.current.temperature,
          feelslike: body.current.feelslike
        },
        wind: {
          speed: body.current.wind_speed,
          direction: {
             degree: body.current.wind_degree,
             compass: body.current.wind_dir
          }
        },
        precipetation: body.current.precip
      });
    }
  });
}

module.exports = forecast;
