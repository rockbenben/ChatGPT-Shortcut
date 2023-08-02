import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, message, Tabs, Checkbox, Space } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import Cookies from "js-cookie";
import { login, register, forgotPassword } from "@site/src/api";
import { getGoogleAuthUrl, authenticateUserWithGoogle } from "@site/src/googleAuthApi";

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
      message: translate({
        id: "input.rules.password",
        message: "请输入密码！",
      }),
    },
  ],
  email: [
    {
      required: true,
      message: translate({ id: "input.rules.email", message: "请输入邮箱！" }),
    },
  ],
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  // Google Auth
  useEffect(() => {
    window.addEventListener(
      "message",
      async (event) => {
        if (event.data.code) {
          setLoading(true);
          try {
            const auth_respond = await authenticateUserWithGoogle(event.data.code);
            handleSuccess(auth_respond.user.username, auth_respond.token);
          } catch (error) {
            message.error("Login failed: " + error.message);
          } finally {
            setLoading(false);
          }
        }
      },
      false
    );
  }, []);

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
      message.error("Error while attempting Google login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (username, jwt) => {
    Cookies.set("auth_token", jwt, { expires: 365 });
    Cookies.set("username", username, { expires: 365 });
    // 发送消息给扩展
    window.postMessage({ action: "login", username, jwt }, "*");
    window.location.reload();
  };

  const handleErrors = (err) => {
    try {
      if (err.message === "Request timed out. Please try again.") {
        message.error(err.message);
      } else if (err.response.status === 400) {
        message.error(err.response.data.error.message);
      } else {
        message.error(translate({ id: "message.error", message: "发生错误，请稍后再试" }));
      }
    } catch (err) {
      message.error(translate({ id: "message.error", message: "处理错误时发生错误" }));
    }
  };

  const handleAuth = async (values, authFunction, successMessage) => {
    setLoading(true);
    try {
      const response = await authFunction(values);
      handleSuccess(response.data.user.username, response.data.jwt);
      message.success(successMessage);
    } catch (err) {
      handleErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const onFinishLogin = async (values) => {
    handleAuth(values, login, <Translate id='message.loginSuccess'>登录成功！</Translate>);
  };

  const onFinishRegister = async (values) => {
    handleAuth(values, register, <Translate id='message.registerSuccess'>注册成功！</Translate>);
  };

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      message.success(<Translate id='message.forgotPassword.success'>密码重置邮件已发送！</Translate>);
    } catch (error) {
      console.error(
        translate({
          id: "error.forgotPassword",
          message: "Error sending forgot password email:",
        }),
        error
      );
      message.error(<Translate id='message.forgotPassword.error'>发送密码重置邮件失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  // Add a new state value to track the active tab
  const [activeTab, setActiveTab] = useState("1");
  const handleForgotPasswordClick = () => {
    setActiveTab("3");
  };
  const loginForm = (
    <Form onFinish={onFinishLogin}>
      <Form.Item name='username' rules={rules.username}>
        <Input
          placeholder={translate({
            id: "input.username",
            message: "用户名/邮箱",
          })}
        />
      </Form.Item>
      <Form.Item name='password' rules={rules.password}>
        <Input.Password placeholder={translate({ id: "input.password", message: "密码" })} />
      </Form.Item>
      <Form.Item>
        <Space size='middle'>
          <Button htmlType='submit' loading={loading}>
            <Translate id='button.login'>登录</Translate>
          </Button>
          <Button type='primary' onClick={handleGoogleLogin} icon={<GoogleOutlined />}>
            Login via Google
          </Button>
          <Button onClick={handleForgotPasswordClick}>
            <Translate id='button.forgotPassword'>忘记密码</Translate>
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  const registerForm = (
    <Form onFinish={onFinishRegister}>
      <Form.Item name='username' rules={rules.username}>
        <Input
          placeholder={translate({
            id: "input.register.username",
            message: "用户名",
          })}
        />
      </Form.Item>
      <Form.Item name='email' rules={rules.email}>
        <Input placeholder={translate({ id: "input.email", message: "邮箱" })} />
      </Form.Item>
      <Form.Item name='password' rules={rules.password}>
        <Input.Password placeholder={translate({ id: "input.password", message: "密码" })} />
      </Form.Item>
      <Form.Item
        name='agreement'
        valuePropName='checked'
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
          <Translate id='agreement.text'>点此同意</Translate>
          <a href='/docs/terms-of-service'>
            <Translate id='agreement.terms'>服务条款</Translate>
          </a>
          <Translate id='agreement.and'>和</Translate>
          <a href='/docs/privacy-policy'>
            <Translate id='agreement.policy'>隐私政策</Translate>
          </a>
          。
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Space size='middle'>
          <Button htmlType='submit' loading={loading}>
            <Translate id='button.register'>注册</Translate>
          </Button>
          <Button type='primary' onClick={handleGoogleLogin} icon={<GoogleOutlined />}>
            Login via Google
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  const forgotForm = (
    <Form onFinish={handleForgotPassword}>
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: translate({
              id: "input.email",
              message: "请输入您的邮箱！",
            }),
          },
        ]}>
        <Input placeholder={translate({ id: "placeholder.email", message: "邮箱" })} />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' loading={loading}>
          <Translate id='button.sendResetEmail'>发送重置邮件</Translate>
        </Button>
      </Form.Item>
    </Form>
  );
  const items = [
    {
      key: "1",
      label: <Translate id='tabs.login'>登录</Translate>,
      children: loginForm,
    },
    {
      key: "2",
      label: <Translate id='tabs.register'>注册</Translate>,
      children: registerForm,
    },
    {
      key: "3",
      label: <Translate id='tabs.forgotPassword'>忘记密码</Translate>,
      children: forgotForm,
    },
  ];

  return (
    <Card title={<Translate id='card.welcome'>欢迎</Translate>} bordered={false}>
      <Tabs defaultActiveKey='1' activeKey={activeTab} onChange={setActiveTab} items={items} />
    </Card>
  );
};

export default LoginPage;
