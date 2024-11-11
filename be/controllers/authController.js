// In authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, username, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

   

    // Create new user
    const user = new User({
      name,
      username,
      email,
      phone,
      password,
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Respond with user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });  // Include the error message
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login credentials:', { username, password }); 

  try {
    // Step 1: Check if the user exists
    const user = await User.findOne({ username });
    console.log('User found:', user); 

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Received password:', password); // The password entered in login
    console.log('Stored password:', user.password);
    // Step 2: Check if the password matches the hashed password in the database
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    
  
    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    // Step 4: Send token back to the client (you can send other user info if needed)
    res.json({
      token, // Sending back token to the client
      user: {
        id: user._id,
        username: user.username,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
