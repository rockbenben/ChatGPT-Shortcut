import React, { useEffect, useState, useCallback, memo, useRef, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { App, Modal, Pagination, Skeleton, Button } from "antd";
import { MessageOutlined, WarningOutlined } from "@ant-design/icons";
import { EmptyState } from "@site/src/components/EmptyState";
import { useColorMode } from "@docusaurus/theme-common";
import { CommentSkeleton } from "@site/src/components/CommentComponent/CommentSkeleton";
import CommentForm, { type PanelType } from "@site/src/components/CommentComponent/CommentForm";
import CommentThread from "@site/src/components/CommentComponent/CommentThread";
import { usePollForAIReply, AI_REPLY_POLL_DELAYS_MS } from "@site/src/components/CommentComponent/usePollForAIReply";
import { getCurrentUserId, nestComments } from "@site/src/components/CommentComponent/commentUtils";
import { getComments, postComment } from "@site/src/api";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";

// LoginComponent (520 行 + antd Form/Card/Input) 仅当未登录用户尝试评论触发登录 Modal 才渲染
const LoginComponent = lazyWithRetry(() => import("@site/src/components/user/login"));

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
  // 请求失败标记：失败时页面要显示「加载失败 + 重试」，不能退化成
  // EmptyState 的「暂无评论 / 成为第一个评论者吧」——那是谎报
  //（评论没加载出来 ≠ 这个页面一条评论都没有）。
  const [fetchFailed, setFetchFailed] = useState(false);
  // emoji/GIF 面板全局互斥：跨主评论框与回复框最多一个打开。owner 为 "main" 或回复对象评论 id
  const [activePanel, setActivePanel] = useState<{ owner: "main" | number; type: PanelType } | null>(null);

  // 评论内容/总数只对「当前提示词」成立。?id= 壳跨提示词跳转时组件实例被复用：
  // 失败分支刻意保留总数（那是给「同一提示词翻页」用的），换提示词后第一次 fetch 失败
  // 就会让 B 页显示 A 的「讨论 · N」和 A 的分页器。身份一变，在渲染期（paint 之前）
  // 直接归零、清空列表并回到骨架屏——不用 effect，否则那一帧仍会拿 A 的内容冒充 B。
  const listIdentity = `${pageId}|${type}`;
  const [listIdentityState, setListIdentityState] = useState(listIdentity);
  if (listIdentityState !== listIdentity) {
    setListIdentityState(listIdentity);
    setComments([]);
    setTotalCommentsCount(0);
    setIsLoading(true);
    // 页码和回复对象也是「这一条提示词的」状态：带着第 3 页跳到 B，B 会去拉第 3 页，
    // 超出页数时拿到空页却渲染「暂无评论」；replyingTo 还是 A 的评论 id，
    // 继续提交会拿 A 的评论 id 去回复 B 的页面。身份一变全部回到初始态。
    setCurrentPage(1);
    setReplyingTo(null);
    setActivePanel(null);
  }

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

  // 当前「提示词 + 页码」的身份，渲染期就更新（passive effect 之前）。
  // 异步回调回来时用它判断「这份响应还属于当前这一页吗」。
  // 只靠 fetchSeqRef 挡不住一个竞态窗口：pageId 变了但新 effect 还没跑时
  // （passive effect 跑在 paint 之后），旧提示词的响应仍会通过 seq 检查，
  // 把别的提示词的评论写进当前页 —— 那是拿别人的内容冒充本页。
  const pageKeyRef = useRef("");
  pageKeyRef.current = `${pageId}|${type}|${currentPage}`;

  const applyPollData = useCallback((nested: any[], total: number) => {
    setComments(nested);
    setTotalCommentsCount(total);
    // 轮询已经拿到数据了，失败态必须一起清掉：
    // 否则 AI 回复到了，页面却还盖着「加载数据失败」的面板。
    setFetchFailed(false);
  }, []);
  const { aiPolling, pollAttempt, pollForAIReply } = usePollForAIReply({ pageId, type, pageSize, currentPageRef, pageKeyRef, onData: applyPollData });

  // 防乱序竞态：快速翻页/切换排序时多个 getComments 并发在飞，
  // 慢的旧请求若后到会用上一页数据覆盖当前页（pagination 显示 N 页、列表却是 M 页）。
  // 用单调递增的 seq 标记每次调用，await 回来后只让"最新一次"写 state。
  const fetchSeqRef = useRef(0);

  const fetchComments = useCallback(async () => {
    const requestKey = `${pageId}|${type}|${currentPage}`;
    const seq = ++fetchSeqRef.current;
    setIsLoading(true);
    try {
      const response = await getComments(pageId, currentPage, pageSize, type);
      // 两个守卫缺一不可：seq 挡「更新的请求已经发出」，pageKey 挡「页面已经换了」
      if (fetchSeqRef.current !== seq || pageKeyRef.current !== requestKey) return; // 已被更新的请求取代，丢弃陈旧结果
      if (!response) {
        // 空响应 ≠ 没有评论。304 且本地无缓存时 api 层会返回 undefined，
        // 那是「没拿到数据」，不是「这个页面一条评论都没有」。
        // 不单独处理的话就会落回 EmptyState 的「暂无评论」——正是这次要消灭的谎报。
        throw new Error("Empty comments response");
      }
      const nestedComments = nestComments(response.data);
      setComments(nestedComments);
      setTotalCommentsCount(response.meta.pagination.total);
      setFetchFailed(false);
    } catch (error) {
      // 必须 catch：getComments 失败会抛出。没有 catch 时这个 promise 变成
      // unhandled rejection（控制台报错），而且 isLoading 已经置 false，
      // comments 仍是空数组 → 渲染成「暂无评论」，用户以为真的没有评论。
      if (fetchSeqRef.current !== seq || pageKeyRef.current !== requestKey) return;
      console.error("Failed to fetch comments:", error);
      setFetchFailed(true);
      // 旧一页的评论还留在 state 里：换页失败时它们属于上一个页码，
      // 留着展示等于拿不相干的内容冒充本页。失败即清空，让错误态接管。
      setComments([]);
      // totalCommentsCount 保留上一次成功拿到的值，不要清零：
      // 它同时喂给分页器和外层 eyebrow 的「讨论 · N」。清零会让分页器整个消失，
      // 用户除了「重试」这一页再没有别的出路（换页也换不了，因为页码条没了）。
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
        <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
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
        ) : fetchFailed ? (
          // 加载失败 ≠ 没有评论：分开渲染，别让「暂无评论」顶替失败
          <EmptyState
            compact
            icon={<WarningOutlined />}
            title={<Translate id="message.loadFailed">加载数据失败，请稍后重试</Translate>}
            action={
              <Button type="primary" onClick={() => void fetchComments()}>
                <Translate id="action.retry">重试</Translate>
              </Button>
            }
          />
        ) : comments.length === 0 ? (
          <EmptyState
            compact
            icon={<MessageOutlined />}
            title={<Translate id="comments.empty">暂无评论</Translate>}
            description={<Translate id="message.noComments">成为第一个评论者吧</Translate>}
          />
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
          align="center"
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: "center", marginTop: 24 }}
        />
      )}
    </>
  );
};

export default memo(Comments);
