var APIKey = "b34e1ed8e20b43fc4896741bb781c81d";
var cityInput = $("#search-input");
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey

var date = dayjs().format("(DD/MM/YYYY)");
console.log(date);

$("#search-button").on("click", function (event) {
    event.preventDefault();

})
