const express = require("express");
const path = require("path");
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast');

const app = express();
const port=process.env.Port || 5000;
// const port = 5000;

//Paths for express config
const publicDirectory = path.join(__dirname, "../public/");
const partialsPath=path.join(__dirname,'../views/partials');
const viewsPath=path.join(__dirname,'../views')

//Handle bars setting
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.set('views',viewsPath);
//Static directory set up
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
  res.render('index',{
    'title':'Weather',
    'name':'Yash TheRedDevil'
  });
});

app.get('/help', (req, res) => {
  res.render('help',{
    'title':'Help',
    'helpText':'This is Help page',
    'name':'Yash TheRedDevil'
  });
});

app.get('/about', (req, res) => {
  res.render('about',{
    'title':'About',
    'name':'Yash TheRedDevil'
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address)
  {
    return res.send({
      'error':'Address is not specified. Please provide an Address'
    })
  }

  geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
    if (error) {
      return res.send({
        'error':error
      });
    } 
    forecast({latitude,longitude,location}, (error, forecastdata) => {
      if (error) {
        return res.send({
          'error':error
        });
      }
      return res.send({
        'location':location,
      'forecast':forecastdata
      });
    });
  });    
});



app.get("*", (req, res) => {
  res.render('404',{
    'title':'404',
    'name':'Yash TheRedDevil',
    'errorMessage':'Page Not Found'    
  });
});

app.listen(port, () => {
  console.log("Server is running on port number " + port);
});
