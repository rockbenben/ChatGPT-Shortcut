import React, { useCallback, useContext, useRef } from "react";
import { App } from "antd";
import Translate from "@docusaurus/Translate";
import { AuthContext } from "../components/AuthContext";
import { patchFavorites, voteOnUserPrompt, type FavoriteDeltaResponse, type FavoriteDeltaOps } from "../api";

interface UseFavoriteReturn {
  addFavorite: (id: number, isComm?: boolean) => Promise<void>;
  removeFavorite: (id: number, isComm?: boolean) => Promise<void>;
  confirmRemoveFavorite: (id: number, isComm?: boolean) => void;
}

export const useFavorite = (): UseFavoriteReturn => {
  const { userAuth, refreshUserAuth, syncMySpaceState } = useContext(AuthContext);
  const { message, modal } = App.useApp();

  // Use ref for userAuth to stabilize callbacks.
  // Without this, every background SWR auth refresh recreates all callbacks,
  // causing cascading re-renders through every card component.
  const userAuthRef = useRef(userAuth);
  userAuthRef.current = userAuth;

  // 收藏 PATCH 的单调序号：快速切换同一收藏会发出多个 patchFavorites，其响应可能乱序到达。
  // applyDeltaResponse 用 delta.loves（该请求时刻的权威列表）覆盖本地，旧响应后到会盖掉新状态
  // （心形错位、与服务端不一致，刷新才自愈）。只应用最新一次操作的协调。
  const patchSeqRef = useRef(0);

  // Optimistic local toggle — instant UI feedback before the server PATCH lands.
  // Server-side merge handles concurrent-edit safety; this is just for UX latency.
  // 走 syncMySpaceState 统一入口（writes lscache-user_auth + lscache-myspace）。
  // 回滚走"逆操作"而非快照恢复：并发多次点击时，回滚 op A 不会回到 op B 之前的 state，
  // 而是基于 *当前* state 把 op A 撤掉，B 的乐观更新保留。
  const applyOptimistic = useCallback(
    (id: number, isComm: boolean, action: "add" | "remove"): (() => void) | null => {
      const auth = userAuthRef.current;
      if (!auth?.data) return null;

      const source = isComm ? "community" : "card";
      const lovesKey = isComm ? "commLoves" : "loves";
      const items: any[] = auth.data.items || [];
      const exists = items.some((it) => it.id === id && it.type === "favorite" && it.source === source);

      // Skip if state already matches intent
      if (action === "add" && exists) return null;
      if (action === "remove" && !exists) return null;

      const applyForward = (curAuth: any, op: "add" | "remove") => {
        const curItems: any[] = curAuth.data.items || [];
        const curLoves: number[] = curAuth.data.favorites?.[lovesKey] || [];
        if (op === "add") {
          return {
            items: [{ id, type: "favorite", source, updatedAt: new Date().toISOString() }, ...curItems.filter((it) => !(it.id === id && it.type === "favorite" && it.source === source))],
            loves: [id, ...curLoves.filter((x) => x !== id)],
          };
        }
        return {
          items: curItems.filter((it) => !(it.id === id && it.type === "favorite" && it.source === source)),
          loves: curLoves.filter((x) => x !== id),
        };
      };

      const forward = applyForward(auth, action);
      syncMySpaceState({
        items: forward.items,
        favorites: { [lovesKey]: forward.loves } as any,
      });

      // Inverse-op rollback against CURRENT state at rollback time
      return () => {
        const cur = userAuthRef.current;
        if (!cur?.data) return;
        const inverse = applyForward(cur, action === "add" ? "remove" : "add");
        syncMySpaceState({
          items: inverse.items,
          favorites: { [lovesKey]: inverse.loves } as any,
        });
      };
    },
    [syncMySpaceState]
  );

  // Reconcile with server delta response.
  //  - favorites.loves/commLoves: 用 server 权威值覆盖（处理跨设备并发）
  //  - items: 基于 ops 和 server 的 `added` 重建（去掉 op 触及的项，再 prepend server 的 added）
  // 已知 trade-off：跨设备并发场景下本地 items 可能缺其他设备加的项，
  // 但 favorites.loves/commLoves 包含完整 truth；下次 /myspace 刷新自愈。
  const applyDeltaResponse = useCallback(
    (delta: FavoriteDeltaResponse, ops: FavoriteDeltaOps) => {
      const auth = userAuthRef.current;
      if (!auth?.data) {
        // 极少：在 patch 期间用户登出。直接放弃 reconcile。
        return;
      }

      const removedKeys = new Set<string>();
      (ops.loves?.remove || []).forEach((id) => removedKeys.add(`card_${id}`));
      (ops.commLoves?.remove || []).forEach((id) => removedKeys.add(`community_${id}`));

      const addedKeys = new Set<string>();
      delta.added.forEach((it) => addedKeys.add(`${it.source}_${it.id}`));

      const currentItems: any[] = auth.data.items || [];
      const kept = currentItems.filter((it: any) => {
        if (it.type !== "favorite") return true; // 用户自己的 prompts 不动
        const k = `${it.source}_${it.id}`;
        return !removedKeys.has(k) && !addedKeys.has(k);
      });
      const newItems = [...delta.added, ...kept];

      syncMySpaceState({
        items: newItems,
        favoriteId: delta.favoriteId,
        favorites: { loves: delta.loves, commLoves: delta.commLoves },
      });
    },
    [syncMySpaceState]
  );

  // pending 窗口（登录/刷新后 AuthProvider 首轮 fetchUser 还在飞行中）：
  // 等 fetchUser 完成再 PATCH，避免 race（GET 响应晚到时会覆盖掉 PATCH 后的本地 state）。
  const ensureAuthReady = useCallback(async () => {
    if (userAuthRef.current?.pending) {
      await refreshUserAuth();
    }
  }, [refreshUserAuth]);

  const addFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      await ensureAuthReady();

      // 预校验：收藏社区 prompt 时，本地直接拦截"收藏自己 prompt"的情况，
      // 省一次注定 403 的 PATCH，且提示语走前端 i18n（后端只能返回英文）。
      // pending/无数据时 owned 为空 → 跳过本地校验，由 server 端兜底。
      if (isComm) {
        const owned: number[] = (userAuthRef.current?.data?.userprompts || []).map((p: any) => p.id);
        if (owned.includes(id)) {
          message.error(<Translate id="message.cannotFavorOwn">不能收藏自己的提示词</Translate>);
          return;
        }
      }

      const rollback = applyOptimistic(id, isComm, "add");
      const ops: FavoriteDeltaOps = {
        [isComm ? "commLoves" : "loves"]: { add: [id], remove: [] },
      };
      const seq = ++patchSeqRef.current;

      try {
        const delta = await patchFavorites(ops);
        // 仅最新一次操作的响应可写本地：避免乱序的旧响应覆盖更新的收藏态
        if (patchSeqRef.current === seq) {
          applyDeltaResponse(delta, ops);
        }

        // 社区提示词：异步投赞成票（不阻塞）
        if (isComm) {
          voteOnUserPrompt(id, "upvote").catch(() => {});
        }

        message.success(<Translate id="message.addFavorite.success">已添加到收藏</Translate>);
      } catch (err) {
        rollback?.();
        console.error(err);
        const errorMessage = (err as any)?.strapiMessage;
        if (errorMessage) {
          message.error(errorMessage);
        } else {
          message.error(<Translate id="message.addFavorite.error">收藏失败，请稍后重试</Translate>);
        }
      }
    },
    [ensureAuthReady, applyOptimistic, applyDeltaResponse, message]
  );

  const removeFavorite = useCallback(
    async (id: number, isComm: boolean = false) => {
      await ensureAuthReady();
      const rollback = applyOptimistic(id, isComm, "remove");
      const ops: FavoriteDeltaOps = {
        [isComm ? "commLoves" : "loves"]: { add: [], remove: [id] },
      };
      const seq = ++patchSeqRef.current;

      try {
        const delta = await patchFavorites(ops);
        // 仅最新一次操作的响应可写本地：避免乱序的旧响应覆盖更新的收藏态
        if (patchSeqRef.current === seq) {
          applyDeltaResponse(delta, ops);
        }

        message.success(<Translate id="message.removeFavorite.success">已取消收藏</Translate>);
      } catch (err) {
        rollback?.();
        console.error(err);
        message.error(<Translate id="message.removeFavorite.error">移除收藏失败，请稍后重试</Translate>);
      }
    },
    [ensureAuthReady, applyOptimistic, applyDeltaResponse, message]
  );

  const confirmRemoveFavorite = useCallback(
    (id: number, isComm: boolean = false) => {
      modal.confirm({
        title: <Translate id="message.removeFavorite.confirm.title">移除收藏</Translate>,
        content: <Translate id="message.removeFavorite.confirm.content">确定要取消收藏这个提示词吗？</Translate>,
        onOk: async () => {
          await removeFavorite(id, isComm);
        },
        okText: <Translate id="button.confirm">确认</Translate>,
        cancelText: <Translate id="action.cancel">取消</Translate>,
        centered: true,
      });
    },
    [modal, removeFavorite]
  );

  return { addFavorite, removeFavorite, confirmRemoveFavorite };
};
