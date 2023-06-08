const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const db = require('./config/dbConnection');
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());



// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);

// Start the server
app.listen(6000, () => {
  console.log('Server started on port 6000');
});
