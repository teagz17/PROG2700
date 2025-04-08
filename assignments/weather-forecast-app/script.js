// non-element variables
const apiKey1 = 'e9396bc5ac67b71fba6251456aa03851'; // api key for current weather
const apiKey2 = '82005d27a116c2880c8f0fcb866998a0'; // api key for forecast

// date
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let month = months[d.getMonth()];
let date = d.getDate();
let year = d.getFullYear();
let hour = d.getHours();
let minute = d.getMinutes();

let today = days[d.getDay()];
let dayTwo = days[d.getDay() + 1];
let dayThree = days[d.getDay() + 2];
let dayFour = days[d.getDay() + 3];
let dayFive = days[d.getDay() + 4];


// Prompt div
const promptText = document.getElementById('promptText');
const cityInput = document.getElementById('cityInput'); // input field for city name
const searchBtn = document.getElementById('searchBtn'); // search button

// Result
const result = document.getElementById('result'); // main container

// Result Header
const mainHead = document.getElementById('mainHead'); // header container
const cityDate = document.getElementById('cityDate'); // city, country, date, and time
const scaleSelect = document.getElementById('scaleSelect'); // container for °C and °F buttons
const celsiusBtn = document.getElementById('celsiusBtn');
const farenheitBtn = document.getElementById('farenheitBtn');

// Current data
const current = document.getElementById('current'); // container for current data
const iconDesc = document.getElementById('iconDesc'); //container for weather icon and description
const info = document.getElementById('info'); // container for current temp, high, and low
const temp = document.getElementById('temp'); // current temperature value
const range = document.getElementById('range'); // current temp range for the day
const windHumid = document.getElementById('windHumid'); // current wind and humidity data

// 5 day forecast
const fiveDay = document.getElementById('fiveDay'); // container for 5-day forecast
const fiveHead = document.getElementById('fiveHead'); // container for forecast subheader
const forecast = document.getElementById('forecast'); //container for forecast objects
const day1 = document.getElementById('day1'); // current day forecast object
const day2 = document.getElementById('day2'); // 2nd day in FC
const day3 = document.getElementById('day3'); // 3rd day in FC
const day4 = document.getElementById('day4');
const day5 = document.getElementById('day5');


// search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    };
    if (celsiusBtn.style.display === 'none') {
        celsiusBtn.style.display = 'inline';
    };
    if (farenheitBtn.style.display === 'none') {
        farenheitBtn.style.display = 'inline'
    }
});

celsiusBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchMet(city);
        fetchMetFC(city);
    }
});
celsiusBtn.style.display = 'none'

farenheitBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchImp(city);
        fetchImpFC(city);
    };
});
farenheitBtn.style.display = 'none'

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching data';
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}&units=metric`);
        const data = await response.json();
        displayForecast(data);
        console.log(`5-day forecast for ${data.city.name}:`);
        data.list.forEach(entry => {
            console.log(`${entry.dt_txt}: ${entry.main.temp}°C`);
        });
    } catch (error) {
        console.error('Error fetching forecast:', error);
        forecastInfo.innerHTML = 'Error fetching data';
    }
}

// celsius and farenheit buttons



async function fetchMet(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching data';
    }
}

async function fetchMetFC(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}&units=metric`);
        const data = await response.json();
        displayForecast(data);
        console.log(`5-day forecast for ${data.city.name}:`);
        data.list.forEach(entry => {
            console.log(`${entry.dt_txt}: ${entry.main.temp}°C`);
        });
    } catch (error) {
        console.error('Error fetching forecast:', error);
        forecastInfo.innerHTML = 'Error fetching data';
    }
}

async function fetchImp(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}&units=imperial`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching data';
    }
}

async function fetchImpFC(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}&units=imperial`);
        const data = await response.json();
        displayForecast(data);
        console.log(`5-day forecast for ${data.city.name}:`);
        data.list.forEach(entry => {
            console.log(`${entry.dt_txt}: ${entry.main.temp}°F`);
        });
    } catch (error) {
        console.error('Error fetching forecast:', error);
        forecastInfo.innerHTML = 'Error fetching data';
    }
}

// functions to display data
function displayWeather(data) {
    if (data.cod === '404') {
        weatherInfo.innerHTML = 'City not found';
        return;
    }
    cityDate.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <h4>${month} ${date}, ${year}, last updated at ${hour}:${minute}</h4>
    `;
    iconDesc.innerHTML = `
    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;http://openweathermap.org/img/w/${data.weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
    <p>${data.weather[0].main}</p>
    `;
    temp.innerHTML = `
    <h1>${data.main.temp}°</h1>
    `;
    range.innerHTML = `
    <p>H:${data.main.temp_max} L:${data.main.temp_min}</p>
    `;
    windHumid.innerHTML = `
    <h4>Wind:</h4>
    <h4>${data.wind.speed}</h4>
    <h4>Humidity:</h4>
    <h4>${data.main.humidity}</h4>
    `;
}

function displayForecast(data) {
    if (data.cod === '404') {
        forecastInfo.innerHTML = 'Please enter a valid city.';
        return;
    }
    fiveHead.innerHTML = `
    <h3>5-day forecast for ${data.city.name}, ${data.city.country}</h3>
    `
    day1.innerHTML = `
    <h3>${today}</h3>
    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
    <p>H: ${data.list[0].main.temp_max}</p>
    <p>L: ${data.list[0].main.temp_min}</p>
    `;
    day2.innerHTML = `
    <h3>${dayTwo}</h3>
    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
    <p>H: ${data.list[7].main.temp_max}</p>
    <p>L: ${data.list[7].main.temp_min}</p>
    `;
    day3.innerHTML = `
    <h3>${dayThree}</h3>
    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;http://openweathermap.org/img/w/${data.list[16].weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
    <p>H: ${data.list[16].main.temp_max}</p>
    <p>L: ${data.list[16].main.temp_min}</p>
    `;
    day4.innerHTML = `
    <h3>${dayFour}</h3>
    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;http://openweathermap.org/img/w/${data.list[24].weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
    <p>H: ${data.list[24].main.temp_max}</p>
    <p>L: ${data.list[24].main.temp_min}</p
    `;
    day5.innerHTML = `
    <h3>${dayFive}</h3>
    <img height="45" width="45" style="border: medium none; width: 45px; height: 45px; background: url(&quot;http://openweathermap.org/img/w/${data.list[32].weather[0].icon}.png&quot;) repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
    <p>H: ${data.list[32].main.temp_max}</p>
    <p>L: ${data.list[32].main.temp_min}</p
    `;
}