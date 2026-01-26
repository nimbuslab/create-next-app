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
  title: "Landing Page | Built with create-next-landing",
  description:
    "A modern landing page built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui.",
  keywords: ["landing page", "nextjs", "react", "tailwind", "shadcn"],
  authors: [{ name: "nimbuslab", url: "https://nimbuslab.com.br" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Landing Page | Built with create-next-landing",
    description:
      "A modern landing page built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui.",
    siteName: "Your Site Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Page | Built with create-next-landing",
    description:
      "A modern landing page built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
