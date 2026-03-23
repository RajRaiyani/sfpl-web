"use client";

import { CookiesProvider } from "react-cookie";

interface ProviderContextProps {
  children: React.ReactNode;
}

export default function ProviderContext({ children }: ProviderContextProps) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
