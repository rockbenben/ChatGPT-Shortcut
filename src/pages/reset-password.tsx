import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Form, Input, Button, Typography, Card, App } from "antd";
import Translate, { translate } from "@docusaurus/Translate";
import { resetPassword } from "@site/src/api";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { message: messageApi } = App.useApp();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      setResetCode(code);
      form.setFieldsValue({ code });
    }
  }, [form]);

  const onFinishResetPassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      messageApi.open({
        type: "error",
        content: translate({
          id: "input.password.match",
          message: "两次输入的密码不一致！",
        }),
        duration: 5,
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(values);
      messageApi.success(<Translate id="message.resetPassword.success">密码重置成功！</Translate>);
      form.resetFields();

      // Delay redirect to show success message
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error(translate({ id: "error.resetPassword", message: "Error resetting password:" }), error);
      messageApi.open({
        type: "error",
        content: <Translate id="message.resetPassword.error">密码重置失败，请稍后重试</Translate>,
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  // Password validation rules
  const passwordRules = [
    {
      required: true,
      message: translate({ id: "input.newPassword", message: "请输入新密码！" }),
    },
    {
      min: 6,
      message: translate({
        id: "input.password.valid",
        message: "密码长度至少为 6 个字符",
      }),
    },
  ];

  return (
    <Layout title={translate({ id: "button.resetPassword", message: "重置密码" })}>
      <div
        style={{
          maxWidth: 450,
          width: "100%",
          margin: "50px auto",
          padding: "0 16px",
        }}>
        <Card className="reset-password-card">
          <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
            <Translate id="button.resetPassword">重置密码</Translate>
          </Title>
          <Form form={form} layout="vertical" onFinish={onFinishResetPassword} requiredMark={false} initialValues={{ code: resetCode }}>
            <Form.Item
              name="code"
              label={<Translate id="placeholder.resetPassword.code">重置代码</Translate>}
              rules={[
                {
                  required: true,
                  message: translate({
                    id: "input.resetPassword.code",
                    message: "请输入您的重置代码！",
                  }),
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item name="newPassword" label={<Translate id="placeholder.newPassword">新密码</Translate>} rules={passwordRules} hasFeedback>
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<Translate id="placeholder.confirmPassword">确认新密码</Translate>}
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: translate({
                    id: "input.confirmPassword",
                    message: "请确认新密码！",
                  }),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        translate({
                          id: "input.password.match",
                          message: "两次输入的密码不一致！",
                        })
                      )
                    );
                  },
                }),
              ]}>
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} style={{ marginTop: 16 }}>
                <Translate id="button.resetPassword">重置密码</Translate>
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default ResetPassword;
