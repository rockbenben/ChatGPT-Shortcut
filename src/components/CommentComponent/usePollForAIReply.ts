import { useCallback, useEffect, useRef, useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { getComments } from "@site/src/api";
import { nestComments } from "./commentUtils";

export const AI_REPLY_POLL_DELAYS_MS = [3000, 6000, 10000, 15000, 20000];

interface UsePollForAIReplyParams {
  pageId: any;
  type: any;
  pageSize: number;
  /** 由调用方保持与当前页同步，轮询用它丢弃跨页的陈旧响应 */
  currentPageRef: React.MutableRefObject<number>;
  /** 轮询拿到新数据时写回调用方 state（需为稳定引用） */
  onData: (nested: any[], total: number) => void;
}

/**
 * 智能轮询检测 AI 回复
 * 采用阶梯式退避轮询，检测到新回复则停止
 */
export function usePollForAIReply({ pageId, type, pageSize, currentPageRef, onData }: UsePollForAIReplyParams) {
  const pollTimeoutRef = useRef<number | null>(null);
  const pollTokenRef = useRef(0);
  // AI polling progress strip — 提交评论后短暂出现
  const [aiPolling, setAiPolling] = useState(false);
  const [pollAttempt, setPollAttempt] = useState(0);

  const clearPollTimer = useCallback(() => {
    if (pollTimeoutRef.current !== null) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  }, []);

  const pollForAIReply = useCallback(
    (initialCount: number) => {
      if (!ExecutionEnvironment.canUseDOM) return;
      clearPollTimer();
      pollTokenRef.current += 1;
      const token = pollTokenRef.current;
      setAiPolling(true);
      setPollAttempt(0);

      const runPoll = (attemptIndex: number) => {
        if (pollTokenRef.current !== token) return;
        if (attemptIndex >= AI_REPLY_POLL_DELAYS_MS.length) {
          setAiPolling(false);
          return;
        }

        const delay = AI_REPLY_POLL_DELAYS_MS[attemptIndex];
        pollTimeoutRef.current = window.setTimeout(async () => {
          if (pollTokenRef.current !== token) return;
          setPollAttempt(attemptIndex + 1);

          try {
            // 记录发起时刻的页号：轮询与 fetchComments 是两个并发写入者，
            // fetchComments 已用 fetchSeqRef 防乱序，但轮询不在其守卫内。
            // 若用户在轮询请求在飞期间翻页，迟到的旧页响应会盖掉当前页 → 分页器与列表错位。
            // await 回来后只在页号未变时才写 state，丢弃陈旧的跨页结果。
            const pageAtRequest = currentPageRef.current;
            const response = await getComments(pageId, pageAtRequest, pageSize, type);
            if (pollTokenRef.current === token && currentPageRef.current === pageAtRequest && response) {
              const newCount = response.meta.pagination.total;
              onData(nestComments(response.data), newCount);
              // 如果评论数增加（AI 已回复），停止轮询
              if (newCount > initialCount + 1) {
                clearPollTimer();
                setAiPolling(false);
                return;
              }
            }
          } catch (err) {
            console.error("[Comments] Polling error:", err);
          }

          runPoll(attemptIndex + 1);
        }, delay);
      };

      runPoll(0);
    },
    [pageId, pageSize, type, clearPollTimer, currentPageRef, onData],
  );

  useEffect(() => {
    return () => {
      pollTokenRef.current += 1;
      clearPollTimer();
      setAiPolling(false);
    };
  }, [clearPollTimer]);

  return { aiPolling, pollAttempt, pollForAIReply };
}
