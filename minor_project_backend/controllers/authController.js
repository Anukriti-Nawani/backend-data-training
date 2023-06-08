const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"15m"});

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

// User logout
exports.logout = (req, res) => {
  // Code for user logout
  // Implement your logic for user logout, such as invalidating tokens or clearing session data
};


// Update user details by ID
exports.updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    // Update the user details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User details updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating user details' });
  }
};


// Get user details by ID
exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving user details' });
  }
};

// Delete user account by ID
exports.deleteUserAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user account
    await user.deleteOne();

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting user account' });
  }
};