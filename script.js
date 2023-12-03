const displayApi = document.querySelector(".api-data");
const searchButton = document.querySelector(".fa-solid fa-magnifying-glass fa-lg")

async function getWeather() {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b076a8a09b7ac1a9ea89b6d5d522bcb3",
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
  };
  getWeather();

searchButton.addEventListener("click", () =>{
    const key = "b076a8a09b7ac1a9ea89b6d5d522bcb3";
    const searchCity = document.querySelector(".city").value;

    if(searchCity == '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}`).then(response => response.json()).then(json => {

    });
})
  
