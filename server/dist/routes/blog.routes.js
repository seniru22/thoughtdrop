"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createBlog, getAllBlogs, getAuthorPosts, getUserPosts } = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/user.middleware");
const router = express_1.default.Router();
router.post('/post', isAuthenticated, createBlog);
router.get('/posts', isAuthenticated, getAllBlogs);
router.get('/posts/user', isAuthenticated, getUserPosts);
router.get('/posts/author', isAuthenticated, getAuthorPosts);
module.exports = router;
