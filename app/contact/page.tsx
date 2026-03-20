import { buildPageMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata = buildPageMetadata({
  title: "Contact SFPL | Specific Fire Protection Limited",
  description:
    "Have questions or need a fire safety solution? Reach out to SFPL's expert team for help with protecting what matters most.",
  path: "/contact",
  image: "/logo-full-black.svg",
});

export default function Contact() {
  return <ContactClient />;
}
