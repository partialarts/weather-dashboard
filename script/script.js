



var getWeather = function() {
    var APIKey = "b34e1ed8e20b43fc4896741bb781c81d";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey
    var cityInput = $("#search-input");
}

// // .on("click") function to trigger the fetch() Call
$("#search-button").on("click", function (event) {
    event.preventDefault(); // prevent default form behavior
});