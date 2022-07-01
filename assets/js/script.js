var searchBar = document.getElementById("#search-bar");
var currentDay = document.querySelector("#today");
var searchBtn = document.getElementById("search-btn");
console.log(searchBtn);


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


var getLatAndLon = function(location) {
    var geoUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + location + "&appid=a9001a7bcfd8e28a15abc3788c265862";

    fetch(geoUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var lat = getLat(data);
                var lon = getLon(data);
                var cityName = getCityName(data);

                getWeather(lat, lon, cityName);
            });
        } else {
            alert("Please enter a valid Zip Code.");
        }
    })
    .catch(function(error) {
        alert("Unable to find weather data. Please try again later or search for a different city.");
    });
}
var getLat = function(zip) {
    return zip.lat;
}

var getLon = function(zip) {
    return zip.lon;
}

var getCityName = function(zip) {
    return zip.name;
}

var getWeather = function(lat, lon, city) {
    console.log(city);

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a9001a7bcfd8e28a15abc3788c265862";

    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                displayWeatherData(data, city);
            });
        } else {
            alert("Please enter a valid Zip Code.");
        }
    })
    .catch(function(error) {
        alert("Unable to find weather data. Please try again later or search for a different city.");
    });
}



displayHeaders();
