import CartPageClient from "@/components/store/CartPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Cart | SFPL CONNECT",
  description: "Review your SFPL CONNECT device cart.",
  path: "/cart",
});

export default function CartPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CartPageClient />
    </section>
  );
}
