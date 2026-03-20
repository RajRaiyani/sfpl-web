const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://specificfire.com";
const SITE_NAME = "SFPL";
const DEFAULT_OG_IMAGE = "/logo-full-black.svg";

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}) {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
