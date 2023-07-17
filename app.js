// Open Weather Api Key : 9c908759a50fa46b8e056b84f9cb5807

const h1 = document.querySelector("#demo");
const feelsLike = document.querySelector("#feels_like");
const humidity = document.querySelector("#humidity");
const loader = document.querySelector("#loader")

// API Keys
let weather_api_key = "9c908759a50fa46b8e056b84f9cb5807";

// Loading Screen style:
loader.style.display = "none";

// DOM:
const user_input = document.querySelector(".city_input");
const run_btn = document.querySelector(".run_btn");
const weather_icon = document.querySelector("#weather_icon");
const city_input = document.querySelector("#city_input");
const weather_logo = document.querySelector("#weather_icon");
const user_location = document.querySelector("#location");

// Event Listener
run_btn.addEventListener("click", () => {
    customWeatherFetch();
})


// Constants to store values:
let weatherResponse;
let data;
let latitude;
let longitude;


// Starter Function: 
getLocation();

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
};

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    weatherFetch();
}

// API Calls and Async functions

async function weatherFetch() {
    loader.style.display = "block";
    weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather_api_key}`);
    loader.style.display = "none";
    data = await weatherResponse.json();
    h1.innerHTML = data.main.temp + " °C";
    feelsLike.innerHTML = "Feels Like: " +data.main.feels_like + " °C | ";
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
    weather_logo.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
}

async function customWeatherFetch() {
    if (city_input.value === "") {
        getLocation();
        user_location.innerHTML = `Current Location:`
        return;
    }
    loader.style.display = "block";
    weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_input.value}&units=metric&appid=${weather_api_key}`);
    loader.style.display = "none";
    data = await weatherResponse.json();
    user_location.innerHTML = `Location: ${city_input.value}`;
    h1.innerHTML = data.main.temp + " °C";
    feelsLike.innerHTML = "Feels Like: " +data.main.feels_like + " °C | ";
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
    weather_logo.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
}
