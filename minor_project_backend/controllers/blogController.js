const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if the author exists
    const author = await User.findById(req.user.userId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Create a new blog post
    const newBlogPost = new BlogPost({
      title,
      content,
      author: req.user.userId,
    });

    // Save the blog post to the database
    await newBlogPost.save();

    res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
  } catch (error) {
    console.error(error); // Log the specific error
    res.status(500).json({ message: 'An error occurred while creating the blog post' });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');

    res.status(200).json({ blogPosts });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while getting all blog posts' });
  }
};

// Get a specific blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
console.log("id",id);
const blogPost = await BlogPost.findOne({ _id: id }).populate('author', 'username').populate('comments');
console.log("blogPost",blogPost);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ blogPost });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while getting the blog post' });
  }
};

// Update a blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    ).populate('author', 'username');

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post updated successfully', blogPost: updatedBlogPost });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the blog post' });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the blog post' });
  }
};
