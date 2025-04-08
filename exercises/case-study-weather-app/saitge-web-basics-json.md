# JSON (JavaScript Object Notation) - A Detailed Tutorial

## Introduction
JSON (JavaScript Object Notation) is a lightweight data format used for exchanging data between a server and a client. It is widely used in APIs, including the OpenWeather API, which we are using in our weather app. In this tutorial, we will cover the basics of JSON, how to work with JSON in JavaScript, and how to use it in the context of our weather app.

## What is JSON?
JSON is a text-based format for storing and transmitting structured data. It is easy for humans to read and write and easy for machines to parse and generate.

### **JSON Structure**
JSON data is represented as key-value pairs, similar to a JavaScript object. It can contain:
- **Objects** (`{}`) - A collection of key-value pairs
- **Arrays** (`[]`) - A list of values
- **Strings**, **Numbers**, **Booleans**, and **null**

### **Example JSON Data (OpenWeather API Response)**
When we make a request to OpenWeather API, we receive a JSON response. Below is an example:

```json
{
    "coord": { "lon": -63.5827, "lat": 44.6488 },
    "weather": [
        { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }
    ],
    "main": {
        "temp": 22.5,
        "humidity": 78,
        "pressure": 1012
    },
    "wind": { "speed": 3.1, "deg": 200 },
    "sys": { "country": "CA" },
    "name": "Halifax"
}
```

## Parsing JSON in JavaScript
In JavaScript, JSON data can be handled using `JSON.parse()` (to convert a JSON string into a JavaScript object) and `JSON.stringify()` (to convert a JavaScript object into a JSON string).

### **Parsing JSON from an API Response**
When we fetch data from the OpenWeather API, we need to parse the JSON response.

```js
fetch('https://api.openweathermap.org/data/2.5/weather?q=Halifax&appid=YOUR_API_KEY&units=metric')
    .then(response => response.json())  // Convert JSON string to JavaScript object
    .then(data => {
        console.log(data); // Display the entire JSON object in the console
        console.log(`Temperature: ${data.main.temp}°C`); // Accessing a specific property
        console.log(`Weather: ${data.weather[0].description}`);
    })
    .catch(error => console.error('Error fetching data:', error));
```

### **Accessing JSON Data**
To extract values from JSON, we use dot notation or bracket notation.

```js
let cityName = data.name;  // "Halifax"
let temperature = data.main.temp;  // 22.5
let weatherCondition = data.weather[0].description;  // "clear sky"
```

## Creating a JSON Object in JavaScript
We can create JSON-like objects in JavaScript:

```js
const weatherData = {
    city: "Halifax",
    temperature: 22.5,
    weather: "Clear Sky"
};
console.log(JSON.stringify(weatherData)); // Convert to JSON string
```

## Displaying JSON Data in the Weather App
To display JSON data in our weather app, we modify the `displayWeather` function:

```js
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

## Conclusion
JSON is essential for working with APIs like OpenWeather. Understanding how to parse, access, and display JSON data is crucial for building applications that interact with external data sources. With these skills, you can extend your weather app with additional features like hourly forecasts or multiple cities.

