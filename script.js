const container = document.querySelector(".container");
const searchButton = document.querySelector(".search button");
const toggleButton = document.querySelector("#toggleButton");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

let json;
let isCelsius = true;
let isKilometersPerHour = true;

toggleButton.addEventListener("click", () => {
  isCelsius = !isCelsius;
  isKilometersPerHour = !isKilometersPerHour;
  updateTemperatureDisplay();
  updateWindDisplay();
});

searchButton.addEventListener("click", () => {
  const APIKey = "b076a8a09b7ac1a9ea89b6d5d522bcb3";
  const city = document.querySelector(".search input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      json = data;
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      container.style.height = "500px";
      container.classList.add("active");
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      setTimeout(() => {
        container.classList.remove("active");
      }, 2500);

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const feels = document.querySelector(".weather-details .feels span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "sunny.jpg";
          break;

        case "Rain":
          image.src = "rainy.jpg";
          break;

        case "Snow":
          image.src = "snowy.jpg";
          break;

        case "Clouds":
          image.src = "cloudy.jpg";
          break;

        case "Mist":
          image.src = "foggy.jpg";
          break;

        case "Haze":
          image.src = "foggy.jpg";
          break;

        default:
          image.src = "sunny.jpg";
      }
      updateTemperatureDisplay();

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>&degC</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      feels.innerHTML = `${json.main.feels_like}<span>&degC</span>`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      updateTemperatureDisplay();
      updateWindDisplay();
    });
});

function updateTemperatureDisplay() {
  const temperatureElement = document.querySelector(
    ".weather-box .temperature"
  );
  const feelsElement = document.querySelector(".weather-details .feels span"); // Check if we should display in Celsius or Fahrenheit

  if (isCelsius) {
    temperatureElement.innerHTML = `${parseInt(
      json.main.temp
    )}<span>&degC</span>`;
    feelsElement.innerHTML = `${json.main.feels_like}<span>&degC</span>`;
  } else {
    const tempFahrenheit = (json.main.temp * 9) / 5 + 32;
    const feelsLikeFahrenheit = (json.main.feels_like * 9) / 5 + 32;
    temperatureElement.innerHTML = `${tempFahrenheit.toFixed(
      2
    )}<span>&degF</span>`;
    feelsElement.innerHTML = `${feelsLikeFahrenheit.toFixed(
      2
    )}<span>&degF</span>`;
  }
}

function updateWindDisplay() {
  const windElement = document.querySelector(".weather-details .wind span");
  if (json) {
    if (isKilometersPerHour) {
      windElement.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    } else {
      const windMph = (json.wind.speed * 0.621371).toFixed(2);
      windElement.innerHTML = `${windMph}mph`;
    }
  }
}
