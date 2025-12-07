import React, { createContext, useState, useEffect, useMemo, useCallback, startTransition } from "react";
import { getUserAllInfo } from "@site/src/api";

export const AuthContext = createContext({
  userAuth: null,
  refreshUserAuth: () => {},
  setUserAuth: (userAuth: any) => {},
  authLoading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userAuth, setUserAuth] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    startTransition(() => setAuthLoading(true));
    try {
      const userAuthResp = await getUserAllInfo();
      startTransition(() => setUserAuth(userAuthResp));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
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
