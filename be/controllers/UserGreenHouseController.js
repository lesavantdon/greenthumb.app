const User = require('../models/User');  // User model
const Plant = require('../models/plant'); // Assuming you have a Plant model 
const axios = require('axios');

const jwt = require('jsonwebtoken'); // You might not need this here if `authMiddleware` handles it

// Controller to get greenhouse data for the logged-in user
const getGreenhouseData = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.id);
    const user = await User.findById(req.user.id).populate({
      path: 'greenhouse', // Populate the greenhouse field
      model: 'Plant',    // Reference the Plant model

    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User's full data:", user); 
     console.log("User's greenhouse data:", user.greenhouse);
    if (user.greenhouse.length === 0) {
      return res.status(200).json({ message: 'Your greenhouse is empty.' });
    }

    // Return the populated greenhouse data
    res.json(user.greenhouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller to add a plant to the user's greenhouse
const addPlantToGreenhouse = async (req, res) => {
    const { plantId } = req.body;  // Plant ID from the request body
    const userId = req.user.id;  // Get user ID from the JWT token

    try {
        // Find the plant by its ID (or Trefle ID, adjust as necessary)
        const plant = await Plant.findOne({ trefleId: plantId });  // Adjust based on your schema

        if (!plant) {
            return res.status(404).json({ success: false, message: 'Plant not found' });
        }

        // Find the user and add the plant to their greenhouse
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the plant is already in the greenhouse to prevent duplicates
        if (user.greenhouse.includes(plant._id)) {
            return res.status(400).json({ success: false, message: 'Plant already in greenhouse' });
        }

        // Add the plant to the user's greenhouse
        user.greenhouse.push(plant._id);
        await user.save();

        res.status(200).json({ success: true, message: 'Plant added to greenhouse', plant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getGreenhouseData, addPlantToGreenhouse };
