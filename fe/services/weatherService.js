import axios from 'axios';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '281a2c6bad4d09515b929ae2c5dc15be';

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
