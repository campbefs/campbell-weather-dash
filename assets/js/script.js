var searchFormEl = document.querySelector("#search-form");
var cityEl = document.querySelector("#inlineFormInputCity");
var searchUlEl = document.querySelector(".search-ul");
var cityTextEl = document.querySelector("#city-text");
var currentTempEl = document.querySelector("#current-temp");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentWindEl = document.querySelector("#current-wind");
var currentUvEl = document.querySelector(".current-uv");

var dt1El = document.querySelector("#dt-1");
var dt2El = document.querySelector("#dt-2");
var dt3El = document.querySelector("#dt-3");
var dt4El = document.querySelector("#dt-4");
var dt5El = document.querySelector("#dt-5");

var temp1El = document.querySelector("#temp1");
var temp2El = document.querySelector("#temp2");
var temp3El = document.querySelector("#temp3");
var temp4El = document.querySelector("#temp4");
var temp5El = document.querySelector("#temp5");

var humidity1El = document.querySelector("#humidity1");
var humidity2El = document.querySelector("#humidity2");
var humidity3El = document.querySelector("#humidity3");
var humidity4El = document.querySelector("#humidity4");
var humidity5El = document.querySelector("#humidity5");

var weather1El = document.querySelector("#weather1");
var weather2El = document.querySelector("#weather2");
var weather3El = document.querySelector("#weather3");
var weather4El = document.querySelector("#weather4");
var weather5El = document.querySelector("#weather5");

var apiFetch = function(city, cityFull) {

  apiKey = 'a7c5bebcb6d32bd1474a556f3d05e3bc';
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  // Current Weather Data -- grabbing lat & long
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json()
          .then(function(data) {

            lat = data["city"].coord.lat;
            lon = data["city"].coord.lon;

            // One Call API - daily forecast & current weather + UV Index
            apiUrlOne = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
            fetch(apiUrlOne)
            .then(function(response) {
              if (response.ok) {
                response.json()
                  .then(function(data) {
                    // Current Data
                    let weather = data.current.weather[0].main;
                    let temp = data.current.temp;
                    let humidity = data.current.humidity;
                    let wind = data.current.wind_speed;
                    let uvdata = data.current.uvi;
                    
                    // Create Span elements
                    var weatherSymbol = document.createElement("span");

                    // symbol selector
                    if (weather === 'Clouds' || weather === 'Mist') {
                      weatherSymbol.classList = "oi oi-cloud";
                    } else if (weather === "Rain" || weather === "Snow") {
                      weatherSymbol.classList = "oi oi-rain";
                    } else if (weather === "Clear") {
                      weatherSymbol.classList = "oi oi-sun";
                    };
                    
                    // Current Data - append symbol
                    cityTextEl.textContent = cityFull+' ('+moment().format('l')+')  ';
                    cityTextEl.appendChild(weatherSymbol);

                    // Curreent Data - Update Numbers
                    currentTempEl.textContent = temp;
                    currentHumidityEl.textContent = humidity;
                    currentWindEl.textContent = wind;
                    currentUvEl.textContent = uvdata;

                    // Current data - UV coloring
                    if (uvdata > 5) {
                      currentUvEl.classList = "current-uv uv-high";
                    } else if (uvdata > 2) {
                      currentUvEl.classList = "current-uv uv-moderate";
                    };
                    

                    // 5 Day Forecast Fetch
                    // console.log(data.daily);
                    // console.log(data.daily[1].weather[0].main);

                    // Update Forecast Values
                    temp1 = data.daily[1].temp["day"];
                    temp2 = data.daily[2].temp["day"];
                    temp3 = data.daily[3].temp["day"];
                    temp4 = data.daily[4].temp["day"];
                    temp5 = data.daily[5].temp["day"];

                    hum1 = data.daily[1].humidity;
                    hum2 = data.daily[2].humidity;
                    hum3 = data.daily[3].humidity;
                    hum4 = data.daily[4].humidity;
                    hum5 = data.daily[5].humidity;

                    weather1 = data.daily[1].weather[0].main;
                    weather2 = data.daily[2].weather[0].main;
                    weather3 = data.daily[3].weather[0].main;
                    weather4 = data.daily[4].weather[0].main;
                    weather5 = data.daily[5].weather[0].main;


                    // Update Dates
                    dt1 = moment().add(1,"days");
                    dt2 = moment().add(2,"days");
                    dt3 = moment().add(3,"days");
                    dt4 = moment().add(4,"days");
                    dt5 = moment().add(5,"days");

                    dt1El.textContent = dt1.format("l");
                    dt2El.textContent = dt2.format("l");
                    dt3El.textContent = dt3.format("l");
                    dt4El.textContent = dt4.format("l");
                    dt5El.textContent = dt5.format("l");

                    // Update Temps
                    temp1El.textContent = temp1;
                    temp2El.textContent = temp2;
                    temp3El.textContent = temp3;
                    temp4El.textContent = temp4;
                    temp5El.textContent = temp5;

                    // Update Humidity
                    humidity1El.textContent = hum1;
                    humidity2El.textContent = hum2;
                    humidity3El.textContent = hum3;
                    humidity4El.textContent = hum4;
                    humidity5El.textContent = hum5;

                    // Update Symbols
                    // Day 1
                    if (weather1 === 'Clouds' || weather1 === 'Mist') {
                      weather1El.classList = "oi oi-cloud fore-sign";
                    } else if (weather1 === "Rain" || weather1 === "Snow") {
                      weather1El.classList = "oi oi-rain fore-sign";
                    } else if (weather1 === "Clear") {
                      weather1El.classList = "oi oi-sun fore-sign";
                    };

                    // Day 2
                    if (weather2 === 'Clouds' || weather2 === 'Mist') {
                      weather2El.classList = "oi oi-cloud fore-sign";
                    } else if (weather2 === "Rain" || weather2 === "Snow") {
                      weather2El.classList = "oi oi-rain fore-sign";
                    } else if (weather2 === "Clear") {
                      weather2El.classList = "oi oi-sun fore-sign";
                    };

                    // Day 3
                    if (weather3 === 'Clouds' || weather3 === 'Mist') {
                      weather3El.classList = "oi oi-cloud fore-sign";
                    } else if (weather3 === "Rain" || weather3 === "Snow") {
                      weather3El.classList = "oi oi-rain fore-sign";
                    } else if (weather3 === "Clear") {
                      weather3El.classList = "oi oi-sun fore-sign";
                    };

                    // Day 4
                    if (weather4 === 'Clouds' || weather4 === 'Mist') {
                      weather4El.classList = "oi oi-cloud fore-sign";
                    } else if (weather4 === "Rain" || weather4 === "Snow") {
                      weather4El.classList = "oi oi-rain fore-sign";
                    } else if (weather4 === "Clear") {
                      weather4El.classList = "oi oi-sun fore-sign";
                    };

                    // Day 5
                    if (weather5 === 'Clouds' || weather5 === 'Mist') {
                      weather5El.classList = "oi oi-cloud fore-sign";
                    } else if (weather5 === "Rain" || weather5 === "Snow") {
                      weather5El.classList = "oi oi-rain fore-sign";
                    } else if (weather5 === "Clear") {
                      weather5El.classList = "oi oi-sun fore-sign";
                    };

              })
              } else {
                alert("Error: " + response.statusText);
              }
      });
    })
    } else {
      alert("Error: " + response.statusText);
    };
  });

};

var formSubmitHandler = function(event) {
  event.preventDefault();

  cityFull = cityEl.value.trim();
  city = cityEl.value.trim().toLowerCase();
  // console.log(city);

  localStorage.setItem('weather-'+cityFull, cityFull);

  var searchHistory = document.createElement("li");
  searchHistory.textContent = cityFull;
  searchHistory.classList = "search-item";
  searchHistory.setAttribute("data-city", cityFull);
  searchUlEl.appendChild(searchHistory);
  
  cityEl.textContent = "";

  apiFetch(city, cityFull);

};

// Past Cities Searched
for (weatherCity in localStorage) {
  cityArr = weatherCity.split("-");
  if (cityArr[0] === "weather") {
    // console.log(localStorage[cityArr[1]]);
    city = cityArr[1]

    var searchHistory = document.createElement("li");
    searchHistory.textContent = city;
    searchHistory.classList = "search-item";
    searchUlEl.appendChild(searchHistory);
  };
};

searchFormEl.addEventListener("submit", formSubmitHandler);
apiFetch('atlanta', 'Atlanta');

var searchUlEl = document.querySelector(".search-ul");

searchUlEl.addEventListener("click", function(event) {
  var searchCity = event.target.textContent;
  apiFetch(searchCity.toLowerCase(), searchCity);
});