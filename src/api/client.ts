/**
 * API Client - Axios instance and shared utilities
 *
 * API 配置统一在 config.ts 中定义
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { removeCache, CACHE_PREFIX } from "@site/src/utils/cache";
import { API_URL } from "./config";

// Token Management
let authToken: string | null = null;

if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

/**
 * 清除用户基本信息缓存（id, username, email）
 * 重要：必须同时清除 ETag，否则会导致 304 响应但数据为 null 的问题
 */
export function clearUserProfileCache() {
  removeCache(CACHE_PREFIX.USER_PROFILE);
  removeCache(`${CACHE_PREFIX.USER_PROFILE}_etag`);
}

// 动态导入 clearMySpaceCache 以避免循环依赖
const clearAllUserCaches = async () => {
  clearUserProfileCache();
  const { clearMySpaceCache } = await import("./myspace");
  clearMySpaceCache();
};

/**
 * Handle API errors uniformly
 */
const handleApiError = (error: any) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem("auth_token");
    // 401 时清除所有用户缓存
    clearAllUserCaches();
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
