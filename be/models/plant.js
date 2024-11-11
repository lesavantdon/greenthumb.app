// be/models/plantModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the plant schema
const plantSchema = new mongoose.Schema({
    trefleId: { type: Number, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    scientificName: { type: String, required: false},
    commonName: { type: String, required: false},
    waterNeeds: { type: String, required: false},
    sunlight:{ type: String, required: false},
    soilType: { type: String, required: false},
    family: { type: String, required: false },
    images: { type: [String], default: [] }, // Updated to [String]
   

});

// Create the Plant model
const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
