import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
