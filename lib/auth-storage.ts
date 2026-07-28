import jsCookie from "js-cookie";
import {
  CUSTOMER_AUTH_COOKIES,
  LEGACY_CUSTOMER_AUTH_COOKIES,
} from "./auth-cookies";

const GUEST_CART_KEY = "guest_cart_id";
// Shared across store + connect portal so the portal can merge the guest cart at login.
const GUEST_CART_COOKIE = "sfpl_guest_cart_id";
const GUEST_CART_COOKIE_DAYS = 30;

type CookieAttributes = NonNullable<Parameters<typeof jsCookie.set>[2]>;

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

function getCustomerCookieOptions(): CookieAttributes {
  const domain = getSharedCookieDomain();
  return {
    path: "/",
    sameSite: "Lax",
    ...(window.location.protocol === "https:" ? { secure: true } : {}),
    ...(domain ? { domain } : {}),
  };
}

function removeCookie(name: string) {
  if (typeof window === "undefined") return;

  const options = getCustomerCookieOptions();
  jsCookie.remove(name, options);
  // Also clear a host-only cookie if one was set without domain.
  jsCookie.remove(name, { path: "/" });
}

function clearLegacyCustomerAuthCookies() {
  LEGACY_CUSTOMER_AUTH_COOKIES.forEach((name) => {
    removeCookie(name);
  });
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return jsCookie.get(CUSTOMER_AUTH_COOKIES.token) ?? null;
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return jsCookie.get(CUSTOMER_AUTH_COOKIES.refreshToken) ?? null;
}

export function getAuthUser(): {
  id?: string;
  name?: string;
  email?: string;
  full_name?: string;
  user_name?: string;
  avatar_url?: string;
  avatar?: string;
  profile_picture?: string;
  profileImage?: string;
  image?: string;
  picture?: string;
  photo_url?: string;
} | null {
  if (typeof window === "undefined") return null;

  const raw = jsCookie.get(CUSTOMER_AUTH_COOKIES.user);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw);
    return user && typeof user === "object" ? user : null;
  } catch {
    return null;
  }
}

export function setAuthTokens(payload: {
  token: string;
  refresh_token: string;
  user?: { id: string; name: string; email: string } | string;
}) {
  if (typeof window === "undefined") return;

  const options = getCustomerCookieOptions();
  clearLegacyCustomerAuthCookies();

  jsCookie.set(CUSTOMER_AUTH_COOKIES.token, payload.token, options);
  jsCookie.set(CUSTOMER_AUTH_COOKIES.refreshToken, payload.refresh_token, options);

  if (payload.user) {
    const userValue =
      typeof payload.user === "string"
        ? payload.user
        : JSON.stringify(payload.user);
    jsCookie.set(CUSTOMER_AUTH_COOKIES.user, userValue, options);
  }
}

export function hasUserSession() {
  return Boolean(getAuthToken());
}

export function clearAuthSession() {
  Object.values(CUSTOMER_AUTH_COOKIES).forEach((name) => {
    removeCookie(name);
  });
  clearLegacyCustomerAuthCookies();
}

export function getGuestCartId() {
  if (typeof window === "undefined") return null;

  const fromCookie = jsCookie.get(GUEST_CART_COOKIE);
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
  if (typeof window === "undefined") return;

  jsCookie.set(GUEST_CART_COOKIE, id, {
    ...getCustomerCookieOptions(),
    expires: GUEST_CART_COOKIE_DAYS,
  });
}

export function clearGuestCartId() {
  if (typeof window === "undefined") return;

  removeCookie(GUEST_CART_COOKIE);
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
  const connectSiteUrl = process.env.NEXT_PUBLIC_CONNECT_SITE_URL;
  if (!connectSiteUrl || typeof window === "undefined") return "/login";

  return `${connectSiteUrl}/login?redirect_url=${encodeURIComponent(redirectUrl)}`;
}
