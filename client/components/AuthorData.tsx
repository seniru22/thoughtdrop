"use client";
import BlogCard from "./blogs/blog";
import { useEffect, useState } from "react";
import { BlogData } from "@/type";
import { getBlogsData } from "@/lib/actions/blogs.action";
import ClipLoader from "react-spinners/ClipLoader";

const AuthorData = ({
  searchText,
  token,
}: {
  searchText: string;
  token: string | undefined;
}) => {
  const [blogsData, setBlogsData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogs = await getBlogsData(token);
      setBlogsData(blogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogsData.filter((blog) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4B6BFB" size={40} />
      </div>
    );
  }

  return (
    <div>
      <div className="text-[#333333] text-[2rem] font-bold py-10">
        Filtered Blogs
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} screentype="authorBlogs" />
          ))
        ) : (
          <div className="text-[#333333] text-[1rem] font-medium">
            No blogs found
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorData;
