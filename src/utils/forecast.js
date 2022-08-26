const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=59994406d488741067a4c4f8be240608&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect location services.", undefined);
        } else if (body.error) {
            callback(
                "Unable to find location . Try another search.",
                undefined
            );
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                    ". It is currently " +
                    body.current.temperature +
                    " degress out. " +
                    body.current.humidity +
                    "degree celcius humidity."
            );
        }
    });
};

module.exports = forecast;
