import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import AppProvider from "./app-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Xenovate - AI-Powered Algorithm Analysis Tool",
  description: "Analyze algorithm complexity, optimize code, convert between programming languages, and get plain-English explanations with our AI-powered platform.",
  keywords: "algorithm analysis, code optimization, time complexity, space complexity, code conversion, AI coding assistant, algorithm explanation",
  authors: [{ name: "Fahad Bin Hussain" }],
  creator: "Fahad Bin Hussain",
  publisher: "Xenovate",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xenovate.app/",
    title: "Xenovate - AI-Powered Algorithm Analysis Tool",
    description: "Analyze, optimize, convert, and understand your code with AI",
    siteName: "Xenovate",
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
        className={`${inter.variable} font-sans antialiased bg-background min-h-screen`}
      >
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
