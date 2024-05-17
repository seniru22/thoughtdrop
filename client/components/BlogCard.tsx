import { BlogData } from "@/type";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type BlogDataProps = {
  blog: BlogData;
};

const BlogCard = ({ blog }: BlogDataProps) => {
  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="">
      <Card className="bg-white rounded-xl shadow-md overflow-hidden border">
        <CardContent className="p-4 md:p-6">
          <CardTitle className="text-lg text-[#4B6BFB] font-semibold mb-2">
            {blog.title.length > 30
              ? blog.title.slice(0, 30) + "..."
              : blog.title}
          </CardTitle>
          <CardDescription className="flex flex-col items-start text-sm text-gray-500 dark:text-gray-400 space-y-2 mb-4">
            <div className="flex justify-center items-center">
              <LuUser2 className="w-4 h-4 mr-1" />
              <span>{blog.username}</span>
              <span className="mx-2">·</span>
              <span>{convertDate(blog.created_at)}</span>
            </div>
            <div className="text-gray-500">Author Id: {blog.author_id}</div>
          </CardDescription>
          <CardContent className="text-[#333333] pl-0">
            {blog.content.length > 200
              ? blog.content.slice(0, 149) + "..."
              : blog.content}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
