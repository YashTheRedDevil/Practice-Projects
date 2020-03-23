const express = require("express");
const path = require("path");
const hbs=require('hbs');
const app = express();
const port = 3000;

//Paths for express config
const publicDirectory = path.join(__dirname, "../public/");
const partialsPath=path.join(__dirname,'../views/partials');

//Handle bars setting
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Static directory set up
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
  res.render('index',{
    'title':'Weather App',
    'name':'Yash TheRedDevil'
  });
});



app.get('/help', (req, res) => {
  res.render('help',{
    'helpText':'This is Help page',
    'name':'Yash TheRedDevil'
  });
});

app.get('/about', (req, res) => {
  res.render('about',{
    'title':'Weather App: About',
    'name':'Yash TheRedDevil'
  });
});

app.get("/weather", (req, res) => {
  res.send({
    'Name':'Yash',
    'Team':'RedDevil'
  });
});

app.get("*", (req, res) => {
  res.render('404',{
    'errorMessage':'Page Not Found'
  });
});

app.listen(port, () => {
  console.log("Server is running on port number " + port);
});
