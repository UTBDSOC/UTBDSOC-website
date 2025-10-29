import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UTSBDSOC",
  description: "Official website of the UTS Bangladeshi Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen
          bg-[linear-gradient(135deg,#f57c00_0%,#ff8c33_40%,#ffb56b_100%)]
          text-white`}
      >
        {children}
      </body>
    </html>
  );
}
