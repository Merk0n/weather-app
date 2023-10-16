const apiKey = 'f1674b3f51d74877b6e95543231510';
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Warsaw`;

const getCurrentWeather = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
};

export default getCurrentWeather;
