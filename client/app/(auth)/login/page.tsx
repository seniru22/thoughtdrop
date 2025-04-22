"use client";
import isAuth from "@/context/isAuth";

// components
import LoginComponent from "@/components/login/login-component";

const Page = () => {
  return <LoginComponent />;
};

export default isAuth(Page);
