var searchBar = document.getElementById("#search-bar");
var currentDay = document.querySelector("#today");
var searchBtn = document.getElementById("search-btn");
console.log(searchBtn);

var apiKey = "3fe813626b12b8d2b8762d1a88477d61"
//call API to get weather data
function fetchWeather(lat, lon, city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&dt&appid=3fe813626b12b8d2b8762d1a88477d61'
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json()
                .then(function(data) {
                    console.log(data);
                })
        }
    })
}

//get todays date
var getDate = function() {
    var currentDate = moment().format("dddd, MMMM Do YYYY");
    return currentDate;
}

var displayHeaders = function() {
    document.querySelector("#forecast-1").textContent = getDate().add(1, "d").format("dddd");
    document.querySelector("#forecast-2").textContent = moment().add(2, "d").format("dddd");
    document.querySelector("#forecast-3").textContent = moment().add(3, "d").format("dddd");
    document.querySelector("#forecast-4").textContent = moment().add(4, "d").format("dddd");
    document.querySelector("#forecast-5").textContent = moment().add(5, "d").format("dddd");
};

 
displayHeaders();
