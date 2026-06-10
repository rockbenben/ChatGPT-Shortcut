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
      width={720}
      mask={{ closable: false }}
      confirmLoading={loading}
      onOk={form.submit}
      onCancel={onClose}
      destroyOnHidden
      title={mode === "add" ? <Translate id="action.addPrompt">创建提示词</Translate> : <Translate id="modal.editPrompt.title">编辑提示词</Translate>}
      okText={mode === "add" ? <Translate id="action.addPrompt">创建提示词</Translate> : <Translate id="action.updatePrompt">保存</Translate>}
      cancelText={<Translate id="action.cancel">取消</Translate>}>
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        // 不在此 resetFields：onSubmit 内部失败时是 catch 后返回 false（不抛），此处会无条件清空表单，
        // 而调用方失败时不关弹窗 → 用户输入被清空丢失。表单初始化交给「打开时的 useEffect」+ destroyOnHidden，
        // 成功时调用方关弹窗、下次打开自然重置；失败时保留输入供用户修正重提。
        onFinish={onSubmit}>
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
            maxLength={100}
            placeholder={translate({
              id: "placeholder.promptRemark",
              message: "简要描述提示词的作用（选填）",
            })}
          />
        </Form.Item>

        <Form.Item name="notes" label={<Translate id="label.promptNotes">备注说明</Translate>}>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 8 }}
            maxLength={2000}
            placeholder={translate({
              id: "placeholder.promptNotes",
              message: "提示词来源、其他语言版本或补充说明（选填）",
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
