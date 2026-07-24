import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "William — AI Creative Technologist",
    template: "%s — William",
  },
  description:
    "William's portfolio across AI, film and visual storytelling.",
  openGraph: {
    title: "William — AI Creative Technologist",
    description: "Exploring the intersection of AI, Film and Visual Storytelling.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "William — AI Creative Technologist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William — AI Creative Technologist",
    description: "AI · Film · Visual Storytelling",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
