const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new blog post
router.post('/', authMiddleware.authenticateUser, blogController.createBlogPost);

// Get all blog posts
router.get('/', blogController.getAllBlogPosts);

// Get a specific blog post by ID
router.get('/:id', blogController.getBlogPostById);

// Update a blog post
router.put('/:id', authMiddleware.authenticateUser, blogController.updateBlogPost);

// Delete a blog post
router.delete('/:id', authMiddleware.authenticateUser, blogController.deleteBlogPost);

module.exports = router;
