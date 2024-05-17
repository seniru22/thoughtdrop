"use client";

import api from "@/api/api";
import BlogCard from "@/components/BlogCard";
import { BlogData } from "@/type";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthorBlogs = () => {
  const router = useRouter();
  const auth =
    typeof window !== "undefined" ? !!localStorage.getItem("token") : "";

  const [blogsData, setBlogsData] = useState<BlogData[]>([]);
  const searchParams = useSearchParams();
  const authorId = searchParams.get("author");

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);

  useEffect(() => {
    const getAuthorBlogs = async () => {
      try {
        const response = await api.get(`/posts/author?author=${authorId}`);
        setBlogsData(response.data.data);
      } catch (err: any) {
        toast.error("Error fetching blogs");
        console.log("Error: ", err);
      }
    };

    getAuthorBlogs();
  }, [authorId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="mx-[2rem] lg:mx-[10rem]">
        <div className="text-[#333333] text-[2rem] font-bold py-10">
          Blogs with author id {authorId}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {blogsData.length > 0 ? (
            blogsData.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="text-[#333333] text-[1rem] font-medium">
              No blogs found
            </div>
          )}
        </div>
      </main>
    </Suspense>
  );
};

export default AuthorBlogs;
