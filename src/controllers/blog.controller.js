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

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Only Admin or the Author can update
        if (req.user.role !== "Admin" && req.user.id !== blog.author.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Only Admin can delete
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Add a Comment to a Blog (Authors Only)
exports.addComment = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { text } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Push new comment into the blog's comments array
        blog.comments.push({ user: req.user.id, text });
        await blog.save();

        res.status(201).json({ message: "Comment added successfully", blog });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get Comments for a Blog
exports.getComments = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const blog = await Blog.findById(id).populate('comments.user', 'name email');

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.json(blog.comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
