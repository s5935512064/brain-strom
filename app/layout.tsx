import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brain Strom — AI Mindmap",
  description: "พิมพ์ไอเดีย แล้วให้ AI สร้าง mindmap ให้ / Type an idea, let AI build a mindmap.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
