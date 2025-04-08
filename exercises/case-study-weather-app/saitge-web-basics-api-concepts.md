# API Concepts - A Detailed Tutorial

## Introduction
APIs (Application Programming Interfaces) allow different software applications to communicate with each other. In web development, APIs are commonly used to fetch data from external sources, such as the OpenWeather API, which provides weather data in JSON format. This tutorial will cover fundamental API concepts, how to make API requests, and how to handle responses in the context of our weather app.

## What is an API?
An API is an intermediary that allows applications to communicate. It provides a set of rules and endpoints that developers use to request and receive data from a server.

### **Key API Concepts:**
1. **Endpoints** - URLs that specify where to access a resource (e.g., OpenWeather API URL)
2. **HTTP Methods** - Common methods used with APIs:
   - `GET` - Retrieve data (e.g., fetch weather data)
   - `POST` - Send data to the server
   - `PUT` - Update data
   - `DELETE` - Remove data
3. **Query Parameters** - Additional parameters included in API requests to filter results
4. **API Key** - A unique key required to authenticate API requests
5. **Response Format** - Most APIs return data in JSON format
6. **Status Codes** - HTTP response codes indicating the success or failure of a request (e.g., `200 OK`, `404 Not Found`)

## Using an API in JavaScript
To work with APIs, we use the `fetch()` function, which sends HTTP requests and processes responses.

### **Example: Fetching Data from OpenWeather API**
We will retrieve weather data for a given city using OpenWeather API.

```js
const apiKey = 'YOUR_API_KEY';
const city = 'Halifax';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log('Weather Data:', data);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Condition: ${data.weather[0].description}`);
    })
    .catch(error => console.error('Error fetching data:', error));
```

### **Breaking Down the Code:**
1. **Construct API URL:** The `url` contains query parameters (`q=Halifax`, `appid=YOUR_API_KEY`, `units=metric`).
2. **Send Request with `fetch()`**: Sends a `GET` request to the API endpoint.
3. **Handle Response:**
   - Check if the response is OK (`response.ok`).
   - Convert response to JSON (`response.json()`).
4. **Process Data:** Extract weather details and display them.
5. **Handle Errors:** Catch any network or API errors.

## Handling API Responses
The API response contains structured JSON data. Below is an example OpenWeather API response:

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

### **Accessing Data from API Response**
We can extract values using dot notation:

```js
console.log(`City: ${data.name}`);  // Halifax
console.log(`Country: ${data.sys.country}`);  // CA
console.log(`Temperature: ${data.main.temp}°C`);  // 22.5°C
console.log(`Weather: ${data.weather[0].description}`);  // clear sky
```

## Displaying API Data in the Weather App
Modify the `displayWeather` function to show API data in the UI:

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
APIs play a crucial role in web applications by enabling data retrieval from external services. Understanding API concepts, making HTTP requests, handling JSON responses, and managing errors will help you integrate APIs into your applications effectively. With this knowledge, you can extend the weather app to fetch hourly or weekly forecasts!

