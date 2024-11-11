const apiService = require('../services/apiService');
const Plant = require('../models/plant');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



// Populate plants in the database from the external API
const populatePlants = async (req, res) => {
    let page = 1;
    let totalRecords = 0;

    try {
        while (true) {
            const data = await apiService.fetchAllPlants(page);
            const plants = data.data;

            if (!plants || plants.length === 0) break;

            for (const plantData of plants) {
                // Check if the plant already exists to avoid duplicates
                const existingPlant = await Plant.findOne({ trefleId: plantData.id });
                if (!existingPlant) {
                    const newPlant = new Plant({
                        trefleId: plantData.id,
                        scientificName: plantData.scientific_name,
                        commonName: plantData.common_name,
                        family: plantData.family,
                        images: plantData.image_url ? [plantData.image_url] : [],
                    });
                    await newPlant.save(); // Save to the 'plants' collection
                    totalRecords++;
                }
            }

            console.log(`Page ${page} processed.`);

            // Delay before fetching the next page to avoid hitting rate limits
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            
            page++;
        }

        res.status(200).json({ message: `Plants database populated with ${totalRecords} records.` });
    } catch (error) {
        console.error('Error populating database:', error.message);
        res.status(500).json({ message: 'Error populating database', error: error.message });
    }
};

// Search for plants based on their common name
const searchPlants = async (req, res) => {
    const { commonName } = req.query;  // Get the common name from query parameters

    if (!commonName) {
        return res.status(400).json({ message: 'Common name is required.' });
    }

    try {
        // Query the database for plants with the specified common name
        const plants = await Plant.find({ commonName: { $regex: commonName, $options: 'i' } }); // Case-insensitive search

        if (plants.length === 0) {
            return res.status(404).json({ message: 'No plants found with that common name.' });
        }

        res.status(200).json(plants);
    } catch (error) {
        console.error('Error searching for plants:', error.message);
        res.status(500).json({ message: 'Error searching for plants', error: error.message });
    }
};
  
  


// Fetch all plants from the external API with pagination
const getAllPlantsFromAPI = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 20;  // Set a limit of 20 plants per page

    console.log(`Fetching plants for page: ${page}`);

    try {
        const plantsData = await apiService.fetchAllPlants(page);

        if (!plantsData || !plantsData.data || plantsData.data.length === 0) {
            return res.status(404).json({ message: 'No plants found in the external API' });
        }

        const links = {
            self: `/plants?page=${page}`,
            first: `/plants?page=1`,
            prev: page > 1 ? `/plants?page=${page - 1}` : null,
            next: plantsData.links.next ? `/plants?page=${parseInt(page) + 1}` : null,
            last: `/plants?page=${Math.ceil(plantsData.meta.total / plantsData.data.length)}`
        };

        res.status(200).json({
            data: plantsData.data,
            links,
            meta: {
                total: plantsData.meta.total,
                currentPage: page,
                lastPage: Math.ceil(plantsData.meta.total / plantsData.data.length),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plants from external API', error: error.message });
    }
};

// Fetch detailed plant info from the external API
const getPlantInfo = async (req, res) => {
    const { plantId } = req.params;

    if (!plantId) {
        return res.status(400).json({ message: 'Plant ID is required' });
    }

    try {
        const plantData = await apiService.fetchPlantInfo(plantId);

        if (!plantData) {
            return res.status(404).json({ message: 'Plant not found in the external API' });
        }

        res.status(200).json(plantData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plant information from external API', error: error.message });
    }
};

// Get a plant by its Trefle ID
const getPlantByTrefleId = async (req, res) => {
    const { id } = req.params;

    try {
        const plant = await Plant.findOne({ trefleId: id });

        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving plant data', error: error.message });
    }
};

module.exports = { 
    getPlantByTrefleId,  
    getAllPlantsFromAPI, 
    populatePlants, 
    searchPlants, 
    getPlantInfo, 
    
};
