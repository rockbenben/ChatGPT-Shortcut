import React, { useEffect } from "react";
import { Form, Input, Modal, Switch, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";

interface EditPromptModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onFinish: (values: any) => Promise<void>;
  loading: boolean;
  initialValues: any;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({ open, setOpen, onFinish, loading, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleFormSubmit = React.useCallback(
    (values) => {
      onFinish(values).then(() => {
        form.resetFields();
      });
    },
    [onFinish, form]
  );

  return (
    <Modal
      title={<Translate id="modal.updateprompt.title">更新当前 Prompt</Translate>}
      open={open}
      onOk={form.submit}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      confirmLoading={loading}
      maskClosable={false}
      width={600}
      okText={<Translate id="button.updateprompt">更新 Prompt</Translate>}
      cancelText={<Translate id="button.cancel">取消</Translate>}>
      <Form form={form} onFinish={handleFormSubmit} layout="vertical" requiredMark="optional">
        <Form.Item
          name="title"
          label={<Translate id="input.addprompt.title">提示词名称</Translate>}
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
              id: "input.addprompt.title.placeholder",
              message: "给你的提示词起个名字",
            })}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={<Translate id="input.addprompt.description">提示词内容</Translate>}
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
              id: "input.addprompt.description.placeholder",
              message: "在此输入详细的提示词内容...",
            })}
            rows={6}
            maxLength={2000}
            showCount
          />
        </Form.Item>
        <Form.Item name="remark" label={<Translate id="input.addprompt.remark">作用/标签</Translate>}>
          <Input
            placeholder={translate({
              id: "input.addprompt.remark.placeholder",
              message: "简要描述提示词的作用（选填）",
            })}
          />
        </Form.Item>
        <Form.Item
          name="notes"
          label={<Translate id="input.addprompt.notes">备注说明</Translate>}
          extra={<Translate id="input.addprompt.notes.extra">您可以在此提供提示词的来源说明，以及该提示词的其他语言版本。此外，如果您有任何关于该提示词的拓展想法和需求，请在此进行说明。</Translate>}>
          <Input.TextArea
            placeholder={translate({
              id: "input.addprompt.notes.placeholder",
              message: "关于此提示词的额外说明（选填）",
            })}
            rows={3}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Item name="share" valuePropName="checked" noStyle>
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
              <Translate id="message.addprompt.submission">是否愿意将该提示词分享到公开页面？</Translate>
            </Typography.Text>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPromptModal;
