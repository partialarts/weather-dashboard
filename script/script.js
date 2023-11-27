var APIKey = "b34e1ed8e20b43fc4896741bb781c81d";

// Get date and time and format with dayjs()
var date = dayjs().format("(DD/MM/YYYY)");

var getCurrentWeather = function () {
    var cityInput = $("#search-input");
    var city = cityInput.val().trim();
    var queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";
    var queryFutureURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=metric";
    fetch(queryCurrentURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(queryCurrentWeather);
            console.log(data);
            var cityTitle = $("<h2>").text(data.name + " " + date);
            var currentTemp = $("<p>").text("Temp: "+ data.main.temp + " °C");
            var currentWind = $("<p>").text("Wind: "+ data.wind.speed + " KM/H");
            var currentHumidity = $("<p>").text("Humidity: "+ data.main.humidity + "%");
            var currentWeatherIcon = $("<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png width=60>");
            $("#today").append(cityTitle, currentTemp, currentWind, currentHumidity);
            cityTitle.append(currentWeatherIcon);

            
        });
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    getCurrentWeather();
})
