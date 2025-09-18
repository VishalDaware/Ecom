// app/layout.tsx

import type { Metadata } from "next";
// 1. Import the font
import { Inter } from "next/font/google";
import "./globals.css";

// 2. Configure the font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Comm",
  description: "Modern E-Commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}