const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://specificfire.com";

const routes = [
  "/",
  "/about",
  "/services",
  "/tech",
  "/jobs",
  "/contact",
  "/connect",
];

export default function sitemap() {
  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: new Date(),
  }));
}

