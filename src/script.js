// getting info about current weather
const apiKey = 'f1674b3f51d74877b6e95543231510';
const apiForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=7&aqi=no&alerts=no&q=`;

const getForecastWeather = async (city) => {
  const response = await fetch(apiForecastUrl + city);
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
  '.weather-information__temperature',
);
const descriptionInfo = document.querySelector(
  '.weather-information__description',
);
const imageWeather = document.querySelector('.image-weather');
const feelsLikeInfo = document.querySelector('#feels-like');
const humidityInfo = document.querySelector('#humidity');
const chanceOfRainInfo = document.querySelector('#chance-of-rain');
const windSpeedInfo = document.querySelector('#wind-speed');
const windDirectionInfo = document.querySelector('#wind-direction');

// Event listener - checking weather for searched city
searchButton.addEventListener('click', () => {
  getForecastWeather(searchCity.value).then((data) => {
    locationInfo.textContent = data.location.name;
    dateInfo.textContent = data.location.localtime.substring(0, 10);
    timeInfo.textContent = `Last updated: ${data.current.last_updated.substring(
      11,
      16,
    )}`;
    temperatureInfo.textContent = `${data.current.temp_c}°C`;
    descriptionInfo.textContent = data.current.condition.text;
    imageWeather.src = data.current.condition.icon;
    feelsLikeInfo.textContent = `${Math.round(data.current.feelslike_c)}°C`;
    humidityInfo.textContent = `${data.current.humidity}%`;
    // chance of rain API doesn't work properly - no data i guess
    chanceOfRainInfo.textContent = `${data.current.precip_mm}mm`;
    windSpeedInfo.textContent = `${Math.round(data.current.wind_kph)} km/h`;
    windDirectionInfo.textContent = data.current.wind_dir;

    // forecast
    for (let day = 0; day < 7; day += 1) {
      const forecastDayElement = document.querySelector(
        `.forecast-daily__day${day}`,
      );
      const forecastTemperatureMax = document.querySelector(
        `.forecast-daily__temperature-max${day}`,
      );
      const forecastTemperatureMin = document.querySelector(
        `.forecast-daily__temperature-min${day}`,
      );
      const forecastIcon = document.querySelector(
        `.forecast-daily__icon${day}`,
      );
      const forecastDetail = document.querySelector(`.forecast-detail${day}`);
      if (forecastDayElement) {
        forecastDayElement.textContent = data.forecast.forecastday[day].date;
        forecastTemperatureMax.textContent = `${Math.round(
          data.forecast.forecastday[day].day.maxtemp_c,
        )}°C`;
        forecastTemperatureMin.textContent = `${Math.round(
          data.forecast.forecastday[day].day.mintemp_c,
        )}°C`;
        forecastIcon.src = data.forecast.forecastday[day].day.condition.icon;
        forecastDetail.textContent = data.forecast.forecastday[day].day.condition.text;
      }
    }
  });
});

getForecastWeather('warsaw');
