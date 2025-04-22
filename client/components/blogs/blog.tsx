import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogData } from "@/type";
import BlogCard from "./blog-card";

type BlogDataProps = {
  blog: BlogData;
  screentype: string;
  setAction?: any;
  setBlogData?: any;
  setLoading?: any;
};

const Blog = ({
  blog,
  screentype,
  setAction,
  setBlogData,
  setLoading,
}: BlogDataProps) => {
  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog>
      {screentype === "dashboard" ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border">
          <BlogCard
            blog={blog}
            convertDate={convertDate}
            screentype={screentype}
            setAction={setAction}
            setBlogData={setBlogData}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <DialogTrigger asChild className="cursor-pointer">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <BlogCard
              blog={blog}
              convertDate={convertDate}
              screentype={screentype}
            />
          </div>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#4B6BFB] font-semibold mb-2">
            {" "}
            {blog.title ?? ""}
          </DialogTitle>
          <DialogDescription>
            {blog.content ? blog.content : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start space-y-1 mt-4 text-sm text-gray-600">
          <div>Author: {blog.author ?? ""}</div>
          <div>Published on: {convertDate(blog.createdAt)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Blog;
