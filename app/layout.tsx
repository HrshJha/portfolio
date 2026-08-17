import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Kumar Jha — AI/ML Engineering Student & Builder",
  description: "Harsh Kumar Jha is an AI/ML engineering student building machine learning systems through engineering.",
};

const themeScript = `(() => { try { const saved = localStorage.getItem('harsh-theme'); const theme = saved || 'light'; document.documentElement.dataset.theme = theme; } catch { document.documentElement.dataset.theme = 'light'; } })();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>;
}
