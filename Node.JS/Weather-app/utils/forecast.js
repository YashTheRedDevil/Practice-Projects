const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const urlWeather =
    "https://api.darksky.net/forecast/4fce49e0b639794cf3751f24ed4409f2/" +
    latitude +
    "," +
    longitude +
    "?units=si";
  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      callback("Uanble to connect to Weather Service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, response.body.currently);
    }
  });
};

module.exports = forecast;
