import React, { useEffect } from "react";
import { Form, Input, Button, Modal, Typography, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";

interface AddPromptModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onFinish: (values: any) => Promise<void>;
  loading: boolean;
}

const AddPromptModal: React.FC<AddPromptModalProps> = ({ open, setOpen, onFinish, loading }) => {
  const [form] = Form.useForm();

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

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
      title={<Translate id="modal.addprompt.title">添加 Prompt（本内容将出现在「我的提示词」标签中）</Translate>}
      open={open}
      footer={null}
      maskClosable={false}
      closable={!loading}
      destroyOnHidden
      onCancel={() => !loading && setOpen(false)}>
      <Form form={form} onFinish={handleFormSubmit} initialValues={{ share: true }}>
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
            rows={6}
            maxLength={2000}
            showCount
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
            rows={4}
          />
        </Form.Item>
        <Form.Item name="share" valuePropName="checked">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              defaultChecked
              onChange={(checked) => {
                form.setFieldsValue({ share: checked });
              }}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
            <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
              <Translate id="message.addprompt.submission">您是否愿意将该提示词分享到公开页面？</Translate>
            </Typography.Text>
          </div>
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={loading} block>
          <Translate id="button.addPrompt">添加 Prompt</Translate>
        </Button>
      </Form>
    </Modal>
  );
};

export default AddPromptModal;
