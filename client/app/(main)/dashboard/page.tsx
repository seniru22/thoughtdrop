import BlogCard from "@/components/BlogCard";
import { BlogData } from "@/type";
import { cookies } from "next/headers";
import { getUserBlogsData } from "@/lib/actions/blogs.action";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
    return;
  }

  const userBlogsData: BlogData[] = await getUserBlogsData(token);

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10">
      <div className="w-[90%] px-[2rem] md:px-[10rem]">
        <div className="text-[#333333] text-[2rem] font-bold py-10">
          Personal Blogs
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBlogsData.length > 0 ? (
            userBlogsData.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="text-[#333333] text-[1rem] font-medium">
              No personal blogs found
            </div>
          )}
        </div>
      </div>
      <div className="w-[30%] pr-[2rem] md:pr-[10rem]">
        {/* <PostBlogCard /> */}
      </div>
    </main>
  );
};

export default Dashboard;
