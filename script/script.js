var APIKey = "b34e1ed8e20b43fc4896741bb781c81d";
var cityInput = $("#search-input");
var date = dayjs().format("(DD/MM/YYYY)");
console.log(date);

var apiCall = function () {
    var city = cityInput.val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(queryURL);
            console.log(data);
        });
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    apiCall();
})
