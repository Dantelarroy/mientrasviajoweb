import type { MetadataRoute } from "next";
import { SITE_URL, invisibleEntityLinks, supportLinks } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", ...supportLinks.map((link) => link.href), ...invisibleEntityLinks];

  return pages.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
