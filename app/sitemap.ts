import type { MetadataRoute } from "next";

const siteUrl = "https://contactharsh.in";
const lastModified = new Date("2026-09-13T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, lastModified, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/contact`, lastModified, priority: 0.7, changeFrequency: "yearly" },
    { url: `${siteUrl}/work/frameos`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/vera`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/candidate-intelligence-system`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/appforge-ai`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/hallucination-hunter`, lastModified, priority: 0.8, changeFrequency: "monthly" },
  ];
}
