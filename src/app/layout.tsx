import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MapPilot Operating System",
  description: "Enterprise-grade Local Business Growth OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-muted/20`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
            <Sidebar />
          </div>
          
          {/* Main Content Area */}
          <div className="md:pl-64 flex flex-col flex-1 w-full">
            <Header />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
