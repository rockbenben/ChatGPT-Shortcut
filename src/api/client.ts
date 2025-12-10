/**
 * API Client - Axios instance and shared utilities
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { removeCache, CACHE_PREFIX } from "@site/src/utils/cache";

// API Configuration
// http://localhost:1337/api  https://api.newzone.top/api
export const API_URL = "https://api.newzone.top/api";

// Token Management
let authToken: string | null = null;

if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

/**
 * Clear all user info cache
 */
export function clearUserAllInfoCache() {
  removeCache(CACHE_PREFIX.USER_INFO);
}

/**
 * Ensure value is an array
 */
export const ensureArrayInput = (value: unknown, fieldName: string): unknown[] => {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
  return value;
};

/**
 * Handle API errors uniformly
 */
const handleApiError = (error: any) => {
  if (error?.response?.status === 401) {
    clearUserAllInfoCache();
  }

  // Extract Strapi error message and attach to error object
  const strapiMessage = error?.response?.data?.error?.message;
  if (strapiMessage && !error.message?.includes(strapiMessage)) {
    error.strapiMessage = strapiMessage;
  }

  throw error;
};

/**
 * Get current auth token
 */
export const getAuthToken = (): string | null => {
  if (ExecutionEnvironment.canUseDOM) {
    return localStorage.getItem("auth_token");
  }
  return authToken;
};

/**
 * Persist auth token to storage
 */
export const persistAuthToken = (token: string | null): string | null => {
  authToken = token || null;
  if (!ExecutionEnvironment.canUseDOM) {
    return authToken;
  }

  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }

  return authToken;
};

// Create axios instance
export const apiClient = axios.create({ baseURL: API_URL });

// Request interceptor - add auth token
apiClient.interceptors.request.use((requestConfig) => {
  const token = getAuthToken();
  if (token) {
    requestConfig.headers.set("Authorization", `Bearer ${token}`);
  } else {
    requestConfig.headers.delete("Authorization");
  }
  return requestConfig;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      handleApiError(error);
    } catch (handledError) {
      return Promise.reject(handledError);
    }
  }
);
