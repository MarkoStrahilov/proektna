const form = document.querySelector('form');
const input = document.querySelector('input');
const btn = document.querySelector('#search-btn')
const body = document.querySelector('body');
const container = document.querySelector('.container');
const weatherInLocation = document.querySelector('.weatherinLocation')
const temperatureInLocation = document.querySelector('.temperatureinLocation');
const windSpeedInLocation = document.querySelector('.windSpeedInLocation');
const humidityInLocation = document.querySelector('.humidityInLocation')
const theWeatherInLocation = document.querySelector('.theWeatherInLocation')
const weatherImgInLocation = document.querySelector('.weatherImgInLocation')
const temperatureInLocationItalicText = document.querySelector('.temperatureInLocation span')

form.addEventListener('submit', async function(e) {
    try {
        e.preventDefault()
        const inputValue = form.elements.searchLocation.value;
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=712a3f2932621a75cf87e4e875febe7f`)
            // select elements
        const locationName = res.data.name;
        cityName(locationName)
        const cityTemperature = res.data.main.temp;
        temperature(cityTemperature)
        const myWeather = res.data.weather[0].icon
        createNewImg(myWeather)
        const weatherInCity = res.data.weather[0].description
        cityWeather(weatherInCity)
        const cityWindSpeed = res.data.wind.speed;
        const cityWindSpeedDeg = res.data.wind.deg
        windSpeed(cityWindSpeed, cityWindSpeedDeg)
        const cityHumidity = res.data.main.humidity
        humidity(cityHumidity)

        // display map
        const longitude = res.data.coord.lon;
        const latitude = res.data.coord.lat;

        mapboxgl.accessToken = 'pk.eyJ1IjoibXN0cmFoaWxvdjEyMyIsImEiOiJja3prNDlrNGswY3U5Mm9uejEya3ZuaXY5In0.ZrwGtirDiU47Vgea0ZgpaQ';

        // Graphics Library. Mapbox GL allows you to use custom styles designed in Mapbox Studio

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 8
        });

        //map markers

        new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map);

    } catch (err) {
        alert("Sorry Can't Find That Location")
        console.log(err)
    }
})



const createNewImg = function(mySrc) {
    weatherImgInLocation.src = `https://openweathermap.org/img/w/${mySrc}.png`
    weatherImgInLocation.classList.add('imgStyle')
}


function cityName(city) {
    weatherInLocation.textContent = `The Weather In ${city}`;
    weatherInLocation.classList.add('cityName')
}

function temperature(temp) {
    temperatureInLocation.innerHTML = `<span>°F</span> ${temp}`
    temperatureInLocation.classList.add('temp')
}

function humidity(procent) {
    humidityInLocation.textContent = `Humidity ${procent}`
    humidityInLocation.classList.add('humidity')
}

function windSpeed(speed, deg) {
    windSpeedInLocation.textContent = `Wind Speed ${speed}  ${deg}°`;
    windSpeedInLocation.classList.add('speed')
}

function cityWeather(weather) {
    theWeatherInLocation.textContent = `Current Weather is  ${weather}`
    theWeatherInLocation.classList.add('weather')
}

const mapBtn = document.querySelector('.btn-map')

input.addEventListener('keyup', () => {
    document.querySelector('.btn-map').disabled = false;
})

let showMap = true

mapBtn.addEventListener('click', () => {

    if (showMap === true) {

        document.querySelector('#map').style.display = 'initial';
        mapBtn.classList.add('map-btn-style');
        mapBtn.textContent = 'Collapse';


        showMap = false

    } else {

        document.querySelector('#map').style.display = 'none';
        mapBtn.classList.remove('map-btn-style');
        mapBtn.textContent = 'Show Map';

        showMap = true
    }

})