import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

const baseURL = "http://"; // Required to allow passing host:port dynamically

export const apiClient = axios.create({
  baseURL,
  timeout: 10000, // 10s timeout for LAN stability
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      console.warn("🔐 Unauthorized. Logging out...");
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);
