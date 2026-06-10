import React, { createContext, useState, useEffect, useMemo, useCallback, useRef, startTransition } from "react";
import { getMySpace, clearMySpaceCache, getPrompts } from "@site/src/api";
import { enrichMySpaceData } from "@site/src/utils/myspaceUtils";
import { getCache, setCache, CACHE_PREFIX, CACHE_TTL } from "@site/src/utils/cache";

/**
 * 部分更新 myspace 相关 state 的 patch 形态。
 * - items: 完整新 items 数组（包含 type=favorite + type=prompt）
 * - customTags: definitions array
 * - favoriteId: 通常不变；新用户首次写入或后端重建时才变
 * - favorites: server 权威的 loves/commLoves（跟 items 派生不一致时使用，如跨设备 drift）
 */
export interface MySpaceStatePatch {
  items?: any[];
  customTags?: any[];
  favoriteId?: number | null;
  favorites?: { id?: number; loves?: number[]; commLoves?: number[] };
}

export const AuthContext = createContext<{
  userAuth: any;
  refreshUserAuth: (forceRefresh?: boolean) => Promise<void>;
  setUserAuth: (userAuth: any) => void;
  /** 统一更新 myspace 相关 state（userAuth + lscache-user_auth + lscache-myspace），
   *  各 mutation 路径（useFavorite reconcile、drag、tag 改动）共用此入口避免漏写一处。 */
  syncMySpaceState: (patch: MySpaceStatePatch) => void;
  authLoading: boolean;
}>({
  userAuth: null,
  refreshUserAuth: async () => {},
  setUserAuth: () => {},
  syncMySpaceState: () => {},
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

// 本地校验 JWT exp：失败/无 exp 时保守认为有效，避免错误登出；-60s 兜底时钟偏差
function isValidToken(token: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    const padded = pad ? b64 + "=".repeat(4 - pad) : b64;
    const payload = JSON.parse(atob(padded));
    if (typeof payload.exp !== "number") return true;
    return payload.exp * 1000 - 60_000 > Date.now();
  } catch {
    return false;
  }
}

// 本地过期 token 的清理（供初始化与 fetchUser 共用）
function readValidToken(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_token");
  if (!raw) return null;
  if (isValidToken(raw)) return raw;
  localStorage.removeItem("auth_token");
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Stale-While-Revalidate: 用缓存的 userAuth 初始化，避免刷新时闪烁
  // 一次性计算：每次 re-render 都跑 getCache + readValidToken（含 atob + JSON.parse）是浪费
  const initialAuthRef = React.useRef<{ initial: any; hadCachedAuth: boolean } | null>(null);
  if (initialAuthRef.current === null) {
    if (typeof window === "undefined") {
      initialAuthRef.current = { initial: null, hadCachedAuth: false };
    } else {
      const cached = getCache("user_auth");
      // 有 token 但无缓存时（典型场景：刚登录后 reload），先用 pending 占位视作已登录
      // 避免显示骨架屏；真实数据由 fetchUser 完成后填充
      // data 为 null：下游 userAuth?.data?.X 链会返回 undefined；现有的 `if (!userAuth?.data) return` 守卫也正确生效
      initialAuthRef.current = cached
        ? { initial: cached, hadCachedAuth: true }
        : { initial: readValidToken() ? { pending: true, data: null } : null, hadCachedAuth: false };
    }
  }

  const [userAuth, setUserAuth] = useState<any>(initialAuthRef.current.initial);
  // 有缓存或 pending 占位时不显示骨架；仅在未知状态（既无 token 又无缓存）或强制刷新时才可能开启
  const [authLoading, setAuthLoading] = useState(false);

  // 共享 in-flight fetch promise：避免 ensureAuthReady / mount effect / 跨标签事件并发触发时
  // 多次 /myspace round-trip 互踩（last-write-wins 可能覆盖掉刚 reconcile 的 state）。
  // 仅对非 forceRefresh 复用；用户主动刷新（forceRefresh=true）始终单独跑，保留 UI loading 反馈。
  const inFlightFetchRef = useRef<Promise<void> | null>(null);

  // mutation 代际计数：每次 syncMySpaceState（客户端 mutation 的唯一本地同步入口）递增。
  // 后台 GET /myspace 在飞期间若 gen 变化，说明本地已发生更新，GET 不应覆盖（见 fetchOnce 竞态保护）。
  const mutationGenRef = useRef(0);

  const fetchUser = useCallback(async (forceRefresh = false): Promise<void> => {
    // 非 forceRefresh：如已有 fetch 在飞，共享 promise
    if (!forceRefresh && inFlightFetchRef.current) {
      return inFlightFetchRef.current;
    }

    const work = (async () => {
      // 快速检查：无 token 或本地已判定过期，直接登出态并返回
      const token = readValidToken();
      if (!token) {
        setAuthLoading(false);
        // 若初始化时挂了 pending 占位，需要降为登出态
        startTransition(() => setUserAuth((prev) => (prev?.pending ? null : prev)));
        return;
      }

      // 强制刷新时先清除 MySpace 缓存 + 显示 loading
      if (forceRefresh) {
        clearMySpaceCache();
        startTransition(() => setAuthLoading(true));
      }
      const hadCachedAuth = initialAuthRef.current!.hadCachedAuth;

      const fetchOnce = async () => {
        // 记录发起时刻的 mutation 代际，用于下方竞态保护
        const genAtStart = mutationGenRef.current;

        // Avoid being stuck in loading forever if the request stalls.
        // getMySpace() itself catches and may return cache/null, but it cannot resolve if the underlying request never completes.
        const myspaceData = await withTimeout(getMySpace(), 12_000, "getMySpace");

        // If request returned nothing (and no cache), stop loading and keep current state.
        if (!myspaceData) {
          return null;
        }

        // 竞态保护：若 GET 在飞期间发生了客户端 mutation（syncMySpaceState 递增 gen），本地 state 已含更新
        // 并已与服务器 PATCH reconcile。此 GET 可能读到 mutation 之前的服务器快照，覆盖会回滚刚收藏/改标签的结果。
        // 仅后台刷新需防护；forceRefresh 是用户主动请求权威数据，照常覆盖。
        if (!forceRefresh && mutationGenRef.current !== genAtStart) {
          return myspaceData;
        }

        const enrichedData = enrichMySpaceData(myspaceData);
        const validItems = enrichedData.items;

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
        // 但 token 已被移除（401 吊销/密钥轮换，拦截器已清 token）时必须登出——否则当前会话保留
        // hadCachedAuth 的缓存，呈"僵尸登录"。token 仍有效的瞬时失败（5xx/离线）下 readValidToken 非空，保留缓存不变。
        if (!hadCachedAuth || !readValidToken()) {
          startTransition(() => setUserAuth(null));
        }
      } finally {
        startTransition(() => setAuthLoading(false));
      }
    })();

    // 只对非 force 注册 in-flight ref；force 始终独立跑（不踩 ref）
    if (!forceRefresh) {
      inFlightFetchRef.current = work;
      work.finally(() => {
        // 只在 ref 仍指向自己时清——避免误清后续 fetch 的 ref
        if (inFlightFetchRef.current === work) inFlightFetchRef.current = null;
      });
    }

    return work;
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  // 跨标签页同步：另一标签页登出或写入新 user_auth 快照时，当前标签实时跟进
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea && e.storageArea !== localStorage) return;
      // 另一标签登出（localStorage.removeItem("auth_token")）
      if (e.key === "auth_token" && !e.newValue) {
        startTransition(() => setUserAuth(null));
        return;
      }
      // 另一标签刷新了 user_auth 缓存（收藏、新增提示词等），复用其结果避免重复请求
      if (e.key === "lscache-user_auth") {
        const fresh = getCache("user_auth");
        if (fresh) {
          startTransition(() => setUserAuth(fresh));
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Ref for current userAuth — syncMySpaceState 用 ref 读最新值，避免每次 userAuth 变都重建 callback
  const userAuthRef = useRef(userAuth);
  userAuthRef.current = userAuth;

  /**
   * 统一更新 myspace 相关 state：
   *   - userAuth React state（触发依赖此 context 的组件 re-render）
   *   - lscache-user_auth（跨标签同步 + 下次 mount 的初始 state）
   *   - lscache-myspace（prompts.ts:92 等 raw cache reader 读它）
   *
   * 所有"mutation 后本地同步"路径都通过此 helper，避免漏写其中一层导致 drift。
   * ETag 不动：下次 getMySpace 仍会 mismatch → 200 全量；接受这次浪费换取代码一致。
   */
  const syncMySpaceState = useCallback((patch: MySpaceStatePatch) => {
    const auth = userAuthRef.current;
    if (!auth?.data) return;

    // 递增 mutation 代际，让在飞的后台 GET /myspace 知道本地已发生更新、不要用旧快照覆盖
    mutationGenRef.current += 1;

    const newData: any = { ...auth.data };
    if (patch.items !== undefined) newData.items = patch.items;
    if (patch.customTags !== undefined) newData.customTags = patch.customTags;
    if (patch.favoriteId !== undefined) newData.favoriteId = patch.favoriteId;
    if (patch.favorites || patch.favoriteId !== undefined) {
      newData.favorites = {
        ...auth.data.favorites,
        ...(patch.favoriteId !== undefined && { id: patch.favoriteId }),
        ...(patch.favorites || {}),
      };
    }

    const newAuth = { ...auth, data: newData };
    startTransition(() => setUserAuth(newAuth));
    setCache("user_auth", newAuth, CACHE_TTL.MYSPACE);
    setCache(
      CACHE_PREFIX.MYSPACE,
      {
        favoriteId: newData.favoriteId,
        items: newData.items || [],
        customTags: newData.customTags || [],
      },
      CACHE_TTL.MYSPACE,
    );
  }, []);

  const value = useMemo(
    () => ({
      userAuth,
      setUserAuth,
      refreshUserAuth: fetchUser,
      syncMySpaceState,
      authLoading,
    }),
    [userAuth, fetchUser, syncMySpaceState, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
