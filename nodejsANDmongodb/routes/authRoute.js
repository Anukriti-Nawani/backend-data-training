const express = require('express');
const router = express.Router();
const { refreshToken, logout, login,register } = require('../controllers/authController');

router.post('/token', refreshToken);
router.delete('/logout', logout);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
