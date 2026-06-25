import { Suspense } from "react";
import AuthBridgeClient from "@/components/auth/AuthBridgeClient";

export default function AuthBridgePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center text-gray-600">
          Signing you in…
        </div>
      }
    >
      <AuthBridgeClient />
    </Suspense>
  );
}
