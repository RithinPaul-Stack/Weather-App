const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views' , viewsPath)
app.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

app.get('', (req,res)=>
{
    res.render('index',{
        title:'Weather? Just wait lad..',
        name:'Rithins report'
    })
})


app.get('/help', (req,res)=>
{
    res.render('help',{
        title:'Seek Help?',
        name:'WeatherAnyTime cares for you anytime, write to us on'
    })
})

app.get('/about', (req,res)=>
{
    res.render('about',{
    
        name:'This site wad created by Rithin Paul Reddy K. It uses data from mapbox and weather stack!'
    })
})

// app.get('*' , (req,res)=>
// {
//     res.render('404',{
//         errorMsg:'Page not found'
//     })
// })

app.get('*/testWeather' , (req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error: ' You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*/', (req,res)=>
{
    res.render('404',{
        errorMsg:'Help article not found'
    })
})


app.listen(port, ()=>
{
    console.log('server is up and running on'+ port);
})