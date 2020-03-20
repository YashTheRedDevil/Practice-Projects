const request = require("request");

const forecast = ({latitude, longitude}, callback) => {
  const url =
    "https://api.darksky.net/forecast/4fce49e0b639794cf3751f24ed4409f2/" +
    latitude +
    "," +
    longitude +
    "?units=si";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Uanble to connect to Weather Service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, body.currently);
    }
  });
};

module.exports = forecast;
