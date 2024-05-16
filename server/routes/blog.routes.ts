import express, { Router } from "express"
const { createBlog, getAllBlogs, getAuthorPosts, getMyPosts } = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/user.middleware");

const router: Router = express.Router();

router.post('/blog', isAuthenticated, createBlog);
router.get('/blogs', isAuthenticated, getAllBlogs);
router.get('/blogs/author', isAuthenticated, getAuthorPosts);

module.exports = router;

