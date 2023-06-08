const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

// Update user details by ID
router.put('/:id', authController.updateUserDetails);

// Get user details by ID
router.get('/:id', authController.getUserDetails);

// Delete user account by ID
router.delete('/:id', authController.deleteUserAccount);


module.exports = router;
