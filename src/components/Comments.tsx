import React, { useEffect, useState, useCallback, memo, useRef, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { App, Modal, Pagination } from "antd";
import { useColorMode } from "@docusaurus/theme-common";
import { CommentSkeleton } from "@site/src/components/CommentComponent/CommentSkeleton";
import CommentForm, { type PanelType } from "@site/src/components/CommentComponent/CommentForm";
import CommentThread from "@site/src/components/CommentComponent/CommentThread";
import { usePollForAIReply, AI_REPLY_POLL_DELAYS_MS } from "@site/src/components/CommentComponent/usePollForAIReply";
import { getCurrentUserId, nestComments } from "@site/src/components/CommentComponent/commentUtils";
import { getComments, postComment } from "@site/src/api";

// LoginComponent (520 行 + antd Form/Card/Input) 仅当未登录用户尝试评论触发登录 Modal 才渲染
const LoginComponent = React.lazy(() => import("@site/src/components/user/login"));

const pageSize = 12;

const Comments = ({ pageId, type, onCountChange }: { pageId: any; type: any; onCountChange?: (count: number) => void }) => {
  const logoUrl = useBaseUrl("/img/logo.svg");
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const { message } = App.useApp();

  const [currentUserId, setCurrentUserId] = useState(0);
  // 防双击重复提交：ref 即时拦截（state 重渲染前的窗口期），state 驱动按钮 loading
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [comments, setComments] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // emoji/GIF 面板全局互斥：跨主评论框与回复框最多一个打开。owner 为 "main" 或回复对象评论 id
  const [activePanel, setActivePanel] = useState<{ owner: "main" | number; type: PanelType } | null>(null);

  // 把 count 暴露给外层，让 PromptPage / CommunityPromptPage 的 eyebrow 显示「讨论 · N」
  useEffect(() => {
    onCountChange?.(totalCommentsCount);
  }, [totalCommentsCount, onCountChange]);

  // Get current user ID from localStorage
  useEffect(() => {
    setCurrentUserId(getCurrentUserId());
  }, []);

  // Keep currentPageRef in sync for use in closures (e.g. pollForAIReply)
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const applyPollData = useCallback((nested: any[], total: number) => {
    setComments(nested);
    setTotalCommentsCount(total);
  }, []);
  const { aiPolling, pollAttempt, pollForAIReply } = usePollForAIReply({ pageId, type, pageSize, currentPageRef, onData: applyPollData });

  // 防乱序竞态：快速翻页/切换排序时多个 getComments 并发在飞，
  // 慢的旧请求若后到会用上一页数据覆盖当前页（pagination 显示 N 页、列表却是 M 页）。
  // 用单调递增的 seq 标记每次调用，await 回来后只让"最新一次"写 state。
  const fetchSeqRef = useRef(0);
  const fetchComments = useCallback(async () => {
    const seq = ++fetchSeqRef.current;
    setIsLoading(true);
    try {
      const response = await getComments(pageId, currentPage, pageSize, type);
      if (fetchSeqRef.current !== seq) return; // 已被更新的请求取代，丢弃陈旧结果
      if (response) {
        const nestedComments = nestComments(response.data);
        setComments(nestedComments);
        setTotalCommentsCount(response.meta.pagination.total);
      }
    } finally {
      if (fetchSeqRef.current === seq) setIsLoading(false);
    }
  }, [pageId, currentPage, type]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, refresh]);

  const handleLoginModalOpen = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const togglePanel = useCallback((owner: "main" | number, panelType: PanelType) => {
    setActivePanel((prev) => (prev && prev.owner === owner && prev.type === panelType ? null : { owner, type: panelType }));
  }, []);

  const handleSubmit = useCallback(
    async (text: string): Promise<boolean> => {
      if (!currentUserId) {
        handleLoginModalOpen();
        return false;
      }
      if (submittingRef.current) return false;
      submittingRef.current = true;
      setSubmitting(true);
      try {
        // 顶部主评论框始终发顶级评论（threadOf=null）。不能用 replyingTo：用户点过某条
        // 「回复」后未取消、转而在顶部框发新评论时，会被错挂成该评论的子回复（位置错乱）。
        // 回复有独立的内联编辑器走 handleReplySubmit，那里才用 replyingTo。
        await postComment(pageId, text, null, type, currentLocale);
        setReplyingTo(null);

        const initialCount = totalCommentsCount;
        // 新的顶级评论排序在最前（id:desc），跳到第 1 页让用户看到
        if (currentPage !== 1) {
          setCurrentPage(1); // 变更 currentPage 会触发 fetchComments
        } else {
          setRefresh((prev) => !prev);
        }
        pollForAIReply(initialCount);
        return true;
      } catch (error) {
        console.error("Failed to post comment:", error);
        message.error(
          translate({
            id: "message.postComment.error",
            message: "评论发送失败，请稍后重试",
          }),
        );
        return false;
      } finally {
        submittingRef.current = false;
        setSubmitting(false);
      }
    },
    [currentUserId, pageId, type, currentLocale, totalCommentsCount, currentPage, pollForAIReply, message, handleLoginModalOpen],
  );

  const handleReplySubmit = useCallback(
    async (text: string): Promise<boolean> => {
      if (!currentUserId) {
        handleLoginModalOpen();
        return false;
      }
      if (submittingRef.current) return false;
      submittingRef.current = true;
      setSubmitting(true);
      try {
        await postComment(pageId, text, replyingTo, type, currentLocale);
        setReplyingTo(null);

        const initialCount = totalCommentsCount;
        setRefresh((prev) => !prev);
        pollForAIReply(initialCount);
        return true;
      } catch (error) {
        console.error("Failed to post reply:", error);
        message.error(
          translate({
            id: "message.postComment.error",
            message: "评论发送失败，请稍后重试",
          }),
        );
        return false;
      } finally {
        submittingRef.current = false;
        setSubmitting(false);
      }
    },
    [currentUserId, pageId, replyingTo, type, currentLocale, totalCommentsCount, pollForAIReply, message, handleLoginModalOpen],
  );

  // 当前回复对象的编辑器（全局只有一个 replyingTo），传给 CommentThread 在对应评论下渲染
  const replyFormNode =
    replyingTo == null ? null : (
      <CommentForm
        draftKey={`draft_reply_${pageId}_${replyingTo}`}
        requiredMessage={translate({
          id: "validation.replyRequired",
          message: "请输入回复内容",
        })}
        submitting={submitting}
        isLoggedIn={!!currentUserId}
        isDarkMode={isDarkMode}
        onLogin={handleLoginModalOpen}
        onSubmit={handleReplySubmit}
        onCancel={() => setReplyingTo(null)}
        activePanel={activePanel && activePanel.owner === replyingTo ? activePanel.type : null}
        onTogglePanel={(p) => togglePanel(replyingTo, p)}
      />
    );

  return (
    <>
      <Modal open={isLoginModalOpen} onCancel={() => setIsLoginModalOpen(false)} footer={null}>
        <Suspense fallback={null}>
          <LoginComponent />
        </Suspense>
      </Modal>
      {type !== "author" && (
        <div style={{ marginTop: 12 }}>
          <CommentForm
            draftKey={`draft_comment_${pageId}`}
            requiredMessage={translate({
              id: "validation.comment.required",
              message: "请输入评论内容",
            })}
            submitting={submitting}
            isLoggedIn={!!currentUserId}
            isDarkMode={isDarkMode}
            onLogin={handleLoginModalOpen}
            onSubmit={handleSubmit}
            activePanel={activePanel?.owner === "main" ? activePanel.type : null}
            onTogglePanel={(p) => togglePanel("main", p)}
          />
        </div>
      )}

      {/* AI Polling Strip — 提交评论后短暂出现，把后台 5 阶段轮询暴露为 first-class UI 反馈 */}
      {aiPolling && (
        <div className="comments-polling-strip" role="status" aria-live="polite">
          <div className="comments-polling-bar" />
          <div className="comments-polling-text">
            <span>
              <Translate id="comments.aiReplying">AI 正在回复</Translate>
            </span>
            <span className="comments-polling-attempt">
              {pollAttempt}/{AI_REPLY_POLL_DELAYS_MS.length}
            </span>
          </div>
        </div>
      )}

      <div style={{ minHeight: 200, marginTop: 16 }}>
        {/* Internal "{N} 评论" header 已移除：count 通过 onCountChange 暴露给外层 eyebrow «讨论 · N» */}
        {isLoading ? (
          <CommentSkeleton count={10} />
        ) : comments.length === 0 ? (
          <div className="comments-empty">
            <span className="comp-sheet-eyebrow">
              <Translate id="comments.empty">暂无评论</Translate>
            </span>
            <p className="comments-empty-text">
              <Translate id="message.noComments">成为第一个评论者吧</Translate>
            </p>
          </div>
        ) : (
          <div className="comment-list">
            {comments.map((comment) => (
              <CommentThread key={comment.id} comment={comment} logoUrl={logoUrl} replyingTo={replyingTo} onReply={setReplyingTo} replyFormNode={replyFormNode} />
            ))}
          </div>
        )}
      </div>
      {totalCommentsCount > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCommentsCount}
          showQuickJumper
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: "center", marginTop: 24 }}
        />
      )}
    </>
  );
};

export default memo(Comments);
