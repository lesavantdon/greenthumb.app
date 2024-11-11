const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const TREFLE_API_URL = 'https://trefle.io/api/v1/plants';
const API_KEY = process.env.TREFLE_API_TOKEN;


// Function to fetch all plants from Trefle API
const fetchAllPlants = async (page = 1) => {
    try {
        const response = await axios.get(`${TREFLE_API_URL}?token=${API_KEY}&page=${page}`);
        console.log(`Fetching from Trefle API: ${TREFLE_API_URL}?token=${API_KEY}&page=${page}`);

        return response.data; // Return all plants data
    } catch (error) {
        throw new Error(`Error fetching plants data: ${error.message}`);
    }
};




module.exports = { fetchAllPlants};
