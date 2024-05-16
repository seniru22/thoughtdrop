"use client";

import api from "@/api/api";
import BlogCard from "@/components/BlogCard";
import { BlogData } from "@/type";
import isNotAuth from "@/context/isNotAuth";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogsData, setBlogsData] = useState<BlogData[]>([]);

  const getBlogsData = async () => {
    try {
      const response = await api.get("/blogs");
      setBlogsData(response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  return (
    <main className="mx-[2rem] md:mx-[10rem]">
      <div className="text-[#333333] text-[2rem] font-bold py-10">
        Latest Blogs
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

export default isNotAuth(Home);
