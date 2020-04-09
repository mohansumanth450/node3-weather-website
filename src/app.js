const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
//console.log(path.join(__dirname,"../public"));

const app = express();
const port = process.env.PORT || 3000;

// define paths for express views
const publicDir = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

// Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // mentioning hbs files path to express server
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDir)); // mentioning public files path to express server

// below default doesn't work if we set static(html)
app.get('',(req,res)=>{
     res.render("index",{title:"Weather App", name: "Mohan Sumanth"});
});

// Error: Failed to lookup view "help" in views directory "G:\sumanthreact\web-server\views"
//     at Function.render (G:\sumanthreact\web-server\node_modules\express\lib\application.js:580:17

app.get('/help',(req,res)=>{
    //res.send("Hello Help!");
    //res.send([{name:"Mohan Sumanth",age: 30},{name:"Mohan Sumanth",age: 30}]);
    res.render("help",{title:"Help Weather App", name: "Mohan Sumanth"});
});
app.get('/about',(req,res)=>{
    //res.send("Hello About!");
    res.render("about",{title:"About Weather App", name: "Mohan Sumanth"});
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error: "We cannot provide weather details without address"});
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({error: "Failed to find location details or location not configured"});
        console.log("Address Query URL Param "+req.query.address);
        forecast(latitude,longitude,(error, body) => {
            res.send({weatherDetails:[{longitude:longitude,latitude:latitude}],location: location, body:body});
        })
    });
    
});

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({error: "You must provide a search term"});
    }

    console.log("Search Query URL Param"+req.query.search);
    res.send({products:[]});
});

app.get('/help/*',(req,res)=>{
    //res.send("Fuck Yourself you motherfuker!");
    res.render("helparticlenotfound");
});

app.get('*',(req,res)=>{
    //res.send("Fuck Off!");
    res.render("404");
});

app.listen(port, () => {
    console.log('Server is up on port 3000 '+port);
});