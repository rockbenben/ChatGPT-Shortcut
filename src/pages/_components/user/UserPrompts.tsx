import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "../ShowcaseCard/styles.module.css";
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  Modal,
  Typography,
  Tooltip,
  Switch,
} from "antd";
import Heading from "@theme/Heading";
import { AuthContext } from "../AuthContext";
import { updatePrompt, deletePrompt } from "@site/src/api";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function UserPromptsPage() {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const [userprompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userAuth && userAuth.data.userprompts) {
      setUserPrompts(userAuth.data.userprompts);
    }
  }, [userAuth]);

  const handleCopyClick = (index) => {
    const UserPrompt = userprompts[index];
    if (UserPrompt) {
      copy(UserPrompt.description);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };

  // 新增的状态变量，用于跟踪正在被编辑的 UserPrompt 的 id
  const [editingPromptId, setEditingPromptId] = useState(null);
  const [form] = Form.useForm();
  const handleEditPrompt = (UserPrompt) => {
    setEditingPromptId(UserPrompt.id);
    form.setFieldsValue(UserPrompt);
    setOpen(true);
  };
  const onUpdateprompt = async (values) => {
    setLoading(true);
    try {
      await updatePrompt(editingPromptId, values);
      await refreshUserAuth();
      //window.location.reload();
      message.success(
        <Translate id='message.success'>词条更新成功！</Translate>
      );
      setOpen(false);
    } catch (err) {
      console.error(err);
      message.error(
        <Translate id='message.error'>词条更新失败，请稍后重试</Translate>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = (id) => {
    Modal.confirm({
      title: (
        <Translate id='message.deletePrompt.confirm.title'>
          Confirm Delete
        </Translate>
      ),
      content: (
        <Translate id='message.deletePrompt.confirm.content'>
          Are you sure you want to delete this prompt?
        </Translate>
      ),
      onOk: async () => {
        setLoading(true);
        try {
          await deletePrompt(id);
          await refreshUserAuth();
          //window.location.reload();
          message.success(
            <Translate id='message.deletePrompt.success'>
              Prompt successfully deleted!
            </Translate>
          );
        } catch (err) {
          console.error(err);
          message.error(
            <Translate id='message.deletePrompt.error'>
              Failed to delete prompt, please try again later.
            </Translate>
          );
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <ul className='clean-list showcaseList_Cwj2'>
      {userprompts.length === 0 ? (
        <li className='card shadow--md'>
          <div className={clsx("card__body", styles.cardBodyHeight)}>
            <p>No user prompts submitted yet.</p>
            <p>Please submit your prompts.</p>
          </div>
        </li>
      ) : (
        userprompts.map((UserPrompt, index) => (
          <li key={UserPrompt.id} className='card shadow--md'>
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
                  <Heading as='h4' className={styles.showcaseCardTitle}>
                    <span
                      className={styles.showcaseCardLink}
                      style={{ color: "var(--ifm-color-primary)" }}>
                      {UserPrompt.title}{" "}
                    </span>
                  </Heading>
                  <button
                    className={clsx(
                      "button button--secondary button--sm",
                      styles.showcaseCardSrcBtn
                    )}
                    type='button'
                    onClick={() => handleCopyClick(index)}>
                    {copiedIndex === index ? (
                      <Translate id='copy.done'>已复制</Translate>
                    ) : (
                      <Translate id='copy.button'>复制</Translate>
                    )}
                  </button>
                </div>
                <p className={styles.showcaseCardBody}>
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
                <Tooltip
                  title={<Translate id='delete'>删除</Translate>}>
                  <a
                    style={{ fontSize: "14px", cursor: "pointer" }}
                    onClick={() => handleDeletePrompt(UserPrompt.id)}>
                    <DeleteOutlined />
                    <Translate id='delete'>删除</Translate>
                  </a>
                </Tooltip>
                <Tooltip
                  title={<Translate id='edit'>修改</Translate>}>
                  <a
                    style={{ fontSize: "14px", cursor: "pointer" }}
                    onClick={() => handleEditPrompt(UserPrompt)}>
                    <EditOutlined />
                    <Translate id='edit'>修改</Translate>
                  </a>
                </Tooltip>
              </div>
            </div>
          </li>
        ))
      )}

      <Modal
        title={translate({
          id: "modal.updateprompt.title",
          message: "更新当前 Prompt",
        })}
        open={open}
        footer={null}
        onCancel={() => {
          setOpen(false);
          form.resetFields(); // 关闭编辑框时重置表单的值
        }}>
        <Form form={form} onFinish={onUpdateprompt}>
          <Form.Item
            name='title'
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
            name='description'
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
          <Form.Item name='remark'>
            <Input
              placeholder={translate({
                id: "input.addprompt.remark",
                message: "提示词作用（非必填）",
              })}
            />
          </Form.Item>
          <Form.Item name='notes'>
            <Input.TextArea
              placeholder={translate({
                id: "input.addprompt.notes",
                message:
                  "备注（非必填）：您可以在此提供提示词的来源说明，以及该提示词的其他语言版本。此外，如果您有任何关于该提示词的拓展想法和需求，请在此进行说明。",
              })}
              rows={3}
            />
          </Form.Item>
          <Form.Item name='share' valuePropName='checked'>
            <Switch
              defaultChecked={form.getFieldValue("share")}
              onChange={(checked) => {
                form.setFieldsValue({ share: checked });
              }}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
            <Typography.Text type='secondary'>
              {" "}
              <Translate id='message.addprompt.submission'>
                您是否愿意将该提示词分享到公开页面？
              </Translate>
            </Typography.Text>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              loading={loading}
              style={{ marginTop: "16px" }}>
              <Translate id='button.updateprompt'>更新 Prompt</Translate>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  );
}
