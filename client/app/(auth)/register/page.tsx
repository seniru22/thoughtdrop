"use client";

import { toast } from "sonner";
import { useState } from "react";
import { RegisterForm } from "@/type";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

// ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import isAuth from "@/context/isAuth";
import { baseURL } from "@/api/api";

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const username = userData.username;
    const email = userData.email;
    const password = userData.password;

    if (!username || !email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/signup`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      toast.success(response.data.message);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  return (
    <main className="bg-[#e1e7ff] flex justify-center items-center h-screen">
      <Card className="w-3/4 sm:w-1/3 py-2 lg:py-4 rounded-xl bg-[#fff] text-[#333333] border border-[#e1e7ff] flex justify-center items-center">
        <div className="">
          <CardHeader className="mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2 text-[#4B6BFB] font-semibold">Register</CardTitle>
            <CardDescription className="text-sm text-center text-[#4B6BFB]">
              Create an Account to prepare{" "}
              <span className="font-semibold">Blogs</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="lg:w-[25rem] grid w-full items-center gap-4">
                <div className="flex flex-col space-y-4">
                  <div className="">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter Username"
                      className="mt-2 border rounded-xl text-[#333333]"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                    />
                  </div>{" "}
                  <div className="">
                    <Label htmlFor="name">Email Address</Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Email Address"
                      className="mt-2 border rounded-xl text-[#333333]"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Password"
                      className="mt-2 border rounded-xl text-[#333333]"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full mt-2 rounded-xl text-[#fff] bg-[#4B6BFB] hover:bg-[#3B49C0]"
            >
              Register
            </Button>
            <p className="text-xs text-[#4B6BFB]">
              Already have an account?{" "}
              <span className="text-[#4B6BFB]">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </CardFooter>
        </div>
      </Card>
    </main>
  );
};

export default isAuth(Register);