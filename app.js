//initialize express
const express = require('express');
const app = express();
const request = require('request');
const path = require('path');

//initialize EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
// ----------- ROUTES ------------- //
// ROOT ROUTE
app.get('/', (req, res) => {
    res.render('search');
});

app.get('/weather', (req, res) => {
    let query = (req.query.search);
    request(`http://api.weatherapi.com/v1/current.json?key=7506c717755f4a7ab1502045201403&q=${query}`, (error, response, body) => {   
        let data = JSON.parse(body);
        console.log(data); 
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
        res.render('weather', {weather: weather});    
    });
});


//enable listening for server
app.listen(process.env.PORT, process.env.IP, (req, res) => {
    console.log('Server listening');
});
