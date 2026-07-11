const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://specificfire.com";

const DEFAULT_LAST_MODIFIED = new Date("2026-05-07T00:00:00.000Z");
const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tech", changeFrequency: "monthly", priority: 0.7 },
  { path: "/jobs", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/connect", changeFrequency: "weekly", priority: 0.9 },
  { path: "/iot-device-spec", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iot-user-manual", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iot-faq", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap() {
  return routes.map((route) => ({
    url: new URL(route.path, SITE_URL).toString(),
    lastModified: DEFAULT_LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

