import Home from "@/components/home/home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function HomePage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <Home token={token!} />;
}
