const mongoose = require('mongoose');
const Plant = require('./models/plant');
const User = require('./models/user');

const seedPlants = async () => {
    try {
        // Create a sample user
        const user = new User({ username: 'sampleuser', password: 'password' });
        await user.save();

        // Create sample plants
        const plants = [
            { user: user._id, scientificName: 'Aloe Vera', commonName: 'Aloe', family: 'Asphodelaceae' },
            { user: user._id, scientificName: 'Ficus benjamina', commonName: 'Weeping Fig', family: 'Moraceae' },
        ];

        await Plant.insertMany(plants);
        console.log('Sample plants seeded');
    } catch (error) {
        console.error('Error seeding plants:', error);
    }
};

seedPlants();
