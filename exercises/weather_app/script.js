const apiKey = "e9396bc5ac67b71fba6251456aa03851";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const forecastInfo = document.getElementById("forecastInfo");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = "Error fetching data";
  }
}

async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    displayForecast(data);
    console.log(`5-day forecast for ${data.city.name}:`);
    data.list.forEach((entry) => {
      console.log(`${entry.dt_txt}: ${entry.main.temp}°C`);
    });
  } catch (error) {
    console.error("Error fetching forecast:", error);
    forecastInfo.innerHTML = "Error fetching data";
  }
}

function displayWeather(data) {
  if (data.cod === "404") {
    weatherInfo.innerHTML = "City not found";
    return;
  }
  weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h3>Currently:</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
  if (data.cod === "404") {
    forecastInfo.innerHTML = "Please enter a valid city.";
    return;
  }
  forecastInfo.innerHTML = `
        <h3>5-Day Forecast</h3>
        <h4>${data.list[6].dt_txt}</h4>
        <p>High: ${data.list[6].main.temp_max}°C</p>
        <p>Low: ${data.list[6].main.temp_min}°C</p>
        <p>Humidity: ${data.list[6].main.humidity}%</p>
        <p>Condition: ${data.list[6].weather[0].description}</p>
        <h4>${data.list[14].dt_txt}</h4>
        <p>High: ${data.list[14].main.temp_max}°C</p>
        <p>Low: ${data.list[14].main.temp_min}°C</p>
        <p>Humidity: ${data.list[14].main.humidity}%</p>
        <p>Condition: ${data.list[14].weather[0].description}</p>
        <h4>${data.list[22].dt_txt}</h4>
        <p>High: ${data.list[22].main.temp_max}°C</p>
        <p>Low: ${data.list[22].main.temp_min}°C</p>
        <p>Humidity: ${data.list[22].main.humidity}%</p>
        <p>Condition: ${data.list[22].weather[0].description}</p>
        <h4>${data.list[30].dt_txt}</h4>
        <p>High: ${data.list[30].main.temp_max}°C</p>
        <p>Low: ${data.list[30].main.temp_min}°C</p>
        <p>Humidity: ${data.list[30].main.humidity}%</p>
        <p>Condition: ${data.list[30].weather[0].description}</p>
        <h4>${data.list[38].dt_txt}</h4>
        <p>High: ${data.list[38].main.temp_max}°C</p>
        <p>Low: ${data.list[38].main.temp_min}°C</p>
        <p>Humidity: ${data.list[38].main.humidity}%</p>
        <p>Condition: ${data.list[38].weather[0].description}</p>
    `;
}
