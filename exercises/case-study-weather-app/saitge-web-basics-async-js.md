# Introduction to Asynchronous JavaScript

## Introduction
Asynchronous JavaScript is crucial for handling tasks like fetching data from APIs without blocking the main thread. In the context of our weather app, we use asynchronous JavaScript to request weather data from the OpenWeather API and update the UI dynamically. This tutorial covers asynchronous concepts such as callbacks, promises, and async/await, with examples applied to the weather app.

## What is Asynchronous JavaScript?
JavaScript is single-threaded, meaning it executes one operation at a time. Asynchronous programming allows certain tasks, such as API calls, to execute in the background while the rest of the script continues running.

### **Key Asynchronous Concepts:**
1. **Callbacks** - Functions passed as arguments to be executed later.
2. **Promises** - Objects that represent the eventual completion (or failure) of an asynchronous operation.
3. **Async/Await** - A more readable way to handle promises.

## Callbacks
A callback is a function passed into another function to execute later. While useful, callbacks can lead to deeply nested structures known as "callback hell."

### **Example: Using Callbacks in API Requests**
```js
function fetchWeather(city, callback) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

fetchWeather('Halifax', (error, data) => {
    if (error) {
        console.error('Error fetching weather:', error);
    } else {
        console.log(`Temperature in ${data.name}: ${data.main.temp}°C`);
    }
});
```

## Promises
Promises provide a cleaner way to handle asynchronous operations. A promise represents a value that might be available now, later, or never.

### **Example: Fetching Weather Data with Promises**
```js
function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

fetchWeather('Halifax')
    .then(data => {
        console.log(`Temperature in ${data.name}: ${data.main.temp}°C`);
    })
    .catch(error => {
        console.error('Error fetching weather:', error);
    });
```

## Async/Await
Async/Await provides a more readable way to handle promises by allowing us to write asynchronous code in a synchronous style.

### **Example: Fetching Weather Data with Async/Await**
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

## Handling Multiple API Calls
Sometimes, we need to fetch data from multiple sources simultaneously. `Promise.all()` allows us to handle multiple asynchronous requests in parallel.

### **Example: Fetching Weather for Multiple Cities**
```js
async function fetchMultipleCitiesWeather(cities) {
    const apiKey = 'YOUR_API_KEY';
    const requests = cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(res => res.json())
    );
    
    try {
        const results = await Promise.all(requests);
        results.forEach(data => {
            console.log(`Temperature in ${data.name}: ${data.main.temp}°C`);
        });
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

fetchMultipleCitiesWeather(['Halifax', 'Toronto', 'Vancouver']);
```

## Updating the Weather App with Async/Await
Modify the `displayWeather` function to use async/await for fetching and displaying weather data.

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

## Conclusion
Understanding asynchronous JavaScript is essential for handling API calls efficiently. Callbacks, promises, and async/await help manage asynchronous tasks, improving readability and maintainability. By using async/await, we ensure our weather app fetches and displays data smoothly without blocking the UI. With these concepts, you can extend the app to fetch forecast data, handle user input dynamically, and improve error handling.

