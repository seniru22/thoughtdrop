"use client";

import api from "@/api/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const auth =
    typeof window !== "undefined" ? !!localStorage.getItem("token") : "";

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!auth) {
      redirect("/login");
    }
  }, [auth]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!blogData.title || !blogData.content) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await api.post("/post", blogData);
      toast.success(response.data.message);
      redirect("/");
    } catch (err: any) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center my-5 md:my-10 text-2xl font-bold text-[#333333] dark:text-gray-200">
        Publish Blog
      </div>
      <div className="flex justify-center items-center dark:bg-[#333333]">
        <Card className="md:w-full max-w-3xl bg-white dark:bg-[#333333] rounded-xl shadow-xl p-4 md:p-8">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  className="block text-sm font-medium text-[#4B6BFB] dark:text-gray-300"
                  htmlFor="title"
                >
                  Title
                </Label>
                <Input
                  className="mt-1 block w-full rounded-xl border-gray-300 
              shadow-sm focus:border-[#4B6BFB] focus:ring-[#4B6BFB] 
              sm:text-sm  placeholder:text-zinc-500"
                  type="text"
                  id="title"
                  placeholder="Enter blog post title"
                  value={blogData.title}
                  onChange={(e) =>
                    setBlogData({ ...blogData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label
                  className="block text-sm font-medium text-[#4B6BFB] dark:text-gray-300"
                  htmlFor="content"
                >
                  Content
                </Label>
                <Textarea
                  className="mt-1 block w-full rounded-xl border-gray-300 
              shadow-sm focus:border-[#4B6BFB] focus:ring-[#4B6BFB] 
              sm:text-sm placeholder:text-zinc-500"
                  rows={8}
                  id="content"
                  placeholder="Write your blog post content here"
                  value={blogData.content}
                  onChange={(e) =>
                    setBlogData({ ...blogData, content: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="inline-flex justify-center rounded-xl border border-transparent 
              bg-[#4B6BFB] py-2 px-4 text-sm font-medium text-white shadow-sm 
              hover:bg-[#3B49C0] focus:outline-none focus:ring-2 focus:ring-[#4B6BFB]
              focus:ring-offset-2 dark:bg-[#4B6BFB] dark:hover:bg-[#3B49C0] dark:focus:ring-[#4B6BFB]"
                  type="submit"
                >
                  Publish
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
