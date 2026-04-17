import React, { createContext, useState, useEffect, useMemo, useCallback, startTransition } from "react";
import { getMySpace, clearMySpaceCache, getPrompts } from "@site/src/api";
import { deriveLoves, deriveCommLoves, deriveUserprompts } from "@site/src/utils/myspaceUtils";
import { getCache, setCache, CACHE_TTL } from "@site/src/utils/cache";

export const AuthContext = createContext<{
  userAuth: any;
  refreshUserAuth: (forceRefresh?: boolean) => void;
  setUserAuth: (userAuth: any) => void;
  authLoading: boolean;
}>({
  userAuth: null,
  refreshUserAuth: () => {},
  setUserAuth: () => {},
  authLoading: false,
});

function withTimeout<T>(promise: Promise<T>, ms: number, label = "operation"): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`[AuthProvider] ${label} timed out after ${ms}ms`));
    }, ms);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 本地校验 JWT exp：失败/无 exp 时保守认为有效，避免错误登出；-60s 兜底时钟偏差
function isValidToken(token: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    const padded = pad ? b64 + "=".repeat(4 - pad) : b64;
    const payload = JSON.parse(atob(padded));
    if (typeof payload.exp !== "number") return true;
    return payload.exp * 1000 - 60_000 > Date.now();
  } catch {
    return false;
  }
}

// 本地过期 token 的清理（供初始化与 fetchUser 共用）
function readValidToken(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_token");
  if (!raw) return null;
  if (isValidToken(raw)) return raw;
  localStorage.removeItem("auth_token");
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Stale-While-Revalidate: 用缓存的 userAuth 初始化，避免刷新时闪烁
  const cachedUserAuth = typeof window !== "undefined" ? getCache("user_auth") : null;
  const hasValidToken = !!readValidToken();

  // 有 token 但无缓存时（典型场景：刚登录后 reload），先用 pending 占位视作已登录
  // 避免显示骨架屏；真实数据由 fetchUser 完成后填充
  // data 为 null：下游 userAuth?.data?.X 链会返回 undefined；现有的 `if (!userAuth?.data) return` 守卫也正确生效
  const initialUserAuth = cachedUserAuth || (hasValidToken ? { pending: true, data: null } : null);

  const [userAuth, setUserAuth] = useState<any>(initialUserAuth);
  // 有缓存或 pending 占位时不显示骨架；仅在未知状态（既无 token 又无缓存）或强制刷新时才可能开启
  const [authLoading, setAuthLoading] = useState(false);

  const fetchUser = useCallback(async (forceRefresh = false) => {
    // 快速检查：无 token 或本地已判定过期，直接登出态并返回
    const token = readValidToken();
    if (!token) {
      setAuthLoading(false);
      // 若初始化时挂了 pending 占位，需要降为登出态
      startTransition(() => setUserAuth((prev) => (prev?.pending ? null : prev)));
      return;
    }

    // 强制刷新时先清除 MySpace 缓存
    if (forceRefresh) {
      clearMySpaceCache();
    }

    // 仅在 forceRefresh=true 时显示 loading，false 时静默刷新
    if (forceRefresh) {
      startTransition(() => setAuthLoading(true));
    }
    const hadCachedAuth = Boolean(cachedUserAuth);

    const fetchOnce = async () => {
      // Avoid being stuck in loading forever if the request stalls.
      // getMySpace() itself catches and may return cache/null, but it cannot resolve if the underlying request never completes.
      const myspaceData = await withTimeout(getMySpace(), 12_000, "getMySpace");

      // If request returned nothing (and no cache), stop loading and keep current state.
      if (!myspaceData) {
        return null;
      }

      // 处理 customTags：后端可能返回嵌套结构或扁平数组
      const customTagsArray = Array.isArray(myspaceData.customTags) ? myspaceData.customTags : myspaceData.customTags?.definitions || [];

      // 防御性过滤：移除 id 为 null/undefined 的无效项
      const validItems = (myspaceData.items || []).filter((item) => {
        if (item.id == null || item.id === undefined) {
          console.warn("[AuthProvider] Filtered out invalid item with null ID:", item);
          return false;
        }
        return true;
      });

      // 添加派生数据以保持与现有代码的兼容性
      const enrichedData = {
        ...myspaceData,
        customTags: customTagsArray, // 确保是数组
        items: validItems, // ← 使用过滤后的 items
        favorites: {
          id: myspaceData.favoriteId,
          loves: deriveLoves(validItems), // ← 使用 validItems
          commLoves: deriveCommLoves(validItems), // ← 使用 validItems
          customTags: {
            definitions: customTagsArray,
            itemTags: myspaceData.customTags?.itemTags || {},
          },
        },
        userprompts: deriveUserprompts(validItems), // ← 使用 validItems
      };

      // 先更新 UI，再后台预取 —— 预取仅为填充二级缓存，不应阻塞登录态呈现
      const newUserAuth = { data: enrichedData };
      startTransition(() => setUserAuth(newUserAuth));
      // 缓存 userAuth 用于下次快速显示
      setCache("user_auth", newUserAuth, CACHE_TTL.MYSPACE);

      // 后台预取提示词详情（fire-and-forget），消除 MySpace 首次挂载的请求瀑布
      // userprompts/commus 不依赖语言，cards 使用本地 JSON（已经很快）
      const promptIds = validItems.filter((i) => i.type === "prompt").map((i) => i.id);
      const commuIds = validItems.filter((i) => i.source === "community").map((i) => i.id);
      if (promptIds.length > 0 || commuIds.length > 0) {
        withTimeout(
          Promise.all([promptIds.length > 0 ? getPrompts("userprompts", promptIds) : null, commuIds.length > 0 ? getPrompts("commus", commuIds) : null]),
          8_000,
          "prefetch",
        ).catch(() => {
          // 预取超时或失败不阻塞，MySpace 挂载时会重新获取
        });
      }

      return myspaceData;
    };

    try {
      await fetchOnce();
    } catch (error) {
      // One bounded retry for transient failures on the initial/background refresh.
      // Don't retry force refresh to keep user-triggered actions responsive.
      if (!forceRefresh) {
        try {
          await delay(800);
          await fetchOnce();
          return;
        } catch (retryError) {
          console.warn("Failed to fetch user data (after retry):", retryError);
        }
      } else {
        console.error("Failed to fetch user data:", error);
      }

      // Keep any existing cached userAuth to avoid UX regression.
      // If there was no cached auth to begin with, fall back to logged-out UI by clearing userAuth.
      if (!hadCachedAuth) {
        startTransition(() => setUserAuth(null));
      }
    } finally {
      startTransition(() => setAuthLoading(false));
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  // 跨标签页同步：另一标签页登出或写入新 user_auth 快照时，当前标签实时跟进
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea && e.storageArea !== localStorage) return;
      // 另一标签登出（localStorage.removeItem("auth_token")）
      if (e.key === "auth_token" && !e.newValue) {
        startTransition(() => setUserAuth(null));
        return;
      }
      // 另一标签刷新了 user_auth 缓存（收藏、新增提示词等），复用其结果避免重复请求
      if (e.key === "lscache-user_auth") {
        const fresh = getCache("user_auth");
        if (fresh) {
          startTransition(() => setUserAuth(fresh));
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      userAuth,
      setUserAuth,
      refreshUserAuth: fetchUser,
      authLoading,
    }),
    [userAuth, fetchUser, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
