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
    <html lang="en">
      <body className={inter.className}>
        <main className="">
          <Navbar />
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  );
}