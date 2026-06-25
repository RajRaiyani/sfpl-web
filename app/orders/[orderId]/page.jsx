import OrderDetailClient from "@/components/store/OrderDetailClient";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { orderId } = await params;
  return buildPageMetadata({
    title: `Order ${orderId} | SFPL Connect`,
    description: "SFPL Connect order details.",
    path: `/orders/${orderId}`,
  });
}

export default async function OrderDetailPage({ params }) {
  const { orderId } = await params;
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <OrderDetailClient orderId={orderId} />
    </section>
  );
}
