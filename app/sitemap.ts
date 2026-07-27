import type { MetadataRoute } from "next";
import env from "@/config/env";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const ROUTES: [string, Freq, number][] = [
  ["/", "weekly", 1],
  ["/connect", "daily", 0.95],
  ["/services", "weekly", 0.9],
  ["/about", "monthly", 0.8],
  ["/contact", "monthly", 0.8],
  ["/tech", "monthly", 0.75],
  ["/iot-device-spec", "monthly", 0.75],
  ["/iot-user-manual", "monthly", 0.7],
  ["/iot-faq", "monthly", 0.65],
  ["/jobs", "weekly", 0.65],
  ["/connect-o1-warranty", "yearly", 0.45],
  ["/terms-conditions", "yearly", 0.4],
  ["/privacy-policy", "yearly", 0.4],
  ["/returns-refunds", "yearly", 0.4],
  ["/copyright-policy", "yearly", 0.35],
];

async function deviceSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${env.serverProxyUrl}/storefront/devices?limit=20`,
      { next: { revalidate } },
    );
    if (!res.ok) return [];
    const { data = [] } = (await res.json()) as {
      data?: { slug?: string; is_active?: boolean }[];
    };
    return data
      .filter((d) => d.is_active !== false && d.slug)
      .map((d) => d.slug!);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const abs = (path: string) => new URL(path, SITE_URL).toString();

  const staticPages = ROUTES.map(([path, changeFrequency, priority]) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const devices = (await deviceSlugs()).map((slug) => ({
    url: abs(`/connect/devices/${slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...devices];
}
