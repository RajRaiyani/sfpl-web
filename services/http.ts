import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import env from "@/config/env";
import {
  buildConnectLoginUrl,
  clearAuthSession,
  getAuthToken,
  getRefreshToken,
  persistGuestCartIdFromResponse,
  setAuthTokens,
} from "@/lib/auth-storage";

type RetryAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

/** Do not attempt refresh on public auth calls (avoids misleading flows). */
function shouldSkipTokenRefresh(config: InternalAxiosRequestConfig): boolean {
  const url = config.url || "";
  const checks = [
    /(^|\/)customer-portal\/auth\/refresh(\?|$)/,
    /(^|\/)auth\/refresh(\?|$)/,
    /(^|\/)auth\/login-with-google(\?|$)/,
    /(^|\/)auth\/login(\?|$)/,
    /(^|\/)auth\/register(\?|$)/,
    /(^|\/)auth\/verify-registration(\?|$)/,
    /(^|\/)auth\/resend-registration-otp(\?|$)/,
    /(^|\/)auth\/forgot-password-otp(\?|$)/,
    /(^|\/)auth\/verify-forgot-password-otp(\?|$)/,
    /(^|\/)auth\/resend-forgot-password-otp(\?|$)/,
    /(^|\/)auth\/reset-password(\?|$)/,
  ];
  return checks.some((re) => re.test(url));
}

const CUSTOMER_PORTAL_REFRESH_URL = `${env.serverProxyUrl}/customer-portal/auth/refresh`;

const http = axios.create({
  baseURL: env.serverProxyUrl,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  // Guest cart id is sent automatically via sfpl_guest_cart_id cookie.

  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
}

function clearAuthAndRedirect() {
  clearAuthSession();
  if (typeof window !== "undefined") {
    window.location.href = buildConnectLoginUrl(window.location.href);
  }
}

http.interceptors.response.use(
  (response) => {
    // Keep cookie in sync when API returns a newly issued guest_cart_id in the body.
    persistGuestCartIdFromResponse(response.data);

    return response.data;
  },
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config as RetryAxiosRequestConfig | undefined;

    if (
      status === 401 &&
      originalRequest &&
      !shouldSkipTokenRefresh(originalRequest) &&
      !originalRequest._retry
    ) {
      const existingRefreshToken = getRefreshToken();

      // Guest / unauthenticated 401 — nothing to refresh.
      if (!existingRefreshToken && !getAuthToken()) {
        return Promise.reject(error.response?.data ?? error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return http(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (!existingRefreshToken) {
          throw new Error("Missing refresh token");
        }

        const { data } = await axios.post(
          CUSTOMER_PORTAL_REFRESH_URL,
          { refresh_token: existingRefreshToken },
          { withCredentials: true },
        );

        if (!data?.token || !data?.refresh_token) {
          throw new Error("Invalid refresh response");
        }

        setAuthTokens({
          token: data.token,
          refresh_token: data.refresh_token,
          user: data.user,
        });

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        processQueue(null, data.token);

        return http(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthAndRedirect();
        return Promise.reject(
          axios.isAxiosError(refreshError)
            ? (refreshError.response?.data ?? refreshError)
            : refreshError,
        );
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error.response?.data ?? error);
  },
);

export default http;
