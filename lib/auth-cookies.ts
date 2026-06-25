export const CUSTOMER_AUTH_COOKIES = {
  token: "sfpl_customer_token",
  user: "sfpl_customer_user",
  refreshToken: "sfpl_customer_refresh_token",
} as const;

export const LEGACY_CUSTOMER_AUTH_COOKIES = [
  "token",
  "user",
  "refresh_token",
] as const;
