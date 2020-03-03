const desc = document.getElementById("description");
const temp = document.getElementById("temp");
const loc = document.getElementById("location");
const icon = document.getElementById("_icon");
const cityInput = document.getElementById("city");
const weatherDisplay = document.getElementById("weather");

function cityName() {
  let nameInput = cityInput.value;
  return nameInput;
}

function weatherBallon() {
  const key = "fafe2682d7f5718dcf709b0d8c4aeee8";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName() +
      "&APPID=" +
      key
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      drawWeather(data);
      console.log(data);
    })
    .catch(function() {});
}

function drawWeather(d) {
  const celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  const fahrenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);
  console.log(d.weather[0].main);

  desc.innerHTML = d.weather[0].description;
  temp.innerHTML = celcius + "&deg;";
  loc.innerHTML = d.name;

  if (d.weather[0].main === "Rain") {
    icon.className = "rainy";
    weatherDisplay.className = "weather-display";
  } else if (
    d.weather[0].main === "Clouds" ||
    d.weather[0].main === "Mist" ||
    d.weather[0].main === "Fog"
  ) {
    icon.className = "cloudy";
    weatherDisplay.className = "weather-display";
  } else if (d.weather[0].main === "Clear") {
    icon.className = "sunny";
    weatherDisplay.className = "weather-display";
  }
}

function clearAll() {
  desc.innerHTML = "";
  temp.innerHTML = "";
  loc.innerHTML = "";
  icon.className = "";
  cityInput.value = "";
}

document.onkeydown = function(event) {
  if (event.keyCode === 13) {
    weatherBallon();
  }
};
