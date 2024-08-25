const express = require('express');
const Blog = require('../Model/Blog');
const bodyParser = require("body-parser")

const blog = express.Router();
const app = express();
app.use(bodyParser.json())
const verifyToken = require("../middleware/authMiddleware"); 
const router = express.Router();


blog.route("/").post(verifyToken, async (req, res) => {
  try {
    const { title, image, contents, conclusion } = req.body; 

    const newBlog = new Blog({
      title,
      image, 
      contents,
      conclusion,
      author: req.user.email,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


  blog.route('/').get(async (req, res) => {
  try {
    const blogs = await Blog.find({}, 'title'); 
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  });

  blog.route("/my-blogs").get(verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userBlogs = await Blog.find({ author: userEmail }); 
    console.log(userEmail)
    res.status(200).json(userBlogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user blogs", error: err.message });
  }
  });

  blog.route('/:id').get(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  });

  blog.route('/:blogId/comments').post(verifyToken, async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;
  const user = req.user.email;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({ user, content });
    await blog.save();

    res.status(200).json({ message: 'Comment added successfully', blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
});

blog.route('/:blogId/comments').get(async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).select('comments');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
});

blog.route('/:id').put(verifyToken, async (req, res) => {
  try {
    const { title, image, contents, conclusion } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, image, contents, conclusion }, { new: true });
    
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

blog.route('/:id').delete(verifyToken, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

blog.route('/:id').get(verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




  module.exports = blog;

