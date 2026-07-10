import React, { useState } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Card, Form, Input, Button, Space, Typography, App } from "antd";
import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { changePassword, forgotPassword } from "@site/src/api";

const { Text } = Typography;

/** 安全设置卡片：改密表单 + 忘记密码（重置邮件）modal，API 调用自包含 */
const SecurityCard: React.FC<{ userInfo: any }> = ({ userInfo }) => {
  const { message, modal } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [changePasswordForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();

  const onFinishChangePassword = async (values) => {
    setLoading(true);
    try {
      await changePassword(values);
      message.success(<Translate id="message.success.passwordChanged">密码修改成功！</Translate>);
      changePasswordForm.resetFields();
    } catch (error) {
      console.error("Error changing password:", error);
      message.error(<Translate id="message.error.passwordChangeFailed">密码修改失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  const onFinishForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      message.success(<Translate id="message.success.forgotPassword">密码重置邮件已发送！</Translate>);
      forgotPasswordForm.resetFields();
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      message.error(<Translate id="message.error.forgotPassword">发送密码重置邮件失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  const openForgotPasswordModal = () => {
    modal.confirm({
      title: (
        <Space>
          <MailOutlined style={{ color: "var(--ifm-color-primary)" }} />
          <Translate id="modal.forgotPassword.title">忘记密码</Translate>
        </Space>
      ),
      icon: null,
      content: (
        <div style={{ marginTop: 16 }}>
          <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            <Translate id="message.forgotPassword.info">我们会向您的注册邮箱发送一封包含重置链接的邮件。</Translate>
          </Text>
          <Form form={forgotPasswordForm} layout="vertical">
            <Form.Item
              name="email"
              label={<Translate id="placeholder.email">邮箱</Translate>}
              rules={[
                { required: true, message: translate({ id: "validation.email.required", message: "请输入您的邮箱！" }) },
                { type: "email", message: translate({ id: "validation.email.invalid", message: "请输入有效的邮箱地址！" }) },
              ]}
              initialValue={userInfo?.email || ""}>
              <Input prefix={<MailOutlined style={{ color: "var(--site-color-text-tertiary)" }} />} placeholder={translate({ id: "placeholder.email", message: "邮箱" })} size="large" />
            </Form.Item>
          </Form>
        </div>
      ),
      onOk: async () => {
        try {
          await forgotPasswordForm.validateFields();
          const values = forgotPasswordForm.getFieldsValue();
          await onFinishForgotPassword(values);
        } catch (error) {
          return Promise.reject(error);
        }
      },
      okText: <Translate id="action.sendResetEmail">发送重置邮件</Translate>,
      cancelText: <Translate id="action.cancel">取消</Translate>,
      centered: true,
      width: 480,
    });
  };

  return (
    <Card
      style={{
        height: "100%",
        borderRadius: 12,
      }}
      title={
        <Space>
          <SafetyCertificateOutlined />
          <Translate id="title.security">安全设置</Translate>
        </Space>
      }
      extra={
        <Button type="link" style={{ color: "var(--site-color-tag-selected-text)" }} onClick={openForgotPasswordModal}>
          <Translate id="action.forgotPassword">忘记密码</Translate>
        </Button>
      }>
      <Form form={changePasswordForm} onFinish={onFinishChangePassword} layout="vertical" requiredMark={false}>
        {userInfo?.provider === "local" && (
          <Form.Item
            name="currentPassword"
            label={<Translate id="placeholder.currentPassword">当前密码</Translate>}
            rules={[{ required: true, message: translate({ id: "validation.currentPassword.required", message: "请输入当前密码！" }) }]}>
            <Input.Password
              prefix={<LockOutlined style={{ color: "var(--site-color-text-tertiary)" }} />}
              placeholder={translate({ id: "placeholder.currentPassword", message: "当前密码" })}
              size="large"
            />
          </Form.Item>
        )}
        <Form.Item
          name="newPassword"
          label={<Translate id="placeholder.newPassword">新密码</Translate>}
          rules={[
            { required: true, message: translate({ id: "input.newPassword", message: "请输入新密码！" }) },
            { min: 6, message: translate({ id: "validation.password.length", message: "密码长度至少为 6 个字符" }) },
          ]}>
          <Input.Password
            prefix={<LockOutlined style={{ color: "var(--site-color-text-tertiary)" }} />}
            placeholder={translate({ id: "placeholder.newPassword", message: "新密码" })}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<Translate id="placeholder.confirmPassword">确认新密码</Translate>}
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: translate({ id: "validation.confirmPassword.required", message: "请确认新密码！" }) },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(translate({ id: "validation.password.match", message: "两次输入的密码不一致！" })));
              },
            }),
          ]}>
          <Input.Password
            prefix={<LockOutlined style={{ color: "var(--site-color-text-tertiary)" }} />}
            placeholder={translate({ id: "placeholder.confirmPassword", message: "确认新密码" })}
            size="large"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            <Translate id="action.changePassword">修改密码</Translate>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SecurityCard;
