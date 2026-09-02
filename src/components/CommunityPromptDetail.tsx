import React, { useEffect, useState, useCallback, useRef, useContext, useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import { voteLoginRequiredText, voteAlreadyVotedText, voteSuccessText, voteFailedText } from "@site/src/utils/voteMessages";
import { App } from "antd";
import { AuthContext } from "@site/src/components/AuthContext";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";
import { getSingleCommPrompt, voteOnUserPrompt } from "@site/src/api";
import { primeCacheFromSnapshot, type CommunityPrompt } from "@site/src/utils/snapshotPrime";

function CommunityPromptDetailInner() {
  const location = useLocation();
  const { message: messageApi } = App.useApp();
  const { userAuth } = useContext(AuthContext);

  const [prompt, setPrompt] = useState<CommunityPrompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // URL 解析放 useMemo 只是缓存解析结果；它不会被塞进 useState 初始值
  // （SSR location.search='' vs CSR '?id=...' 不一致会触发 hydration mismatch）
  const promptId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    if (!idParam) return null;
    const id = parseInt(idParam, 10);
    return Number.isInteger(id) && id > 0 ? id : null;
  }, [location.search]);

  // 列表页进来时已 prime 过（snapshotPrime 内部 module-level flag 保证整 SPA session 只跑一次）；
  // 直接命中详情页（搜索引擎/外链）也 prime 一次让后续 getSingleCommPrompt 走 cache 命中
  useEffect(() => {
    primeCacheFromSnapshot();
  }, []);

  useEffect(() => {
    if (!promptId) {
      setError(new Error("Invalid prompt ID"));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

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
        } else {
          setPrompt(null);
          setError(new Error("Prompt not found"));
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error("Failed to fetch prompt"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [promptId]);

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

export default function CommunityPromptDetail() {
  return <CommunityPromptDetailInner />;
}
