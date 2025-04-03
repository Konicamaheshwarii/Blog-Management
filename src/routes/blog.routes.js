const express = require('express');
const { createBlog, getBlogs, updateBlog, deleteBlog, addComment, getComments } = require('../controllers/blog.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

// ✅ Create Blog (Admin Only)
router.post('/', authMiddleware, roleMiddleware(['Admin']), createBlog);

// ✅ Get All Blogs (Public)
router.get('/', getBlogs);

// ✅ Update Blog (Admin Only)
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateBlog);

// ✅ Delete Blog (Admin Only)
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteBlog);

// ✅ Add Comment to Blog (Authors & Members)
router.post('/:id/comment', authMiddleware, roleMiddleware(['Author', 'Member']), addComment);

// ✅ Get Comments for a Blog (Public)
router.get('/:id/comments', getComments);

module.exports = router;
