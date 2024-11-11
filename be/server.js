const express = require('express');
const mongoose = require('mongoose');
const plantRoutes = require('./routes/plantRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const greenhouseRoutes = require('./routes/greenhouseRoutes');
const axios = require('axios');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Ensure your routes are registered properly
app.use('/plants', plantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/', greenhouseRoutes)

// Proxy route for Trefle API requests
app.get('/api/trefle/plants/:id', async (req, res) => {
    console.log(`Received request for plant ID: ${req.params.id}`); // Debug log
    try {
        const plantId = req.params.id; // Correct variable for the plant ID
        const trefleToken = process.env.TREFLE_API_TOKEN; // Make sure to set this in your .env file
        
        // Debug log for the token (optional, remove after checking)
        console.log(`Using Trefle token: ${trefleToken}`); 
        
        // Make the request to Trefle API
        const response = await axios.get(`https://trefle.io/api/v1/plants/${plantId}?token=${trefleToken}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Trefle API:', error.message); // More detailed error log
        res.status(500).json({ message: 'Error fetching data from Trefle API' });
    }
});

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
