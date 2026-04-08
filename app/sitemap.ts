import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/data/products";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxe-jewels.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/collections", priority: 0.9 },
    { path: "/shop", priority: 0.9 },
    { path: "/appointment", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    { path: "/wishlist", priority: 0.4 },
    { path: "/cart", priority: 0.3 },
    { path: "/checkout", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  const collectionEntries: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${siteUrl}/collections/${collection.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
