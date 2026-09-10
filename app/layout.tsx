import type { Metadata } from "next";
import "./globals.css";
import KiviBackground from "./components/KiviBackground";

export const metadata: Metadata = {
  title: "Harsh Kumar Jha — Engineer + Filmmaker",
  description: "Harsh Kumar Jha builds AI systems and makes films from Delhi, India.",
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
        {children}
      </body>
    </html>
  );
}
