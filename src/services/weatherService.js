import axios from 'axios';

// Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
// Get your free API key from: https://openweathermap.org/api
const API_KEY = '26bd4fed6822d73cb6ae96a405adcd59';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
  try {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('Please add your OpenWeatherMap API key in weatherService.js');
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
    } else if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    } else if (error.response?.status === 400) {
      throw new Error('Please enter a valid city name.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }
};
