/**
 * Authentication APIs - register, login, password management, Google OAuth
 *
 * API 配置统一在 config.ts 中定义
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { apiClient, persistAuthToken } from "./client";
import { API_URL, GAUTH_API_BASE } from "./config";
// 登录后清除所有用户级缓存（旧账号残留 ETag 可能与新账号巧合命中，导致数据泄漏）
import { clearUserSessionCaches } from "./sessionCache";

// Google OAuth 路径配置
const STRAPI_CALLBACK_BASE = API_URL.replace(/\/api$/, ""); // 回调和用户数据请求使用主 API(只替换最后出现的 /api)
const GOOGLE_CONNECT_PATH = "/api/connect/google";
const GOOGLE_CALLBACK_PATH = "/api/connect/google/callback";
const USERS_ME_PATH = "/api/users/me";
const FRONTEND_CALLBACK_PATH = "/user/auth";
const REDIRECT_PARAM_KEY = "redirect";

const buildCallbackUrl = (path: string) => `${STRAPI_CALLBACK_BASE}${path}`;

const resolveRedirectUrl = (): string | null => {
  if (ExecutionEnvironment.canUseDOM) {
    return `${window.location.origin}${FRONTEND_CALLBACK_PATH}`;
  }
  return null;
};

/**
 * Register a new user
 */
export async function register(values: { username: string; email: string; password: string }) {
  const response = await apiClient.post(`/auth/local/register`, {
    username: values.username,
    email: values.email,
    password: values.password,
  });
  // 新用户注册无需清除缓存
  return response;
}

/**
 * Login with username/email and password
 */
export async function login(values: { username: string; password: string }) {
  const response = await apiClient.post(`/auth/local`, {
    identifier: values.username,
    password: values.password,
  });
  clearUserSessionCaches(); // 清除旧用户的 USER_PROFILE 与 MySpace 缓存
  return response;
}

/**
 * Change password for logged-in user
 */
export async function changePassword(values: { currentPassword: string; newPassword: string; confirmPassword: string }) {
  await apiClient.post(`/auth/change-password`, {
    password: values.newPassword,
    currentPassword: values.currentPassword,
    passwordConfirmation: values.confirmPassword,
  });
  return true;
}

/**
 * Request password reset email
 */
export async function forgotPassword(email: string) {
  await apiClient.post(`/auth/forgot-password`, {
    email: email,
  });
  return true;
}

/**
 * Reset password with code
 */
export async function resetPassword(values: { code: string; newPassword: string; confirmPassword: string }) {
  const response = await apiClient.post(`/auth/reset-password`, {
    code: values.code,
    password: values.newPassword,
    passwordConfirmation: values.confirmPassword,
  });
  return response.data;
}

/**
 * Send passwordless login link
 */
export async function sendPasswordlessLink(target: { email?: string }) {
  return apiClient.post(`/passwordless/send-link`, target);
}

/**
 * Login with passwordless token
 */
export async function loginWithToken(loginToken: string) {
  const response = await apiClient.get(`/passwordless/login`, { params: { loginToken } });
  persistAuthToken(response.data.jwt);
  clearUserSessionCaches(); // 清除旧用户的 USER_PROFILE 与 MySpace 缓存
  return response.data;
}

// ============================================================================
// Google OAuth 相关函数
// ============================================================================

interface GoogleAuthPayload {
  jwt?: string;
  access_token?: string;
  id_token?: string;
  token?: string;
  user?: unknown;
  code?: string;
  provider?: string;
  rawParams?: Record<string, unknown>;
  [key: string]: unknown;
}

interface GoogleAuthResult {
  token: string;
  user: Record<string, unknown>;
}

/**
 * 解析用户数据
 */
const coerceUser = (userCandidate: unknown): Record<string, unknown> | undefined => {
  if (!userCandidate) {
    return undefined;
  }

  if (typeof userCandidate === "object") {
    return userCandidate as Record<string, unknown>;
  }

  if (typeof userCandidate === "string") {
    try {
      return JSON.parse(decodeURIComponent(userCandidate));
    } catch (error) {
      console.error("Failed to parse user payload from Google authentication response:", error);
    }
  }

  return undefined;
};

/**
 * 获取 Google 认证 URL —— 构建 Strapi 原生 /api/connect/google 入口
 */
export async function getGoogleAuthUrl(): Promise<string> {
  const redirectUrl = resolveRedirectUrl();
  const url = new URL(`${GAUTH_API_BASE}${GOOGLE_CONNECT_PATH}`);

  if (redirectUrl) {
    url.searchParams.set(REDIRECT_PARAM_KEY, redirectUrl);
  }

  return url.toString();
}

/**
 * 获取认证用户详细信息
 * 使用主 API (http://localhost:1337) 获取用户数据
 */
async function getAuthenticatedUserDetails(token: string): Promise<Record<string, unknown>> {
  if (!token) {
    throw new Error("Missing authentication token.");
  }

  const { data } = await axios.get(buildCallbackUrl(USERS_ME_PATH), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * Google 登录：使用来自 Strapi 回调的数据完成认证
 */
export async function googleLogin(payload: GoogleAuthPayload): Promise<GoogleAuthResult> {
  if (!payload) {
    throw new Error("Missing Google authentication payload.");
  }

  // 直接接收 Strapi 重定向返回的 jwt 与用户信息
  if (typeof payload === "object") {
    const token = payload.jwt || payload.access_token || payload.id_token || payload.token;

    if (token) {
      const userFromPayload = coerceUser(payload.user);
      if (userFromPayload) {
        clearUserSessionCaches();
        return { token, user: userFromPayload };
      }

      const user = await getAuthenticatedUserDetails(token);
      clearUserSessionCaches();
      return { token, user };
    }
  }

  // 兼容旧流程：使用 code/state 继续请求 Strapi callback
  const callbackUrl = new URL(buildCallbackUrl(GOOGLE_CALLBACK_PATH));

  if (typeof payload === "string") {
    callbackUrl.searchParams.set("code", payload);
  } else if (typeof payload === "object") {
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "rawParams" && typeof value === "object") {
          Object.entries(value as Record<string, unknown>).forEach(([rawKey, rawValue]) => {
            if (rawValue !== undefined && rawValue !== null) {
              callbackUrl.searchParams.set(rawKey, String(rawValue));
            }
          });
        } else if (typeof value === "object") {
          callbackUrl.searchParams.set(key, JSON.stringify(value));
        } else {
          callbackUrl.searchParams.set(key, String(value));
        }
      }
    });
  }

  try {
    const { data } = await axios.get(callbackUrl.toString(), { timeout: 30000, withCredentials: true });

    if (!data?.jwt || !data?.user) {
      throw new Error("Invalid response from Strapi Google callback.");
    }

    clearUserSessionCaches();
    return { token: data.jwt, user: data.user };
  } catch (error) {
    console.error("Error authenticating user with Google:", error);
    if ((error as { code?: string })?.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  }
}
