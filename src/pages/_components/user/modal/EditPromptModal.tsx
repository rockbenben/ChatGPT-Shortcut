import React, { useEffect } from "react";
import { Form, Input, Button, Modal, Typography, Switch } from "antd";
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
      footer={null}
      maskClosable={false}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}>
      <Form form={form} onFinish={handleFormSubmit}>
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
  );
};

export default EditPromptModal;
