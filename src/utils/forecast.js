const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=25cba980ee62710c979287f8af3fdbc6&query='+longitude+","+latitude

    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to weather service!', undefined,undefined,undefined,undefined,undefined,undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined,undefined,undefined,undefined,undefined,undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0],body.current.temperature,body.current.precip,body.current.humidity,body.current.wind_dir,body.current.wind_speed)
        }
    })
}

module.exports = forecast