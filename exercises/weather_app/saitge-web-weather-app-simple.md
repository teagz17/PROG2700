# Building a Weather App Using OpenWeather API

## Introduction
This tutorial will guide you through building a simple weather app using the OpenWeather API. The app will allow users to enter a city name and retrieve real-time weather data, including temperature, humidity, and weather conditions.

## Prerequisites
Before we begin, ensure you have the following:
- Basic knowledge of HTML, CSS, and JavaScript
- A free API key from OpenWeather (https://openweathermap.org/api)
- A text editor (VS Code, Sublime, etc.)
- A web browser

## Step 1: Setting Up the Project
1. Create a new project folder and name it `weather-app`.
2. Inside the folder, create the following files:
   - `index.html` (Structure of the web page)
   - `style.css` (Styling for the app)
   - `script.js` (Logic for fetching and displaying weather data)

## Step 2: Writing the HTML
Open `index.html` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Weather App</h2>
        <input type="text" id="cityInput" placeholder="Enter city name">
        <button id="searchBtn">Get Weather</button>
        <div id="weatherInfo"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

## Step 3: Styling the App
Open `style.css` and add the following styles:

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f0f0f0;
}

.container {
    margin-top: 50px;
}

input, button {
    padding: 10px;
    margin: 5px;
}

#weatherInfo {
    margin-top: 20px;
    font-size: 18px;
}
```

## Step 4: Fetching Weather Data
Open `script.js` and add the following JavaScript code:

```js
const apiKey = 'YOUR_API_KEY_HERE';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching data';
    }
}

function displayWeather(data) {
    if (data.cod === '404') {
        weatherInfo.innerHTML = 'City not found';
        return;
    }
    weatherInfo.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}
```

## Step 5: Running the App
1. Replace `YOUR_API_KEY_HERE` in `script.js` with your actual OpenWeather API key.
2. Open `index.html` in a browser.
3. Enter a city name and click the "Get Weather" button.
4. The weather details should appear on the screen.



