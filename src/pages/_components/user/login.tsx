import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Form, Input, Checkbox, Typography, App, Flex, Divider, theme, Segmented } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined, UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { login, register, forgotPassword, sendPasswordlessLink } from "@site/src/api";
import { getGoogleAuthUrl, authenticateUserWithGoogle } from "@site/src/googleAuthApi";

const { Title, Text } = Typography;

// Validation rules
const rules = {
  username: [
    {
      required: true,
      message: translate({
        id: "validation.username.required",
        message: "请输入用户名或注册邮箱！",
      }),
    },
  ],
  password: [
    {
      required: true,
      message: translate({ id: "validation.password.required", message: "请输入密码！" }),
    },
    {
      min: 6,
      message: translate({
        id: "validation.password.length",
        message: "密码长度至少为 6 个字符",
      }),
    },
  ],
  email: [
    {
      required: true,
      message: translate({
        id: "validation.email.required",
        message: "请输入邮箱！",
      }),
    },
    {
      type: "email" as const,
      message: translate({
        id: "validation.email.invalid",
        message: "请输入有效的邮箱地址！",
      }),
    },
  ],
  confirm: [
    {
      required: true,
      message: translate({
        id: "validation.confirmPassword.required",
        message: "请确认新密码！",
      }),
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error(
            translate({
              id: "validation.password.match",
              message: "两次输入的密码不一致！",
            })
          )
        );
      },
    }),
  ],
};

const LoginPage = () => {
  const [viewState, setViewState] = useState<"login" | "register" | "forgot-password">("login");
  const [loginType, setLoginType] = useState<"password" | "code">("password");
  const { message: messageApi } = App.useApp();
  const [formKey, setFormKey] = useState(Date.now()); // For resetting forms
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);

  // Form hooks
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();
  const [passwordlessForm] = Form.useForm();

  const handleRegister = useCallback(() => {
    setViewState("register");
  }, []);

  const handleForgotPasswordClick = useCallback(() => {
    setViewState("forgot-password");
  }, []);

  const handleBackToLogin = useCallback(() => {
    setViewState("login");
  }, []);

  // Clear form data when switching views
  useEffect(() => {
    setFormKey(Date.now());
    resetAllForms();
  }, [viewState, loginType]);

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
    let popup: Window | null = null;

    try {
      popup = window.open("", "gauth-login", "popup,location=yes,height=570,width=520,scrollbars=yes,status=yes,resizable=yes");

      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        throw new Error("Pop-up window blocked. Please allow pop-ups and try again.");
      }

      popup.document.write(
        `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><title>Google Login</title><style>html,body{margin:0;padding:0;height:100%;}body{display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;color:#444;background:#f7f7f7;} .wrapper{box-sizing:border-box;text-align:center;padding:24px 16px;width:100%;max-width:320px;margin:0 auto;} .spinner{margin:0 auto 16px;border:4px solid #e0e0e0;border-top:4px solid #4285f4;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;} @keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style></head><body><div class="wrapper"><div class="spinner"></div><p>Redirecting to Google sign-in...</p></div></body></html>`
      );
      popup.document.close();

      const url = await getGoogleAuthUrl();
      if (!url) {
        throw new Error("Failed to generate Google authentication URL.");
      }

      popup.location.href = url;
      popup.focus();
    } catch (error) {
      if (popup && !popup.closed) {
        popup.close();
      }

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
    [messageApi, handleSuccess]
  );

  const onFinishLogin = async (values) => {
    handleAuth(values, login, <Translate id="message.success.login">登录成功！</Translate>);
  };

  const onFinishRegister = async (values) => {
    handleAuth(values, register, <Translate id="message.success.register">注册成功！</Translate>);
  };

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      messageApi.success(<Translate id="message.success.forgotPassword">密码重置邮件已发送！</Translate>);
      forgotPasswordForm.resetFields();
    } catch (error) {
      console.error(
        translate({
          id: "error.forgotPassword",
          message: "Error sending forgot password email:",
        }),
        error
      );
      messageApi.error(<Translate id="message.error.forgotPassword">发送密码重置邮件失败，请稍后重试</Translate>);
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
      messageApi.success(<Translate id="message.success.passwordlessLink">免密码登录链接已发送到您的邮箱！</Translate>);
      passwordlessForm.resetFields();
    } catch (error) {
      console.error("Error sending passwordless login link:", error);
      messageApi.error(<Translate id="message.error.passwordlessLink">发送失败，请检查邮箱或用户名</Translate>);
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Segmented
        block
        size="large"
        options={[
          { label: <Translate id="login.method.password">密码登录</Translate>, value: "password" },
          { label: <Translate id="login.method.code">免密登录</Translate>, value: "code" },
        ]}
        value={loginType}
        onChange={(value) => setLoginType(value as "password" | "code")}
      />

      {loginType === "password" ? (
        <Form form={loginForm} onFinish={onFinishLogin} layout="vertical" size="large">
          <Form.Item name="username" rules={rules.username} style={{ marginBottom: 16 }}>
            <Input
              autoComplete="username"
              prefix={<UserOutlined style={{ color: token.colorTextDescription }} />}
              placeholder={translate({ id: "placeholder.usernameOrEmail", message: "用户名/邮箱" })}
              size="large"
            />
          </Form.Item>
          <Form.Item name="password" rules={rules.password} style={{ marginBottom: 8 }}>
            <Input.Password
              autoComplete="current-password"
              prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
              placeholder={translate({ id: "placeholder.password", message: "密码" })}
              size="large"
            />
          </Form.Item>

          <Flex justify="flex-end" style={{ marginBottom: 24 }}>
            <Button type="link" onClick={handleForgotPasswordClick} style={{ padding: 0, height: "auto", color: token.colorTextSecondary }}>
              <Translate id="action.forgotPassword">忘记密码</Translate>
            </Button>
          </Flex>

          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            <Translate id="action.login">登录</Translate>
          </Button>
        </Form>
      ) : (
        <Form form={passwordlessForm} onFinish={handleSendPasswordlessLink} layout="vertical" size="large">
          <div
            style={{
              marginBottom: 24,
              padding: "12px 16px",
              background: token.colorFillAlter,
              borderRadius: token.borderRadiusLG,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}>
            <InfoCircleOutlined style={{ color: token.colorPrimary, marginTop: 4 }} />
            <Text type="secondary" style={{ fontSize: token.fontSize }}>
              <Translate id="login.passwordless.info">登录链接将发送至您的邮箱，点击即可登录</Translate>
            </Text>
          </div>
          <Form.Item name="email" rules={rules.username} style={{ marginBottom: 24 }}>
            <Input
              autoComplete="username"
              prefix={<MailOutlined style={{ color: token.colorTextDescription }} />}
              placeholder={translate({ id: "placeholder.usernameOrEmail", message: "用户名/邮箱" })}
              size="large"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            <Translate id="action.sendLink">获取登录链接</Translate>
          </Button>
        </Form>
      )}

      <div>
        <Divider plain style={{ margin: "24px 0", color: token.colorTextDescription, fontSize: token.fontSizeSM }}>
          <Translate id="common.or">Or</Translate>
        </Divider>

        <Button block size="large" onClick={handleGoogleLogin} icon={<GoogleOutlined />} style={{ marginBottom: 24 }}>
          <Translate id="action.loginGoogle">Login via Google</Translate>
        </Button>

        <Flex justify="center" align="center" gap="small">
          <Text type="secondary">
            <Translate id="login.register.prompt">还没有账号？</Translate>
          </Text>
          <Button type="link" onClick={handleRegister} style={{ padding: 0, fontWeight: 500 }}>
            <Translate id="action.register">立即注册</Translate>
          </Button>
        </Flex>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <Form form={registerForm} onFinish={onFinishRegister} layout="vertical" size="large">
      <Form.Item name="username" rules={rules.username} style={{ marginBottom: 16 }}>
        <Input
          autoComplete="username"
          prefix={<UserOutlined style={{ color: token.colorTextDescription }} />}
          placeholder={translate({ id: "placeholder.username", message: "用户名" })}
          size="large"
        />
      </Form.Item>
      <Form.Item name="email" rules={rules.email} style={{ marginBottom: 16 }}>
        <Input autoComplete="email" prefix={<MailOutlined style={{ color: token.colorTextDescription }} />} placeholder={translate({ id: "placeholder.email", message: "邮箱" })} size="large" />
      </Form.Item>
      <Form.Item name="password" rules={rules.password} hasFeedback style={{ marginBottom: 16 }}>
        <Input.Password
          autoComplete="new-password"
          prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
          placeholder={translate({ id: "placeholder.password", message: "密码" })}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error(translate({ id: "validation.agreement.required", message: "使用前须同意服务条款和隐私政策" })))),
          },
        ]}
        style={{ marginBottom: 24 }}>
        <Checkbox>
          <Translate id="label.agree">同意</Translate>{" "}
          <a href="/docs/terms-of-service" target="_blank" rel="noopener noreferrer">
            <Translate id="link.terms">服务条款</Translate>
          </a>{" "}
          <Translate id="common.and">和</Translate>{" "}
          <a href="/docs/privacy-policy" target="_blank" rel="noopener noreferrer">
            <Translate id="link.privacy">隐私政策</Translate>
          </a>
        </Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ marginBottom: 16 }}>
        <Translate id="action.register">注册</Translate>
      </Button>
      <Flex justify="center" align="center" gap="small">
        <Text type="secondary">
          <Translate id="login.login.prompt">已有账号？</Translate>
        </Text>
        <Button type="link" onClick={handleBackToLogin} style={{ padding: 0, fontWeight: 500 }}>
          <Translate id="action.login">直接登录</Translate>
        </Button>
      </Flex>
    </Form>
  );

  const renderForgotPasswordForm = () => (
    <Form form={forgotPasswordForm} onFinish={handleForgotPassword} layout="vertical" size="large">
      <Form.Item name="email" rules={rules.username} style={{ marginBottom: 24 }}>
        <Input autoComplete="email" prefix={<MailOutlined style={{ color: token.colorTextDescription }} />} placeholder={translate({ id: "placeholder.email", message: "邮箱" })} size="large" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ marginBottom: 16 }}>
        <Translate id="action.sendResetEmail">发送重置邮件</Translate>
      </Button>

      <Flex justify="center">
        <Button type="link" onClick={handleBackToLogin} style={{ padding: 0 }}>
          <Translate id="action.backToLogin">返回登录</Translate>
        </Button>
      </Flex>
    </Form>
  );

  return (
    <Card
      title={
        <>
          <Title level={3} style={{ textAlign: "center", marginTop: 12, marginBottom: 12 }}>
            {viewState === "login" && <Translate id="login.title.welcome">欢迎回来</Translate>}
            {viewState === "register" && <Translate id="login.title.register">加入社区</Translate>}
            {viewState === "forgot-password" && <Translate id="login.title.forgotPassword">找回密码</Translate>}
          </Title>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Text type="secondary">
              {viewState === "login" && <Translate id="login.subtitle.welcome">登录探索更多优质提示词</Translate>}
              {viewState === "register" && <Translate id="login.subtitle.register">发现、分享和创造精彩提示词</Translate>}
              {viewState === "forgot-password" && <Translate id="login.subtitle.forgotPassword">重置链接将发送至您的邮箱</Translate>}
            </Text>
          </div>
        </>
      }
      style={{ maxWidth: 440, margin: "0 auto", boxShadow: token.boxShadowTertiary, borderRadius: token.borderRadiusLG }}
      styles={{ body: { padding: "0 40px 40px" } }}>
      <div key={formKey} style={{ marginTop: token.marginLG }}>
        {viewState === "login" && renderLoginForm()}
        {viewState === "register" && renderRegisterForm()}
        {viewState === "forgot-password" && renderForgotPasswordForm()}
      </div>
    </Card>
  );
};

export default LoginPage;
