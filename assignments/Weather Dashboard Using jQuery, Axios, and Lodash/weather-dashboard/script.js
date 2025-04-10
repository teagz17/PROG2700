$(document).ready(function () {
    const apiKey = "e9396bc5ac67b71fba6251456aa03851"; // Replace with your API key
  
    const weatherInfo = $("#weatherInfo");
    const searchHistoryEl = $("#searchHistory");
    const favouriteListEl = $("#favouriteList");
  
    // Global state variables
    let currentUnits = "metric";
    let currentCity = "";
  
    // Load search history and favourites from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  
    // Initial UI setup
    updateSearchHistory();
    updateFavouritesUI();
  
    // Function to fetch weather data
    const fetchWeather = _.debounce(async (city) => {
      if (!city) return;
      currentCity = city;
  
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnits}`);
        const data = weatherResponse.data;
  
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${currentUnits}`);
        const forecastData = forecastResponse.data;
  
        let currentWeatherHTML = `
          <h2>${data.name}</h2>
          <p>🌡 Temperature: ${data.main.temp}°${currentUnits === 'metric' ? 'C' : 'F'}</p>
          <p>💨 Wind Speed: ${currentUnits === 'imperial' ? (data.wind.speed * 0.44704).toFixed(2) : data.wind.speed} m/s</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
        `;
  
        let forecastHTML = `<div class="forecast-container"><h3>5-Day Forecast</h3><div class="forecast-cards">`;
        
        // Process forecast data (selecting forecasts with a 12:00:00 timestamp)
        let forecastList = forecastData.list;
        let dailyForecast = {};
        forecastList.forEach(item => {
          let date = item.dt_txt.split(" ")[0];
          if (item.dt_txt.includes("12:00:00") && !dailyForecast[date]) {
            dailyForecast[date] = item;
          }
        });
        
        for (const date in dailyForecast) {
          let item = dailyForecast[date];
          forecastHTML += `
            <div class="forecast-card">
              <h4>${new Date(date).toLocaleDateString()}</h4>
              <p>🌡 ${item.main.temp}°${currentUnits === 'metric' ? 'C' : 'F'}</p>
              <p>💨 ${(currentUnits === 'imperial' ? (item.wind.speed * 0.44704).toFixed(2) : item.wind.speed)} m/s</p>
              <p>💧 ${item.main.humidity}%</p>
            </div>
          `;
        }
        forecastHTML += `</div></div>`;
  
        // Combine current weather and forecast information
        weatherInfo.html(currentWeatherHTML + forecastHTML);
        $("#favouriteBtn").show(); // Reveal the Favourite button once valid data is loaded
  
        // Update search history (store only the last 5 unique searches)
        if (!searchHistory.includes(city)) {
          searchHistory.push(city);
          if (searchHistory.length > 5) searchHistory.shift();
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          updateSearchHistory();
        }
      } catch (error) {
        weatherInfo.html("<p style='color:red;'>City not found. Try again.</p>");
        $("#favouriteBtn").hide();
      }
    }, 500); // Debounced to avoid excessive API calls
  
    // Event Listener for Search Button
    $("#searchBtn").click(() => {
      const city = $("#cityInput").val().trim();
      fetchWeather(city);
    });
  
    // Click on a history item to re-fetch weather
    searchHistoryEl.on("click", "li", function () {
      fetchWeather($(this).text());
    });
  
    // Click on a favourite item to re-fetch weather
    favouriteListEl.on("click", "li", function () {
      fetchWeather($(this).text());
    });
  
    // Update search history UI
    function updateSearchHistory() {
      searchHistoryEl.html("");
      searchHistory.forEach(city => {
        searchHistoryEl.append(`<li>${city}</li>`);
      });
    }
  
    // Update favourites UI
    function updateFavouritesUI() {
      favouriteListEl.html("");
      favourites.forEach(city => {
        favouriteListEl.append(`<li>${city}</li>`);
      });
    }
  
    // Event Listener for Favourite Button
    $("#favouriteBtn").click(() => {
      if (currentCity && !favourites.includes(currentCity)) {
        favourites.push(currentCity);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        updateFavouritesUI();
      }
    });
  
    // Event Listeners for temperature unit toggle  
    $("#celsiusBtn").click(() => {
      if (currentUnits !== "metric") {
        currentUnits = "metric";
        $("#celsiusBtn").addClass("active");
        $("#farenheitBtn").removeClass("active");
        if (currentCity) fetchWeather(currentCity);
      }
    });
  
    $("#farenheitBtn").click(() => {
      if (currentUnits !== "imperial") {
        currentUnits = "imperial";
        $("#farenheitBtn").addClass("active");
        $("#celsiusBtn").removeClass("active");
        if (currentCity) fetchWeather(currentCity);
      }
    });
  });