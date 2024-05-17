"use client";

import { toast } from "sonner";
import { useState } from "react";
import { LoginForm } from "@/type";
import { baseURL } from "@/api/api";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import isAuth from "@/context/isAuth";

// components
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
import { setCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const { setUserAuthInfo } = useAuth();
  const [userData, setUserData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { email, password } = userData;

    if (!email || !password) {
      toast.error("All fields required!");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      setUserAuthInfo(response.data);

      const token = response.data.token;
      setCookie("token", token, { maxAge: 60 * 60 * 24 });

      toast.success(response.data.message);
      
      router.push("/");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  return (
    <main className="bg-[#e1e7ff] flex justify-center items-center h-screen">
      <Card className="bg-[#fff] w-3/4 sm:w-1/3 py-2 lg:py-4 rounded-xl text-white border shadow-md flex justify-center items-center">
        <div className="">
          <CardHeader className="lg:mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2 text-[#4B6BFB] font-semibold">
              Login
            </CardTitle>
            <CardDescription className="text-sm text-center text-[#4B6BFB]">
              Welcome back to{" "}
              <span className="font-semibold">Blog Platform</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="lg:w-[25rem] grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="">
                    <Label htmlFor="name" className="text-[#4B6BFB]">
                      Email Address
                    </Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Email Address"
                      className="mt-2 border rounded-xl border-zinc-400 text-[#333333]
                      placeholder:text-zinc-400 focus:border-[#4B6BFB] focus:ring-[#4B6BFB] "
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="name" className="text-[#4B6BFB]">
                      Password
                    </Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Password"
                      className="mt-2 border rounded-xl border-zinc-400 text-[#333333]
                      placeholder:text-zinc-400 focus:border-[#4B6BFB] focus:ring-[#4B6BFB] "
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
          <CardFooter className=" flex flex-col space-y-2 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl text-[#fff] bg-[#4B6BFB] hover:bg-[#4c5ce8]"
            >
              Login
            </Button>
            <p className="text-xs text-[#4B6BFB]">
              Don&apos;t have an account?{" "}
              <span className="">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </CardFooter>
        </div>
      </Card>
    </main>
  );
};

export default isAuth(Login);
