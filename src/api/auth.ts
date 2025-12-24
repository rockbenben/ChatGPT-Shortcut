/**
 * Authentication APIs - register, login, password management, Google OAuth
 *
 * API 配置统一在 config.ts 中定义
 */
import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { apiClient, persistAuthToken } from "./client";
import { API_URL, GAUTH_API_BASE, USE_LEGACY_GAUTH } from "./config";
import { clearMySpaceCache } from "./myspace";

// Google OAuth 路径配置
const STRAPI_CALLBACK_BASE = API_URL.replace(/\/api$/, ""); // 回调和用户数据请求使用主 API(只替换最后出现的 /api)
const GOOGLE_CONNECT_PATH = "/api/connect/google";
const GOOGLE_CALLBACK_PATH = "/api/connect/google/callback";
const USERS_ME_PATH = "/api/users/me";
const FRONTEND_CALLBACK_PATH = "/user/auth";
const REDIRECT_PARAM_KEY = "redirect";
const INCLUDE_REDIRECT_QUERY = true;

const buildGauthUrl = (path: string) => `${GAUTH_API_BASE}${path}`;
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
  clearMySpaceCache(); // 清除旧用户的 MySpace 缓存
  return response;
}

/**
 * Change password for logged-in user
 */
export async function changePassword(values: { currentPassword: string; newPassword: string; confirmPassword: string }) {
  try {
    await apiClient.post(`/auth/change-password`, {
      password: values.newPassword,
      currentPassword: values.currentPassword,
      passwordConfirmation: values.confirmPassword,
    });
    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

/**
 * Request password reset email
 */
export async function forgotPassword(email: string) {
  try {
    await apiClient.post(`/auth/forgot-password`, {
      email: email,
    });
    return true;
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    throw error;
  }
}

/**
 * Reset password with code
 */
export async function resetPassword(values: { code: string; newPassword: string; confirmPassword: string }) {
  try {
    const response = await apiClient.post(`/auth/reset-password`, {
      code: values.code,
      password: values.newPassword,
      passwordConfirmation: values.confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

/**
 * Send passwordless login link
 */
export async function sendPasswordlessLink(target: { email?: string }) {
  try {
    return await apiClient.post(`/passwordless/send-link`, target);
  } catch (error) {
    console.error("Failed to send passwordless link:", error);
    throw error;
  }
}

/**
 * Login with passwordless token
 */
export async function loginWithToken(loginToken: string) {
  try {
    const response = await apiClient.get(`/passwordless/login`, { params: { loginToken } });
    persistAuthToken(response.data.jwt);
    clearMySpaceCache(); // 清除旧用户的 MySpace 缓存
    return response.data;
  } catch (error) {
    console.error("Failed to login with token:", error);
    throw error;
  }
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
 * 获取 Google 认证 URL
 * 根据 USE_LEGACY_GAUTH 开关选择流程：
 * - true:  旧版流程，调用 /init 端点获取 URL
 * - false: 新版流程，构建 Strapi /api/connect/google URL
 */
export async function getGoogleAuthUrl(): Promise<string> {
  if (USE_LEGACY_GAUTH) {
    // 旧版流程：调用 /init 端点
    try {
      const response = await axios.get(buildCallbackUrl("/strapi-google-auth/init"));
      return response.data.url;
    } catch (error) {
      console.error("Error fetching Google authentication URL:", error);
      throw error;
    }
  } else {
    // 新版流程：构建 Strapi connect URL
    const redirectUrl = resolveRedirectUrl();
    const url = new URL(buildGauthUrl(GOOGLE_CONNECT_PATH));

    if (redirectUrl && INCLUDE_REDIRECT_QUERY) {
      url.searchParams.set(REDIRECT_PARAM_KEY, redirectUrl);
    }

    return url.toString();
  }
}

/**
 * 获取认证用户详细信息
 * 使用主 API (http://localhost:1337) 获取用户数据
 */
export async function getAuthenticatedUserDetails(token: string): Promise<Record<string, unknown>> {
  if (!token) {
    throw new Error("Missing authentication token.");
  }

  try {
    const { data } = await axios.get(buildCallbackUrl(USERS_ME_PATH), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching authenticated user details:", error);
    throw error;
  }
}

/**
 * Google 登录：使用来自回调的数据完成认证
 * 根据 USE_LEGACY_GAUTH 开关选择流程：
 * - true:  旧版流程，调用 /user-profile 端点
 * - false: 新版流程，使用 Strapi callback 或直接解析 JWT
 */
export async function googleLogin(payload: GoogleAuthPayload): Promise<GoogleAuthResult> {
  if (!payload) {
    throw new Error("Missing Google authentication payload.");
  }

  // 旧版流程：使用 /user-profile + /me 端点
  if (USE_LEGACY_GAUTH) {
    const code = typeof payload === "string" ? payload : payload.code;
    if (!code) {
      throw new Error("Missing authorization code for legacy Google authentication.");
    }

    try {
      // Step 1: 调用 /user-profile 获取 token
      const profileResponse = await axios.post(buildGauthUrl("/strapi-google-auth/user-profile"), { code }, { timeout: 30000 });
      const profileData = profileResponse.data.data;

      // 从返回数据中提取 token
      const token = profileData.jwt || profileData.token || profileData.access_token;
      if (!token) {
        throw new Error("No token received from /user-profile endpoint.");
      }

      // Step 2: 调用 /me 获取完整用户信息
      const userResponse = await axios.get(buildCallbackUrl("/strapi-google-auth/me"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;

      clearMySpaceCache();
      return { token, user };
    } catch (error) {
      console.error("Error authenticating user with Google:", error);
      if ((error as { code?: string })?.code === "ECONNABORTED") {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    }
  }

  // 新流程：直接接收 Strapi 重定向返回的 jwt 与用户信息
  if (typeof payload === "object") {
    const token = payload.jwt || payload.access_token || payload.id_token || payload.token;

    if (token) {
      const userFromPayload = coerceUser(payload.user);
      if (userFromPayload) {
        clearMySpaceCache(); // 清除旧用户的 MySpace 缓存
        return { token, user: userFromPayload };
      }

      const user = await getAuthenticatedUserDetails(token);
      clearMySpaceCache(); // 清除旧用户的 MySpace 缓存
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

    clearMySpaceCache(); // 清除旧用户的 MySpace 缓存
    return { token: data.jwt, user: data.user };
  } catch (error) {
    console.error("Error authenticating user with Google:", error);
    if ((error as { code?: string })?.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  }
}
