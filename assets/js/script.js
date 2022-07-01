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

var searchSubmit = function(event) {
    event.preventDefault();

    var zipCode = searchBar.value.trim();
    
    if (zipCode) {
        getLatAndLon(zipCode);
        searchBar.value = "";
    } else {
        alert("Please enter a valid zip code.");
    }
}


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

var displayWeatherData = function(data, city) {
    citySearchedEl.textContent = "City: " + city;

    // Current Weather Data
    var currentTemp = data.current.temp;
    var currentWind = data.current.wind_speed;
    var currentUV = data.current.uvi;

    tempEl.textContent = "Temperature: " + currentTemp + "°F";
    windEl.textContent = "Wind Speed: " + currentWind + " MPH";
    uvIndexEl.textContent = "UV Index: " + currentUV;


    // Five Day Forecast
    
    // Temp
    for (let i = 1; i < 6; i++) {
        document.querySelector("#temp-"+i).textContent = "Temp: " + data.daily[i].temp.day + "°F";
    }

    // Wind
    for (let i = 1; i < 6; i++) {
        document.querySelector("#wind-"+i).textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
    }

    
}

searchBtn.addEventListener("click", searchSubmit);



displayHeaders();
