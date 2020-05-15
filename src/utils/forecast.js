const request = require('request')
const forecast = (latitude, longitude, callback) => {
const url = "http://api.weatherstack.com/forecast?access_key=6bcf341e3ad2e50cbc296fc0dc09d2a9&query=" + latitude + ',' + longitude

request({ url: url, json: true }, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
    }
    })
}

module.exports = forecast