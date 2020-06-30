const request = require('request')

const forecast = (latitude, longitute, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitute + '&appid=062877c925050d255b3667482d6fbdfb'
    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect with the server', undefined)
        } else if (res.body.error) {
            callback('Please try with another search term', undefined)
        } else {
            const weather = res.body.weather;
            let todaysWeather = '';
            weather.forEach((e) => {
                todaysWeather = e.description
            })
            callback(undefined, {
                temp: res.body.main.temp - 273.15 + " ℃",
                Max_Temp: res.body.main.temp_max - 273.15 + " ℃",
                todaysWeather: todaysWeather
            })

        }
    })
}



module.exports = forecast