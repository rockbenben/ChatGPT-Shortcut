import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Token Management
// 约定：对 auth_token 的**写入**统一走 persistAuthToken，不直接调用 localStorage.setItem/removeItem。
// 独立于 client.ts（不引入 axios），让 AuthContext 与登出路径无需把 axios 打进主包。
let authToken: string | null = null;

if (ExecutionEnvironment.canUseDOM) {
  authToken = localStorage.getItem("auth_token");
}

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
