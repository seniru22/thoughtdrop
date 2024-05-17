import BlogCard from "./BlogCard";
import { Suspense } from "react";
import { BlogData } from "@/type";
import { getAuthorBlogs } from "@/lib/actions/blogs.action";

const AuthorData = async ({
  authorId,
  token,
}: {
  authorId: string;
  token: string | undefined;
}) => {
  const authorBlogs: BlogData[] = await getAuthorBlogs({ authorId, token });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="text-[#333333] text-[2rem] font-bold py-10">
        Blogs with author id {authorId}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {authorBlogs.length > 0 ? (
          authorBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="text-[#333333] text-[1rem] font-medium">
            No blogs found
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default AuthorData;
