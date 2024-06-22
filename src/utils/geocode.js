const request = require('request');
const convertUnixToAMPM = require('./convertUnixToAMPM');





const jeocode = (address, callback) => {

    const jeoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/'" + encodeURIComponent(address) + "'.json?access_token=pk.eyJ1IjoiaGFyaW9tMTIzNDUiLCJhIjoiY2x4aDhmamdjMWFlbDJtcHc3bnpkbzI1MiJ9.1Rlrsuwu0-cvLuuSCs0R2g";
    request({ url: jeoUrl, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect request service.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Not find the location,try another search', undefined)
        } else {

            const data = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)


        }



    })

}


const forecast = (latitude, longitude, callback) => {


    const forecastUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=94dc53ff97cf1cc38b5b89acf1942c83";



    request({ url: forecastUrl, json: true }, (error, response) => {




        if (error) {
            callback('Unable to connect request service.', undefined)
        } else if (response.body.message) {
            callback('Unable to find location', undefined)
        } else {

            const weatherData = response.body
            const currentTemp = weatherData.main.temp
            const currentTemprecherInDegreeCelcys = currentTemp - 273.15;
            const feelLike = weatherData.main.feels_like - 273.15;
            const minTemperature = weatherData.main.temp_min - 273.15;
            const maxTemperature = weatherData.main.temp_max - 273.15;
            const humidity = weatherData.main.humidity + '%'
            const pressure = weatherData.main.pressure + ' hPa'
            const cloudCover = weatherData.clouds.all + '%'
            const visibility = weatherData.visibility / 100
            const windSpeed = weatherData.wind.speed + 'm/s'
            const sunrise = weatherData.sys.sunrise
            const sunset = weatherData.sys.sunset


            const watherData = {
                currentTemprecher: Math.floor(currentTemprecherInDegreeCelcys) + '°C', //Math.floor(() use for after point value not show
                feelLike: Math.floor(feelLike) + '°C',
                minTemperature: Math.floor(minTemperature) + '°C',
                maxTemperature: Math.floor(maxTemperature) + '°C',
                humidity: humidity,
                pressure: pressure,
                cloudCover: cloudCover,
                visibility: visibility + 'km',
                windSpeed: windSpeed,
                sunrise: convertUnixToAMPM(sunrise),
                sunset: convertUnixToAMPM(sunset)


            };

            callback(undefined, watherData)


        }



    })
}






module.exports = {
    jeocode: jeocode,
    forecast: forecast
};