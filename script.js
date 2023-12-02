async function getWeather() {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b076a8a09b7ac1a9ea89b6d5d522bcb3",
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
  };
  getWeather();

// Fetches a variety of weather gifs
const img = document.querySelector("img");

async function getWeatherGifs() {
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=Fz7r6potxfGKLduOn4JhjT4JtCSzUdVc&s=weather",
    { mode: "cors" }
  );
  const weatherGifsData = await response.json();
  img.src = weatherGifsData.data.images.original.url;
};
getWeatherGifs();
