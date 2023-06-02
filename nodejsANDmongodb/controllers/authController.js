const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// authController.js

// Function for handling token refresh
exports.refreshToken = (req, res) => {
    // Placeholder logic for token refresh
    // Replace with your actual implementation
    res.send('Token refresh endpoint');
  };
  
  // Function for handling logout
  exports.logout = (req, res) => {
    // Placeholder logic for logout
    // Replace with your actual implementation
    res.send('Logout endpoint');
  };

  
  // register and login
  exports.register = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ username }).maxTimeMS(20000); // Set timeout to 20 seconds
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      
  
      // Create a new user
      const newUser = new User({ username, password});
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
const user = await User.findOne({ username }).maxTimeMS(20000); // Set timeout to 20 seconds
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the password
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  