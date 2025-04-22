// app/(main)/layout.tsx

import "../globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <Navbar />
      <div className="h-screen">{children}</div>
    </div>
  );
}
