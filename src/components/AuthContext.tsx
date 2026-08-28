import React, { createContext, useState, useMemo, useCallback, useRef, useEffect } from "react";
import { getMySpace, getMySpaceSync, saveFavorites, savePrompts, saveTags, loadPrompts } from "@site/src/api";
import { enrichMySpaceData } from "@site/src/utils/myspaceUtils";

/**
 * 离线版的 AuthContext —— 没有账号、没有网络，数据全部来自 localStorage。
 *
 * 接口面与在线版逐个对齐（userAuth / refreshUserAuth / setUserAuth / clearAuth /
 * getUserAuth / syncMySpaceState / authLoading）：MySpace 及其 myspace/* 模块、useFavorite、
 * useUserPrompt 全部照原样复用，两条线的组件代码不分叉。
 *
 * userAuth.data 也用 enrichMySpaceData 生成，与在线版同一个函数、同一套推导
 * （loves / commLoves / userprompts 都从 items 派生），避免两边形状悄悄漂移。
 */

interface MySpaceStatePatch {
  items?: any[];
  customTags?: any[];
  favoriteId?: number | null;
  favorites?: { id?: number; loves?: number[]; commLoves?: number[] };
}

export const AuthContext = createContext<{
  userAuth: any;
  refreshUserAuth: (forceRefresh?: boolean) => Promise<void>;
  setUserAuth: (userAuth: any) => void;
  clearAuth: () => void;
  getUserAuth: () => any;
  syncMySpaceState: (patch: MySpaceStatePatch) => void;
  authLoading: boolean;
}>({
  userAuth: null,
  refreshUserAuth: async () => {},
  setUserAuth: () => {},
  clearAuth: () => {},
  getUserAuth: () => null,
  syncMySpaceState: () => {},
  authLoading: false,
});

/**
 * data.id 每次都取新值（Date.now）是**有意的**，不要改成常量。
 *
 * HomePage 与 MySpace 用 data.id 的变化作为「需要重新加载」的哨兵
 * （HomePage:initializedUserIdRef、useSpaceItems:currentUserId）。在线版那里是真实用户 id，
 * 换用户才变；离线版没有用户，改用「每次重建都变」来驱动同一套刷新逻辑。
 * 固定成常量会让哨兵判定「没变」而跳过加载 —— 表现为收藏之后 UI 不刷新。
 */
function buildLocalAuth() {
  if (typeof window === "undefined") return null;
  // 用同步入口而不是 await getMySpace()：useState 的初始值不能是异步的，
  // 而首帧拿不到数据会让 MySpace 闪一帧空状态。离线版数据就在 localStorage，本就不需要异步。
  return { data: { ...enrichMySpaceData(getMySpaceSync()), id: Date.now() } };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userAuth, setUserAuthState] = useState<any>(null);
  const userAuthRef = useRef<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const applyAuth = useCallback((next: any) => {
    userAuthRef.current = next;
    setUserAuthState(next);
  }, []);

  const refreshUserAuth = useCallback(async () => {
    const raw = await getMySpace();
    applyAuth({ data: { ...enrichMySpaceData(raw as any), id: Date.now() } });
    setAuthLoading(false);
  }, [applyAuth]);

  // 挂载后再读 localStorage，不用 useState 的惰性初始值：
  // SSR 期间没有 localStorage，服务端会渲染出空态；客户端首帧若直接带着数据渲染，
  // 与服务端 HTML 不一致，React 会报 hydration mismatch 并丢弃整棵子树重渲。
  // 代价是多一次渲染，与在线版的行为一致（那边也要等 /myspace 回来）。
  useEffect(() => {
    applyAuth(buildLocalAuth());
    setAuthLoading(false);
  }, [applyAuth]);

  const getUserAuth = useCallback(() => userAuthRef.current, []);

  const clearAuth = useCallback(() => {
    applyAuth(null);
  }, [applyAuth]);

  /**
   * 在线版这里同时更新 state、lscache-user_auth 与 lscache-myspace 三处；
   * 离线版的持久层就是那几个 localStorage key，所以这里**必须真的落盘** ——
   * 只改 state 的话，收藏/标签/排序在刷新后全部回退，而且没有任何报错。
   */
  const syncMySpaceState = useCallback(
    (patch: MySpaceStatePatch) => {
      const current = userAuthRef.current?.data ?? {};
      const items = patch.items ?? current.items ?? [];
      const customTags = patch.customTags ?? current.customTags ?? [];

      // 落盘：从 items 反推三个 key
      saveFavorites(items.filter((it: any) => it.type === "favorite" && it.source === "card").map((it: any) => it.id));

      const promptItems = items.filter((it: any) => it.type === "prompt" && it.source === "userprompt");
      const existing = new Map(loadPrompts().map((p) => [p.id, p]));
      savePrompts(promptItems.map((it: any) => ({ ...(existing.get(it.id) ?? { id: it.id, title: "", description: "" }), share: it.share, updatedAt: it.updatedAt })));

      const itemTags: Record<string, string[]> = {};
      items.forEach((it: any) => {
        if (it.tags?.length) itemTags[String(it.id)] = it.tags;
      });
      saveTags({ definitions: customTags, itemTags });

      applyAuth({ data: { ...enrichMySpaceData({ favoriteId: patch.favoriteId ?? current.favoriteId ?? 1, items, customTags }), id: Date.now() } });
    },
    [applyAuth],
  );

  const value = useMemo(
    () => ({ userAuth, refreshUserAuth, setUserAuth: applyAuth, clearAuth, getUserAuth, syncMySpaceState, authLoading }),
    [userAuth, refreshUserAuth, applyAuth, clearAuth, getUserAuth, syncMySpaceState, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
