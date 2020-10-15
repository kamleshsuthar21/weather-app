const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'kamlesh suthar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'kamlesh suthar Final year student of MNIT JAIPUR'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Uisng this app you can have some knowledge about weather condition with current data.',
        title: 'Help',
        name: 'kamlesh suthar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error,description,tempreture,precip,humidity,wind_dir,wind_spped) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                description:"Weather Type: "+description,
                tempreture: "Temperature: "+tempreture,
                precip:"Probability of Rain: "+precip,
                humidity:"Humidity: "+humidity,
                wind_dir:"Wind Direction: "+wind_dir,
                wind_spped:"Wind Speed: "+wind_spped,
                location:"Location: "+location,
                address: "Address: "+req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'kamlesh suthar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'kamlesh suthar',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})
