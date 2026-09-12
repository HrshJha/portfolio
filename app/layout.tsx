import type { Metadata } from "next";
import "./globals.css";
import KiviBackground from "./components/KiviBackground";
import CursorOwl from "./components/CursorOwl";

export const metadata: Metadata = {
  metadataBase: new URL("https://hrshjha.vercel.app"),
  title: "Harsh Kumar Jha — Engineer / AI Builder",
  description: "Harsh Kumar Jha builds AI systems, software, and products from Delhi, India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Harsh Kumar Jha — Engineer / AI Builder",
    description: "Harsh Kumar Jha builds AI systems, software, and products from Delhi, India.",
    url: "https://hrshjha.vercel.app/",
    siteName: "Harsh Kumar Jha",
    images: [
      {
        url: "/assets/art/dither/s1-hero.png",
        width: 768,
        height: 512,
        alt: "Dithered botanical artwork from Harsh Kumar Jha's portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar Jha — Engineer / AI Builder",
    description: "Harsh Kumar Jha builds AI systems, software, and products from Delhi, India.",
    images: ["/assets/art/dither/s1-hero.png"],
  },
};

const themeScript = `document.documentElement.dataset.theme = 'dark';`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <KiviBackground />
        <CursorOwl />
        {children}
      </body>
    </html>
  );
}
