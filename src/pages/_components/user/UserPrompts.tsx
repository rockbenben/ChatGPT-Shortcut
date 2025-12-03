import React, { useContext, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { Form, Input, Button, Spin, Modal, Typography, Tooltip, Switch, Tag, App } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined, DownOutlined, LockOutlined } from "@ant-design/icons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "@site/src/pages/_components/ShowcaseCard/styles.module.css";
import pageStyles from "@site/src/pages/styles.module.css";
import { MAX_LENGTH, truncate } from "@site/src/utils/formatters";
import isEqual from "lodash/isEqual";

import { getPrompts, updatePrompt, deletePrompt, updatePromptsOrder, updateLocalStorageCache, clearUserAllInfoCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";
import { ShowcaseRemark } from "@site/src/pages/_components/ShowcaseCard/ShowcaseRemark";

// SortableItem component
const SortablePromptItem = ({ UserPrompt, isFiltered, handleDeletePrompt, handleEditPrompt }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: UserPrompt.id });
  const [showFullContent, setShowFullContent] = useState(false);
  const [paragraphText, setParagraphText] = useState(UserPrompt.description);
  const { copied, copyText } = useCopyToClipboard();

  const toggleContentDisplay = () => {
    setShowFullContent(!showFullContent);
  };

  const handleParagraphClick = () => {
    if (UserPrompt.notes) {
      setParagraphText(paragraphText === UserPrompt.description ? UserPrompt.notes : UserPrompt.description);
    }
  };

  const displayText = paragraphText || UserPrompt.description;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isFiltered ? "default" : "grab",
  };

  return (
    <li ref={setNodeRef} className={clsx("card", styles.showcaseCard)} style={style}>
      <div
        className={clsx("card__body")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
        <div>
          <div className={clsx(styles.showcaseCardHeader)}>
            <div className={`${styles.showcaseCardTitle} ${styles.shortEllipsisMy}`} {...attributes} {...(isFiltered ? {} : listeners)}>
              <span className={styles.showcaseCardLink}>{UserPrompt.title} </span>
              {UserPrompt.upvoteDifference > 0 && <Tag color="green">+{UserPrompt.upvoteDifference}</Tag>}
              {UserPrompt.share === false && <Tag color="blue" icon={<LockOutlined />} />}
            </div>
            <Tooltip title={translate({ id: "theme.CodeBlock.copy", message: "复制" })}>
              <Button onClick={() => copyText(UserPrompt.description)}>
                {copied ? (
                  <>
                    <CheckOutlined /> <Translate id="theme.CodeBlock.copied">已复制</Translate>
                  </>
                ) : (
                  <CopyOutlined />
                )}
              </Button>
            </Tooltip>
          </div>
          {UserPrompt.remark && <ShowcaseRemark remark={UserPrompt.remark} style={{ maxHeight: 68 }} {...attributes} {...(isFiltered ? {} : listeners)} />}
          <div className={styles.descriptionWrapper}>
            <p onClick={handleParagraphClick} className={`${styles.showcaseCardBody} ${UserPrompt.notes ? styles.clickable : styles.nonClickable}`}>
              {showFullContent ? displayText : truncate(displayText)}
            </p>
            {!showFullContent && displayText.length > MAX_LENGTH && (
              <div className={styles.gradientOverlay}>
                <div className={styles.loadMoreBtn} onClick={toggleContentDisplay}>
                  <Translate id="showcase.card.readMore">Show More</Translate>
                  <DownOutlined className={styles.downIcon} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className={styles.nonClickable}>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeletePrompt(UserPrompt.id)}>
            <Translate id="delete">删除</Translate>
          </Button>
          <Button icon={<EditOutlined />} onClick={() => handleEditPrompt(UserPrompt)}>
            <Translate id="edit">修改</Translate>
          </Button>
        </div>
      </div>
    </li>
  );
};

function UserPromptsPage({ filteredCommus = [], isFiltered = false }) {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message: messageApi, modal } = App.useApp();
  const [userprompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState(null);
  const [form] = Form.useForm();

  // Configure dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!userAuth?.data) return;
    let isMounted = true;

    const fetchPrompts = async () => {
      setLoading(true);
      try {
        if (isFiltered) {
          setUserPrompts(filteredCommus);
        } else {
          const myPrompts = userAuth.data?.userprompts || [];
          const myPromptsData = await getPrompts("userprompts", myPrompts);
          if (isMounted) {
            setUserPrompts(myPromptsData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
        if (isMounted) {
          messageApi.error(
            translate({
              id: "message.fetchError",
              message: "获取提示词失败，请稍后重试",
            })
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchPrompts();
    return () => {
      isMounted = false;
    };
  }, [userAuth, isFiltered, filteredCommus]);

  const handleEditPrompt = useCallback(
    (UserPrompt) => {
      setEditingPromptId(UserPrompt.id);
      form.setFieldsValue(UserPrompt);
      setOpen(true);
    },
    [form]
  );

  const onUpdateprompt = useCallback(
    async (values) => {
      setLoading(true);
      try {
        await updatePrompt(editingPromptId, values);
        refreshUserAuth();
        messageApi.success(
          translate({
            id: "message.success",
            message: "词条提交成功！",
          })
        );
        setOpen(false);
        form.resetFields();
      } catch (err) {
        console.error(err);
        clearUserAllInfoCache();
        refreshUserAuth();
        messageApi.error(
          translate({
            id: "message.error",
            message: "词条提交失败，请稍后重试",
          })
        );
        setOpen(false);
      } finally {
        setLoading(false);
      }
    },
    [editingPromptId, refreshUserAuth, form]
  );

  const handleDeletePrompt = useCallback(
    (promptId) => {
      modal.confirm({
        title: <Translate id="message.deletePrompt.confirm.title">Confirm Delete</Translate>,
        content: <Translate id="message.deletePrompt.confirm.content">Are you sure you want to delete this prompt?</Translate>,
        onOk: async () => {
          setLoading(true);
          try {
            await deletePrompt(promptId);
            refreshUserAuth();
            messageApi.success(
              translate({
                id: "message.deletePrompt.success",
                message: "Prompt successfully deleted!",
              })
            );
          } catch (err) {
            console.error(err);
            clearUserAllInfoCache();
            refreshUserAuth();
            messageApi.error(
              translate({
                id: "message.deletePrompt.error",
                message: "Failed to delete prompt, please try again later.",
              })
            );
          } finally {
            setLoading(false);
          }
        },
      });
    },
    [refreshUserAuth]
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setHasDragged(true);
      setUserPrompts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  useEffect(() => {
    if (hasDragged && userprompts.length > 0) {
      const ids = userprompts.map((item) => item.id);
      const objectsArray = ids.map((id) => ({ id }));
      updateLocalStorageCache("userprompts", objectsArray);
      updatePromptsOrder(ids);
      setHasDragged(false);
    }
  }, [userprompts, hasDragged]);

  if (!userAuth?.data) {
    return <Spin />;
  }

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Spin />
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <ul className={clsx("clean-list", pageStyles.showcaseList)}>
            {!userprompts || userprompts.length === 0 ? (
              <li className={clsx("card", styles.showcaseCard)}>
                <div className={clsx("card__body", styles.cardBodyHeight)}>
                  <p>
                    <Translate id="message.noPrompts">尚未提交任何提示词，请添加提示词。</Translate>
                  </p>
                </div>
              </li>
            ) : (
              <SortableContext items={userprompts.map((item) => item.id)}>
                {userprompts.map((UserPrompt) => (
                  <SortablePromptItem key={UserPrompt.id} UserPrompt={UserPrompt} isFiltered={isFiltered} handleDeletePrompt={handleDeletePrompt} handleEditPrompt={handleEditPrompt} />
                ))}
              </SortableContext>
            )}
          </ul>
        </DndContext>
      )}

      <Modal
        title={translate({
          id: "modal.updateprompt.title",
          message: "更新当前 Prompt",
        })}
        open={open}
        footer={null}
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}>
        <Form form={form} onFinish={onUpdateprompt}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: translate({
                  id: "message.addprompt.requiredTitle",
                  message: "请输入提示词标题！",
                }),
              },
            ]}>
            <Input
              placeholder={translate({
                id: "input.addprompt.title",
                message: "提示词名称",
              })}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: translate({
                  id: "message.addprompt.requiredDescription",
                  message: "请输入提示词内容！",
                }),
              },
            ]}>
            <Input.TextArea
              placeholder={translate({
                id: "input.addprompt.description",
                message: "提示词内容",
              })}
              rows={4}
            />
          </Form.Item>
          <Form.Item name="remark">
            <Input
              placeholder={translate({
                id: "input.addprompt.remark",
                message: "提示词作用（非必填）",
              })}
            />
          </Form.Item>
          <Form.Item name="notes">
            <Input.TextArea
              placeholder={translate({
                id: "input.addprompt.notes",
                message: "备注（非必填）：您可以在此提供提示词的来源说明，以及该提示词的其他语言版本。此外，如果您有任何关于该提示词的拓展想法和需求，请在此进行说明。",
              })}
              rows={3}
            />
          </Form.Item>
          <Form.Item name="share" valuePropName="checked">
            <div>
              {open && (
                <Switch
                  defaultChecked={form.getFieldValue("share")}
                  onChange={(checked) => {
                    form.setFieldsValue({ share: checked });
                  }}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              )}
              <Typography.Text type="secondary">
                {" "}
                <Translate id="message.addprompt.submission">您是否愿意将该提示词分享到公开页面？</Translate>
              </Typography.Text>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              <Translate id="button.updateprompt">更新 Prompt</Translate>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.isFiltered === nextProps.isFiltered && isEqual(prevProps.filteredCommus, nextProps.filteredCommus);
}

export default React.memo(UserPromptsPage, areEqual);
