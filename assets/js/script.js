var search = document.querySelector("#search")
var currentDay = document.querySelector("#today")


var apiKey = "3fe813626b12b8d2b8762d1a88477d61"

//call API to get weather data
function fetchWeather(lat, lon, city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid='+apiKey
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json()
                .then(function(data) {
                    console.log(data);
                })
        }
    })
}

fetchWeather();

//put weather data into current day box

//put 5 day data into individual boxes

//save searched city in local storage

//show recently searched cities under searchbar

//populate data on city submit

