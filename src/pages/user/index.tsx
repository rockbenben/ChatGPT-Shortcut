import React, { useContext, useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";

import Layout from "@theme/Layout";
import { Card, Descriptions, Form, Input, Button, message, Tabs, Spin, Space, ConfigProvider, theme, Alert, Row, Col, Typography } from "antd";
import { HomeOutlined, HeartOutlined, EditOutlined, SaveOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { AuthContext, AuthProvider } from "../_components/AuthContext";
import { changePassword, forgotPassword, updateUsername, updateLocalStorageCache } from "@site/src/api";
import themeConfig from "@site/src/pages/_components/themeConfig";

const { Title } = Typography;

const UserProfile = () => {
  const { userAuth, refreshUserAuth, isLoading } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    if (userAuth?.data?.username) {
      setNewUsername(userAuth.data.username);
    }
  }, [userAuth]);

  useEffect(() => {
    // 如果不是在加载中且没有用户信息，重定向到首页
    if (!isLoading && !userAuth) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userAuth, isLoading]);

  const handleEditUsernameClick = () => {
    setNewUsername(userAuth?.data.username);
    setEditUsername(true);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const submitNewUsername = async () => {
    if (!newUsername.trim()) {
      messageApi.error("Username cannot be empty");
      return;
    }

    if (newUsername === userAuth?.data.username) {
      messageApi.info("No change in username");
      setEditUsername(false);
      return;
    }

    setLoading(true);
    try {
      await updateUsername(newUsername);
      updateLocalStorageCache("username", newUsername);
      await refreshUserAuth();
      messageApi.success("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      const errorMessage = error?.response?.data?.error?.message || "Unknown error";
      messageApi.error(`Username update failed: ${errorMessage}`);
    } finally {
      setLoading(false);
      setEditUsername(false);
    }
  };

  const onFinishChangePassword = async (values) => {
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
      await changePassword(values);
      messageApi.success(<Translate id="message.changePassword.success">密码修改成功！</Translate>);
      // Reset form after successful password change
      const changePasswordForm = document.getElementById("changePasswordForm");
      if (changePasswordForm) {
        changePasswordForm.reset();
      }
    } catch (error) {
      console.error(
        translate({
          id: "error.changePassword",
          message: "Error changing password:",
        }),
        error
      );
      messageApi.error(<Translate id="message.changePassword.error">密码修改失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  const onFinishForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      messageApi.success(<Translate id="message.forgotPassword.success">密码重置邮件已发送！</Translate>);
      // Reset form after sending reset email
      const forgotPasswordForm = document.getElementById("forgotPasswordForm");
      if (forgotPasswordForm) {
        forgotPasswordForm.reset();
      }
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

  // Loading state when user data is loading or not available
  if (isLoading || !userAuth) {
    return (
      <Layout title={translate({ id: "title.userInfo", message: "用户信息" })}>
        <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px", textAlign: "center" }}>
          <Spin 
            size="large" 
            tip={<Translate id="message.loading.userStatus">加载登录状态...</Translate>}
            role="status"
            aria-label="正在加载用户信息"
          >
            <div style={{ height: 300 }}></div>
          </Spin>
        </div>
      </Layout>
    );
  }

  // User info items
  const useritems = [
    {
      key: "1",
      label: translate({
        id: "userInfo.username",
        message: "用户名",
      }),
      children: (
        <div>
          {editUsername ? (
            <Input
              autoComplete="off"
              prefix={<UserOutlined />}
              value={newUsername}
              onChange={handleUsernameChange}
              addonAfter={<Button type="link" icon={<SaveOutlined />} onClick={submitNewUsername} loading={loading} />}
            />
          ) : (
            <Space>
              {userAuth.data.username}
              <Button type="link" icon={<EditOutlined />} onClick={handleEditUsernameClick} />
            </Space>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: translate({
        id: "userInfo.email",
        message: "邮箱",
      }),
      children: <div>{userAuth.data.email}</div>,
    },
  ];

  // Tab items
  const items = [
    {
      key: "1",
      label: translate({ id: "label.changePassword", message: "修改密码" }),
      children: (
        <Form id="changePasswordForm" onFinish={onFinishChangePassword} layout="vertical" requiredMark={false}>
          <Form.Item
            name="currentPassword"
            label={<Translate id="placeholder.currentPassword">当前密码</Translate>}
            rules={[
              {
                required: true,
                message: translate({
                  id: "input.currentPassword",
                  message: "请输入当前密码！",
                }),
              },
            ]}>
            <Input.Password
              autoComplete="current-password"
              prefix={<LockOutlined />}
              placeholder={translate({
                id: "placeholder.currentPassword",
                message: "当前密码",
              })}
            />
          </Form.Item>
          <Form.Item name="newPassword" label={<Translate id="placeholder.newPassword">新密码</Translate>} rules={passwordRules} hasFeedback>
            <Input.Password
              autoComplete="new-password"
              prefix={<LockOutlined />}
              placeholder={translate({
                id: "placeholder.newPassword",
                message: "新密码",
              })}
            />
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
            <Input.Password
              autoComplete="new-password"
              prefix={<LockOutlined />}
              placeholder={translate({
                id: "placeholder.confirmPassword",
                message: "确认新密码",
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              <Translate id="button.changePassword">修改密码</Translate>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: translate({ id: "label.forgotPassword", message: "忘记密码" }),
      children: (
        <>
          <Alert message={<Translate id="message.forgotPassword.info">重置密码链接将发送至您的邮箱</Translate>} type="info" showIcon style={{ marginBottom: 16 }} />
          <Form id="forgotPasswordForm" onFinish={onFinishForgotPassword} layout="vertical" requiredMark={false}>
            <Form.Item
              name="email"
              label={<Translate id="input.email">邮箱</Translate>}
              rules={[
                {
                  required: true,
                  message: translate({
                    id: "input.email",
                    message: "请输入您的邮箱！",
                  }),
                },
                {
                  type: "email",
                  message: translate({
                    id: "input.email.valid",
                    message: "请输入有效的邮箱地址！",
                  }),
                },
              ]}
              initialValue={userAuth?.data?.email || ""}>
              <Input
                autoComplete="email"
                prefix={<MailOutlined />}
                placeholder={translate({
                  id: "placeholder.email",
                  message: "邮箱",
                })}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                <Translate id="button.sendResetEmail">发送重置邮件</Translate>
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <Layout title={translate({ id: "title.userInfo", message: "用户信息" })}>
      <ConfigProvider
        theme={{
          ...themeConfig,
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
        {contextHolder}
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={16} xl={14}>
            <div style={{ padding: "20px" }}>
              <Space size={"large"} style={{ marginLeft: 8 }}>
                <Link to="/" className="mainLink">
                  <HomeOutlined /> <Translate id="link.home">返回首页</Translate>
                </Link>
                <Link to="/user/favorite" className="mainLink">
                  <HeartOutlined /> <Translate id="link.user">个人中心</Translate>
                </Link>
              </Space>

              <Card
                title={
                  <Title level={4} style={{ marginBottom: 0 }}>
                    <Translate id="title.userInfo">用户信息</Translate>
                  </Title>
                }
                style={{ marginTop: 16 }}>
                <Descriptions items={useritems} layout="vertical" />
                <Tabs type="card" items={items} destroyOnHidden />
              </Card>
            </div>
          </Col>
        </Row>
      </ConfigProvider>
    </Layout>
  );
};

export default function UserPage() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  );
}
