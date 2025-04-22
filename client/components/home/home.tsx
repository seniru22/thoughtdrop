"use client";
import React, { useEffect, useState } from "react";
import { BlogData } from "@/type";
import { getBlogsData } from "@/lib/actions/blogs.action";
import Blog from "@/components/blogs/blog";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  token: string;
}

export default function Home({ token }: Props) {
  const [blogsData, setBlogsData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async () => {
    try {
      const blogs = await getBlogsData(token);
      setBlogsData(blogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4B6BFB" size={40} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <main className="mx-[2rem] lg:mx-[10rem]">
      <div className="text-[#333333] text-[2rem] font-bold py-10">
        Latest Blogs
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {blogsData.length > 0 ? (
          blogsData.map((blog) => (
            <Blog key={blog._id} blog={blog} screentype="home" />
          ))
        ) : (
          <div className="text-[#333333] text-[1rem] font-medium">
            No blogs found
          </div>
        )}
      </div>
    </main>
  );
}
