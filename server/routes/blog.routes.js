import express, { Router } from "express"
import { createBlog, getAllBlogs, getAuthorPosts, getUserPosts, updateBlog, deleteBlog } from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post('/post', isAuthenticated, createBlog);
router.post('/post/update', isAuthenticated, updateBlog);
router.delete('/post/delete/:blogId', isAuthenticated, deleteBlog);
router.get('/posts', isAuthenticated, getAllBlogs);
router.get('/posts/user', isAuthenticated, getUserPosts);
router.get('/posts/author', isAuthenticated, getAuthorPosts);

export default router;

