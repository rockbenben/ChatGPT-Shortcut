import React, { createContext, useState, useMemo, useCallback } from "react";

const LOCAL_FAVORITES_KEY = "local_favorites";
const LOCAL_PROMPTS_KEY = "local_user_prompts";

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

function buildLocalAuth(): any {
  if (typeof window === "undefined") return null;
  const favorites: number[] = JSON.parse(localStorage.getItem(LOCAL_FAVORITES_KEY) || "[]");
  const prompts: any[] = JSON.parse(localStorage.getItem(LOCAL_PROMPTS_KEY) || "[]");
  return {
    data: {
      id: Date.now(),
      favorites: { id: 1, loves: favorites, commLoves: [] },
      userprompts: prompts,
    },
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userAuth, setUserAuth] = useState<any>(buildLocalAuth);
  const authLoading = false;

  const refreshUserAuth = useCallback(() => {
    setUserAuth(buildLocalAuth());
  }, []);

  const value = useMemo(
    () => ({ userAuth, setUserAuth, refreshUserAuth, authLoading }),
    [userAuth, refreshUserAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
