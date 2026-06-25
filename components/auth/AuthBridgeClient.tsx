"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { syncCartAfterLogin } from "@/hooks/use-cart";
import {
  buildConnectLoginUrl,
  resolveAuthBridgeDestination,
  setAuthSession,
} from "@/lib/auth-storage";

export default function AuthBridgeClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const token = searchParams.get("token");
    const user = searchParams.get("user");
    const refreshToken = searchParams.get("refresh_token");
    const next = resolveAuthBridgeDestination(searchParams.get("next") || "/");

    if (!token) {
      window.location.href = buildConnectLoginUrl(next);
      return;
    }

    const completeSignIn = async () => {
      setAuthSession(
        token,
        user ? decodeURIComponent(user) : undefined,
        refreshToken || undefined,
      );

      await syncCartAfterLogin(queryClient);

      if (next.startsWith("http://") || next.startsWith("https://")) {
        window.location.replace(next);
        return;
      }

      router.replace(next);
    };

    void completeSignIn();
  }, [queryClient, router, searchParams]);

  return (
    <div className="container mx-auto px-4 py-16 text-center text-gray-600">
      Signing you in…
    </div>
  );
}
