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
      width={600}
      maskClosable={false}
      confirmLoading={loading}
      onOk={form.submit}
      onCancel={onClose}
      destroyOnHidden
      title={mode === "add" ? <Translate id="action.addPrompt">添加 Prompt</Translate> : <Translate id="modal.editPrompt.title">更新当前 Prompt</Translate>}
      okText={mode === "add" ? <Translate id="action.addPrompt">添加 Prompt</Translate> : <Translate id="action.updatePrompt">更新 Prompt</Translate>}
      cancelText={<Translate id="action.cancel">取消</Translate>}>
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        onFinish={async (values) => {
          await onSubmit(values);
          form.resetFields();
        }}>
        <Form.Item
          name="title"
          label={<Translate id="label.promptTitle">提示词名称</Translate>}
          rules={[
            {
              required: true,
              message: translate({
                id: "validation.promptTitle.required",
                message: "请输入提示词标题！",
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
          rules={[
            {
              required: true,
              message: translate({
                id: "validation.promptContent.required",
                message: "请输入提示词内容！",
              }),
            },
          ]}>
          <PromptEditorFormItem />
        </Form.Item>

        <Form.Item name="remark" label={<Translate id="label.promptRemark">作用/用途</Translate>}>
          <Input
            placeholder={translate({
              id: "placeholder.promptRemark",
              message: "简要描述提示词的作用（选填）",
            })}
          />
        </Form.Item>

        <Form.Item
          name="notes"
          label={<Translate id="label.promptNotes">备注说明</Translate>}
          extra={<Translate id="label.promptNotes.description">您可以在此提供提示词来源、其他语言版本或拓展说明。</Translate>}>
          <Input.TextArea
            rows={3}
            placeholder={translate({
              id: "placeholder.promptNotes",
              message: "关于此提示词的额外说明（选填）",
            })}
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Item name="share" valuePropName="checked" noStyle>
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
              <Translate id="label.sharePrompt">是否愿意将该提示词分享到公开页面？</Translate>
            </Typography.Text>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PromptFormModal;
