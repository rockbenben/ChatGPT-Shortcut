/**
 * API Client - Axios instance and shared utilities
 *
 * API 配置统一在 config.ts 中定义
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { clearUserSessionCaches } from "./sessionCache";
import { API_URL, AUTH_EXPIRED_EVENT } from "./config";

// Token Management
// 约定：对 auth_token 的**写入**统一走 persistAuthToken，不直接调用 localStorage.setItem/removeItem。
// 注意这只是一致性约定，不是正确性依赖 —— getAuthToken() 在浏览器分支直读 localStorage，
// 下面这个模块级变量实际只在 SSR 分支被读到（那里恒为 null）。别围绕它设计运行期逻辑。
let authToken: string | null = null;

if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

// 本体在 sessionCache.ts，这里只做 re-export 以保持既有 import 路径不变
export { clearUserProfileCache } from "./sessionCache";

/**
 * Handle API errors uniformly
 */
const handleApiError = (error: any) => {
  if (error?.response?.status === 401) {
    persistAuthToken(null);
    // 清除所有与该会话绑定的缓存（同步，无 dynamic import）
    clearUserSessionCaches();
    // 通知 React 层把登录态降下来。只清缓存不够：本次会话的 UI 仍是登录样子，
    // 用户每次收藏/投票都会再打一发注定 401 的请求，白白压后端。
    if (ExecutionEnvironment.canUseDOM) {
      window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
    }
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
