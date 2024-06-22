
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const request = require('request')
const myModule = require('./utils/geocode')


//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')


//when we change views file templates then need give the directroy path because the views file is default
//$viewPath = path.join(__dirname,'../templates')

const partialsPath = path.join(__dirname, '../views/partials');

//setup handelbars engens and views location
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)
//when we rename views file to another name
//app.set('views',$viewPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wather App',
        name: 'Hariom'

    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Wather App',
        name: 'Hariom'

    })
})



//for wether
app.get(('/weather'), (req, res) => {

    const myAddress = req.query.address  //here get address from url

    if (!myAddress) {
        return res.send({
            message: 'Please Provide Address'
        })
    }

    //this functin use for jeolocation to find cordnate
    myModule.jeocode(myAddress, (error, data) => {

        if (error) {
            return res.send({ Error: error })
        }

        //this function is use for after get cordnate then get the forcast
        myModule.forecast(data.latitude, data.longitude, (error, forcastData) => {

            if (error) {
                return res.send({
                    Error: error
                })
            }


            res.send({
                location: data.location,
                forcast: forcastData
            })


        })

    })




})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ error: 'please Provide Address!' })
    }

    res.send({
        products: []
    })

})



// app.get(('/about'), (req, res) => {

//     res.send('This is about page')
// })



app.get('*', (req, res) => {

    res.render('404_page', {
        title: '404 Not Found'

    })
})

app.listen(30000)