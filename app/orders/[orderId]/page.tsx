import OrderDetailClient from "@/components/store/OrderDetailClient";
import { buildPageMetadata } from "@/lib/seo";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  return buildPageMetadata({
    title: `Order ${orderId} | SFPL CONNECT`,
    description: "SFPL CONNECT order details.",
    path: `/orders/${orderId}`,
  });
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <OrderDetailClient orderId={orderId} />
    </section>
  );
}
