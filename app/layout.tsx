import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Notsie - Your AI-Powered Workspace",
  description: "Notsie is a powerful AI-driven workspace that helps you organize and manage your tasks, notes, and projects with intelligent assistance. Experience a new way of productivity with advanced AI features.",
  // Open Graph meta tags
  openGraph: {
    title: "Notsie - Your AI-Powered Workspace",
    description: "Notsie is a powerful AI-driven workspace that helps you organize and manage your tasks, notes, and projects with intelligent assistance.",
    url: "https://notsie.ishkumar.com", // Replace with your actual URL
    siteName: "Notsie",
    images: [
      {
        url: "https://notsie.ishkumar.com/og-image.jpg", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Notsie Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Notsie - Your AI-Powered Workspace" />
          <meta property="og:description" content="Notsie is a powerful AI-driven workspace that helps you organize and manage your tasks, notes, and projects with intelligent assistance." />
          <meta property="og:url" content="https://notsie.ishkumar.com" />
          <meta property="og:site_name" content="Notsie" />
          <meta property="og:image" content="https://notsie.ishkumar.com/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          
          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Notsie - Your AI-Powered Workspace" />
          <meta name="twitter:description" content="Notsie is a powerful AI-driven workspace that helps you organize and manage your tasks, notes, and projects with intelligent assistance." />
          <meta name="twitter:image" content="https://notsie.ishkumar.com/og-image.jpg" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="675" />
          
        </head>
        <body>
          <Header />
          <div className="flex min-h-screen ">
            <Sidebar></Sidebar>
            <div className="flex-1 p-4 bg-zinc-50 overflow-y-auto scrollbar-hide">
              {children}
            </div>

          </div>

          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
