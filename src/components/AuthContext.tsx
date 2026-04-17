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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Stale-While-Revalidate: 用缓存的 userAuth 初始化，避免刷新时闪烁
  const cachedUserAuth = typeof window !== "undefined" ? getCache("user_auth") : null;
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("auth_token");

  // 有 token 但无缓存时（典型场景：刚登录后 reload），先用 pending 占位视作已登录
  // 避免显示骨架屏；真实数据由 fetchUser 完成后填充
  // data 为 null：下游 userAuth?.data?.X 链会返回 undefined；现有的 `if (!userAuth?.data) return` 守卫也正确生效
  const initialUserAuth = cachedUserAuth || (hasToken ? { pending: true, data: null } : null);

  const [userAuth, setUserAuth] = useState<any>(initialUserAuth);
  // 有缓存或 pending 占位时不显示骨架；仅在未知状态（既无 token 又无缓存）或强制刷新时才可能开启
  const [authLoading, setAuthLoading] = useState(false);

  const fetchUser = useCallback(async (forceRefresh = false) => {
    // 快速检查：如果没有 token，直接跳过 loading 状态
    const token = typeof window !== "undefined" && localStorage.getItem("auth_token");
    if (!token) {
      setAuthLoading(false);
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
