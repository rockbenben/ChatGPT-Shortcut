import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { Button, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { loginWithToken } from "@site/src/api";
import { EmptyState } from "@site/src/components/EmptyState";
import { getCache, removeCache, PASSWORDLESS_LOCALE_KEY } from "@site/src/utils/cache";

/** 三种状态都要给用户看得懂的画面（原来一律 return null，白屏） */
type CallbackState = "working" | "idle" | "failed";

const CallbackPage = () => {
  const location = useLocation();
  const { i18n } = useDocusaurusContext();
  // 首帧按"处理中"渲染（带参进来的占绝大多数）；命名 phase 是为了避开下面的 OAuth `state` 参数
  const [phase, setPhase] = useState<CallbackState>("working");

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
          // 发起登录的那个窗口已经关了，postMessage 无处可送 —— 用户必须回原窗口重来
          console.error("Please do not close the main login page during the login process");
          setPhase("failed");
        }
        return;
      }

      // 没有任何可处理的参数：多半是直接打开/收藏了这个中转地址
      setPhase("idle");
    } catch (error) {
      console.error("An error occurred while handling the OAuth callback:", error);
      setPhase("failed");
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

  // 登录成功会 location.replace 离开本页，这里只覆盖"处理中"和两种走不下去的情况
  const backHome = (
    <Link to="/">
      <Button type="primary" icon={<LoginOutlined />}>
        <Translate id="auth.callback.backHome">返回首页登录</Translate>
      </Button>
    </Link>
  );

  return (
    <Layout title={translate({ id: "auth.callback.title", message: "完成登录" })} noFooter>
      {phase === "working" ? (
        <EmptyState icon={<Spin />} title={<Translate id="auth.callback.working">正在完成登录…</Translate>} description={<Translate id="auth.callback.workingHint">请不要关闭本页，稍后会自动跳回首页</Translate>} />
      ) : phase === "failed" ? (
        <EmptyState
          title={<Translate id="auth.callback.failed">登录没有完成</Translate>}
          description={<Translate id="auth.callback.failedHint">登录链接可能已过期或已被使用过。回到首页重新登录即可。</Translate>}
          action={backHome}
        />
      ) : (
        <EmptyState
          title={<Translate id="auth.callback.idle">这里没有待处理的登录</Translate>}
          description={<Translate id="auth.callback.idleHint">本页只用于登录跳转，不需要收藏。</Translate>}
          action={backHome}
        />
      )}
    </Layout>
  );
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
