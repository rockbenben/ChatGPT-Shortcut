import React, { createContext, useState, useEffect, useMemo, useCallback, useRef, startTransition } from "react";
import { getMySpace, clearMySpaceCache, getPrompts, persistAuthToken } from "@site/src/api";
import { clearUserSessionCaches } from "@site/src/api/sessionCache";
import { AUTH_EXPIRED_EVENT } from "@site/src/api/config";
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
  /** 本地登出：递增 auth 世代作废在飞请求 + 清会话缓存 + 降为登出态。
   *  手动登出必须走它而不是 setUserAuth(null)——后者不动世代号，
   *  在飞的 GET /myspace 回来仍会把登录态写回去。 */
  clearAuth: () => void;
  /** 读当前 userAuth 的权威即时值。
   *  消费方**不要**自己 `const ref = useRef(userAuth); ref.current = userAuth`——那是渲染期快照，
   *  `await refreshUserAuth()` 之后 React 尚未 commit，读到的仍是旧数据，
   *  拿它算出的 items 再写回去会把刚拉到的内容整个覆盖掉。 */
  getUserAuth: () => any;
  /** 统一更新 myspace 相关 state（userAuth + lscache-user_auth + lscache-myspace），
   *  各 mutation 路径（useFavorite reconcile、drag、tag 改动）共用此入口避免漏写一处。 */
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
  // 走 persistAuthToken 而非直接 removeItem：同步清掉 client.ts 的模块级 authToken
  persistAuthToken(null);
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
  // 本标签最后一次写 user_auth 快照的时间戳，用于跨标签 storage 事件的比较（见下方 onStorage）。
  // 用挂载时读到的缓存快照播种，避免把已经加载过的同一份快照再套用一次。

  // 登录态的**权威**当前值。注意这里刻意没有 `userAuthRef.current = userAuth` 那样的
  // 渲染期镜像——镜像会在 React 19 并发渲染下被一次仍带旧 state 的渲染退回去，
  // 之前正是靠一层层守卫去堵这个洞，堵一次漏一个。现在反过来：ref 是唯一真相，
  // state 只是它的投影，所有写入必须经 applyAuth，任何地方都不得直接 setUserAuth。
  const userAuthRef = useRef(userAuth);

  /** 登录态的唯一写入口：ref 与 state 一起改，两者永不脱节。 */
  const applyAuth = useCallback((next: any) => {
    userAuthRef.current = next;
    startTransition(() => setUserAuth(next));
  }, []);

  /**
   * 写 user_auth 快照：同时落 ref / state / lscache，三者永不脱节。
   */
  const writeAuthCache = useCallback(
    (auth: any) => {
      setCache("user_auth", auth, CACHE_TTL.MYSPACE);
      applyAuth(auth);
    },
    [applyAuth],
  );

  /**
   * 本地登出：清 state + 清会话缓存。在飞的 fetchUser 写回前会自查 token，无需额外协议。
   * 供三条「token 已失效」路径共用：本地过期、服务端吊销（AUTH_EXPIRED_EVENT）、
   * 另一标签登出。不发任何请求，也不碰 token（调用方已清或本就没有）。
   */
  const clearAuth = useCallback(() => {
    clearUserSessionCaches();
    applyAuth(null);
  }, [applyAuth]);

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
        // 无 token 是确定性的登出（readValidToken 已清掉过期 token），
        // 必须连缓存快照一起清：否则 initialAuthRef 下次挂载又从 lscache-user_auth
        // 恢复出登录态 UI，用户看着像登录着、每次交互都发注定 401 的请求，
        // 直到手动登出为止（TTL 30 天）。降 pending 占位不足以覆盖这种情况。
        clearAuth();
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
        // 记录发起时刻的 token 本身。写回前比对的是**同一个 token 吗**，
        // 而不只是"还有 token 吗"——后者漏掉"换号"：A 的请求在飞时 B 登录成功，
        // token 非空于是守卫放行，A 的 items 被写进 B 的会话缓存（串号）。
        const tokenAtStart = token;

        // Avoid being stuck in loading forever if the request stalls.
        // getMySpace() itself catches and may return cache/null, but it cannot resolve if the underlying request never completes.
        const myspaceData = await withTimeout(getMySpace(), 12_000, "getMySpace");

        // If request returned nothing (and no cache), stop loading and keep current state.
        if (!myspaceData) {
          return null;
        }

        // GET 在飞期间 token 变了——被清空（401 吊销 / 手动登出 / 本地过期）或被换成
        // 另一个账号的。这份属于旧 token 的响应绝不能写回去：前者会让登录态连同 30 天
        // TTL 的缓存快照一起复活，后者会把 A 的数据写进 B 的会话（串号）。
        // getMySpace() 已把响应连同 ETag 落进 lscache，只丢弃返回值不够，必须连缓存一起清。
        const tokenNow = readValidToken();
        if (tokenNow !== tokenAtStart) {
          if (!tokenNow) {
            clearAuth();
          } else {
            // 已是另一个账号：只清掉这份旧数据，别动新会话的登录态
            clearUserSessionCaches();
          }
          return myspaceData;
        }

        if (!forceRefresh && mutationGenRef.current !== genAtStart) {
          return myspaceData;
        }

        const enrichedData = enrichMySpaceData(myspaceData);
        const validItems = enrichedData.items;

        // 先更新 UI，再后台预取 —— 预取仅为填充二级缓存，不应阻塞登录态呈现
        // 缓存 userAuth 用于下次快速显示；state 与缓存用同一个对象，保持两边一致
        writeAuthCache({ data: enrichedData });

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
            // 重试前复查 token：首次失败若是 401，拦截器已清掉 token，
            // 此时重试只会无 Authorization 头再打一发注定 401 的请求，白白压后端。
            if (!readValidToken()) {
              clearAuth();
              return;
            }
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
        // token 已没了（401 吊销 / 本地过期）才是确定性登出，此时必须连缓存一起清。
        // 反之只是网络抖动 / 5xx：保留缓存与登录态，绝不能因为一次瞬时失败就把
        // 用户的 MySpace 缓存销毁——那会逼出一次完整的重新拉取。
        if (!readValidToken()) {
          clearAuth();
        } else if (!getCache("user_auth")) {
          // 此刻确实没有可回退的快照，才降到登出态。
          // 注意要查**当前**缓存而非挂载时的一次性快照——否则"登录时没有缓存"的会话
          // 会在之后任何一次瞬时失败中被强制登出，尽管 token 和快照都还在。
          applyAuth(null);
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
    // writeAuthCache 自身 deps 为空、引用恒定，列出它不会破坏 fetchUser 的稳定性
    // （多处 effect 依赖 fetchUser 不变）
  }, [writeAuthCache]);

  useEffect(() => {
    fetchUser();
  }, []);

  // 跨标签页同步：另一标签页登出或写入新 user_auth 快照时，当前标签实时跟进
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea && e.storageArea !== localStorage) return;
      if (e.key === "auth_token") {
        // 另一标签登出（persistAuthToken(null)）
        if (!e.newValue) {
          clearAuth();
          return;
        }
        // 另一标签登录或换号。window.location.reload() 只发生在**执行登录的那个标签**，
        // 而免密登录是从邮件客户端打开新标签完成的，原标签必然留在原地——必须在这里处理，
        // 否则串号：原标签继续显示 A 的界面、localStorage 已是 B 的 token，此时点收藏会带着
        // B 的 Authorization 发出，还会把 A 的 items 写进共享缓存显示给 B。
        //
        // 只 clearAuth()（纯本地，不发请求）：把这个陈旧标签降到登出态即可根除串号。
        // 不主动拉 B 的数据——那会让一个用户没在看的后台标签白发一次 GET /myspace；
        // 用户想在该标签看 B 的空间，刷新一下即可。
        if (e.newValue !== e.oldValue) {
          clearAuth();
        }
        return;
      }
      // 另一标签刷新了 user_auth 快照（收藏、新增提示词等），直接复用其结果，不再发请求。
      // last-write-wins，不做时间戳排序：两个标签在同一秒内各改各的，对本站来说罕见到
      // 不值得为它维护一套排序协议（那套东西前后引发过十来个缺陷）；收藏路径的
      // applyDeltaResponse 本身也会用服务端权威值自愈。
      //
      // 刻意不改成"收到事件就重新 GET /myspace"——那会形成跨标签死循环：
      // fetchUser 成功后同样写 user_auth，对方收到事件又去 GET，来回不休。
      // 采纳快照不产生任何写入，链条自然终止。
      if (e.key === "lscache-user_auth") {
        // 本地已无有效 token（401 吊销 / 过期）：不仅不能采纳对方快照（会把刚清掉的
        // 登录态装回来），本标签自己也该就地登出——否则它继续显示登录 UI，
        // 每次交互都发注定 401 的请求。
        if (!readValidToken()) {
          clearAuth();
          return;
        }
        const fresh = getCache("user_auth");
        if (fresh) {
          // 递增 gen：采纳外来快照同样让本地 state 领先于「在飞的后台 GET」发起时的世界，
          // 不递增的话那个 GET 回来会用更旧的服务端数据盖掉刚采纳的内容，并写回共享缓存。
          mutationGenRef.current += 1;
          applyAuth(fresh);
        }
      }
    };

    // 服务端吊销 token（401）：api 层清完缓存后派发此事件，这里把 React 登录态一并降下来
    const onAuthExpired = () => clearAuth();

    window.addEventListener("storage", onStorage);
    window.addEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
    };
  }, [clearAuth]);

  // 这里**没有**渲染期回写 ref。ref 是唯一真相、state 只是投影，全部写入经 applyAuth，
  // 因此不存在「并发渲染用旧 state 把 ref 退回去」的窗口，也就不需要任何守卫。

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

    // writeAuthCache 内部会 applyAuth，ref / state / lscache 一起更新
    writeAuthCache({ ...auth, data: newData });
    setCache(
      CACHE_PREFIX.MYSPACE,
      {
        favoriteId: newData.favoriteId,
        items: newData.items || [],
        customTags: newData.customTags || [],
      },
      CACHE_TTL.MYSPACE,
    );
  }, [writeAuthCache]);

  // 权威即时读取口：消费方不要各自持有渲染期 ref（见 AuthContext 类型定义上的说明）
  const getUserAuth = useCallback(() => userAuthRef.current, []);

  const value = useMemo(
    () => ({
      userAuth,
      // 对外只给受控 setter：直接暴露 useState 的 setUserAuth 会绕过 ref，
      // 让 ref 与 state 脱节（正是之前一连串竞态的根源）。
      setUserAuth: applyAuth,
      clearAuth,
      getUserAuth,
      refreshUserAuth: fetchUser,
      syncMySpaceState,
      authLoading,
    }),
    [userAuth, applyAuth, clearAuth, getUserAuth, fetchUser, syncMySpaceState, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
