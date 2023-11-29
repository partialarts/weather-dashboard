var APIKey = "6d61a835b6104a85e78303f92de08a75";

// Display the current weather
var showCurrentWeather = function (city, data) {
    $("#today").empty();
    $("div").toggleClass("hide", false);
    console.log(data);
    $('#today').append(`
        <h2 id="cityTitle">${city} ${dayjs().format('(DD/M/YYYY)')}</h2>
        <p>Temp: ${data.current.temp} °C</p>
        <p>Wind: ${data.current.wind_speed} KM/H</p>
        <p>Humidity: ${data.current.humidity} %</p>
        `)
    $('#cityTitle').append(`<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" alt="Weather Conditions Icon" width="50">`)

};

// Display the 5-day forecast
var showDailyForecast = function (data) {
    $("#forecast").empty();
    $("#forecast").append(`<h3>5-Day Forecast:</h3>`);
    for (i = 1; i < 6; i++) {
        $('#forecast').append(`<div class="dayCards col-lg-2 p-2">
            <h5>${dayjs.unix(data.daily[i].dt).format('DD/M/YYYY')}</h5>
            <img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" alt="Weather Conditions Icon" width="50">
            <p>Temp: ${data.daily[i].temp.day} °C</p>
            <p>Wind: ${data.daily[i].wind_speed} KM/H</p>
            <p>Humidity: ${data.daily[i].humidity} %</p>
            </div>
            `);


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

var queryWeather = function () {
    var cityInput = $("#search-input").val().trim();
    var queryGeoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey;
    fetch(queryGeoURL)
        .then(function (response) {
            return response.json();
        }).then(function (geoData) {
            var lat = geoData[0].lat;
            var lon = geoData[0].lon;
            var queryWeatherURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=metric";
            var cityName = geoData[0].name
            fetch(queryWeatherURL)
                .then(function (response) {
                    return response.json();
                }).then(function (weatherData) {
                    showCurrentWeather(cityName, weatherData);
                    showDailyForecast(weatherData)
                });
        });
};

$("#search-button").on("click", function (event) {
    event.preventDefault();
    queryWeather();
})
