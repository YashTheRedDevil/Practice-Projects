const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if(process.argv.length!==3)
{
    return console.log('Please provide a location name.');
}

geoCode(process.argv[2], (error, {latitude,longitude,location}) => {
  if (error) {
    return console.log(error);
  } 
  forecast({latitude,longitude,location}, (error, forecastdata) => {
    if (error) {
      return console.log(error);
    }
    console.log(location);
    console.log(forecastdata);
  });  
});


//NOTES:
//Weather: Darksky.net
//Address: mapbox.com
