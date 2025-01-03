import React, { useContext, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import { Form, Input, Button, message, Spin, Modal, Typography, Tooltip, Switch, Tag } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "../ShowcaseCard/styles.module.css";

import { getPrompts, updatePrompt, deletePrompt, updatePromptsOrder, updateLocalStorageCache } from "@site/src/api";
import { AuthContext } from "../AuthContext";

// SortableItem component
const SortablePromptItem = ({ UserPrompt, index, copiedIndex, isFiltered, handleCopyClick, handleDeletePrompt, handleEditPrompt }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: UserPrompt.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isFiltered ? "default" : "grab",
  };

  return (
    <li ref={setNodeRef} className="card shadow--md" style={style}>
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
              <span className={styles.showcaseCardLink} style={{ color: "var(--ifm-color-primary)" }}>
                {UserPrompt.title}{" "}
              </span>
              {UserPrompt.upvoteDifference > 0 && <Tag color="green">+{UserPrompt.upvoteDifference}</Tag>}
            </div>
            <Tooltip title={translate({ id: "theme.CodeBlock.copy", message: "复制" })}>
              <Button type="default" onClick={() => handleCopyClick(index)}>
                <CopyOutlined />
                {copiedIndex === index && <Translate id="theme.CodeBlock.copied">已复制</Translate>}
              </Button>
            </Tooltip>
          </div>
          <p className={styles.showcaseCardBody} {...attributes} {...(isFiltered ? {} : listeners)}>
            {UserPrompt.remark && (
              <>
                👉 {UserPrompt.remark}
                <br />
              </>
            )}
            {UserPrompt.description}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip title={<Translate id="delete">删除</Translate>}>
            <a style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => handleDeletePrompt(UserPrompt.id)}>
              <DeleteOutlined />
              <Translate id="delete">删除</Translate>
            </a>
          </Tooltip>
          <Tooltip title={<Translate id="edit">修改</Translate>}>
            <a style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => handleEditPrompt(UserPrompt)}>
              <EditOutlined />
              <Translate id="edit">修改</Translate>
            </a>
          </Tooltip>
        </div>
      </div>
    </li>
  );
};

export default function UserPromptsPage({ filteredCommus = [], isFiltered = false }) {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [userprompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
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
    const fetchPrompts = async () => {
      try {
        if (isFiltered) {
          setUserPrompts(filteredCommus);
        } else {
          const myPrompts = userAuth.data?.userprompts || [];
          const myPromptsData = await getPrompts("userprompts", myPrompts);
          setUserPrompts(myPromptsData);
        }
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
      }
    };
    fetchPrompts();
  }, [userAuth, isFiltered, filteredCommus]);

  const handleCopyClick = useCallback(
    (index) => {
      const UserPrompt = userprompts[index];
      if (UserPrompt) {
        copy(UserPrompt.description);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      }
    },
    [userprompts]
  );

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
      try {
        await updatePrompt(editingPromptId, values);
        refreshUserAuth();
        messageApi.open({
          type: "success",
          content: <Translate id="message.success">词条提交成功！</Translate>,
        });
        setOpen(false);
      } catch (err) {
        console.error(err);
        messageApi.open({
          type: "error",
          content: <Translate id="message.error">词条提交失败，请稍后重试</Translate>,
        });
      }
    },
    [editingPromptId, refreshUserAuth]
  );

  const handleDeletePrompt = (promptId) => {
    Modal.confirm({
      title: <Translate id="message.deletePrompt.confirm.title">Confirm Delete</Translate>,
      content: <Translate id="message.deletePrompt.confirm.content">Are you sure you want to delete this prompt?</Translate>,
      onOk: async () => {
        try {
          await deletePrompt(promptId);
          refreshUserAuth();
          messageApi.open({
            type: "success",
            content: <Translate id="message.deletePrompt.success">Prompt successfully deleted!</Translate>,
          });
        } catch (err) {
          console.error(err);
          messageApi.open({
            type: "error",
            content: <Translate id="message.deletePrompt.error">Failed to delete prompt, please try again later.</Translate>,
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
    if (hasDragged) {
      const ids = userprompts.map((item) => item.id);
      const objectsArray = ids.map((id) => ({ id: id }));
      updateLocalStorageCache("userprompts", objectsArray);
      updatePromptsOrder(ids);
      setHasDragged(false);
    }
  }, [userprompts]);

  if (!userAuth?.data || loading) {
    return <Spin />;
  }

  return (
    <>
      {contextHolder}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <ul className="clean-list showcaseList_Cwj2">
          {!userprompts || userprompts.length === 0 ? (
            <li className="card shadow--md">
              <div className={clsx("card__body", styles.cardBodyHeight)}>
                <p>No user prompts submitted yet.</p>
                <p>Please add your prompts.</p>
              </div>
            </li>
          ) : (
            <SortableContext items={userprompts.map((item) => item.id)}>
              {userprompts.map((UserPrompt, index) => (
                <SortablePromptItem
                  key={UserPrompt.id}
                  UserPrompt={UserPrompt}
                  index={index}
                  copiedIndex={copiedIndex}
                  isFiltered={isFiltered}
                  handleCopyClick={handleCopyClick}
                  handleDeletePrompt={handleDeletePrompt}
                  handleEditPrompt={handleEditPrompt}
                />
              ))}
            </SortableContext>
          )}
        </ul>
      </DndContext>

      <Modal
        title={translate({
          id: "modal.updateprompt.title",
          message: "更新当前 Prompt",
        })}
        open={open}
        footer={null}
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
            <Switch
              defaultChecked={form.getFieldValue("share")}
              onChange={(checked) => {
                form.setFieldsValue({ share: checked });
              }}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
            <Typography.Text type="secondary">
              {" "}
              <Translate id="message.addprompt.submission">您是否愿意将该提示词分享到公开页面？</Translate>
            </Typography.Text>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading}>
              <Translate id="button.updateprompt">更新 Prompt</Translate>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
