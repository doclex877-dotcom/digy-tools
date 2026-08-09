import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://digy.cash";
  const routes = [
    "",
    "/compress",
    "/convert",
    "/heic-to-jpg",
    "/resize",
    "/image-to-pdf",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/compress") || route.startsWith("/convert") || route.startsWith("/heic") || route.startsWith("/resize") || route.startsWith("/image-to-pdf") ? 0.9 : 0.5,
  }));
}
