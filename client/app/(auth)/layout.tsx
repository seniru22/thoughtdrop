// app/(auth)/layout.tsx or wherever AuthLayout is
import "../globals.css";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={inter.className}>{children}</main>;
}
