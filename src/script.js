import getCurrentDate from './getCurrentDate';

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

// Starter value
dateInfo.textContent = getCurrentDate();

// Event listener - checking weather for searched city
searchButton.addEventListener('click', () => {
  getCurrentWeather(searchCity.value).then((data) => {
    locationInfo.textContent = data.location.name;
    timeInfo.textContent = `Last updated: ${data.location.localtime.substring(
      11,
      16
    )}`;
    temperatureInfo.textContent = `${data.current.temp_c}°C`;
    descriptionInfo.textContent = data.current.condition.text;
    imageWeather.src = data.current.condition.icon;
  });
});
