import BlogCard from "@/components/BlogCard";
import { BlogData } from "@/type";
import { cookies } from "next/headers";
import { getBlogsData } from "@/lib/actions/blogs.action";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
    return;
  }

  const blogsData: BlogData[] = await getBlogsData(token);

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
}
