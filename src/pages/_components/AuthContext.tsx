import React, { createContext, useState, useEffect, useCallback } from "react";
import { getUserAllInfo } from "@site/src/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const userAuth = await getUserAllInfo();
      setUserAuth(userAuth);
    } catch (error) {
      // 这里可以进行错误处理，比如重定向到登录页面
    } finally {
    }
  }, []); // 确保函数只在组件首次渲染时创建

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value = {
    userAuth,
    setUserAuth,
    refreshUserAuth: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
