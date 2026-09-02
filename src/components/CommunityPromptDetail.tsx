import React, { useEffect, useState, useCallback, useRef, useContext, useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import { voteLoginRequiredText, voteAlreadyVotedText, voteSuccessText, voteFailedText } from "@site/src/utils/voteMessages";
import { App } from "antd";
import { AuthContext } from "@site/src/components/AuthContext";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";
import { getSingleCommPrompt, voteOnUserPrompt } from "@site/src/api";
import { primeCacheFromSnapshot, type CommunityPrompt } from "@site/src/utils/snapshotPrime";

interface CommunityPromptDetailProps {
  /**
   * 构建期注入的正文。只有 src/pages/community-prompt/<id>.tsx（默认 locale 的静态页）
   * 会传；?id= 的 CSR 壳不传，行为与静态化之前一致。
   */
  initialPrompt?: CommunityPrompt;
}

function CommunityPromptDetailInner({ initialPrompt }: CommunityPromptDetailProps) {
  const location = useLocation();
  const { message: messageApi } = App.useApp();
  const { userAuth } = useContext(AuthContext);

  // 静态页（src/pages/community-prompt/<id>.tsx，构建期生成）把正文当 prop 传进来：
  // SSR 与 CSR 的初始值同为这份 JSON，不存在 mismatch，正文直接进 HTML → LCP 元素到位。
  const [prompt, setPrompt] = useState<CommunityPrompt | null>(initialPrompt ?? null);
  const [loading, setLoading] = useState(!initialPrompt);
  const [error, setError] = useState<Error | null>(null);

  // URL 解析放 useMemo 只是缓存解析结果；它不会被塞进 useState 初始值
  // （SSR location.search='' vs CSR '?id=...' 不一致会触发 hydration mismatch）
  const promptId = useMemo(() => {
    if (initialPrompt) return initialPrompt.id;
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    if (!idParam) return null;
    const id = parseInt(idParam, 10);
    return Number.isInteger(id) && id > 0 ? id : null;
  }, [location.search, initialPrompt]);

  // 列表页进来时已 prime 过（snapshotPrime 内部 module-level flag 保证整 SPA session 只跑一次）；
  // 直接命中详情页（搜索引擎/外链）也 prime 一次让后续 getSingleCommPrompt 走 cache 命中
  useEffect(() => {
    primeCacheFromSnapshot();
  }, []);

  // 静态页已有正文，这一轮就只是后台 SWR（票数/正文可能已变）：
  // 不能翻回 loading 骨架屏（那等于把刚拿到的 LCP 元素又撤掉），
  // 失败也不能翻成「提示词未找到」——手上这份内容仍然是好的。
  const isRefreshOnly = !!initialPrompt;

  useEffect(() => {
    if (!promptId) {
      setError(new Error("Invalid prompt ID"));
      setLoading(false);
      return;
    }

    if (!isRefreshOnly) {
      setLoading(true);
      setError(null);
    }

    let cancelled = false;
    (async () => {
      try {
        // getSingleCommPrompt 内部走 lscache（已被 snapshotPrime 或上次列表流 prime/写入），
        // 多数场景命中 cache，无网络往返
        const data = await getSingleCommPrompt(promptId);
        if (cancelled) return;
        // getPrompts 对已取消分享/删除的 id 不返回 null，而是打了 _unavailable 的占位对象
        // （无缓存时连 title/description 都没有）。它是 truthy，之前会被当成正文 setPrompt，
        // 页面渲染成一片空白；静态页上更糟 —— 会把刚直出的正文换成空白。
        // 作者已取消分享是权威信号，两种页面都应转到「未找到」，静态页的过期正文
        // 由下次构建的 prune 清掉。
        if (data && !data._unavailable) {
          setPrompt(data);
        } else if (data?._unavailable || !isRefreshOnly) {
          setPrompt(null);
          setError(new Error("Prompt not found"));
        }
      } catch (err) {
        if (cancelled || isRefreshOnly) return;
        setError(err instanceof Error ? err : new Error("Failed to fetch prompt"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [promptId, isRefreshOnly]);

  // 投票：optimistic UI + 后端真实计数回填 + 失败回滚
  const sessionVotedIdsRef = useRef<Set<string>>(new Set());

  const handleVote = useCallback(
    async (id: number, action: "upvote" | "downvote") => {
      if (!userAuth) {
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
      const originalPrompt = prompt;
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
    [prompt, messageApi, userAuth],
  );

  return <CommunityPromptPage prompt={prompt} loading={loading} error={error} onVote={handleVote} />;
}

export default function CommunityPromptDetail({ initialPrompt }: CommunityPromptDetailProps = {}) {
  // key：useState(initialPrompt) 的初始值只在挂载时取一次。静态页之间客户端跳转
  // （/community-prompt/1 → /2）若路由层复用了组件实例，会先显示上一条正文再等刷新覆盖。
  // 按 id 换 key 强制重挂，不依赖路由层的实现细节。
  return <CommunityPromptDetailInner key={initialPrompt?.id ?? "query"} initialPrompt={initialPrompt} />;
}
