import DeviceDetailClient from "@/components/store/DeviceDetailClient";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildPageMetadata({
    title: `SFPL Connect Device | ${slug}`,
    description: "SFPL Connect device details and purchase options.",
    path: `/connect/devices/${slug}`,
  });
}

export default async function ConnectDeviceDetailPage({ params }) {
  const { slug } = await params;
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DeviceDetailClient slug={slug} />
    </section>
  );
}
