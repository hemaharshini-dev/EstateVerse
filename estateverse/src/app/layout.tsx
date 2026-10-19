import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurelia Heights | EstateVerse",
  description: "Explore the Aurelia Heights residential digital twin in Hyderabad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
