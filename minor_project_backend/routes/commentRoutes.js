const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new comment
router.post('/:blogPostId', authMiddleware.authenticateUser, commentController.createComment);

// Get all comments for a blog post
router.get('/:blogPostId', commentController.getCommentsByBlogPostId);

// Update a comment
router.put('/:id', authMiddleware.authenticateUser, commentController.updateComment);

// Delete a comment
router.delete('/:id', authMiddleware.authenticateUser, commentController.deleteComment);

module.exports = router;
