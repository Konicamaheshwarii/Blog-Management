 
const express = require('express');
const { createBlog, getBlogs } = require('../controllers/blog.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);

module.exports = router;
