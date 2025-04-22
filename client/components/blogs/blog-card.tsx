import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { deleteBlog } from "@/lib/actions/blogs.action";
import { useState } from "react";
import { LuPencil, LuTrash2, LuUser2 } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import DialogContentComponent from "../common/dialog-content";
import { CardContent, CardDescription, CardTitle } from "../ui/card";

const BlogCard = ({
  blog,
  convertDate,
  screentype,
  setAction,
  setBlogData,
  setLoading,
}: any) => {
  const token: any = localStorage.getItem("token");
  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteBlog(blog._id, token);
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.success("Error deleting blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="p-4 md:p-6">
      <CardTitle className="flex flex-row justify-between item-center text-lg  font-semibold mb-2">
        <div className="text-[#4B6BFB]">
          {blog.title.length > 25
            ? blog.title.slice(0, 25) + "..."
            : blog.title}
        </div>
        {screentype === "dashboard" && (
          <div className="flex flex-row space-x-4">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <LuTrash2
                    className="text-[red] cursor-pointer"
                    // onClick={() => {
                    //   handleDelete();
                    // }}
                  />
                </DialogTrigger>
                <DialogContentComponent
                  title={"Delete Confirmation"}
                  description={`This will delete ${blog.title}`}
                  size={"xl"}
                  buttonText={"Delete"}
                  handleClick={handleDelete}
                />
              </Dialog>
            </div>
            <div>
              <LuPencil
                className="text-[#4B6BFB] cursor-pointer"
                onClick={() => {
                  setAction((prev: any) => ({ ...prev, isEditing: true }));
                  setBlogData({
                    title: blog.title,
                    content: blog.content,
                    blogId: blog._id,
                    authorId: blog.authorId,
                  });
                }}
              />
            </div>
          </div>
        )}
      </CardTitle>
      <CardDescription className="flex flex-col items-start text-sm text-gray-500 dark:text-gray-400 space-y-2 mb-4">
        <div className="flex justify-center items-center">
          <LuUser2 className="w-4 h-4 mr-1" />
          <span>{blog?.author ?? ""}</span>
          <span className="mx-2">·</span>
          <span>{convertDate(blog?.createdAt)}</span>
        </div>
      </CardDescription>
      <CardContent className="text-[#333333] pl-0">
        {blog.content.length > 200
          ? blog.content.slice(0, 149) + "..."
          : blog.content}
      </CardContent>
    </CardContent>
  );
};

export default BlogCard;
