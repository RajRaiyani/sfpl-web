import axios from "axios";
import env from "@/config/env";
import {
  getAuthToken,
  getGuestCartId,
  persistGuestCartIdFromResponse,
  setGuestCartId,
} from "@/lib/auth-storage";

const http = axios.create({
  baseURL: env.serverProxyUrl,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const guestCartId = getGuestCartId();
    if (guestCartId) {
      config.headers["x-guest-cart-id"] = guestCartId;
    }
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    const guestHeader = response.headers["x-guest-cart-id"];
    if (typeof guestHeader === "string" && guestHeader) {
      setGuestCartId(guestHeader);
    }

    persistGuestCartIdFromResponse(response.data);

    return response.data;
  },
  (error) => Promise.reject(error.response?.data ?? error),
);

export default http;
