import Blog from "../models/blog-model.js";
import User from "../models/user-model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      authorId: req.user._id,
      author: req.user.username,
    });

    await blog.save();

    return res.status(200).json({
      status: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { blogId, title, content } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }

    if (blog.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: false, message: "Unauthorized" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }

    if (blog.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: false, message: "Unauthorized" });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await Blog.find({ authorId: userId }).populate("author", "username email");

    return res.status(200).json({
      status: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getAuthorPosts = async (req, res) => {
  try {
    const authorId = req.query.author;
    const blogs = await Blog.find({ authorId: authorId }).populate("author", "username email");

    return res.status(200).json({
      status: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
