const Blog = require('../models/blog.model');

exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog({ ...req.body, author: req.user.id });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
};
