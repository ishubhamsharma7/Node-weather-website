const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')

//this will allow to set mein the views path.
//earlier it was in src folder now it is out side 
// i can remove this when viewsPath and move views folder back to the src folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setting templating engine
app.set('view engine', 'hbs')
// setting view directory
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shubham Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shubham Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Post your comments for help',
        name: 'Shubham Sharma'
    })
})

// As we have given the static route it never run the below route.It will serve this static value untill
// and unless express found the exact match so below route is waste 

//// app.get('', (req, res) => {
////     res.send('<h1>weather</h1>');
//// })


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Shubham Sharma'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Error code: 400 Page not found',
        name: 'Shubham Sharma'
    })
})

app.listen(3000, () => {
    console.log('listening')
})