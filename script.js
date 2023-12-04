const container = document.querySelector(".container");
const searchButton = document.querySelector(".search button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

searchButton.addEventListener("click", () => {
  const APIKey = "b076a8a09b7ac1a9ea89b6d5d522bcb3";
  const city = document.querySelector(".search input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
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
          image.src = "cloud.jpg";
          break;

        case "Fog":
          image.src = "foggy.jpg";
          break;

        default:
          image.src = "sunny.jpg";
      }

      const tempInKelvin = json.main.temp;
      const tempInFahrenheit = (tempInKelvin - 273.15) * 9/5 + 32;
      temperature.innerHTML = `${parseInt(tempInFahrenheit)}<span>&#8457;</span>`;
      description.innerHTML = `${json.weather[0].description}`;
     
      const feelsInKelvin = json.main.feels_like;
      const feelsInFahrenheit = (feelsInKelvin - 273.15) * 9/5 + 32;
      feels.innerHTML = `${parseInt(feelsInFahrenheit)}<span>&#8457;</span>`;
     
      wind.innerHTML = `${parseInt(json.wind.speed)}mph`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
