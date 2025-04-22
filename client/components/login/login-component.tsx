"use client";
import { toast } from "sonner";
import { useState } from "react";
import { LoginForm } from "@/type";
import { baseURL } from "@/api/api";
import { useAuth } from "@/context/Auth";
import { setCookie } from "cookies-next";
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

const LoginComponent = () => {
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
    <main className="flex flex-col lg:flex-row justify-center items-center h-screen bg-[#e1e7ff] px-4 lg:space-x-96 space-y-8 lg:space-y-0">
      {/* Left side - branding */}
      <div className="hidden lg:block mr-10">
        <CardDescription className="text-3xl text-center text-[#4B6BFB]">
          Welcome back to <div className="font-semibold">тнσυgнт∂яσρ !</div>
        </CardDescription>
      </div>

      {/* Right side - login form */}
      <div className="w-full sm:w-3/4 lg:w-1/3">
        <Card className="bg-white py-4 rounded-xl text-white border shadow-md">
          <CardHeader className="mb-3 flex justify-center items-center">
            <CardTitle className="mb-2 text-[#4B6BFB] font-semibold">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="w-full grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <div>
                    <Label htmlFor="email" className="text-[#4B6BFB]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      className="mt-2 border rounded-xl border-zinc-400 text-[#333333] placeholder:text-zinc-400 focus:border-[#4B6BFB] focus:ring-[#4B6BFB]"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-[#4B6BFB]">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="mt-2 border rounded-xl border-zinc-400 text-[#333333] placeholder:text-zinc-400 focus:border-[#4B6BFB] focus:ring-[#4B6BFB]"
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
          <CardFooter className="flex flex-col space-y-2 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl text-white bg-[#4B6BFB] hover:bg-[#4c5ce8]"
            >
              Login
            </Button>
            <div className="text-xs text-[#4B6BFB]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default LoginComponent;
