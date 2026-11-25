import React, { useEffect } from "react";
import { Form, Input, Modal, Switch, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import PromptEditorFormItem from "./PromptEditorFormItem";

type PromptFormMode = "add" | "edit";

interface PromptFormModalProps {
  open: boolean;
  mode: PromptFormMode;
  loading: boolean;
  initialValues?: any;
  onSubmit: (values: any) => Promise<void>;
  onClose: () => void;
}

const PromptFormModal: React.FC<PromptFormModalProps> = ({ open, mode, loading, initialValues, onSubmit, onClose }) => {
  const [form] = Form.useForm();
  const shareLabel = translate({ id: "label.sharePrompt", message: "分享到社区页面，其他人可以浏览和收藏" });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }

    if (mode === "add") {
      form.resetFields();
      form.setFieldsValue({ share: true });
    }
  }, [open, mode, initialValues, form]);

  return (
    <Modal
      open={open}
      centered
      width={680}
      mask={{ closable: false }}
      confirmLoading={loading}
      onOk={form.submit}
      onCancel={onClose}
      destroyOnHidden
      styles={{
        container: { display: "flex", flexDirection: "column", maxHeight: "calc(100dvh - 32px)" },
        body: { minHeight: 0, overflowY: "auto", overscrollBehavior: "contain", marginInline: -4, paddingInline: 4 },
      }}
      title={mode === "add" ? <Translate id="action.addPrompt">创建提示词</Translate> : <Translate id="modal.editPrompt.title">编辑提示词</Translate>}
      okText={mode === "add" ? <Translate id="action.addPrompt">创建提示词</Translate> : <Translate id="action.updatePrompt">保存</Translate>}
      cancelText={<Translate id="action.cancel">取消</Translate>}>
      <Form form={form} layout="vertical" requiredMark="optional" preserve={false} onFinish={onSubmit} scrollToFirstError={{ focus: true }} style={{ marginTop: 12 }}>
        <Form.Item
          name="title"
          label={<Translate id="label.promptTitle">提示词名称</Translate>}
          style={{ marginBottom: 16 }}
          rules={[
            {
              required: true,
              message: translate({
                id: "validation.promptTitle.required",
                message: "请输入提示词标题",
              }),
            },
          ]}>
          <Input
            placeholder={translate({
              id: "placeholder.promptTitle",
              message: "给你的提示词起个名字",
            })}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={<Translate id="label.promptContent">提示词内容</Translate>}
          style={{ marginBottom: 16 }}
          rules={[
            {
              required: true,
              message: translate({
                id: "validation.promptContent.required",
                message: "请输入提示词内容",
              }),
            },
          ]}>
          <PromptEditorFormItem />
        </Form.Item>

        <Form.Item name="remark" label={<Translate id="label.promptRemark">作用/用途</Translate>} style={{ marginBottom: 16 }}>
          <Input
            maxLength={100}
            placeholder={translate({
              id: "placeholder.promptRemark",
              message: "简要描述提示词的作用（可选）",
            })}
          />
        </Form.Item>

        <Form.Item name="notes" label={<Translate id="label.promptNotes">备注说明</Translate>} style={{ marginBottom: 16 }}>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={2000}
            placeholder={translate({
              id: "placeholder.promptNotes",
              message: "提示词来源、其他语言版本或补充说明（可选）",
            })}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 10,
              background: "var(--site-color-preview-bg)",
              border: "1px solid var(--site-color-hairline)",
              cursor: "pointer",
            }}>
            <Typography.Text style={{ fontSize: 13.5, color: "var(--ifm-color-content-secondary)", lineHeight: 1.5 }}>
              {shareLabel}
            </Typography.Text>
            <Form.Item name="share" valuePropName="checked" noStyle>
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} aria-label={shareLabel} style={{ flexShrink: 0 }} />
            </Form.Item>
          </label>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PromptFormModal;
