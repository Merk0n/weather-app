// getting info about current weather
const apiKey = 'f1674b3f51d74877b6e95543231510';
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

const getCurrentWeather = async (city) => {
  const response = await fetch(apiUrl + city);
  const data = await response.json();
  console.log(data);
  return data;
};

// DOM elements
const searchCity = document.querySelector('.search-box__input');
const searchButton = document.querySelector('.search-btn');
const locationInfo = document.querySelector('.weather-information__location');
const dateInfo = document.querySelector('.weather-information__date');
const timeInfo = document.querySelector('.weather-information__time');
const temperatureInfo = document.querySelector(
  '.weather-information__temperature'
);
const descriptionInfo = document.querySelector(
  '.weather-information__description'
);
const imageWeather = document.querySelector('.image-weather');
const feelsLikeInfo = document.querySelector('#feels-like');
const humidityInfo = document.querySelector('#humidity');
const chanceOfRainInfo = document.querySelector('#chance-of-rain');
const windSpeedInfo = document.querySelector('#wind-speed');
const windDirectionInfo = document.querySelector('#wind-direction');

// Event listener - checking weather for searched city
searchButton.addEventListener('click', () => {
  getCurrentWeather(searchCity.value).then((data) => {
    locationInfo.textContent = data.location.name;
    dateInfo.textContent = data.location.localtime.substring(0, 10);
    timeInfo.textContent = `Last updated: ${data.current.last_updated.substring(
      11,
      16
    )}`;
    temperatureInfo.textContent = `${data.current.temp_c}°C`;
    descriptionInfo.textContent = data.current.condition.text;
    imageWeather.src = data.current.condition.icon;
    feelsLikeInfo.textContent = `${Math.round(data.current.feelslike_c)}°C`;
    humidityInfo.textContent = `${data.current.humidity}%`;
    // chance of rain API doesn't work properly - no data i guess
    chanceOfRainInfo.textContent = `${data.current.precip_in}%`;
    windSpeedInfo.textContent = `${Math.round(data.current.wind_kph)} km/h`;
    windDirectionInfo.textContent = data.current.wind_dir;
  });
});

getCurrentWeather('warsaw');
