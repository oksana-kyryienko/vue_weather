// weatherApi.js
import axios from 'axios';

const apiKey = 'fd287c543edbeee77bb83f0aedbe94b5';

export async function getWeatherData(cityName) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${cityName}:`, error);
    throw error;
  }
}
