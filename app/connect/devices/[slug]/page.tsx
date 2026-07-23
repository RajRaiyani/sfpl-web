import DeviceDetailClient from "@/components/store/DeviceDetailClient";
import { buildPageMetadata } from "@/lib/seo";

type ConnectDeviceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ConnectDeviceDetailPageProps) {
  const { slug } = await params;
  return buildPageMetadata({
    title: `SFPL CONNECT Device | ${slug}`,
    description: "SFPL CONNECT device details and purchase options.",
    path: `/connect/devices/${slug}`,
  });
}

export default async function ConnectDeviceDetailPage({
  params,
}: ConnectDeviceDetailPageProps) {
  const { slug } = await params;
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DeviceDetailClient slug={slug} />
    </section>
  );
}
