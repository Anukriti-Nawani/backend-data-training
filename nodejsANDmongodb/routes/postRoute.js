const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
//const authMiddleware = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authMiddleware');

//router.get('/', authMiddleware.authenticateToken, postController.getPosts);
router.get('/', postController.getPosts);
router.put('/:id', authenticateToken, postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;
