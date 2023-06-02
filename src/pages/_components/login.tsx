import { Button, Card, Form, Input, message, Tabs, Checkbox, Space } from "antd";
import React, { useEffect, useState } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Cookies from "js-cookie";
import { login, register, forgotPassword } from '@site/src/api';

const rules = {
  username: [{ required: true, message: translate({ id: "input.rules.username", message: "请输入用户名或注册邮箱！" }) }],
  password: [{ required: true, message: translate({ id: "input.rules.password", message: "请输入密码！" }) }],
  email: [{ required: true, message: translate({ id: "input.rules.email", message: "请输入邮箱！" }) }],
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    const storedUsername = Cookies.get("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleSuccess = (username, jwt) => {
    Cookies.set("auth_token", jwt);
    Cookies.set("username", username);
    setUsername(username);
    setIsLoggedIn(true);
    window.location.href = "/";
  };

  const handleErrors = (err) => {
    if (err.response.status === 400) {
      message.error(err.response.data.error.message);
    } else {
      message.error(translate({ id: "message.error", message: "发生错误，请稍后再试" }));
    }
  };

  const onFinishLogin = async (values) => {
    try {
        const response = await login(values);
        handleSuccess(response.data.user.username, response.data.jwt);
        message.success(<Translate id="message.loginSuccess">登录成功！</Translate>);
    } catch (err) {
        handleErrors(err);
    }
  };

  const onFinishRegister = async (values) => {
    try {
        const response = await register(values);
        handleSuccess(response.data.user.username, response.data.jwt);
        message.success(<Translate id="message.registerSuccess">注册成功！</Translate>);
    } catch (err) {
        handleErrors(err);
    }
  };
  const handleForgotPassword = async (values) => {
    try {
      const response = await forgotPassword(values.email);
      if (response) {
        message.success(<Translate id="message.forgotPassword">重置密码的电子邮件已经发到你的邮箱。</Translate>);
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  // Add a new state value to track the active tab
  const [activeTab, setActiveTab] = useState("1");
  const handleForgotPasswordClick = () => {
    setActiveTab("3");
  };
  const loginForm = (
    <Form onFinish={onFinishLogin}>
      <Form.Item name="username" rules={rules.username}>
        <Input placeholder={translate({ id: "input.username", message: "用户名/邮箱" })} />
      </Form.Item>
      <Form.Item name="password" rules={rules.password}>
        <Input.Password placeholder={translate({ id: "input.password", message: "密码" })} />
      </Form.Item>
      <Form.Item>
        <Space size="middle">
          <Button htmlType="submit">
            <Translate id="button.login">登录</Translate>
          </Button>
          <Button onClick={handleForgotPasswordClick}>
            <Translate id="button.forgotPassword">忘记密码</Translate>
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  const registerForm = (
    <Form onFinish={onFinishRegister}>
      <Form.Item name="username" rules={rules.username}>
        <Input placeholder={translate({ id: "input.username", message: "用户名" })} />
      </Form.Item>
      <Form.Item name="email" rules={rules.email}>
        <Input placeholder={translate({ id: "input.email", message: "邮箱" })} />
      </Form.Item>
      <Form.Item name="password" rules={rules.password}>
        <Input.Password placeholder={translate({ id: "input.password", message: "密码" })} />
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
                    new Error(translate({ id: "agreement.rules", message: "使用前须同意服务条款和隐私政策" }))
                  ),
          },
        ]}
      >
        <Checkbox>
          <Translate id="agreement.text">点此同意</Translate><a href="/docs/terms-of-service"><Translate id="agreement.terms">服务条款</Translate></a><Translate id="agreement.and">和</Translate><a href="/docs/privacy-policy"><Translate id="agreement.policy">隐私政策</Translate></a>。
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit"><Translate id="button.register">注册</Translate></Button>
      </Form.Item>
    </Form>
  );

  const forgotForm = (
    <Form onFinish={handleForgotPassword}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: translate({ id: 'input.email', message: '请输入您的邮箱！'}) }]}
      >
        <Input placeholder={translate({ id: 'placeholder.email', message: '邮箱'})} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">
          <Translate id="button.sendResetEmail">发送重置邮件</Translate>
        </Button>
      </Form.Item>
    </Form>
  );
  const items = [
    {
      key: "1",
      label: <Translate id="tabs.login">登录</Translate>,
      children: loginForm,
    },
    {
      key: "2",
      label: <Translate id="tabs.register">注册</Translate>,
      children: registerForm,
    },
    {
      key: "3",
      label: <Translate id="tabs.forgotPassword">忘记密码</Translate>,
      children: forgotForm,
    },
  ];

  return (
    <Card title={<Translate id="card.welcome">欢迎</Translate>} bordered={false}>
      <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={setActiveTab} items={items} />
    </Card>
  );
};

export default LoginPage;
