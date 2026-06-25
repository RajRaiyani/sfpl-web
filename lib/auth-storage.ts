import {
  CUSTOMER_AUTH_COOKIES,
  LEGACY_CUSTOMER_AUTH_COOKIES,
} from "./auth-cookies";

const GUEST_CART_KEY = "guest_cart_id";
export const AUTH_BRIDGE_PATH = "/auth/bridge";

function getSfplWebOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")
  ).replace(/\/$/, "");
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${secure}`;
}

function clearLegacyCustomerAuthCookies() {
  LEGACY_CUSTOMER_AUTH_COOKIES.forEach((name) => {
    clearCookie(name);
  });
}

export function getAuthToken() {
  return getCookie(CUSTOMER_AUTH_COOKIES.token);
}

export function hasUserSession() {
  return Boolean(getAuthToken());
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

/** Persist customer session on the sfpl-web origin after connect-portal login. */
export function setAuthSession(token: string, user?: string, refreshToken?: string) {
  clearLegacyCustomerAuthCookies();
  setCookie(CUSTOMER_AUTH_COOKIES.token, token, 60 * 60);
  if (user) setCookie(CUSTOMER_AUTH_COOKIES.user, user, 60 * 60);
  if (refreshToken) {
    setCookie(CUSTOMER_AUTH_COOKIES.refreshToken, refreshToken, 7 * 24 * 60 * 60);
  }
}

export function clearAuthSession() {
  Object.values(CUSTOMER_AUTH_COOKIES).forEach((name) => {
    clearCookie(name);
  });
  clearLegacyCustomerAuthCookies();
}

export function getGuestCartId() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(GUEST_CART_KEY);
}

export function setGuestCartId(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_CART_KEY, id);
}

export function clearGuestCartId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GUEST_CART_KEY);
}

/** Persist guest cart id from storefront API payloads (Gravis-style body token). */
export function persistGuestCartIdFromResponse(payload: unknown) {
  if (typeof window === "undefined" || !payload || typeof payload !== "object") return;

  const record = payload as { data?: { guest_cart_id?: unknown }; guest_cart_id?: unknown };
  const guestId = record.data?.guest_cart_id ?? record.guest_cart_id;

  if (typeof guestId === "string" && guestId) {
    setGuestCartId(guestId);
  }
}

export function buildConnectLoginUrl(returnPath = "/cart") {
  const connectSiteUrl = process.env.NEXT_PUBLIC_CONNECT_SITE_URL
    ?.replace(/\/:(\d+)/, ":$1")
    .replace(/\/$/, "");
  if (!connectSiteUrl) return "/login";

  const bridgeUrl = buildConnectAuthBridgeUrl(returnPath);
  return `${connectSiteUrl}/login?redirect_url=${encodeURIComponent(bridgeUrl)}`;
}

export function buildConnectRegisterUrl(returnPath = "/") {
  const connectSiteUrl = process.env.NEXT_PUBLIC_CONNECT_SITE_URL
    ?.replace(/\/:(\d+)/, ":$1")
    .replace(/\/$/, "");
  if (!connectSiteUrl) return "/register";

  const bridgeUrl = buildConnectAuthBridgeUrl(returnPath);
  return `${connectSiteUrl}/register?redirect_url=${encodeURIComponent(bridgeUrl)}`;
}

function buildConnectAuthBridgeUrl(returnPath = "/") {
  const normalizedPath = returnPath.startsWith("/") ? returnPath : `/${returnPath}`;
  return `${getSfplWebOrigin()}${AUTH_BRIDGE_PATH}?next=${encodeURIComponent(normalizedPath)}`;
}

/** Unwrap mistaken connect-origin /auth/bridge URLs in the next param. */
export function resolveAuthBridgeDestination(next: string): string {
  if (!next.startsWith("http://") && !next.startsWith("https://")) {
    return next.startsWith("/") ? next : `/${next}`;
  }

  try {
    const url = new URL(next);
    if (url.pathname === AUTH_BRIDGE_PATH) {
      const inner = url.searchParams.get("next");
      return inner ? resolveAuthBridgeDestination(inner) : "/";
    }
    return next;
  } catch {
    return "/";
  }
}
