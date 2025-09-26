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
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    startTransition(() => setIsLoading(true));
    try {
      const userAuthResp = await getUserAllInfo();
      startTransition(() => setUserAuth(userAuthResp));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // 这里可以考虑做额外处理，例如置空、显示错误提示或者重定向到登录页面
      // setUserAuth(null); // 如果 getUserAllInfo 返回 null，表示未登录，这里不需要再设置为 null
    } finally {
      startTransition(() => setIsLoading(false));
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
      isLoading,
    }),
    [userAuth, fetchUser, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
