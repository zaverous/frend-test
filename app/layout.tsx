import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZAVEROUS.NET :: NPM Proxy Test",
  description: "Nginx Proxy Manager connectivity validation — SYSTEM ONLINE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={vt323.variable}>
      <body>{children}</body>
    </html>
  );
}
