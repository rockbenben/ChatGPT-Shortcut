import React, { useEffect, useState, useMemo, useCallback, memo, useRef, Suspense } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button, Form, Modal, Pagination } from "antd";
import BoringAvatar from "boring-avatars";
import { useColorMode } from "@docusaurus/theme-common";
import CommentComponent from "@site/src/components/CommentComponent";
import CommentEditor from "@site/src/components/CommentComponent/CommentEditor";
import { CommentSkeleton } from "@site/src/components/CommentComponent/CommentSkeleton";
// LoginComponent (520 行 + antd Form/Card/Input) 仅当未登录用户尝试评论触发登录 Modal 才渲染
const LoginComponent = React.lazy(() => import("@site/src/components/user/login"));
// GiphySelector 拉入 @giphy/react-components + styled-components(~3MB lib)；
// 仅用户点 GIF 按钮才渲染，懒加载省 common chunk ~400-700KB gzipped
const GiphySelector = React.lazy(() => import("@site/src/components/CommentComponent/GiphySelector").then((m) => ({ default: m.GiphySelector })));
// EmojiPicker 拉入 @emoji-mart/data (27MB raw 表情数据集) + @emoji-mart/react；
// 仅用户点 😀 才渲染，懒加载省 common chunk ~80-120KB gzipped
const EmojiPickerLazy = React.lazy(() => import("@site/src/components/CommentComponent/EmojiPickerLazy"));
import { getComments, postComment } from "@site/src/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import debounce from "lodash/debounce";
import ReactMarkdown from "react-markdown";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Simple JWT parsing function
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Get current user ID
const getCurrentUserId = () => {
  if (!ExecutionEnvironment.canUseDOM) return 0;

  const token = localStorage.getItem("auth_token");
  if (!token) return 0;

  const payload = parseJwt(token);
  return payload?.id || 0;
};

dayjs.extend(relativeTime);
// 项目家族化头像调色板 — 同饱和度 / 同明度，仅 hue 旋转，
// 取代之前 antd 8 色调色板（blue/green/red/purple/cyan/orange/gold/magenta），
// 跟项目唯一 sage 主色融为"一家人不同肤色"
const avatarColors = [
  "hsl(163, 38%, 45%)", // sage primary
  "hsl(193, 38%, 45%)", // sage→teal
  "hsl(133, 38%, 45%)", // sage→olive
  "hsl(223, 28%, 50%)", // muted blue
  "hsl(43, 38%, 50%)", // muted gold
  "hsl(13, 38%, 50%)", // muted clay
];
const pageSize = 12;
const AI_REPLY_POLL_DELAYS_MS = [3000, 6000, 10000, 15000, 20000];

// 提取到组件外部的纯函数 - 性能优化
const nestComments = (flatComments: any[]) => {
  const commentMap = new Map();
  const sortedComments = [...flatComments].sort((a, b) => a.id - b.id);

  const dateCache = new Map();
  const getDate = (id: any) => {
    if (!dateCache.has(id)) {
      dateCache.set(id, new Date(id).getTime());
    }
    return dateCache.get(id);
  };

  for (const comment of sortedComments) {
    comment.children = [];
    commentMap.set(comment.id, comment);
  }

  const rootComments: any[] = [];
  for (const comment of sortedComments) {
    if (comment.threadOf) {
      const parentComment = commentMap.get(comment.threadOf.id);
      if (parentComment) {
        parentComment.children.push(comment);
        continue;
      }
      // 父评论不在当前分页内（/flat 端点对全部评论分页），
      // 提升为 root 避免孤立 reply 被静默丢弃导致整页为空
    }
    rootComments.push(comment);
  }

  return rootComments.sort((a, b) => getDate(b.id) - getDate(a.id));
};

const Comments = ({ pageId, type, onCountChange }: { pageId: any; type: any; onCountChange?: (count: number) => void }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const [currentUserId, setCurrentUserId] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiphySearchBox, setShowGiphySearchBox] = useState(false);
  const [showEmojiPickerReply, setShowEmojiPickerReply] = useState(false);
  const [showGiphySearchBoxReply, setShowGiphySearchBoxReply] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [replyForm] = Form.useForm();
  const [replyingTo, setReplyingTo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pollTimeoutRef = useRef<number | null>(null);
  const pollTokenRef = useRef(0);
  // AI polling progress strip — 提交评论后短暂出现
  const [aiPolling, setAiPolling] = useState(false);
  const [pollAttempt, setPollAttempt] = useState(0);

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

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getComments(pageId, currentPage, pageSize, type);
      if (response) {
        const nestedComments = nestComments(response.data);
        setComments(nestedComments);
        setTotalCommentsCount(response.meta.pagination.total);
      }
    } finally {
      setIsLoading(false);
    }
  }, [pageId, currentPage, pageSize, type]);

  // Draft Storage Keys
  const getCommentStorageKey = useCallback(() => `draft_comment_${pageId}`, [pageId]);
  const getReplyStorageKey = useCallback(() => `draft_reply_${pageId}_${replyingTo}`, [pageId, replyingTo]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, refresh]);

  // Load drafts
  useEffect(() => {
    // Load main comment draft
    const commentKey = getCommentStorageKey();
    const savedComment = localStorage.getItem(commentKey);
    if (savedComment) {
      form.setFieldsValue({ comment: savedComment });
    } else {
      form.setFieldsValue({ comment: "" });
    }
  }, [pageId, form, getCommentStorageKey]);

  useEffect(() => {
    // Load reply draft only when relying logic is active
    if (replyingTo) {
      const replyKey = getReplyStorageKey();
      const savedReply = localStorage.getItem(replyKey);
      if (savedReply) {
        replyForm.setFieldsValue({ reply: savedReply });
      } else {
        replyForm.setFieldsValue({ reply: "" });
      }
    }
  }, [replyingTo, pageId, replyForm, getReplyStorageKey]);

  // Debounced save
  const debouncedDraftSave = useMemo(
    () =>
      debounce((key, value) => {
        if (value) {
          localStorage.setItem(key, value);
        } else {
          localStorage.removeItem(key);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedDraftSave.cancel();
    };
  }, [debouncedDraftSave]);

  const handleValuesChange = (changedValues, allValues) => {
    const key = getCommentStorageKey();
    if (changedValues.comment !== undefined) {
      debouncedDraftSave(key, changedValues.comment);
    }
  };

  const handleReplyValuesChange = (changedValues, allValues) => {
    if (!replyingTo) return;
    const key = getReplyStorageKey();
    if (changedValues.reply !== undefined) {
      debouncedDraftSave(key, changedValues.reply);
    }
  };

  // Emoji+Giphy
  const handleEmojiGiphyToggle = (toggleType, identifier) => {
    switch (toggleType) {
      case "emojiPicker":
        setShowGiphySearchBox(false);
        setShowGiphySearchBoxReply(false);
        if (identifier === "reply") {
          setShowEmojiPicker(false);
          setShowEmojiPickerReply((prevShowEmojiPickerReply) => !prevShowEmojiPickerReply);
        } else {
          setShowEmojiPickerReply(false);
          setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
        }
        break;

      case "giphySearchBox":
        setShowEmojiPicker(false);
        setShowEmojiPickerReply(false);
        if (identifier === "reply") {
          setShowGiphySearchBox(false);
          setShowGiphySearchBoxReply((prevShowGiphySearchBoxReply) => !prevShowGiphySearchBoxReply);
        } else {
          setShowGiphySearchBoxReply(false);
          setShowGiphySearchBox((prevShowGiphySearchBox) => !prevShowGiphySearchBox);
        }
        break;

      default:
        break;
    }
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleCancelReply = () => {
    const key = getReplyStorageKey();
    localStorage.removeItem(key); // Clear draft on cancel
    replyForm.resetFields();
    setReplyingTo(null);
  };

  const clearPollTimer = useCallback(() => {
    if (pollTimeoutRef.current !== null) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  }, []);

  /**
   * 智能轮询检测 AI 回复
   * 采用阶梯式退避轮询，检测到新回复则停止
   */
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
            const response = await getComments(pageId, currentPageRef.current, pageSize, type);
            if (response) {
              const newCount = response.meta.pagination.total;
              const nestedComments = nestComments(response.data);
              setComments(nestedComments);
              setTotalCommentsCount(newCount);
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
    [pageId, pageSize, type, clearPollTimer],
  );

  useEffect(() => {
    return () => {
      pollTokenRef.current += 1;
      clearPollTimer();
      setAiPolling(false);
    };
  }, [clearPollTimer]);

  const handleSubmit = async (values) => {
    if (!currentUserId) {
      handleLoginModalOpen();
      return;
    }
    try {
      await postComment(pageId, values.comment, replyingTo, type, currentLocale);
      form.resetFields();
      localStorage.removeItem(getCommentStorageKey());
      setReplyingTo(null);

      const initialCount = totalCommentsCount;
      // 新的顶级评论排序在最前（id:desc），跳到第 1 页让用户看到
      if (currentPage !== 1) {
        setCurrentPage(1); // 变更 currentPage 会触发 fetchComments
      } else {
        setRefresh((prev) => !prev);
      }
      pollForAIReply(initialCount);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleReplySubmit = async (values) => {
    if (!currentUserId) {
      handleLoginModalOpen();
      return;
    }
    try {
      await postComment(pageId, values.reply, replyingTo, type, currentLocale);
      replyForm.resetFields();
      localStorage.removeItem(getReplyStorageKey());
      setReplyingTo(null);

      const initialCount = totalCommentsCount;
      setRefresh((prev) => !prev);
      pollForAIReply(initialCount);
    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };

  // handle emoji
  const handleEmojiSelect = (emoji) => {
    const currentComment = form.getFieldValue("comment");
    form.setFieldsValue({
      comment: (currentComment || "") + emoji.native,
    });
  };
  const handleEmojiSelectreply = (emoji) => {
    const currentComment = replyForm.getFieldValue("reply");
    replyForm.setFieldsValue({
      reply: (currentComment || "") + emoji.native,
    });
  };

  // Update handleGiphySelect functions to work with new Giphy component
  const handleGiphySelect = (giphy) => {
    const currentComment = form.getFieldValue("comment");
    form.setFieldsValue({
      comment: (currentComment || "") + `![Gif](${giphy.images.fixed_height.url})`,
    });
  };

  const handleGiphySelectreply = (giphy) => {
    const currentComment = replyForm.getFieldValue("reply");
    replyForm.setFieldsValue({
      reply: (currentComment || "") + `![Gif](${giphy.images.fixed_height.url})`,
    });
  };

  const renderForm = () => {
    if (type === "author") {
      return null;
    }
    return (
      <div style={{ marginTop: 12 }}>
        <Form form={form} onFinish={handleSubmit} onValuesChange={handleValuesChange}>
          <Form.Item
            name="comment"
            rules={[
              {
                required: true,
                message: translate({
                  id: "validation.comment.required",
                  message: "请输入评论内容",
                }),
              },
              {
                max: 2000,
                message: translate({
                  id: "validation.comment.maxLength",
                  message: "评论内容不应超过2000个字符",
                }),
              },
            ]}>
            <CommentEditor
              onSubmit={form.submit}
              isLoggedIn={!!currentUserId}
              onLogin={handleLoginModalOpen}
              onEmojiToggle={() => handleEmojiGiphyToggle("emojiPicker", "comment")}
              onGifToggle={() => handleEmojiGiphyToggle("giphySearchBox", "comment")}
              placeholder={translate({
                id: "placeholder.comment",
                message: "在此输入评论…… 支持使用 Markdown 和 HTML 语法",
              })}
            />
          </Form.Item>
          {showEmojiPicker && (
            <Suspense fallback={null}>
              <EmojiPickerLazy isDarkMode={isDarkMode} onEmojiSelect={handleEmojiSelect} />
            </Suspense>
          )}
          {showGiphySearchBox && (
            <Suspense fallback={null}>
              <GiphySelector onGifSelect={handleGiphySelect} />
            </Suspense>
          )}
        </Form>
      </div>
    );
  };

  const renderComment = useCallback(
    (comment) => (
      <CommentComponent
        key={comment.id}
        actions={[
          <Button key="comment-basic-reply-to" type="text" size="small" onClick={() => setReplyingTo(comment.id)}>
            <Translate id="action.reply">回复</Translate>
          </Button>,
        ]}
        author={comment.author?.name}
        avatar={<BoringAvatar size={40} name={comment.author?.name || "anonymous"} variant="beam" colors={avatarColors} />}
        content={<ReactMarkdown>{comment.content}</ReactMarkdown>}
        datetime={dayjs(comment.createdAt).fromNow()}>
        {replyingTo === comment.id && (
          <Form form={replyForm} onFinish={handleReplySubmit} onValuesChange={handleReplyValuesChange}>
            <Form.Item
              name="reply"
              rules={[
                {
                  required: true,
                  message: translate({
                    id: "validation.replyRequired",
                    message: "请输入回复内容",
                  }),
                },
                {
                  max: 2000,
                  message: translate({
                    id: "validation.comment.maxLength",
                    message: "评论内容不应超过2000个字符",
                  }),
                },
              ]}>
              <CommentEditor
                onSubmit={replyForm.submit}
                isLoggedIn={!!currentUserId}
                onLogin={handleLoginModalOpen}
                onEmojiToggle={() => handleEmojiGiphyToggle("emojiPicker", "reply")}
                onGifToggle={() => handleEmojiGiphyToggle("giphySearchBox", "reply")}
                onCancel={handleCancelReply}
                placeholder={translate({
                  id: "placeholder.comment",
                  message: "在此输入评论…… 支持使用 Markdown 和 HTML 语法",
                })}
              />
            </Form.Item>
            {showEmojiPickerReply && (
              <Suspense fallback={null}>
                <EmojiPickerLazy isDarkMode={isDarkMode} onEmojiSelect={handleEmojiSelectreply} />
              </Suspense>
            )}
            {showGiphySearchBoxReply && (
              <Suspense fallback={null}>
                <GiphySelector onGifSelect={handleGiphySelectreply} />
              </Suspense>
            )}
          </Form>
        )}
        {comment.children && comment.children.map((childComment) => renderComment(childComment))}
      </CommentComponent>
    ),
    [currentUserId, replyingTo, handleReplySubmit, isDarkMode, showEmojiPickerReply, showGiphySearchBoxReply],
  );

  return (
    <>
      <Modal open={isLoginModalOpen} onCancel={handleLoginModalClose} footer={null}>
        <Suspense fallback={null}>
          <LoginComponent />
        </Suspense>
      </Modal>
      {renderForm()}

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
          <div className="comment-list">{comments.map(renderComment)}</div>
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
