const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2Ftc2FtZXdhciIsImEiOiJja2c2YzVxdGMwNXlqMnVxaWp1ejVic29jIn0.ZJjXrdxShfNkhxODv-zQsw'

    request({ url, json: true }, (error, { body }) => {
        //console.log(body.features[0].center)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log("here")
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode