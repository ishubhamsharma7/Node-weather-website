const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXNodWJoYW0iLCJhIjoiY2tidXJuczI2MDRuNTMwcW5zYnM0dGMzMCJ9.FEfe5yx7O2PEqngy-6xRDw'
    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect with the server', undefined)
        } else if (res.body.features.length === 0) {
            callback('Please try with another search term', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}



module.exports = geoCode