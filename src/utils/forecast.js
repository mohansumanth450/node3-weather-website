//https://openweathermap.org/api
const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=fa34b6d0453aa0004dbd080fef793ff1';
    // request({ url: url, json: true }, (error, response, body) => {
    //     //console.log(error);
    //     console.log("Forecast "+response.statusCode);
    //     //console.log(body);
    //     callback(undefined,response.body);
    // });
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Time Zone'+ body.timezone + ' It is currently ' + body.current.temp + ' degress out. There is a ' + body.current.clouds + '% chance of rain.');
            //callback(undefined, body);
        }
    })
}

module.exports = forecast;

