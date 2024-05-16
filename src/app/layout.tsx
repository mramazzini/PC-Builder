import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Build Your PC",
  description:
    "We match you with the perfect PC components for your specific needs, and build it for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>My Page Title</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
