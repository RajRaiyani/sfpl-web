const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://specificfire.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

