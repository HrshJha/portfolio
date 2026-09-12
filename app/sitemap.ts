import type { MetadataRoute } from "next";

const siteUrl = "https://contactharsh.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${siteUrl}/work/frameos`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/vera`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/candidate-intelligence-system`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/appforge-ai`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/work/hallucination-hunter`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
