// server.js or app.js
const express = require('express');
const dotenv = require('dotenv'); // Import dotenv
const app = express();
const plantRoutes = require('./routes/plantRoutes'); 
const authRoutes = require('./routes/authRoutes'); 


dotenv.config(); // Load environment variables



// Connect to the database
connectDB();

// Middleware and route setup
app.use(express.json());

app.use('/api/v1/plants', plantRoutes); 
app.use('/api/auth', authRoutes); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
