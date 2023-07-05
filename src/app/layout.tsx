import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-neutral-900 min-h-screen flex flex-col text-iced-black dark:text-white`}
      >
        <main className="grow h-0">{children}</main>
      </body>
    </html>
  );
}
