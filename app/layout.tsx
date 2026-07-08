import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seekers Guild",
  description: "Desktop-first Seekers Guild hub.",
  icons: {
    icon: "/assets/seekersguild_logo.png",
    shortcut: "/assets/seekersguild_logo.png",
    apple: "/assets/seekersguild_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
