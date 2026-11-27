import type { MetadataRoute } from "next";

import { siteUrl } from "./site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/programmes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/impact`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/join`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/partners`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/artwork`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
