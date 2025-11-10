// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Form, Input, message, Tabs, Checkbox, Space, Typography, Alert } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { login, register, forgotPassword, sendPasswordlessLink } from "@site/src/api";
import { getGoogleAuthUrl, authenticateUserWithGoogle } from "@site/src/googleAuthApi";

const { Title } = Typography;

// Validation rules
const rules = {
  username: [
    {
      required: true,
      message: translate({
        id: "input.rules.username",
        message: "请输入用户名或注册邮箱！",
      }),
    },
  ],
  password: [
    {
      required: true,
      message: translate({ id: "input.rules.password", message: "请输入密码！" }),
    },
    {
      min: 6,
      message: translate({
        id: "input.password.valid",
        message: "密码长度至少为 6 个字符",
      }),
    },
  ],
  email: [
    {
      required: true,
      message: translate({
        id: "input.rules.email",
        message: "请输入邮箱！",
      }),
    },
    {
      type: "email",
      message: translate({
        id: "input.email.valid",
        message: "请输入有效的邮箱地址！",
      }),
    },
  ],
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [messageApi, contextHolder] = message.useMessage();
  const [formKey, setFormKey] = useState(Date.now()); // For resetting forms

  // Form hooks
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();
  const [passwordlessForm] = Form.useForm();

  const handleRegister = useCallback(() => {
    setActiveTab("3");
  }, []);

  const handleForgotPasswordClick = useCallback(() => {
    setActiveTab("4");
  }, []);

  // Clear form data when switching tabs
  const handleTabChange = (activeKey) => {
    setActiveTab(activeKey);
    setFormKey(Date.now());
    resetAllForms();
  };

  const resetAllForms = () => {
    loginForm.resetFields();
    registerForm.resetFields();
    forgotPasswordForm.resetFields();
    passwordlessForm.resetFields();
  };

  const handleSuccess = useCallback((username, jwt) => {
    if (ExecutionEnvironment.canUseDOM) {
      localStorage.setItem("auth_token", jwt);

      // Send message to extension
      window.postMessage({ action: "login", username, jwt }, "*");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, []);

  // Handle Google Authentication
  useEffect(() => {
    const messageHandler = async (event: MessageEvent) => {
      if (event?.source === window) {
        return;
      }

      const data = event?.data;
      if (!data) {
        return;
      }

      const isGooglePayload = data.provider === "google" || data.jwt || data.access_token || data.id_token || data.code;
      if (!isGooglePayload) {
        return;
      }

      setLoading(true);

      try {
        const authRespond = await authenticateUserWithGoogle(data);
        if (!authRespond?.token || !authRespond?.user?.username) {
          throw new Error("Invalid Google authentication response.");
        }
        handleSuccess(authRespond.user.username, authRespond.token);
      } catch (error) {
        console.error("Google login handler failed:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        messageApi.error("Login failed: " + errorMessage);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("message", messageHandler, false);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [messageApi, handleSuccess]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const url = await getGoogleAuthUrl();
      if (url) {
        const newWindow = window.open(url, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
          alert('Please disable your pop-up blocker and click the "Open" link again.');
        }
      } else {
        alert("Failed to generate Google Auth URL.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      messageApi.open({
        type: "error",
        content: "Error while attempting Google login: " + errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (err) => {
    try {
      if (err.message === "Request timed out. Please try again.") {
        messageApi.error(err.message);
      } else if (err.response?.status === 400) {
        messageApi.error(err.response.data.error.message);
      } else if (err.response?.status === 429) {
        messageApi.error("Requests are too frequent. Please try again later.");
      } else {
        messageApi.error(<Translate id="message.error">发生错误，请稍后再试</Translate>);
      }
    } catch (err) {
      messageApi.error(<Translate id="message.error">处理错误时发生错误</Translate>);
    }
  };

  const handleAuth = useCallback(
    async (values, authFunction, successMessage) => {
      setLoading(true);
      try {
        const response = await authFunction(values);
        handleSuccess(response.data.user.username, response.data.jwt);
        messageApi.success(successMessage);
      } catch (err) {
        handleErrors(err);
      } finally {
        setLoading(false);
      }
    },
    [messageApi]
  );

  const onFinishLogin = async (values) => {
    handleAuth(values, login, <Translate id="message.loginSuccess">登录成功！</Translate>);
  };

  const onFinishRegister = async (values) => {
    handleAuth(values, register, <Translate id="message.registerSuccess">注册成功！</Translate>);
  };

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      messageApi.success(<Translate id="message.forgotPassword.success">密码重置邮件已发送！</Translate>);
      forgotPasswordForm.resetFields();
    } catch (error) {
      console.error(
        translate({
          id: "error.forgotPassword",
          message: "Error sending forgot password email:",
        }),
        error
      );
      messageApi.error(<Translate id="message.forgotPassword.error">发送密码重置邮件失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  // Passwordless login implementation
  const handleSendPasswordlessLink = async (values) => {
    setLoading(true);
    const target = values.email;

    // Check if input is in email format
    const isValidEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    };

    try {
      // Dynamically determine parameters to pass to backend
      const payload = isValidEmail(target) ? { email: target } : { username: target };
      await sendPasswordlessLink(payload);
      messageApi.success(<Translate id="message.passwordlessLinkSent">免密码登录链接已发送到您的邮箱！</Translate>);
      passwordlessForm.resetFields();
    } catch (error) {
      console.error("Error sending passwordless login link:", error);
      messageApi.error(<Translate id="message.errorSendingPasswordlessLink">发送失败，请检查邮箱或用户名</Translate>);
    } finally {
      setLoading(false);
    }
  };

  // Form components
  const renderPasswordlessLoginForm = () => (
    <Form form={passwordlessForm} onFinish={handleSendPasswordlessLink} layout="vertical">
      <Alert message={<Translate id="message.passwordlessLogin.info">登录链接将发送至您的邮箱，点击即可登录，无需输入密码</Translate>} type="info" showIcon style={{ marginBottom: 16 }} />
      <Form.Item name="email" rules={rules.username} label={<Translate id="input.username">用户名/邮箱</Translate>}>
        <Input autoComplete="username" prefix={<MailOutlined />} placeholder={translate({ id: "input.username", message: "用户名/邮箱" })} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          <Translate id="button.sendPasswordlessLink">获取免密码登录链接</Translate>
        </Button>
      </Form.Item>
    </Form>
  );

  const renderLoginForm = () => (
    <Form form={loginForm} onFinish={onFinishLogin} layout="vertical">
      <Form.Item name="username" rules={rules.username} label={<Translate id="input.username">用户名/邮箱</Translate>}>
        <Input autoComplete="username" prefix={<UserOutlined />} placeholder={translate({ id: "input.username", message: "用户名/邮箱" })} />
      </Form.Item>
      <Form.Item name="password" rules={rules.password} label={<Translate id="input.password">密码</Translate>}>
        <Input.Password autoComplete="current-password" prefix={<LockOutlined />} placeholder={translate({ id: "input.password", message: "密码" })} />
      </Form.Item>
      <Form.Item>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" loading={loading} block>
            <Translate id="button.login">登录</Translate>
          </Button>

          <Space style={{ width: "100%", justifyContent: "center" }}>
            <Button onClick={handleGoogleLogin} icon={<GoogleOutlined />}>
              Login via Google
            </Button>
          </Space>

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Button type="link" onClick={handleRegister} style={{ padding: 0 }}>
              <Translate id="button.register">注册</Translate>
            </Button>
            <Button type="link" onClick={handleForgotPasswordClick} style={{ padding: 0 }}>
              <Translate id="button.forgotPassword">忘记密码</Translate>
            </Button>
          </Space>
        </Space>
      </Form.Item>
    </Form>
  );

  const renderRegisterForm = () => (
    <Form form={registerForm} onFinish={onFinishRegister} layout="vertical">
      <Form.Item name="username" rules={rules.username} label={<Translate id="input.register.username">用户名</Translate>}>
        <Input
          autoComplete="username"
          prefix={<UserOutlined />}
          placeholder={translate({
            id: "input.register.username",
            message: "用户名",
          })}
        />
      </Form.Item>
      <Form.Item name="email" rules={rules.email} label={<Translate id="input.email">邮箱</Translate>}>
        <Input autoComplete="email" prefix={<MailOutlined />} placeholder={translate({ id: "input.email", message: "邮箱" })} />
      </Form.Item>
      <Form.Item name="password" rules={rules.password} label={<Translate id="input.password">密码</Translate>} hasFeedback>
        <Input.Password autoComplete="new-password" prefix={<LockOutlined />} placeholder={translate({ id: "input.password", message: "密码" })} />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      translate({
                        id: "agreement.rules",
                        message: "使用前须同意服务条款和隐私政策",
                      })
                    )
                  ),
          },
        ]}>
        <Checkbox>
          <Translate id="agreement.text">点此同意</Translate>{" "}
          <a href="/docs/terms-of-service">
            <Translate id="agreement.terms">服务条款</Translate>
          </a>{" "}
          <Translate id="agreement.and">和</Translate>{" "}
          <a href="/docs/privacy-policy">
            <Translate id="agreement.policy">隐私政策</Translate>
          </a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          <Translate id="button.register">注册</Translate>
        </Button>
      </Form.Item>
    </Form>
  );

  const renderForgotPasswordForm = () => (
    <Form form={forgotPasswordForm} onFinish={handleForgotPassword} layout="vertical">
      <Alert message={<Translate id="message.forgotPassword.info">重置密码链接将发送至您的邮箱</Translate>} type="info" showIcon style={{ marginBottom: 16 }} />
      <Form.Item name="email" label={<Translate id="input.email">邮箱</Translate>} rules={rules.email}>
        <Input autoComplete="email" prefix={<MailOutlined />} placeholder={translate({ id: "placeholder.email", message: "邮箱" })} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          <Translate id="button.sendResetEmail">发送密码重置邮件</Translate>
        </Button>
      </Form.Item>
    </Form>
  );

  // Tab items configuration
  const items = [
    {
      key: "1",
      label: <Translate id="tabs.login">登录</Translate>,
      children: renderLoginForm(),
    },
    {
      key: "2",
      label: <Translate id="tabs.passwordlessLogin">免密码登录</Translate>,
      children: renderPasswordlessLoginForm(),
    },
    {
      key: "3",
      label: <Translate id="button.register">注册</Translate>,
      children: renderRegisterForm(),
    },
    {
      key: "4",
      label: <Translate id="label.forgotPassword">忘记密码</Translate>,
      children: renderForgotPasswordForm(),
    },
  ];

  return (
    <>
      {contextHolder}
      <Card
        title={
          <Title level={4}>
            <Translate id="card.welcome">欢迎</Translate>
          </Title>
        }
        style={{ maxWidth: 480, margin: "0 auto" }}>
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleTabChange} items={items} destroyOnHidden key={formKey} />
      </Card>
    </>
  );
};

export default LoginPage;
