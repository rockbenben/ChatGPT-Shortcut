import axios from "axios";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const STRAPI_CALLBACK_BASE = "https://api.newzone.top"; // http://localhost:1337 // 供回调和用户数据请求使用
const GAUTH_API_BASE = "https://gauth.aishort.top"; // Google 登录入口服务
const GOOGLE_CONNECT_PATH = "/api/connect/google";
const GOOGLE_CALLBACK_PATH = "/api/connect/google/callback";
const USERS_ME_PATH = "/api/users/me";
const FRONTEND_CALLBACK_PATH = "/user/auth";
const REDIRECT_PARAM_KEY = "redirect";
const INCLUDE_REDIRECT_QUERY = true;

const buildGauthUrl = (path) => `${GAUTH_API_BASE}${path}`;
const buildCallbackUrl = (path) => `${STRAPI_CALLBACK_BASE}${path}`;

const resolveRedirectUrl = () => {
  if (ExecutionEnvironment.canUseDOM) {
    return `${window.location.origin}${FRONTEND_CALLBACK_PATH}`;
  }
  return null;
};

// 获取 Google 认证 URL
export async function getGoogleAuthUrl() {
  const redirectUrl = resolveRedirectUrl();
  const url = new URL(buildGauthUrl(GOOGLE_CONNECT_PATH));

  if (redirectUrl && INCLUDE_REDIRECT_QUERY) {
    url.searchParams.set(REDIRECT_PARAM_KEY, redirectUrl);
  }

  return url.toString();
}

// 使用来自回调的数据解析认证结果
export async function authenticateUserWithGoogle(payload) {
  if (!payload) {
    throw new Error("Missing Google authentication payload.");
  }

  // 新流程：直接接收 Strapi 重定向返回的 jwt 与用户信息
  if (typeof payload === "object") {
    const token = payload.jwt || payload.access_token || payload.id_token || payload.token;

    if (token) {
      const userFromPayload = coerceUser(payload.user);
      if (userFromPayload) {
        return { token, user: userFromPayload };
      }

      const user = await getAuthenticatedUserDetails(token);
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
          Object.entries(value).forEach(([rawKey, rawValue]) => {
            if (rawValue !== undefined && rawValue !== null) {
              callbackUrl.searchParams.set(rawKey, rawValue);
            }
          });
        } else if (typeof value === "object") {
          callbackUrl.searchParams.set(key, JSON.stringify(value));
        } else {
          callbackUrl.searchParams.set(key, value);
        }
      }
    });
  }

  try {
    const { data } = await axios.get(callbackUrl.toString(), { timeout: 30000, withCredentials: true });

    if (!data?.jwt || !data?.user) {
      throw new Error("Invalid response from Strapi Google callback.");
    }

    return { token: data.jwt, user: data.user };
  } catch (error) {
    console.error("Error authenticating user with Google:", error);
    if (error?.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  }
}

// 获取认证用户详细信息
export async function getAuthenticatedUserDetails(token) {
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

const coerceUser = (userCandidate) => {
  if (!userCandidate) {
    return undefined;
  }

  if (typeof userCandidate === "object") {
    return userCandidate;
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
