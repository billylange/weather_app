const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve html
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index',{
    tab: 'Weather: Start', 
    title: 'Welcome', 
    name: 'Billy Lange'
  });
})

app.get('/about', (req, res) => {
  res.render('about',{
    tab: 'Weather: About', 
    title: 'About this site', 
    name: 'Billy Lange'});
})

app.get('/help', (req, res) => {
  res.render('help',{
    tab: 'Weather: Help', 
    title: 'Help', 
    message: 'This is a help page to assist you with your site.', 
    name: 'Billy Lange'});
})

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'Your must provide a location'
    })
  }

  // Get location coordinates and info
  geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error: error
        });
      }

      // Return forcast and location info
      res.send({
        location: location,
        forecastData
      });
    })
  }) 
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    tab: 'Weather: Help', 
    title: 'Help', 
    errorMessage: 'Error 404: Help page not found!', 
    name: 'Billy Lange'});
})

app.get('*', (req, res) => {
  res.render('404',{
    tab: 'Weather: Help', 
    title: 'Help', 
    errorMessage: 'Error 404: Page not found!', 
    name: 'Billy Lange'});
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})
