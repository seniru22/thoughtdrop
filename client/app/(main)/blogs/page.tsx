import AuthorData from "@/components/AuthorData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthorBlogs = ({
  searchParams,
}: {
  searchParams: {
    author: string;
  };
}) => {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <main className="mx-[2rem] lg:mx-[10rem]">
      <AuthorData searchText={searchParams.author} token={token} />
    </main>
  );
};

export default AuthorBlogs;
