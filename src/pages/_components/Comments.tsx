import React, { useEffect, useState, useMemo, useCallback } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { List, Avatar, Button, Form, Modal, Pagination, theme } from "antd";
import { useColorMode } from "@docusaurus/theme-common";
import CommentComponent from "@site/src/pages/_components/CommentComponent";
import CommentEditor from "@site/src/pages/_components/CommentComponent/CommentEditor";
import { GiphySelector } from "@site/src/pages/_components/CommentComponent/GiphySelector";
import LoginComponent from "@site/src/pages/_components/user/login";
import { getComments, postComment } from "@site/src/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import debounce from "lodash/debounce";
import ReactMarkdown from "react-markdown";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
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
        .join("")
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
const backgroundColors = ["#1E88E5", "#43A047", "#FF5722", "#E53935", "#8E24AA", "#FDD835", "#1565C0", "#283593", "#2E7D32", "#C2185B", "#4CAF50", "#9C27B0", "#607D8B", "#424242", "#1976D2"];
const pageSize = 12;

const useUserColorCache = () => {
  const colorCache = useMemo(() => new Map(), []);
  const getUserColor = useCallback((username: string | null | undefined) => {
    if (!username) return "#607D8B";
    if (colorCache.has(username)) {
      return colorCache.get(username);
    }
    const color = backgroundColors[Math.abs(username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % backgroundColors.length];
    colorCache.set(username, color);
    return color;
  }, []);

  return getUserColor;
};

const Comments = ({ pageId, type }) => {
  const { token } = theme.useToken();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const getUserColor = useUserColorCache();
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
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get current user ID from localStorage
  useEffect(() => {
    setCurrentUserId(getCurrentUserId());
  }, []);

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

  useEffect(() => {
    fetchComments();
  }, [fetchComments, replyingTo, refresh]);

  useEffect(() => {
    const savedComment = localStorage.getItem("savedComment");
    const savedReply = localStorage.getItem("savedReply");

    if (savedComment) {
      form.setFieldsValue({ comment: savedComment });
    }

    if (savedReply) {
      replyForm.setFieldsValue({ reply: savedReply });
    }
  }, []);

  // For better performance, debounced saveFormValues and saveReplyFormValues
  const debouncedSaveFormValues = debounce((comment) => {
    if (comment) {
      localStorage.setItem("savedComment", comment);
    }
  }, 300);

  const debouncedSaveReplyFormValues = debounce((reply) => {
    if (reply) {
      localStorage.setItem("savedReply", reply);
    }
  }, 300);

  const saveFormValues = (changedValues, allValues) => {
    if (changedValues.comment !== undefined) {
      debouncedSaveFormValues(changedValues.comment);
    }
  };

  const saveReplyFormValues = (changedValues, allValues) => {
    if (changedValues.reply !== undefined) {
      debouncedSaveReplyFormValues(changedValues.reply);
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

  const nestComments = (flatComments) => {
    const commentMap = new Map();

    const sortedComments = [...flatComments].sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime());

    const dateCache = new Map();
    const getDate = (id) => {
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
        }
      } else {
        rootComments.push(comment);
      }
    }

    return rootComments.sort((a, b) => getDate(b.id) - getDate(a.id));
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };
  const handleCancelReply = () => {
    replyForm.resetFields();
    setReplyingTo(null);
  };

  const handleSubmit = async (values) => {
    if (!currentUserId) {
      handleLoginModalOpen();
      return;
    }
    await postComment(pageId, values.comment, replyingTo, type);
    form.resetFields();
    localStorage.removeItem("savedComment");
    setReplyingTo(null);
    setRefresh(!refresh);
  };

  const handleReplySubmit = async (values) => {
    if (!currentUserId) {
      handleLoginModalOpen();
      return;
    }
    await postComment(pageId, values.reply, replyingTo, type);
    replyForm.resetFields();
    localStorage.removeItem("savedReply");
    setReplyingTo(null);
    setRefresh(!refresh);
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
      <div style={{ marginTop: token.marginSM }}>
        <Form form={form} onFinish={handleSubmit} onValuesChange={saveFormValues}>
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
          {showEmojiPicker && <Picker data={data} theme={isDarkMode ? "dark" : "light"} onEmojiSelect={handleEmojiSelect} />}
          {showGiphySearchBox && <GiphySelector onGifSelect={handleGiphySelect} />}
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
        avatar={<Avatar style={{ backgroundColor: getUserColor(comment.author?.name), color: "#ffffff" }}>{(comment.author?.name || "").slice(0, 3)}</Avatar>}
        content={<ReactMarkdown>{comment.content}</ReactMarkdown>}
        datetime={dayjs(comment.createdAt).fromNow()}>
        {replyingTo === comment.id && (
          <Form form={replyForm} onFinish={handleReplySubmit} onValuesChange={saveReplyFormValues}>
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
            {showEmojiPickerReply && <Picker data={data} theme={isDarkMode ? "dark" : "light"} onEmojiSelect={handleEmojiSelectreply} />}
            {showGiphySearchBoxReply && <GiphySelector onGifSelect={handleGiphySelectreply} />}
          </Form>
        )}
        {comment.children && comment.children.map((childComment) => renderComment(childComment))}
      </CommentComponent>
    ),
    [currentUserId, replyingTo, handleReplySubmit, saveReplyFormValues, token, isDarkMode, showEmojiPickerReply, showGiphySearchBoxReply, getUserColor]
  );

  return (
    <>
      <Modal open={isLoginModalOpen} onCancel={handleLoginModalClose} footer={null}>
        <LoginComponent />
      </Modal>
      {renderForm()}
      <div style={{ minHeight: 200 }}>
        <List
          loading={isLoading}
          className="comment-list"
          header={`${totalCommentsCount} ${translate({
            id: "label.comments",
            message: "评论",
          })}`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={renderComment}
        />
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalCommentsCount}
        showQuickJumper
        showSizeChanger={false}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        style={{ textAlign: "center", marginTop: token.marginLG }}
      />
    </>
  );
};

export default Comments;
