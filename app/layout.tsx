import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "./scroll-fade.css";

export const metadata: Metadata = {
  title: "Shader Studio",
  description: "Create, tune, and export interactive WebGL shaders.",
  icons: {
    icon: [
      { url: "/favicon-for-app/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-for-app/icon0.svg", type: "image/svg+xml" },
      { url: "/favicon-for-app/icon1.png", type: "image/png" },
    ],
    apple: "/favicon-for-app/apple-icon.png",
  },
  manifest: "/favicon-for-app/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
