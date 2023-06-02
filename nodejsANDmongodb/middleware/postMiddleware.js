const Post = require('../models/postModel');

exports.getPosts = (req, res, next) => {
  console.log("hello")

  Post.find({ username: req.user.username })
    .then(posts => {
      req.filteredPosts = posts;
      next();
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: 'Error fetching posts from the database' });
    });
};
