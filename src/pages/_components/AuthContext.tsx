import React, { createContext, useState, useEffect, useMemo, useCallback, startTransition } from "react";
import { getUserAllInfo } from "@site/src/api";

export const AuthContext = createContext({
  userAuth: null,
  refreshUserAuth: () => {},
  setUserAuth: (userAuth: any) => {},
  isLoading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userAuth, setUserAuth] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // 初始不加载，等空闲再触发

  const fetchUser = useCallback(async () => {
    startTransition(() => setIsLoading(true));
    try {
      const userAuthResp = await getUserAllInfo();
      startTransition(() => setUserAuth(userAuthResp));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      startTransition(() => setIsLoading(false));
    }
  }, []);

  // 使用空闲回调或延时，确保避开 SSR -> Hydration 的关键窗口，降低 React 421 发生概率
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      fetchUser();
    };
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(run, { timeout: 1500 });
      } else {
        setTimeout(run, 80); // 给 hydration 一点缓冲
      }
    }
    return () => {
      cancelled = true;
    };
  }, [fetchUser]);

  const value = useMemo(
    () => ({
      userAuth,
      setUserAuth,
      refreshUserAuth: fetchUser,
      isLoading,
    }),
    [userAuth, fetchUser, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
