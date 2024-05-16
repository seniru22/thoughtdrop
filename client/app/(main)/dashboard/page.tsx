"use client";

import api from "@/api/api";
import BlogCard from "@/components/BlogCard";
import isNotAuth from "@/context/isNotAuth";
import { BlogData } from "@/type";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userBlogsData, setUserBlogsData] = useState<BlogData[]>([]);

  const getUserBlogsData = async () => {
    try {
      const response = await api.get("/blogs");
      setUserBlogsData(response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getUserBlogsData();
  }, []);

  return (
    <main className="mx-[10rem]">
      <div className="text-[#333333] text-[2rem] font-bold py-10">
        My Blogs
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userBlogsData.length > 0 ? (
          userBlogsData.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="text-[#333333] text-[1rem] font-medium">
            No blogs found
          </div>
        )}
      </div>
    </main>
  );
};

export default isNotAuth(Dashboard);
