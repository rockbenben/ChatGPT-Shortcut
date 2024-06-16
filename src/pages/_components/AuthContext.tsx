import React, { createContext, useState, useEffect } from "react";
import { getUserAllInfo } from "@site/src/api";

export const AuthContext = createContext({
  userAuth: null,
  refreshUserAuth: () => {},
  setUserAuth: (userAuth: any) => {},
});

export function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);

  // 封装的用户数据获取函数
  const fetchUser = async () => {
    try {
      const userAuth = await getUserAllInfo();
      setUserAuth(userAuth);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      // 这里可以进行错误处理，比如重定向到登录页面
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // 仅在组件首次渲染时调用

  const value = {
    userAuth,
    setUserAuth,
    refreshUserAuth: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
