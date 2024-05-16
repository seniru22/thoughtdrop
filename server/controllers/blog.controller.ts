import { client } from "../models/db";
import { ReqMid } from "../types/user";
import { QueryResult } from "pg";

const createBlog = async (req: ReqMid, res: any) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const insertQuery: string = `INSERT INTO blogs (title, content, author_id) VALUES ($1, $2, $3)`;
    const params: any[] = [title, content, userId];
    const result: QueryResult<any> = await client.query(insertQuery, params);
    return res
      .status(200)
      .json({ status: true, message: "Blog created successfully" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const getAllBlogs = async (req: ReqMid, res: any) => {
  try {
    const selectQuery: string = `SELECT b.*, u.username, u.email FROM blogs AS b LEFT JOIN users AS u ON u.id=b.author_id`;
    const result: QueryResult<any> = await client.query(selectQuery);
    return res
      .status(200)
      .json({
        status: true,
        data: result.rows,
        message: "Blogs fetched successfully",
      });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const getAuthorPosts = async (req: ReqMid, res: any) => {
  try {
    const authorId = req.query.author;
    const selectQuery: string = `SELECT b.*, u.username, u.email FROM blogs AS b LEFT JOIN users AS u ON u.id=b.author_id WHERE author_id = $1`;
    const params: any[] = [authorId];
    const result: QueryResult<any> = await client.query(selectQuery, params);
    return res
      .status(200)
      .json({
        status: true,
        data: result.rows,
        message: "Blogs fetched successfully",
      });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

module.exports = { createBlog, getAllBlogs, getAuthorPosts };
