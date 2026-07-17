import StoreAccountSettingsClient from "@/components/store/StoreAccountSettingsClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Account Settings | SFPL CONNECT",
  description: "Manage your SFPL CONNECT store account details and addresses.",
  path: "/account",
});

export default function AccountPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <StoreAccountSettingsClient />
    </section>
  );
}
