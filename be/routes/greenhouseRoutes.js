const express = require('express');
const { getGreenhouseData,addPlantToGreenhouse } = require('../controllers/UserGreenHouseController'); 
 const {protect} = require('../middleware/authMiddleware');

const router = express.Router();


// Route to get greenhouse data for the logged-in user
router.get('/greenhouse', protect, getGreenhouseData);
router.post('/greenhouse/add', protect, addPlantToGreenhouse);

module.exports = router;