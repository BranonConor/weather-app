//initialize express
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

//initialize EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
// ----------- ROUTES ------------- //
// ROOT ROUTE
app.get('/', (req, res) => {
    res.render('search');
});

app.get('/weather', async (req, res) => {
    try {
        //make API calls
        let query = (req.query.search);
        let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=7506c717755f4a7ab1502045201403&q=${query}`)
            .then(res => res.json());
        //breakdown the values to be passed into templates
        const weather = {
            city: data.location.name,
            region: data.location.region,
            country: data.location.country,
            time: data.location.localtime,
            icon: data.current.condition.icon,
            weather: data.current.condition.text,
            temperature: data.current.temp_f,
            wind: data.current.wind_mph,
            direction: data.current.wind_dir,
            date: data.forecastDay,
        };
        //render the weather page with the data
        res.render('weather', {weather: weather});
    } catch (error) {
        console.log(error);
    }
});

//enable listening for server
app.listen(process.env.PORT || 4000, process.env.IP, (req, res) => {
    console.log('Server listening');
});
