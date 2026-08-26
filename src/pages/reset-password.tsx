import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { Form, Input, Button, Typography, Card, App } from "antd";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { resetPassword } from "@site/src/api";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { message: messageApi } = App.useApp();
  const { i18n } = useDocusaurusContext();

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
          id: "validation.password.match",
          message: "两次输入的密码不一致",
        }),
        duration: 5,
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(values);
      messageApi.success(<Translate id="message.resetPassword.success">密码已重置</Translate>);
      form.resetFields();

      // Delay redirect to show success message —— 保留当前 locale 前缀
      setTimeout(() => {
        const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
        window.location.href = `${localePrefix}/`;
      }, 1500);
    } catch (error) {
      console.error(translate({ id: "message.resetPassword.error", message: "密码重置失败，请稍后重试" }), error);
      messageApi.open({
        type: "error",
        content: <Translate id="message.resetPassword.error">密码重置失败，请稍后重试</Translate>,
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  // Password validation rules
  const passwordRules = [
    {
      required: true,
      message: translate({ id: "input.newPassword", message: "请输入新密码" }),
    },
    {
      min: 6,
      message: translate({
        id: "validation.password.length",
        message: "密码长度至少为 6 个字符",
      }),
    },
  ];

  return (
    <Layout title={translate({ id: "button.resetPassword", message: "重置密码" })}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 60px)",
          padding: "50px 16px",
        }}>
        <Card
          className="reset-password-card"
          style={{
            maxWidth: 440,
            width: "100%",
            borderRadius: 12,
          }}
          styles={{ body: { padding: 32 } }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 24, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
            <Translate id="button.resetPassword">重置密码</Translate>
          </Title>
          <Form form={form} layout="vertical" onFinish={onFinishResetPassword} requiredMark={false} initialValues={{ code: resetCode }} size="large">
            <Form.Item
              name="code"
              label={<Translate id="placeholder.resetPassword.code">重置代码</Translate>}
              rules={[
                {
                  required: true,
                  message: translate({
                    id: "input.resetPassword.code",
                    message: "请输入重置代码",
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
                    id: "validation.confirmPassword.required",
                    message: "请确认新密码",
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
                          id: "validation.password.match",
                          message: "两次输入的密码不一致",
                        })
                      )
                    );
                  },
                }),
              ]}>
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block loading={loading} size="large">
                <Translate id="button.resetPassword">重置密码</Translate>
              </Button>
            </Form.Item>
          </Form>
          {/* 出口。重置代码由邮件链接的 ?code= 自动填入，但有人会直接打开/收藏这个地址，
              或者拿到的链接已过期 —— 没有这条链接时整页是死胡同（同类的 /user/auth 三个
              状态都给了出口）。复用 auth.callback.backHome，17 个 locale 已译，不新增 id。 */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to="/" style={{ fontSize: 13 }}>
              <Translate id="auth.callback.backHome">返回首页登录</Translate>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ResetPassword;
