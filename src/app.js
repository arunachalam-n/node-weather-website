const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express();

//Define Paths

const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// HandleBars

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Arunachalam N'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{title: 'About', name: 'Arunachalam N'})
})

app.get('/help', (req, res) => {
    res.render('help',{title: 'Help', name: 'Arunachalam N'})
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a address term"
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
    
        if (error) {
            return res.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
                
            if (error) {
                return res.send({error});
            }
        
            res.send({
                ForecastData: forecastData,
                Location: location,
                address: req.query.address,
            })
        });
        
    });
});

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Arunachalam N',
        err: 'Help not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Arunachalam N',
        err: 'Page not Found'
    })
})

app.listen(3000, () => console.log("Running on 3000"))