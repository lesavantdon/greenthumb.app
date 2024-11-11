const express = require('express');
const router = express.Router();
const { getAllPlantsFromAPI, populatePlants, getPlantByTrefleId,  searchPlants, } = require('../controllers/plantController'); 



router.get('/', getAllPlantsFromAPI);
router.post('/populate', populatePlants);
router.get('/search', searchPlants);
router.get('/id', getPlantByTrefleId);






module.exports = router;
