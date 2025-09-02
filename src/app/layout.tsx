import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AadivyaGPT",
  description: "Chat with Aadivya's AI assistant to learn about his projects, research, and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
