const Post = require('../models/postModel');

exports.getPosts = async (req, res, next) => {
  try {
    //const filteredPosts = await Post.find({ username: req.user.username });
    const filteredPosts = await Post.find();
    // req.filteredPosts = filteredPosts;
    // next();
    res.status(200).json(filteredPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching posts from the database' });
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.id;
console.log('postId', postId);
  try {
    const post = await Post.findOne({ _id: postId});
    console.log('post', post);

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    const updatedPost = await Post.updateOne(
      { _id: postId},
      { $set: { title: req.body.title} }
    );

    if (updatedPost.nModified === 0) {
      return res.status(200).json({ message: 'No changes made' });
    }

    res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating the post' });
  }
};








exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ _id: postId});
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting the post' });
  }
};
