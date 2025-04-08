# OpenWeather API Usage - A Detailed Tutorial

## Introduction
The OpenWeather API provides real-time and forecast weather data for various locations worldwide. This tutorial covers how to use the OpenWeather API in the context of our weather app, leveraging JavaScript and async programming to fetch and display weather data.

## Getting Started with OpenWeather API
### **Step 1: Sign Up for an API Key**
To use OpenWeather API, you need an API key:
1. Visit [OpenWeather](https://openweathermap.org/).
2. Sign up for a free account.
3. Navigate to the API section and generate your API key.

## Fetching Weather Data
The OpenWeather API provides data in JSON format. The main endpoints are:
- **Current Weather Data:** `https://api.openweathermap.org/data/2.5/weather`
- **5-day Forecast:** `https://api.openweathermap.org/data/2.5/forecast`

### **Example: Fetching Current Weather Data**
```js
async function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Temperature in ${data.name}: ${data.main.temp}°C`);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

fetchWeather('Halifax');
```

## Fetching 5-day Forecast
The 5-day forecast provides weather updates in 3-hour intervals.

```js
async function fetchForecast(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`5-day forecast for ${data.city.name}:`);
        data.list.forEach(entry => {
            console.log(`${entry.dt_txt}: ${entry.main.temp}°C`);
        });
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

fetchForecast('Halifax');
```

## Displaying Weather Data in a Web Page
Modify the `displayWeather` function to update the UI dynamically.

```js
async function displayWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('weatherInfo').innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weatherInfo').innerHTML = 'Error fetching weather data';
    }
}
```

## Error Handling
Handling errors ensures the application remains stable.

```js
async function fetchWeatherSafe(city) {
    try {
        await fetchWeather(city);
    } catch (error) {
        console.error('Failed to fetch weather:', error);
    }
}

fetchWeatherSafe('InvalidCity');
```

## Conclusion
Using OpenWeather API, we can fetch and display real-time weather data. By integrating async JavaScript, we ensure smooth and efficient updates. This tutorial provides a solid foundation for extending the app to support forecasts, user input, and improved error handling.

