import type { Metadata } from "next";
import "./globals.css";
import KiviBackground from "./components/KiviBackground";
import CursorOwl from "./components/CursorOwl";

export const metadata: Metadata = {
  metadataBase: new URL("https://contactharsh.in"),
  title: {
    default: "Harsh Kumar Jha | AI/ML Engineer & AI Systems Builder",
    template: "%s | Harsh Kumar Jha",
  },
  description:
    "Harsh Kumar Jha is an AI/ML engineer and AI systems builder focused on machine learning, LLM evaluation, backend systems, and software products.",
  keywords: [
    "Harsh Kumar Jha",
    "AI/ML Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Evaluation",
    "AI Systems",
    "Software Engineer",
    "AI Safety",
  ],
  authors: [{ name: "Harsh Kumar Jha", url: "https://contactharsh.in" }],
  creator: "Harsh Kumar Jha",
  publisher: "Harsh Kumar Jha",
  icons: {
    icon: "/assets/brand/hkj-logo.png",
    apple: "/assets/brand/hkj-logo.png",
  },
  alternates: {
    canonical: "https://contactharsh.in/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Harsh Kumar Jha | AI/ML Engineer & AI Systems Builder",
    description: "AI/ML engineer building AI systems, software, and products.",
    url: "https://contactharsh.in/",
    siteName: "Harsh Kumar Jha",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harsh Kumar Jha — AI/ML Engineer & AI Systems Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar Jha | AI/ML Engineer & AI Systems Builder",
    description: "AI/ML engineer building AI systems, software, and products.",
    images: ["/og-image.png"],
  },
};

const themeScript = `document.documentElement.dataset.theme = 'dark';`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://contactharsh.in/#profile",
  url: "https://contactharsh.in/",
  name: "Harsh Kumar Jha | AI/ML Engineer & AI Systems Builder",
  mainEntity: {
    "@type": "Person",
    "@id": "https://contactharsh.in/#person",
    name: "Harsh Kumar Jha",
    url: "https://contactharsh.in/",
    jobTitle: "AI/ML Engineer",
    description:
      "AI/ML engineer and AI systems builder focused on machine learning, LLM evaluation, backend systems, and software products.",
    email: "mailto:jhaharsh451@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Artificial intelligence",
      "Machine learning",
      "LLM evaluation",
      "AI safety",
      "Backend systems",
      "Software engineering",
    ],
    sameAs: [
      "https://github.com/HrshJha",
      "https://www.linkedin.com/in/hrshjha",
      "https://x.com/haarshjha",
    ],
  },
};

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
