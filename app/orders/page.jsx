import OrdersPageClient from "@/components/store/OrdersPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "My Orders | SFPL Connect",
  description: "Track your SFPL Connect device orders.",
  path: "/orders",
});

export default function OrdersPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <OrdersPageClient />
    </section>
  );
}
