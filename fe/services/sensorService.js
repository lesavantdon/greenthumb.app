import axios from 'axios';

const API_BASE_URL = 'https://api.thingspeak.com/channels/your_channel_id/fields/1.json';
const API_KEY = 'SE9HHOF6CV5JZ';

export const fetchSensorData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}?api_key=${API_KEY}&results=10`);
    return response.data.feeds; // Contains sensor readings
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};
