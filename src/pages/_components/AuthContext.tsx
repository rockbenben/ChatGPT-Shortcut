import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { getUserAllInfo } from "@site/src/api";

export const AuthContext = createContext({
  userAuth: null,
  refreshUserAuth: () => {},
  setUserAuth: (userAuth: any) => {},
});

export function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const userAuth = await getUserAllInfo();
      setUserAuth(userAuth);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // 这里可以考虑做额外处理，例如置空、显示错误提示或者重定向到登录页面
      // setUserAuth(null);
    } finally {
      setIsLoading(false);
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
    }),
    [userAuth, fetchUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
