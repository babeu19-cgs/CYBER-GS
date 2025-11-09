import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cybergs.ro";
  const now = new Date().toISOString();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/legal/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/legal/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.4 }
  ];
}
