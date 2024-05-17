"use client";

import api from "@/api/api";
import BlogCard from "@/components/BlogCard";
import { BlogData } from "@/type";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthorBlogs = () => {
  const [blogsData, setBlogsData] = useState<BlogData[]>([]);
  const searchParams = useSearchParams();
  const authorId = searchParams.get("author");

  const getAuthorBlogs = async () => {
    try {
      const response = await api.get(`/posts/author?author=${authorId}`);
      setBlogsData(response.data.data);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getAuthorBlogs();
  }, [authorId]);

  return (
    <main className="mx-[2rem] md:mx-[10rem]">
      <div className="text-[#333333] text-[2rem] font-bold py-10">
        Blogs by {authorId}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogsData.length > 0 ? (
          blogsData.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="text-[#333333] text-[1rem] font-medium">
            No blogs found
          </div>
        )}
      </div>
    </main>
  );
};

export default AuthorBlogs;
