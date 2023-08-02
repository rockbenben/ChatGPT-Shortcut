import React, { useEffect, useState, useCallback } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { List, Avatar, Button, Form, Input, Modal, Pagination } from "antd";
import { SmileOutlined, GifOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
import LoginComponent from "@site/src/pages/_components/user/login";
import { getComments, postComment, updateComment, deleteComment } from "@site/src/api";
import moment from "moment";
import debounce from "lodash/debounce";
import { marked } from "marked";
import ReactHtmlParser from "react-html-parser";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ReactGiphySearchBox from "react-giphy-searchbox";

const backgroundColors = ["#1E88E5", "#43A047", "#FF5722", "#E53935", "#8E24AA", "#FDD835"];

const getRandomColor = () => {
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
};

const Comments = ({ pageId, currentUserId, type }) => {
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();
  const [replyForm] = Form.useForm();
  const [replyingTo, setReplyingTo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [editForm] = Form.useForm();
  const [editingComment, setEditingComment] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiphySearchBox, setShowGiphySearchBox] = useState(false);

  const fetchComments = useCallback(async () => {
    const response = await getComments(pageId, currentPage, pageSize, type);
    const nestedComments = nestComments(response.data);
    setComments(nestedComments);
    console.log(response);
    console.log(response.meta.pagination.total);
    setTotalCommentsCount(response.meta.pagination.total);
  }, [pageId, currentPage, pageSize]);

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
  const saveFormValues = debounce(({ comment }) => {
    if (comment) {
      localStorage.setItem("savedComment", comment);
    }
  }, 300);

  const saveReplyFormValues = debounce(({ reply }) => {
    if (reply) {
      localStorage.setItem("savedReply", reply);
    }
  }, 300);

  const nestComments = (flatComments) => {
    let commentMap = {};

    flatComments
      .sort((a, b) => new Date(a.id) - new Date(b.id))
      .forEach((comment) => {
        comment.children = [];
        commentMap[comment.id] = comment;

        if (comment.threadOf) {
          if (commentMap[comment.threadOf.id]) {
            commentMap[comment.threadOf.id].children.push(comment);
          }
        }
      });

    const rootComments = flatComments.filter((comment) => !comment.threadOf);

    return rootComments.sort((a, b) => new Date(b.id) - new Date(a.id));
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

  const handleCancelUpdate = () => {
    editForm.resetFields();
    setEditingComment(null);
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

  const handleUpdate = async (values) => {
    await updateComment(pageId, editingComment, values.comment, type);
    editForm.resetFields();
    setEditingComment(null);
    setRefresh(!refresh);
  };

  const handleDelete = async (commentId) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this comment?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        await deleteComment(pageId, commentId, type);
        setReplyingTo(null);
        setRefresh(!refresh);
      },
    });
  };

  // handle emoji
  const handleEmojiSelect = (emoji) => {
    const currentComment = form.getFieldValue("comment");
    form.setFieldsValue({
      comment: (currentComment || "") + emoji.native,
    });
  };

  // handle giphy
  const handleGiphySelect = (giphy) => {
    const currentComment = form.getFieldValue("comment");
    form.setFieldsValue({
      comment: (currentComment || "") + `![Gif](${giphy.images.fixed_height.url})`,
    });
  };
  const renderComment = useCallback(
    (comment) => (
      <Comment
        actions={[
          <span key='comment-basic-reply-to' onClick={() => setReplyingTo(comment.id)}>
            <Translate id='comment.reply'>回复</Translate>
          </span>,
          currentUserId === comment.author?.id && (
            <>
              <span onClick={() => setEditingComment(comment.id)}>
                <Translate id='edit'>编辑</Translate>
              </span>
              <span onClick={() => handleDelete(comment.id)}>
                <Translate id='delete'>删除</Translate>
              </span>
            </>
          ),
        ]}
        author={comment.author?.name}
        avatar={<Avatar style={{ backgroundColor: getRandomColor(), color: "#ffffff" }}>{(comment.author?.name || "").slice(0, 3)}</Avatar>}
        content={
          editingComment === comment.id ? (
            <Form form={editForm} layout='inline' onFinish={handleUpdate}>
              <Form.Item
                name='comment'
                initialValue={comment.content}
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
              <Button icon={<SmileOutlined />} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
              {showEmojiPicker && <Picker data={data} theme='light' onEmojiSelect={handleEmojiSelect} />}
              <Button icon={<GifOutlined />} onClick={() => setShowGiphySearchBox(!showGiphySearchBox)} style={{ marginLeft: "2px" }} />
              {showGiphySearchBox && (
                <ReactGiphySearchBox
                  apiKey='36zezehgQXZMRV6Mko784D9OEBm0UHiP'
                  onSelect={(item) => handleGiphySelect(item)}
                  masonryConfig={[
                    { columns: 2, imageWidth: 110, gutter: 5 },
                    { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
                  ]}
                />
              )}
              <Button htmlType='submit' type='primary' style={{ marginLeft: "5px" }}>
                <Translate id='comment.update'>更新评论</Translate>
              </Button>
              <Button onClick={handleCancelUpdate} style={{ marginLeft: "10px" }}>
                <Translate id='cancel'>取消</Translate>
              </Button>
            </Form>
          ) : (
            ReactHtmlParser(marked(comment.content))
          )
        }
        datetime={moment(comment.createdAt).fromNow()}>
        {replyingTo === comment.id && (
          <Form form={replyForm} layout='inline' onFinish={handleReplySubmit} onValuesChange={saveReplyFormValues}>
            <Form.Item
              name='reply'
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
            <Button icon={<SmileOutlined />} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
            {showEmojiPicker && <Picker data={data} theme='light' onEmojiSelect={handleEmojiSelect} />}
            <Button icon={<GifOutlined />} onClick={() => setShowGiphySearchBox(!showGiphySearchBox)} style={{ marginLeft: "2px" }} />
            {showGiphySearchBox && (
              <ReactGiphySearchBox
                apiKey='36zezehgQXZMRV6Mko784D9OEBm0UHiP'
                onSelect={(item) => handleGiphySelect(item)}
                masonryConfig={[
                  { columns: 2, imageWidth: 110, gutter: 5 },
                  { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
                ]}
              />
            )}
            {currentUserId ? (
              <>
                <Button htmlType='submit' type='primary' style={{ marginLeft: "5px" }}>
                  <Translate id='reply.submit'>回复</Translate>
                </Button>
                <Button onClick={handleCancelReply} style={{ marginLeft: "10px" }}>
                  <Translate id='cancel'>取消</Translate>
                </Button>
              </>
            ) : (
              <Button onClick={handleLoginModalOpen} type='primary' style={{ marginLeft: "5px" }}>
                <Translate id='button.login'>登录</Translate>
              </Button>
            )}
          </Form>
        )}
        {comment.children && comment.children.map(renderComment)}
      </Comment>
    ),
    [currentUserId, replyingTo, handleReplySubmit, saveReplyFormValues]
  );

  return (
    <>
      <Modal open={isLoginModalOpen} onCancel={handleLoginModalClose} footer={null}>
        <LoginComponent />
      </Modal>
      <Form form={form} layout='inline' onFinish={handleSubmit} onValuesChange={saveFormValues}>
        <Form.Item
          name='comment'
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
        <Button icon={<SmileOutlined />} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && <Picker data={data} theme='light' onEmojiSelect={handleEmojiSelect} />}
        <Button icon={<GifOutlined />} onClick={() => setShowGiphySearchBox(!showGiphySearchBox)} style={{ marginLeft: "2px" }} />
        {showGiphySearchBox && (
          <ReactGiphySearchBox
            apiKey='36zezehgQXZMRV6Mko784D9OEBm0UHiP'
            onSelect={(item) => handleGiphySelect(item)}
            masonryConfig={[
              { columns: 2, imageWidth: 110, gutter: 5 },
              { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
            ]}
          />
        )}
        {currentUserId ? (
          <Button htmlType='submit' type='primary' style={{ marginLeft: "5px" }}>
            <Translate id='comment.add'>提交评论</Translate>
          </Button>
        ) : (
          <Button onClick={handleLoginModalOpen} type='primary' style={{ marginLeft: "5px" }}>
            <Translate id='button.login'>登录</Translate>
          </Button>
        )}
      </Form>
      <List
        className='comment-list'
        header={`${totalCommentsCount} ${translate({
          id: "comment.comments",
          message: "评论",
        })}`}
        itemLayout='horizontal'
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
