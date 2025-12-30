import React, { createContext, useState, useEffect, useMemo, useCallback, startTransition } from "react";
import { getMySpace, clearMySpaceCache } from "@site/src/api";
import { deriveLoves, deriveCommLoves, deriveUserprompts } from "@site/src/utils/myspaceUtils";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Stale-While-Revalidate: 用缓存的 userAuth 初始化，避免刷新时闪烁
  const { getCache } = require("@site/src/utils/cache");
  const cachedUserAuth = typeof window !== "undefined" ? getCache("user_auth") : null;
  const [userAuth, setUserAuth] = useState<any>(cachedUserAuth);

  // 如果有缓存，不显示 loading 状态（后台静默刷新）
  const hasToken = typeof window !== "undefined" && localStorage.getItem("auth_token");
  const [authLoading, setAuthLoading] = useState(hasToken && !cachedUserAuth);

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
    try {
      const myspaceData = await getMySpace();

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

      const newUserAuth = { data: enrichedData };
      startTransition(() => setUserAuth(newUserAuth));
      // 缓存 userAuth 用于下次快速显示
      const { setCache, CACHE_TTL } = require("@site/src/utils/cache");
      setCache("user_auth", newUserAuth, CACHE_TTL.MYSPACE);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      startTransition(() => setUserAuth(null));
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
    [userAuth, fetchUser, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
