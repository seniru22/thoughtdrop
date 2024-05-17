import express, { Router } from "express"
const { createBlog, getAllBlogs, getAuthorPosts, getUserPosts } = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/user.middleware");

const router: Router = express.Router();

router.post('/post', isAuthenticated, createBlog);
router.get('/posts', isAuthenticated, getAllBlogs);
router.get('/posts/user', isAuthenticated, getUserPosts);
router.get('/posts/author', isAuthenticated, getAuthorPosts);

module.exports = router;

