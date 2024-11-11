require('dotenv').config();
const mongoose = require('mongoose');
const Plant = require('./models/plant');  // Adjust the path to your model
const apiService = require('./services/apiService');  // Adjust the path to your API service

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
});

const seedDatabase = async () => {
    try {
        // Check if data is already seeded
        const existingCount = await Plant.countDocuments();
        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} plants. No seeding required.`);
            return;
        }

        // Fetch and insert data from the external API
        let page = 1;
        let totalRecords = 0;

        while (true) {
            const data = await apiService.fetchAllPlants(page);
            const plants = data.data;
            
            if (!plants || plants.length === 0) break;

            const plantsToSave = plants.map(plantData => ({
                trefleId: plantData.id,
                scientificName: plantData.scientific_name,
                commonName: plantData.common_name,
                family: plantData.family,
                images: plantData.image_url ? [plantData.image_url] : [],
            }));

            // Insert plants in bulk
            await Plant.insertMany(plantsToSave, { ordered: false });
            totalRecords += plantsToSave.length;
            console.log(`Page ${page} processed.`);
            page++;
        }

        console.log(`Database populated with ${totalRecords} plant records.`);
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the seeding function
seedDatabase();
