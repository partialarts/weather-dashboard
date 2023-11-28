var APIKey = "6d61a835b6104a85e78303f92de08a75";
// Get date and time and format with dayjs()
var currentDate = dayjs()
// Display the current weather
var showCurrentWeather = function (city, data) {
    $("#today").empty();
    $("div").toggleClass("hide", false);
    console.log (data);
    $('#today').append(`
        <h2 id="cityTitle">${city} ${currentDate.format('DD/MM/YYYY')}</h2>
        <p>Temp: ${data.current.temp} °C</p>
        <p>Wind: ${data.current.wind_speed} KM/H</p>
        <p>Humidity: ${data.current.humidity} %</p>
        `)
    $('#cityTitle').append(`<img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="Weather Conditions Icon" width="60">`)
        
};

var showForecast = function (data) {
        // Display the 5-day forecast
        $("#forecast").empty();
        $("#forecast").append(`<h3>5-Day Forecast</h3>`);
        for (i = 1; i < 6; i++) {
        var date = dayjs.unix(data.daily[i].dt);
console.log(date);
                // var dayCards = $("<div>");
            $('#forecast').append(``);


        //         <div class="forecast-cards col-2 mr-3">
        //             <h5 class="text-center">${dayjs(date).format('MM/DD/YYYY')}</h5>
        //             <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon" class="forecastIcon">
        //             <p>Temperature: ${forecast.main.temp}°F</p>
        //             <p>Humidity: ${forecast.main.humidity}%</p>
        //             <p>Wind Speed: ${forecast.wind.speed} m/s</p>
        //         </div>
        //         `);
        //     dayCards.addClass("col-2 mr-3")
        }
    };

var getWeather = function () {
    var cityInput = $("#search-input").val().trim();
    var queryGeoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey;
    fetch(queryGeoURL)
        .then(function (response) {
            return response.json();
        }).then(function (geoData) {
            var lat = geoData[0].lat;
            var lon = geoData[0].lon;
            var queryWeatherURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=metric";
            fetch(queryWeatherURL)
                .then(function (response) {
                    return response.json();
                }).then(function (weatherData) {
                    var cityName = geoData[0].name
                    showCurrentWeather(cityName, weatherData);
                    showForecast(weatherData)
                });
        });
};

$("#search-button").on("click", function (event) {
    event.preventDefault();
    getWeather();
})
