"use client";

import { toast } from "sonner";
import { BlogData } from "@/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/api/api";
import Blog from "@/components/blogs/blog";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LuXCircle } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
const Dashboard = () => {
  const auth =
    typeof window !== "undefined" ? !!localStorage.getItem("token") : "";

  const router = useRouter();
  const [userBlogsData, setUserBlogsData] = useState<BlogData[]>([]);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    blogId: "",
    authorId: "",
  });
  const [action, setAction] = useState({ isEditing: false, isDeleting: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  const getUserBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/posts/user");
      setUserBlogsData(response.data.data);
    } catch (err: any) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!blogData.title || !blogData.content) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await api.post("/post/update", blogData);
      toast.success(response.data.message);
      router.push("/");
    } catch (err: any) {
      console.log("Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center h-screen">
        <ClipLoader color="#4B6BFB" size={40} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <main className="flex flex-col lg:flex-row gap-10 p-8 lg:mx-[4rem]">
      <div className="w-full lg:max-w-[60%]">
        <div className="text-[#333333] text-[2rem] font-bold pb-10">
          Personal Blogs
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBlogsData.length > 0 ? (
            userBlogsData.map((blog) => (
              <Blog
                key={blog._id}
                blog={blog}
                screentype={"dashboard"}
                setAction={setAction}
                setBlogData={setBlogData}
                setLoading={setLoading}
              />
            ))
          ) : (
            <div className="text-[#333333] text-[1rem] font-medium">
              No personal blogs found
            </div>
          )}
        </div>
      </div>
      {action.isEditing && userBlogsData.length > 0 && (
        <div className="w-full lg:w-[40%]">
          <Card className="md:w-full max-w-3xl bg-white dark:bg-[#333333] rounded-xl shadow-xl p-4 md:p-8">
            <div className="flex justify-end">
              <LuXCircle
                className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => {
                  setAction((prev) => ({ ...prev, isEditing: false }));
                }}
              />
            </div>
            <div className="flex justify-center items-center my-5 md:my-10 text-2xl font-bold text-[#333333] dark:text-gray-200">
              Publish Blog
            </div>
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
                    Save
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
