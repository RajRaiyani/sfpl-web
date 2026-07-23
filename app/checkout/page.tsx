import CheckoutPageClient from "@/components/store/CheckoutPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Checkout | SFPL CONNECT",
  description: "Complete your SFPL CONNECT device purchase.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CheckoutPageClient />
    </section>
  );
}
