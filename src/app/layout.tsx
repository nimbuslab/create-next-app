import type { Metadata } from "next";
import { Comfortaa, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// nimbuslab branding fonts
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${comfortaa.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
