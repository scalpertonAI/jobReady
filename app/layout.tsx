import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/shared/Toast";

export const metadata: Metadata = {
  title: "JobReady.AI - AI-Powered Interview Preparation",
  description: "Prepare for your dream job with AI-powered resume analysis, personalized learning plans, and mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
