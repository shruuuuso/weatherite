let country = document.querySelector("#country");
let city = document.querySelector("#city");
let check = document.querySelector("#check");
let tempIcon = document.querySelector("#tempIcon");
let weatherCountry = document.querySelector("#weatherCountry");
let temperature = document.querySelector("#temperature");
let weatherDescription = document.querySelector("#weatherDescription");
let feelsLike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");
let forecast = document.querySelector("#forecast");

check.addEventListener("click", () => {
    let key = `bd4ea33ecf905116d12af172e008dbae`;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&lang=en&units=metric&appid=${key}`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value},${country.value}&lang=en&units=metric&appid=${key}`;

    fetch(weatherUrl).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        weatherCountry.innerText = `${data.name} / ${data.sys.country}`;
        temperature.innerHTML = `${data.main.temp}°<b>C</b>`;

        data.weather.forEach(items => {
            weatherDescription.innerText = items.description;
            if (items.id < 250) {
                tempIcon.src = `storm.svg`;
            } else if (items.id < 350) {
                tempIcon.src = `drizzle.svg`;
            } else if (items.id < 550) {
                tempIcon.src = `snow.svg`;
            } else if (items.id < 650) {
                tempIcon.src = `rain.svg`;
            } else if (items.id < 800) {
                tempIcon.src = `atmosphere.svg`;
            } else if (items.id === 800) {
                tempIcon.src = `sun.svg`;
            } else if (items.id > 800) {
                tempIcon.src = `clouds.svg`;
            }
        });

        feelsLike.innerText = `Feels Like ${data.main.feels_like}°C`;
        humidity.innerText = `Humidity ${data.main.humidity}`;
        latitude.innerText = `Latitude ${data.coord.lat}`;
        longitude.innerText = `Longitude ${data.coord.lon}`;
    });

    fetch(forecastUrl).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        forecast.innerHTML = ""; // Clear previous forecast
        for (let i = 0; i < data.list.length; i += 8) { // Get forecast for every 24 hours
            let forecastItem = document.createElement("div");
            forecastItem.className = "forecast-item";
            forecastItem.innerHTML = `
                <h3>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</h3>
                <p>Temp: ${data.list[i].main.temp}°C</p>
                <p>${data.list[i].weather[0].description}</p>
            `;
            forecast.appendChild(forecastItem);
        }
    });

    country.value = "";
    city.value = "";
});
