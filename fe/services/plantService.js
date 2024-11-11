import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_TREFLE_API_BASE_URL;
const API_KEY = process.env.REACT_APP_TREFLE_API_KEY;



export const fetchPlants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/plants`);
    return response.data; // Assuming your backend sends a JSON response
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};

export const fetchPlantInfo = async (plantId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/plants/${plantId}?token=${API_KEY}`);
    return response.data.data; // Contains plant details
  } catch (error) {
    console.error('Error fetching plant data:', error);
    throw error;
  }
};



export const fetchSearchedPlants = async (searchTerm) => {
  let allPlants = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await axios.get(
        `${API_BASE_URL}/plants/search?token=${API_KEY}&q=${searchTerm}&page=${page}`
      );
      const data = response.data;

      if (data.plants) {
        allPlants = [...allPlants, ...data.plants]; // Combine results
      }

      totalPages = Math.ceil(data.total / 20); // Assuming 20 items per page
      page++;
    } while (page <= totalPages);

    return allPlants;
  } catch (error) {
    console.error('Error fetching searched plants:', error);
    throw error;
  }
};