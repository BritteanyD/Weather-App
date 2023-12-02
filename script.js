const displayApi = document.querySelector(".api-data");

async function getWeather() {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b076a8a09b7ac1a9ea89b6d5d522bcb3",
      { mode: "cors" }
    );
    const weatherData = await response.json();
    weatherData.innerHTML;
  };
  getWeather();

