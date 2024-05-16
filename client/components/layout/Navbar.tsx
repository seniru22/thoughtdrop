"use client";

import { useAuth } from "@/context/Auth";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import {
  IoCloseOutline,
  IoReorderThreeOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import api from "@/api/api";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const { authState: user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");
      console.log(response);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success(response.data.success);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.data.error);
      console.log("Error: ", err);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 md:p-10 shadow-md h-[60px] w-full">
      <div className="text-[#4B6BFB] text-lg md:text-3xl font-semibold">
        BlogPlatform
      </div>
      <div className="md:flex hidden justify-center items-center gap-10 text-[#333333]">
        <Link
          href="/"
          className={`hover:text-[#4B6BFB] ${
            pathname === "/" && "text-[#4B6BFB]"
          }`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`hover:text-[#4B6BFB] ${
            pathname === "/dashboard" && "text-[#4B6BFB]"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/blog"
          className={`hover:text-[#4B6BFB] ${
            pathname === "/blog" && "text-[#4B6BFB]"
          }`}
        >
          Blog
        </Link>
      </div>
      <div className="hidden md:flex justify-center items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <div
              onClick={() => setToggle(!toggle)}
              className="bg-[#4B6BFB] text-white rounded-full px-4 py-2 hover:cursor-pointer"
            >
              <div className="flex justify-between items-center gap-5">
                <div className="">{user.user.username}</div>
                {!toggle ? (
                  <FaAngleDown className="h-3 w-3" />
                ) : (
                  <FaAngleUp className="h-3 w-3" />
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="mx-10 rounded-xl bg-white">
            <div className="space-y-4">
              <div className="">
                <div className="text-[#4B6BFB] font-semibold">
                  {user.user.username}
                </div>{" "}
                <div className="text-[#4B6BFB] font-semibold">
                  {user.user.email}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="">Logout</div>
                <IoLogOutOutline
                  onClick={handleLogout}
                  className="h-6 w-6 text-red-500"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoCloseOutline className="h-6 w-6" />
          ) : (
            <IoReorderThreeOutline className="h-6 w-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-white shadow-md flex flex-col space-y-4 items-center py-4">
          <Link
            href="/"
            className={`hover:text-[#4B6BFB] ${
              pathname === "/" && "text-[#4B6BFB]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`hover:text-[#4B6BFB] ${
              pathname === "/dashboard" && "text-[#4B6BFB]"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/blog"
            className={`hover:text-[#4B6BFB] ${
              pathname === "/blog" && "text-[#4B6BFB]"
            }`}
          >
            Blog
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <div
                onClick={() => setToggle(!toggle)}
                className="bg-[#4B6BFB] text-white rounded-full px-4 py-2 hover:cursor-pointer"
              >
                <div className="flex justify-between items-center gap-5">
                  <div className="">{user.user.username}</div>
                  {!toggle ? (
                    <FaAngleDown className="h-3 w-3" />
                  ) : (
                    <FaAngleUp className="h-3 w-3" />
                  )}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="mx-10 rounded-xl bg-white">
              <div className="space-y-4">
                <div className="">
                  <div className="text-[#4B6BFB] font-semibold">
                    {user.user.username}
                  </div>{" "}
                  <div className="text-[#4B6BFB] font-semibold">
                    {user.user.email}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="">Logout</div>
                  <IoLogOutOutline className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Navbar;
