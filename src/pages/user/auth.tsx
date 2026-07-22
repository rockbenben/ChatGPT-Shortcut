import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { loginWithToken } from "@site/src/api";
import { getCache, removeCache, PASSWORDLESS_LOCALE_KEY } from "@site/src/utils/cache";

const CallbackPage = () => {
  const location = useLocation();
  const { i18n } = useDocusaurusContext();

  useEffect(() => {
    const params = mergeSearchAndHashParams(location.search, location.hash);

    try {
      const loginToken = params.get("loginToken");
      if (loginToken) {
        loginUserWithToken(loginToken);
        return;
      }

      const jwt = params.get("access_token") || params.get("jwt") || params.get("token") || params.get("id_token");
      const state = params.get("state");
      const provider = params.get("provider") || "google";
      const code = params.get("code");

      if (jwt || code) {
        if (window.opener) {
          const userRaw = params.get("user");
          const user = parseUserParam(userRaw);
          const rawParams = Object.fromEntries(params.entries());

          window.opener.postMessage(
            {
              provider,
              jwt,
              access_token: jwt,
              code,
              state,
              user,
              id_token: params.get("id_token"),
              rawParams,
            },
            "*"
          );
          window.close();
        } else {
          console.error("Please do not close the main login page during the login process");
        }
      }
    } catch (error) {
      console.error("An error occurred while handling the OAuth callback:", error);
    }
  }, [location]);

  const loginUserWithToken = async (token: string) => {
    try {
      await loginWithToken(token);
    } catch (error) {
      console.error("Login failed, token is invalid or expired:", error);
    } finally {
      // Strapi 后台 Confirmation URL 固定为 /user/auth（默认语言），
      // 用发起登录时存的 locale 前缀还原用户原始语言首页。
      // 必须对照 i18n.locales 白名单校验：直接拼接 localStorage 原值时，
      // 形如 "//evil.com" 的值会让 location.replace 变成协议相对开放重定向。
      let localePrefix = "";
      try {
        // 走 lscache：写入方给了 30 分钟 TTL，过期自动失效，不会像裸 localStorage
        // 那样把几周前放弃的那次尝试的语言残值留到现在
        const stored = getCache(PASSWORDLESS_LOCALE_KEY) || "";
        removeCache(PASSWORDLESS_LOCALE_KEY);
        if (i18n.locales.some((locale) => locale !== i18n.defaultLocale && stored === `/${locale}`)) {
          localePrefix = stored;
        }
      } catch {}
      window.location.replace(localePrefix + "/");
    }
  };

  return null; // or a loading spinner, or whatever you want to show while waiting
};

const mergeSearchAndHashParams = (search: string, hash: string): URLSearchParams => {
  const merged = new URLSearchParams(search || "");
  const hashParams = new URLSearchParams((hash || "").replace(/^#/, ""));
  hashParams.forEach((value, key) => {
    if (!merged.has(key)) {
      merged.set(key, value);
    }
  });
  return merged;
};

const parseUserParam = (rawValue: string | null) => {
  if (!rawValue) {
    return undefined;
  }

  try {
    const decoded = decodeURIComponent(rawValue);
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to parse user data from OAuth callback:", error);
    return undefined;
  }
};

export default CallbackPage;
