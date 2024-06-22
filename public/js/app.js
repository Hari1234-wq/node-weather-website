

const watherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorDiv = document.getElementById('errorDiv');
const weatherDetailsDiv = document.getElementById('weatherDetails');


const address = document.getElementById('address');
const currentTemprecher = document.getElementById('currentTemprecher');
const feelLike = document.getElementById('feelLike');
const minTemperature = document.getElementById('minTemperature');
const maxTemperature = document.getElementById('maxTemperature');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const cloudCover = document.getElementById('cloudCover');
const visibility = document.getElementById('visibility');

const windSpeed = document.getElementById('windSpeed');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');


watherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //e for event e.preventDefault() method use for the page is not reload aftr submit button
    const location = search.value
    fetch('http://localhost:30000/weather?address=' + location + '').then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                // Show error message
                errorDiv.textContent = data.Error;
                errorDiv.style.display = 'block';
                weatherDetailsDiv.style.display = 'none';

            } else if (data.message) {

                errorDiv.textContent = data.message;
                errorDiv.style.display = 'block';
                weatherDetailsDiv.style.display = 'none';

            } else {


                address.textContent = data.location;
                currentTemprecher.textContent = data.forcast.currentTemprecher;
                minTemperature.textContent = data.forcast.minTemperature;
                feelLike.textContent = data.forcast.feelLike;
                maxTemperature.textContent = data.forcast.maxTemperature;
                humidity.textContent = data.forcast.humidity;
                pressure.textContent = data.forcast.pressure;
                cloudCover.textContent = data.forcast.cloudCover;
                visibility.textContent = data.forcast.visibility;
                windSpeed.textContent = data.forcast.windSpeed;
                sunrise.textContent = data.forcast.sunrise;
                sunset.textContent = data.forcast.sunset;


                errorDiv.style.display = 'none';
                weatherDetailsDiv.style.display = 'block';

            }

        })
    })
})