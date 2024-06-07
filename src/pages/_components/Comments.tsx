import React, { useEffect, useState, useCallback, useRef } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { List, Avatar, Button, Form, Input, Modal, Pagination } from "antd";
import { SmileOutlined, GifOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
import LoginComponent from "@site/src/pages/_components/user/login";
import { getComments, postComment } from "@site/src/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import debounce from "lodash/debounce";
import ReactMarkdown from "react-markdown";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ReactGiphySearchBox from "react-giphy-searchbox";

dayjs.extend(relativeTime);
const backgroundColors = ["#1E88E5", "#43A047", "#FF5722", "#E53935", "#8E24AA", "#FDD835"];

const getRandomColor = () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

const Comments = ({ pageId, currentUserId, type }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiphySearchBox, setShowGiphySearchBox] = useState(false);
  const [showEmojiPickerReply, setShowEmojiPickerReply] = useState(false);
  const [showGiphySearchBoxReply, setShowGiphySearchBoxReply] = useState(false);

  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();
  const [replyForm] = Form.useForm();
  const [replyingTo, setReplyingTo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);

  const savedComment = useRef(localStorage.getItem("savedComment"));
  const savedReply = useRef(localStorage.getItem("savedReply"));

  const fetchComments = useCallback(async () => {
    const response = await getComments(pageId, currentPage, pageSize, type);
    if (response) {
      const nestedComments = nestComments(response.data);
      setComments(nestedComments);
      setTotalCommentsCount(response.meta.pagination.total);
    }
  }, [pageId, currentPage, pageSize, type]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, replyingTo, refresh]);

  useEffect(() => {
    if (savedComment.current) {
      form.setFieldsValue({ comment: savedComment.current });
    }

    if (savedReply.current) {
      replyForm.setFieldsValue({ reply: savedReply.current });
    }
  }, [form, replyForm]);

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

  const saveFormValues = (changedValues) => {
    if (changedValues.comment !== undefined) {
      debouncedSaveFormValues(changedValues.comment);
    }
  };

  const saveReplyFormValues = (changedValues) => {
    if (changedValues.reply !== undefined) {
      debouncedSaveReplyFormValues(changedValues.reply);
    }
  };

  const handleEmojiGiphyToggle = (toggleType, identifier) => {
    const toggleEmoji = (setFn, showFn, showReplyFn) => {
      setFn(false);
      setFn(false);
      showFn(false);
      showReplyFn((prev) => !prev);
    };

    if (toggleType === "emojiPicker") {
      toggleEmoji(setShowGiphySearchBox, setShowGiphySearchBoxReply, identifier === "reply" ? setShowEmojiPickerReply : setShowEmojiPicker);
    } else if (toggleType === "giphySearchBox") {
      toggleEmoji(setShowEmojiPicker, setShowEmojiPickerReply, identifier === "reply" ? setShowGiphySearchBoxReply : setShowGiphySearchBox);
    }
  };

  const nestComments = (flatComments) => {
    let commentMap = {};

    flatComments
      .sort((a, b) => new Date(a.id) - new Date(b.id))
      .forEach((comment) => {
        comment.children = [];
        commentMap[comment.id] = comment;

        if (comment.threadOf && commentMap[comment.threadOf.id]) {
          commentMap[comment.threadOf.id].children.push(comment);
        }
      });

    return flatComments.filter((comment) => !comment.threadOf).sort((a, b) => new Date(b.id) - new Date(a.id));
  };

  const handleLoginModalOpen = () => setIsLoginModalOpen(true);

  const handleLoginModalClose = () => setIsLoginModalOpen(false);

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
    setRefresh((prev) => !prev);
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
    setRefresh((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    const currentComment = form.getFieldValue("comment");
    form.setFieldsValue({
      comment: (currentComment || "") + emoji.native,
    });
  };

  const handleEmojiSelectReply = (emoji) => {
    const currentComment = replyForm.getFieldValue("reply");
    replyForm.setFieldsValue({
      reply: (currentComment || "") + emoji.native,
    });
  };

  const handleGiphySelect = (giphy) => {
    const currentComment = form.getFieldValue("comment");
    form.setFieldsValue({
      comment: (currentComment || "") + `![Gif](${giphy.images.fixed_height.url})`,
    });
  };

  const handleGiphySelectReply = (giphy) => {
    const currentComment = replyForm.getFieldValue("reply");
    replyForm.setFieldsValue({
      reply: (currentComment || "") + `![Gif](${giphy.images.fixed_height.url})`,
    });
  };

  const renderComment = useCallback(
    (comment) => (
      <Comment
        key={comment.id}
        actions={[
          <span key="comment-basic-reply-to" onClick={() => setReplyingTo(comment.id)}>
            <Translate id="comment.reply">回复</Translate>
          </span>,
        ]}
        author={comment.author?.name}
        avatar={<Avatar style={{ backgroundColor: getRandomColor(), color: "#ffffff" }}>{(comment.author?.name || "").slice(0, 3)}</Avatar>}
        content={<ReactMarkdown>{comment.content}</ReactMarkdown>}
        datetime={dayjs(comment.createdAt).fromNow()}>
        {replyingTo === comment.id && (
          <Form form={replyForm} layout="inline" onFinish={handleReplySubmit} onValuesChange={saveReplyFormValues}>
            <Form.Item
              name="reply"
              rules={[
                {
                  required: true,
                  message: translate({
                    id: "reply.required",
                    message: "请输入回复内容",
                  }),
                },
                {
                  max: 2000,
                  message: translate({
                    id: "comment.maxLength",
                    message: "评论内容不应超过2000个字符",
                  }),
                },
              ]}
              style={{ width: "100%", margin: "10px 0" }}>
              <Input.TextArea
                rows={4}
                placeholder={translate({
                  id: "comment.placeholder",
                  message: "在此输入评论…… 支持使用 Markdown 和 HTML 语法",
                })}
              />
            </Form.Item>
            <Button icon={<SmileOutlined />} onClick={() => handleEmojiGiphyToggle("emojiPicker", "reply")} />
            {showEmojiPickerReply && <Picker data={data} theme="light" onEmojiSelect={handleEmojiSelectReply} />}
            <Button icon={<GifOutlined />} onClick={() => handleEmojiGiphyToggle("giphySearchBox", "reply")} style={{ marginLeft: "2px" }} />
            {showGiphySearchBoxReply && (
              <ReactGiphySearchBox
                apiKey="36zezehgQXZMRV6Mko784D9OEBm0UHiP"
                onSelect={handleGiphySelectReply}
                masonryConfig={[
                  { columns: 2, imageWidth: 110, gutter: 5 },
                  { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
                ]}
              />
            )}
            {currentUserId ? (
              <>
                <Button htmlType="submit" type="primary" style={{ marginLeft: "5px" }}>
                  <Translate id="reply.submit">回复</Translate>
                </Button>
                <Button onClick={handleCancelReply} style={{ marginLeft: "10px" }}>
                  <Translate id="cancel">取消</Translate>
                </Button>
              </>
            ) : (
              <Button onClick={handleLoginModalOpen} type="primary" style={{ marginLeft: "5px" }}>
                <Translate id="button.login">登录</Translate>
              </Button>
            )}
          </Form>
        )}
        {comment.children && comment.children.map(renderComment)}
      </Comment>
    ),
    [currentUserId, replyingTo, handleReplySubmit, saveReplyFormValues]
  );

  const renderForm = () => {
    if (type === "author") {
      // 当 type 为 'author' 时，不渲染 Form
      return null;
    }
    return (
      <Form form={form} layout="inline" onFinish={handleSubmit} onValuesChange={saveFormValues}>
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: translate({
                id: "comment.required",
                message: "请输入评论内容",
              }),
            },
            {
              max: 2000,
              message: translate({
                id: "comment.maxLength",
                message: "评论内容不应超过2000个字符",
              }),
            },
          ]}
          style={{ width: "100%", margin: "10px 0" }}>
          <Input.TextArea
            rows={4}
            placeholder={translate({
              id: "comment.placeholder",
              message: "在此输入评论…… 支持使用 Markdown 和 HTML 语法",
            })}
          />
        </Form.Item>
        <Button icon={<SmileOutlined />} onClick={() => handleEmojiGiphyToggle("emojiPicker", "comment")} />
        {showEmojiPicker && <Picker data={data} theme="light" onEmojiSelect={handleEmojiSelect} />}
        <Button icon={<GifOutlined />} onClick={() => handleEmojiGiphyToggle("giphySearchBox", "comment")} style={{ marginLeft: "2px" }} />
        {showGiphySearchBox && (
          <ReactGiphySearchBox
            apiKey="36zezehgQXZMRV6Mko784D9OEBm0UHiP"
            onSelect={handleGiphySelect}
            masonryConfig={[
              { columns: 2, imageWidth: 110, gutter: 5 },
              { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
            ]}
          />
        )}
        {currentUserId ? (
          <Button htmlType="submit" type="primary" style={{ marginLeft: "5px" }}>
            <Translate id="comment.add">提交评论</Translate>
          </Button>
        ) : (
          <Button onClick={handleLoginModalOpen} type="primary" style={{ marginLeft: "5px" }}>
            <Translate id="button.login">登录</Translate>
          </Button>
        )}
      </Form>
    );
  };

  return (
    <>
      <Modal open={isLoginModalOpen} onCancel={handleLoginModalClose} footer={null}>
        <LoginComponent />
      </Modal>
      {renderForm()}
      <List
        className="comment-list"
        header={`${totalCommentsCount} ${translate({
          id: "comment.comments",
          message: "评论",
        })}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={renderComment}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalCommentsCount}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        }}
      />
    </>
  );
};

export default Comments;
