import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Harsh Kumar Jha",
  description: "Get in touch with Harsh Kumar Jha for AI/ML engineering, system architecture, and collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
