$(document).ready(function () {
    const apiKey = "e9396bc5ac67b71fba6251456aa03851"; // Replace with your API key
    const weatherInfo = $("#weatherInfo");
    const searchHistoryEl = $("#searchHistory");

    const celsiusBtn = document.getElementById('celsiusBtn');
    const farenheitBtn = document.getElementById('farenheitBtn');

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    updateSearchHistory();

    // Function to fetch weather data
    const fetchWeather = _.debounce(async (city) => {
        if (!city) return;
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = response.data;
            
            weatherInfo.html(`
                <h2>${data.name}</h2>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `);

            // Store the city in search history
            if (!searchHistory.includes(city)) {
                searchHistory.push(city);
                if (searchHistory.length > 5) searchHistory.shift(); // Keep only last 5
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                updateSearchHistory();
            }

        } catch (error) {
            weatherInfo.html("<p style='color:red;'>City not found. Try again.</p>");
        }
    }, 500); // Debounce to avoid excessive API calls

    // Event Listener for Search Button
    $("#searchBtn").click(() => {
        const city = $("#cityInput").val().trim();
        fetchWeather(city);
        if (celsiusBtn.style.display === 'none') {
            celsiusBtn.style.display = 'inline';
        };
        if (farenheitBtn.style.display === 'none') {
            farenheitBtn.style.display = 'inline'
        };
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

    // Click on a history item to re-fetch weather
    searchHistoryEl.on("click", "li", function () {
        fetchWeather($(this).text());
    });

    // Update search history UI
    function updateSearchHistory() {
        searchHistoryEl.html("");
        searchHistory.forEach(city => {
            searchHistoryEl.append(`<li>${city}</li>`);
        });
    }
});