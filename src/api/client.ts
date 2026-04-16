/**
 * API Client - Axios instance and shared utilities
 *
 * API 配置统一在 config.ts 中定义
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { removeCache, removeETag, CACHE_PREFIX } from "@site/src/utils/cache";
import { API_URL } from "./config";

// Token Management
let authToken: string | null = null;

if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

/**
 * 清除用户基本信息缓存（id, username, email）
 * 必须同时清除 ETag，否则下次请求带旧 ETag，服务端命中可能返回旧数据
 */
export function clearUserProfileCache() {
  removeCache(CACHE_PREFIX.USER_PROFILE);
  removeETag(CACHE_PREFIX.USER_PROFILE);
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
// timeout: 30s 兜底防止挂起请求（移动网络、Strapi 冷启动、myspace 大数据等场景）
// 比 AuthContext 中 withTimeout 的 12s 更大，让上层软超时优先生效
export const apiClient = axios.create({ baseURL: API_URL, timeout: 30000 });

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
