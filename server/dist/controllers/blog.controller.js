"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../models/db");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;
        const insertQuery = `INSERT INTO blogs (title, content, author_id) VALUES ($1, $2, $3)`;
        const params = [title, content, userId];
        const result = yield db_1.client.query(insertQuery, params);
        return res
            .status(200)
            .json({ status: true, message: "Blog created successfully" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
    }
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectQuery = `SELECT b.*, u.username, u.email FROM blogs AS b LEFT JOIN users AS u ON u.id=b.author_id`;
        const result = yield db_1.client.query(selectQuery);
        return res
            .status(200)
            .json({
            status: true,
            data: result.rows,
            message: "Blogs fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
    }
});
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const selectQuery = `SELECT b.*, u.username, u.email FROM blogs AS b LEFT JOIN users AS u ON u.id=b.author_id WHERE author_id = $1`;
        const params = [userId];
        const result = yield db_1.client.query(selectQuery, params);
        return res
            .status(200)
            .json({
            status: true,
            data: result.rows,
            message: "Blogs fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
    }
});
const getAuthorPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.query.author;
        const selectQuery = `SELECT b.*, u.username, u.email FROM blogs AS b LEFT JOIN users AS u ON u.id=b.author_id WHERE author_id = $1`;
        const params = [authorId];
        const result = yield db_1.client.query(selectQuery, params);
        return res
            .status(200)
            .json({
            status: true,
            data: result.rows,
            message: "Blogs fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
    }
});
module.exports = { createBlog, getAllBlogs, getUserPosts, getAuthorPosts };
