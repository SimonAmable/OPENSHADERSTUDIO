import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shader Studio",
  description: "Create, tune, and export interactive WebGL shaders.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
