const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    console.log("blogPostId", blogPostId);
    const { content } = req.body;
    console.log("content", content);

    // Get the userId from req.user object
    const { userId } = req.user;

    // Create the comment
    const comment = new Comment({
      content,
      blogPost: blogPostId,
      author: userId

    });
console.log("comment", comment);
    // Save the comment to the database
    await comment.save();

    // Associate the comment with the blog post
    const blogPost = await BlogPost.findById(blogPostId);
    blogPost.comments.push(comment._id);
    await blogPost.save();

    res.status(201).json({ comment });
  } catch (error) {
    console.log("err", error)
    res.status(500).json({ message: 'An error occurred while creating the comment' });
  }
};


// Get all comments for a blog post
exports.getCommentsByBlogPostId = async (req, res) => {
  try {
    const { blogPostId } = req.params;

    // Find the blog post and populate the comments
    const blogPost = await BlogPost.findById(blogPostId).populate('comments');

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ comments: blogPost.comments });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while getting the comments' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Find the comment and update its content
    const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the comment' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the comment and delete it
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment reference from the associated blog post
    await BlogPost.findByIdAndUpdate(comment.blogPost, {
      $pull: { comments: comment._id }
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the comment' });
  }
};
