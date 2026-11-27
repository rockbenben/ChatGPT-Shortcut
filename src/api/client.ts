/**
 * API Client - Axios instance and shared utilities
 *
 * API 配置统一在 config.ts 中定义
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { clearUserSessionCaches } from "./sessionCache";
import { API_URL, AUTH_EXPIRED_EVENT } from "./config";
import { getAuthToken, persistAuthToken } from "./token";

export { getAuthToken, persistAuthToken };

/**
 * Handle API errors uniformly
 *
 * `: never` 是刻意的：下方拦截器产生 rejection 完全依赖本函数抛出异常，
 * 而 (error) => void 的签名让类型系统对此一无所知。标注后 tsc 会拒绝任何可达终点，
 * 连 `if (!error?.response) return;` 这种最常见的早退也会直接编译报错。
 */
const handleApiError = (error: any): never => {
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
