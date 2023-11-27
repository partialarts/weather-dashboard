var APIKey = "b34e1ed8e20b43fc4896741bb781c81d";

// Get date and time and format with dayjs()
var date = dayjs().format("(DD/MM/YYYY)");

var getWeather = function () {
    $("section").empty();
    var cityInput = $("#search-input").val().trim();
    var queryTodayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey + "&units=metric";
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIKey + "&units=metric";

    Promise.all([ // Method to call both APIs at once
        fetch(queryTodayURL),
        fetch(queryForecastURL)
    ]).then(function (responses) {
        // Get JSON object from API responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        console.log(data);
        var cityTitle = $("<h2>").text(data[0].name + " " + date);
        var currentTemp = $("<p>").text("Temp: " + data[0].main.temp + " °C");
        var currentWind = $("<p>").text("Wind: " + data[0].wind.speed + " KM/H");
        var currentHumidity = $("<p>").text("Humidity: " + data[0].main.humidity + "%");
        var currentWeatherIcon = $("<img src=http://openweathermap.org/img/wn/" + data[0].weather[0].icon + "@2x.png width=60>");
        $("#today").append(cityTitle, currentTemp, currentWind, currentHumidity);
        cityTitle.append(currentWeatherIcon);

        var forecastTitle = $("<h3>")
        for (i = 0; i < 5; i++) {
            var dayCards = $("<div>");

        }

        $("div").toggleClass("hide", false);
    });
};

$("#search-button").on("click", function (event) {
    event.preventDefault();
    getWeather();
})
