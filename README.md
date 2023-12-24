[DEMO LINK](https://oksana-kyryienko.github.io/vue_weather/)

Weather App API Documentation
Introduction
The Weather App API provides functionality to retrieve weather information, including current weather, hourly temperature data, and a five-day weather forecast. The API is integrated with Mapbox and OpenWeatherMap to obtain location suggestions and weather data.

Usage
1. City Suggestions
getCitySuggestions(input: string) => Promise<Array<string>>
This function retrieves a list of city name suggestions based on the provided input.

Input:

input (string): The user input for city name.
Output:

Returns a promise that resolves to an array of suggested city names.
2. Current Weather Data
getWeatherData(cityName: string) => Promise<Object>
This function fetches the current weather data for a specified city.

Input:

cityName (string): The name of the city for which weather data is requested.
Output:

Returns a promise that resolves to an object containing the current weather information.
3. Hourly Temperature Data
getHourlyTemperatureData(cityName: string) => Promise<Object>
This function retrieves hourly temperature data for a specified city.

Input:

cityName (string): The name of the city for which hourly temperature data is requested.
Output:

Returns a promise that resolves to an object containing hourly temperature data.
4. Five-Day Forecast
getFiveDayForecast(cityName: string) => Promise<Array<Object>>
This function fetches a five-day weather forecast for a specified city.

Input:

cityName (string): The name of the city for which the forecast is requested.
Output:

Returns a promise that resolves to an array of objects, each representing a day in the forecast.
Example Usage
javascript
Copy code
import { getCitySuggestions, getWeatherData, getHourlyTemperatureData, getFiveDayForecast } from 'weather-api';

// Example 1: City Suggestions
const suggestions = await getCitySuggestions('New');
console.log(suggestions);

// Example 2: Current Weather Data
const weatherData = await getWeatherData('New York');
console.log(weatherData);

// Example 3: Hourly Temperature Data
const hourlyTemperatureData = await getHourlyTemperatureData('London');
console.log(hourlyTemperatureData);

// Example 4: Five-Day Forecast
const fiveDayForecast = await getFiveDayForecast('Paris');
console.log(fiveDayForecast);
Note
Ensure that you have the required API keys for Mapbox and OpenWeatherMap in your application.

Handle errors appropriately by catching exceptions and displaying relevant error messages.

Use the provided functions to build a weather application that meets your specific requirements.
