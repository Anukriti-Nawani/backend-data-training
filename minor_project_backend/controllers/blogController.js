const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');


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

// Get all blog posts with pagination and filtering


exports.getAllBlogPosts = async (req, res) => {
  try {
    const { page = 1, limit = 2, author } = req.query;
console.log(req.query);
    // Check if the author parameter is provided and is a non-empty string
    if (author && typeof author === 'string' && author.trim() !== '') {
      // Check if the author exists in the User collection
      const authorExists = await User.exists({ _id: author });

      // If the author doesn't exist, return an error response
      if (!authorExists) {
        return res.status(400).json({ message: 'Invalid author ID' });
      }
    }

    // Construct the filter object based on the specified criteria
    const filter = {};
    if (author) {
      filter.author = author;
    }

    // Fetch the total count of blog posts matching the filter
    const totalCount = await BlogPost.countDocuments(filter);

    // Apply pagination and filtering to the database query
    const blogPosts = await BlogPost.find(filter)
      .populate('author', 'username')
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      blogPosts
    });
  } catch (error) {
    console.error(error);
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
