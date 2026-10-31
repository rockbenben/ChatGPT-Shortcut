import React, { useEffect, useState, useCallback, useRef, useContext, useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import { voteLoginRequiredText, voteAlreadyVotedText, voteSuccessText, voteFailedText } from "@site/src/utils/voteMessages";
import { App } from "antd";
import { AuthContext } from "@site/src/components/AuthContext";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";
import { getSingleCommPrompt, voteOnUserPrompt } from "@site/src/api";
import { primeCacheFromSnapshot, type CommunityPrompt } from "@site/src/utils/snapshotPrime";

/**
 * 本轮请求的结论：pending（还没拿到）/ ready（拿到了）/ notFound（确实不存在）/ error（拉取失败）。
 * 区分 notFound 与 error 是必须的：两者都叫「提示词未找到」，会把一次网络抖动说成
 * 内容被删了，还会让 noindex 误伤真实存在的页面。
 */
type LoadState = {
  /** 这份结论归属的 id；没有 id 时是 "none" */
  key: string;
  status: "pending" | "ready" | "notFound" | "error";
  /** 仅 status === "error" 时有意义 */
  error?: Error;
};

function CommunityPromptDetailInner() {
  const location = useLocation();
  const { message: messageApi } = App.useApp();
  // 判登录用权威即时值 getUserAuth()，不用渲染期的 userAuth：
  // applyAuth 经 startTransition 发布，state 会滞后一帧。CommunityPromptPage 里的
  // 外层守卫已经改读 getUserAuth()，这里若还用 userAuth，两层会在那一帧里不一致 ——
  // 外层放行、内层却拦下，登录用户收到一句「请先登录」且投票被静默丢弃。
  const { getUserAuth } = useContext(AuthContext);

  // URL 解析放 useMemo 只是缓存解析结果；它不会被塞进 useState 初始值
  // （SSR location.search='' vs CSR '?id=...' 不一致会触发 hydration mismatch）
  const promptId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    if (!idParam) return null;
    const id = parseInt(idParam, 10);
    return Number.isInteger(id) && id > 0 ? id : null;
  }, [location.search]);

  // 本轮请求的结论归属的 id。渲染期拿它和当前 promptKey 比，才知道结论还能不能认。
  const promptKey = promptId == null ? "none" : String(promptId);

  const [prompt, setPrompt] = useState<CommunityPrompt | null>(null);
  // 结论状态。带 key（归属的 id）而不是裸布尔，是为了让上一个 id 的结论不会泄进
  // 下一个 id 的首帧：?id= 壳跨 id 跳转时组件实例会被复用（外层 key 恒为 "query"），
  // 而 effect 跑在 paint 之后。那一帧会渲染「提示词未找到」并注入 noindex ——
  // 把一次本该成功的跳转变成一次「未找到」，还可能让搜索引擎永久排除真实页面。
  const [loadState, setLoadState] = useState<LoadState>(() => ({
    key: promptKey,
    status: "pending",
  }));
  // 手动重试：改这个计数器触发上面的 effect 重跑
  const [retryNonce, setRetryNonce] = useState(0);

  // 渲染期推导：结论只对「当初发请求的那个 id」成立，别的 id 一律按 pending 处理。
  const state: LoadState = loadState.key === promptKey ? loadState : { key: promptKey, status: "pending" };
  const loading = state.status === "pending";
  const notFound = state.status === "notFound";
  const error = state.status === "error" ? state.error ?? null : null;
  // 正文也按 id 校验一次：换 id 时 effect 还没跑，state 里可能还留着上一条的内容，
  // 拿它冒充当前这条就是显示别人的提示词。
  const shownPrompt = prompt && String(prompt.id) === promptKey ? prompt : null;

  // 列表页进来时已 prime 过（snapshotPrime 内部 module-level flag 保证整 SPA session 只跑一次）；
  // 直接命中详情页（搜索引擎/外链）也 prime 一次让后续 getSingleCommPrompt 走 cache 命中
  useEffect(() => {
    primeCacheFromSnapshot();
  }, []);

  useEffect(() => {
    if (!promptId) {
      setLoadState({ key: promptKey, status: "notFound" });
      return;
    }

    // 已经是「同一个 id 的 pending」就别再写一遍，避免多一轮渲染。
    // 换了 id 时 prev.key 对不上 → 写成新的 pending（渲染期推导出的结果一样，
    // 但把 key 更新掉，后面的 ready/notFound 才知道自己属于哪个 id）。
    setLoadState((prev) => (prev.key === promptKey && prev.status === "pending" ? prev : { key: promptKey, status: "pending" }));

    let cancelled = false;
    (async () => {
      try {
        // getSingleCommPrompt 内部走 lscache（已被 snapshotPrime 或上次列表流 prime/写入），
        // 多数场景命中 cache，无网络往返
        const data = await getSingleCommPrompt(promptId);
        if (cancelled) return;
        // 收藏校验路径（src/api/prompts.ts 里 favoredNeedingValidation 那段）发现某条
        // 已被作者取消分享时，会往 lscache 写一个打了 _unavailable 的占位对象、TTL 一年。
        // 此后再打开该条详情页，getSingleCommPrompt 命中的就是这个占位对象 —— 它是 truthy，
        // 只判 `if (data)` 会把它当正文渲染：带缓存的那种是一份**过期正文**（读者看不出
        // 已下架），_noCache 的那种连 title/description 都没有、页面一片空白。
        // 两种都该走下面已有的「提示词未找到」空状态。
        if (data && !data._unavailable) {
          setPrompt(data);
          setLoadState({ key: promptKey, status: "ready" });
        } else {
          // 内容确实不存在（不是加载失败）
          setPrompt(null);
          setLoadState({ key: promptKey, status: "notFound" });
        }
      } catch (err) {
        if (cancelled) return;
        // 加载失败，不是「内容不存在」：走独立的失败态（可重试），不要冒充未找到
        setLoadState({ key: promptKey, status: "error", error: err instanceof Error ? err : new Error("Failed to fetch prompt") });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [promptId, promptKey, retryNonce]);

  // 投票：optimistic UI + 后端真实计数回填 + 失败回滚
  const sessionVotedIdsRef = useRef<Set<string>>(new Set());

  const handleVote = useCallback(
    async (id: number, action: "upvote" | "downvote") => {
      if (!getUserAuth()) {
        messageApi.warning(voteLoginRequiredText());
        return;
      }

      const voteKey = `${id}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(voteAlreadyVotedText(action));
        return;
      }
      sessionVotedIdsRef.current.add(voteKey);

      // 用 updater form 写 setPrompt：await 后再读闭包里的 prompt 可能已是旧值
      // （详情页 getSingleCommPrompt SWR 刷新会替换 state）
      // 回滚基线取 shownPrompt：state 里可能还留着上一条的内容，拿它回滚会写回别人的票数。
      const originalPrompt = shownPrompt;
      setPrompt((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              upvotes: action === "upvote" ? (prev.upvotes || 0) + 1 : prev.upvotes,
              downvotes: action === "downvote" ? (prev.downvotes || 0) + 1 : prev.downvotes,
              upvoteDifference: (prev.upvoteDifference || 0) + (action === "upvote" ? 1 : -1),
            }
          : prev,
      );

      try {
        const response = await voteOnUserPrompt(id, action);
        if (response?.data?.counts) {
          const { upvotes, downvotes } = response.data.counts;
          setPrompt((prev) =>
            prev && prev.id === id ? { ...prev, upvotes, downvotes, upvoteDifference: upvotes - downvotes } : prev,
          );
        }
        messageApi.success(voteSuccessText(action));
      } catch (err) {
        sessionVotedIdsRef.current.delete(voteKey);
        if (originalPrompt) {
          setPrompt((prev) => (prev && prev.id === id ? originalPrompt : prev));
        }
        const errorMessage = (err as any)?.strapiMessage || voteFailedText(action);
        messageApi.error(errorMessage);
      }
    },
    [shownPrompt, messageApi, getUserAuth],
  );

  return (
    <CommunityPromptPage
      prompt={shownPrompt}
      loading={loading}
      error={error}
      notFound={notFound}
      onRetry={() => setRetryNonce((n) => n + 1)}
      onVote={handleVote}
    />
  );
}

export default function CommunityPromptDetail() {
  return <CommunityPromptDetailInner />;
}
