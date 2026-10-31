import { useCallback, useEffect, useRef, useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { getComments } from "@site/src/api";
import { nestComments } from "./commentUtils";

export const AI_REPLY_POLL_DELAYS_MS = [3000, 6000, 10000, 15000, 20000, 30000];

interface UsePollForAIReplyParams {
  pageId: any;
  type: any;
  pageSize: number;
  /** 由调用方保持与当前页同步，轮询用它丢弃跨页的陈旧响应 */
  currentPageRef: React.MutableRefObject<number>;
  /** 由调用方保持与当前「提示词 + 页码」同步，轮询用它丢弃跨提示词的陈旧响应 */
  pageKeyRef: React.MutableRefObject<string>;
  /** 轮询拿到新数据时写回调用方 state（需为稳定引用） */
  onData: (nested: any[], total: number) => void;
}

/**
 * 智能轮询检测 AI 回复
 * 采用阶梯式退避轮询，检测到新回复则停止
 */
export function usePollForAIReply({ pageId, type, pageSize, currentPageRef, pageKeyRef, onData }: UsePollForAIReplyParams) {
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
      // 会话身份只钉「提示词 + 类型」，不钉页码（pageKeyRef 形如「提示词|类型|页码」）。
      // 请求用的 pageId 来自同一个闭包，所以两者必须是同一个提示词；而页码维度由下面的
      // pageAtRequest 比对负责 —— 提交评论会先 setCurrentPage(1) 再启动轮询，页码要等
      // 下一次渲染才写进 ref，把页码算进会话身份会让「从第 2 页发评论」的轮询永远丢弃自己的响应。
      const promptKeyAtStart = `${pageId}|${type}|`;
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
            // 同一道理还要挡「换提示词」：?id= 壳跨 id 跳转时组件实例被复用，
            // 上一个提示词的轮询响应会把它的评论写进新提示词的页面。
            // 比对提示词前缀（会话开始时定的），不是发起请求那一刻的 ref —— 否则跨 id 跳转后
            // ref 已是新 key，反而会放行旧提示词的响应。
            if (pollTokenRef.current === token && currentPageRef.current === pageAtRequest && pageKeyRef.current.startsWith(promptKeyAtStart) && response) {
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
    [pageId, pageSize, type, clearPollTimer, currentPageRef, pageKeyRef, onData],
  );

  useEffect(() => {
    return () => {
      pollTokenRef.current += 1;
      clearPollTimer();
      setAiPolling(false);
    };
  }, [clearPollTimer]);

  // 换提示词/类型就作废整个轮询会话。身份守卫只挡住写入，挡不住会话本身：
  // ?id= 壳复用实例时，旧会话会继续打完 6 次请求、持续 setPollAttempt 触发渲染，
  // 还会让新提示词页面上一直挂着「AI 正在回复 n/6」。
  useEffect(() => {
    pollTokenRef.current += 1;
    clearPollTimer();
    setAiPolling(false);
  }, [pageId, type, clearPollTimer]);

  return { aiPolling, pollAttempt, pollForAIReply };
}
