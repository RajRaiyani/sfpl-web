import {
  CUSTOMER_AUTH_COOKIES,
  LEGACY_CUSTOMER_AUTH_COOKIES,
} from "./auth-cookies";

const GUEST_CART_KEY = "guest_cart_id";
// Shared across store + connect portal so the portal can merge the guest cart at login.
const GUEST_CART_COOKIE = "sfpl_guest_cart_id";
const GUEST_CART_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

function getSharedCookieDomain(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const { hostname } = window.location;
  if (hostname.endsWith(".localhost.com") || hostname === "localhost.com") {
    return ".localhost.com";
  }
  if (hostname.endsWith(".specificfire.com") || hostname === "specificfire.com") {
    return ".specificfire.com";
  }

  return undefined;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // Clear host-only and shared-domain variants.
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${secure}`;
  const domain = getSharedCookieDomain();
  if (domain) {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax${secure}`;
  }
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

export function clearAuthSession() {
  Object.values(CUSTOMER_AUTH_COOKIES).forEach((name) => {
    clearCookie(name);
  });
  clearLegacyCustomerAuthCookies();
}

export function getGuestCartId() {
  if (typeof window === "undefined") return null;

  const fromCookie = getCookie(GUEST_CART_COOKIE);
  if (fromCookie) return fromCookie;

  // Migrate the legacy localStorage value into the shared cookie.
  const legacy = window.localStorage.getItem(GUEST_CART_KEY);
  if (legacy) {
    setGuestCartId(legacy);
    window.localStorage.removeItem(GUEST_CART_KEY);
    return legacy;
  }

  return null;
}

export function setGuestCartId(id: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const domain = getSharedCookieDomain();
  const domainPart = domain ? `; domain=${domain}` : "";
  document.cookie = `${GUEST_CART_COOKIE}=${encodeURIComponent(id)}; path=/; max-age=${GUEST_CART_COOKIE_MAX_AGE}${domainPart}; SameSite=Lax${secure}`;
}

export function clearGuestCartId() {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const domain = getSharedCookieDomain();
  const domainPart = domain ? `; domain=${domain}` : "";
  document.cookie = `${GUEST_CART_COOKIE}=; Max-Age=0; path=/${domainPart}; SameSite=Lax${secure}`;
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

export function buildConnectLoginUrl(redirectUrl = "/") {
  const connectSiteUrl = process.env.NEXT_PUBLIC_CONNECT_SITE_URL
  if (!connectSiteUrl || typeof window === "undefined") return "/login";

  return `${connectSiteUrl}/login?redirect_url=${encodeURIComponent(redirectUrl)}`;
}
