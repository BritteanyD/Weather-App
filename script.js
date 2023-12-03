const container = document.querySelector(".api-data");
const searchButton = document.querySelector(".search button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

searchButton.addEventListener("click", () => {
  const key = "b076a8a09b7ac1a9ea89b6d5d522bcb3";
  const city = document.querySelector(".city").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector("weather-box .temperature");
      const description = document.querySelector("weather-box .description");
      const feels = document.querySelector("weather-details .feels span");
      const wind = document.querySelector("weather-details .wind span");

      switch (json.weather[0].main) {
        case "Sunny":
          image.src = "sunny.jpg";
          break;

        case "Rainy":
          image.src = "rainy.jpg";
          break;

        case "Snowy":
          image.src = "snowy.jpg";
          break;

        case "Cloudy":
          image.src = "cloud.jpg";
          break;

        case "Foggy":
          image.src = "foggy.png";
          break;

        default:
          image.src = "sunn.jpg";
          break;
      }
    });
});
