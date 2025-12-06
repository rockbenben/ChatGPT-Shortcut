import React, { useContext, useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";

import Layout from "@theme/Layout";
import { Card, Form, Input, Button, Spin, Space, Row, Col, Typography, App, theme, Avatar, Divider, Segmented, Tag } from "antd";
import { HomeOutlined, HeartOutlined, EditOutlined, SaveOutlined, LockOutlined, MailOutlined, UserOutlined, SafetyCertificateOutlined, AppstoreOutlined } from "@ant-design/icons";

import { AuthContext, AuthProvider } from "../_components/AuthContext";
import { changePassword, forgotPassword, updateUsername, updateUserInfoCache } from "@site/src/api";

const { Title, Text } = Typography;

const UserProfile = () => {
  const { userAuth, refreshUserAuth, isLoading } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { token } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [securityMode, setSecurityMode] = useState<"password" | "reset">("password");

  const [changePasswordForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();

  useEffect(() => {
    if (userAuth?.data?.username) {
      setNewUsername(userAuth.data.username);
    }
  }, [userAuth]);

  useEffect(() => {
    if (!isLoading && !userAuth) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, userAuth]);

  const handleEditUsernameClick = () => {
    setNewUsername(userAuth?.data.username || "");
    setEditUsername(true);
  };

  const submitNewUsername = async () => {
    if (!newUsername.trim()) {
      messageApi.error("Username cannot be empty");
      return;
    }

    if (newUsername === userAuth?.data.username) {
      setEditUsername(false);
      return;
    }

    setLoading(true);
    try {
      await updateUsername(newUsername);
      updateUserInfoCache("username", newUsername);
      await refreshUserAuth();
      messageApi.success("Username updated successfully!");
      setEditUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
      const errorMessage = error?.response?.data?.error?.message || "Unknown error";
      messageApi.error(`Failed to update username: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const onFinishChangePassword = async (values) => {
    setLoading(true);
    try {
      await changePassword(values);
      messageApi.success(<Translate id="message.success.passwordChanged">密码修改成功！</Translate>);
      changePasswordForm.resetFields();
    } catch (error) {
      console.error("Error changing password:", error);
      messageApi.error(<Translate id="message.error.passwordChangeFailed">密码修改失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  const onFinishForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      messageApi.success(<Translate id="message.success.forgotPassword">密码重置邮件已发送！</Translate>);
      forgotPasswordForm.resetFields();
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      messageApi.error(<Translate id="message.error.forgotPassword">发送密码重置邮件失败，请稍后重试</Translate>);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !userAuth) {
    return (
      <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Spin size="large" tip={<Translate id="message.loading">加载登录状态...</Translate>} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
      <div style={{ minHeight: "calc(100vh - 60px)", padding: "24px 0" }}>
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={16} xl={14}>
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
              {/* Header Navigation */}
              <div
                style={{
                  padding: "16px 24px",
                  background: token.colorBgContainer,
                  borderRadius: token.borderRadiusLG,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  boxShadow: token.boxShadowTertiary,
                }}>
                <Space separator={<Divider orientation="vertical" />}>
                  <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, color: token.colorTextSecondary }}>
                    <Button type="text" icon={<HomeOutlined />} style={{ paddingLeft: 0 }}>
                      <Translate id="link.home">返回首页</Translate>
                    </Button>
                  </Link>
                  <Link to="/user/center" style={{ display: "flex", alignItems: "center", gap: 8, color: token.colorTextSecondary }}>
                    <Button type="text" icon={<AppstoreOutlined />}>
                      <Translate id="link.myCenter">个人中心</Translate>
                    </Button>
                  </Link>
                </Space>
              </div>

              <Row gutter={[24, 24]}>
                {/* Left Column: Profile Info */}
                <Col xs={24} md={10}>
                  <Card
                    style={{
                      height: "100%",
                      borderRadius: token.borderRadiusLG,
                      border: `1px solid ${token.colorBorderSecondary}`,
                      boxShadow: token.boxShadowTertiary,
                    }}
                    title={
                      <Space>
                        <UserOutlined style={{ color: token.colorPrimary }} />
                        <Translate id="title.userInfo">用户信息</Translate>
                      </Space>
                    }>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
                      <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimaryBg, color: token.colorPrimary, marginBottom: 16 }} />

                      {editUsername ? (
                        <Space.Compact style={{ width: "100%", maxWidth: 240 }}>
                          <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onPressEnter={submitNewUsername} autoFocus />
                          <Button type="primary" icon={<SaveOutlined />} onClick={submitNewUsername} loading={loading} />
                          <Button icon={<EditOutlined />} onClick={() => setEditUsername(false)} />
                        </Space.Compact>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {userAuth.data.username}
                          </Title>
                          <Button type="text" icon={<EditOutlined />} onClick={handleEditUsernameClick} size="small" style={{ color: token.colorTextSecondary }} />
                        </div>
                      )}

                      <Text type="secondary" style={{ marginTop: 4 }}>
                        {userAuth.data.email}
                      </Text>
                      {userAuth.data.userprompts && userAuth.data.userprompts.filter((p) => p.share).length > 0 ? (
                        <Tag color="green" style={{ marginTop: 12 }}>
                          📝 <Translate id="label.sharedPrompts">已分享提示词</Translate>
                          {": " + userAuth.data.userprompts.filter((p) => p.share).length}
                        </Tag>
                      ) : (
                        <Tag color="blue" style={{ marginTop: 12 }}>
                          🌱 <Translate id="label.newMember">新成员，开始分享第一个提示词吧</Translate>
                        </Tag>
                      )}
                    </div>
                  </Card>
                </Col>

                {/* Right Column: Security Settings */}
                <Col xs={24} md={14}>
                  <Card
                    style={{
                      height: "100%",
                      borderRadius: token.borderRadiusLG,
                      border: `1px solid ${token.colorBorderSecondary}`,
                      boxShadow: token.boxShadowTertiary,
                    }}
                    title={
                      <Space>
                        <SafetyCertificateOutlined style={{ color: token.colorPrimary }} />
                        <Translate id="title.security">安全设置</Translate>
                      </Space>
                    }
                    extra={
                      <Segmented
                        value={securityMode}
                        onChange={(val) => setSecurityMode(val as "password" | "reset")}
                        options={[
                          { label: <Translate id="action.changePassword">修改密码</Translate>, value: "password" },
                          { label: <Translate id="action.forgotPassword">忘记密码</Translate>, value: "reset" },
                        ]}
                      />
                    }>
                    {securityMode === "password" ? (
                      <Form form={changePasswordForm} onFinish={onFinishChangePassword} layout="vertical" requiredMark={false}>
                        <Form.Item
                          name="currentPassword"
                          label={<Translate id="placeholder.currentPassword">当前密码</Translate>}
                          rules={[{ required: true, message: translate({ id: "validation.currentPassword.required", message: "请输入当前密码！" }) }]}>
                          <Input.Password
                            prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
                            placeholder={translate({ id: "placeholder.currentPassword", message: "当前密码" })}
                            size="large"
                          />
                        </Form.Item>
                        <Form.Item
                          name="newPassword"
                          label={<Translate id="placeholder.newPassword">新密码</Translate>}
                          rules={[
                            { required: true, message: translate({ id: "input.newPassword", message: "请输入新密码！" }) },
                            { min: 6, message: translate({ id: "validation.password.length", message: "密码长度至少为 6 个字符" }) },
                          ]}>
                          <Input.Password
                            prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
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
                            prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
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
                    ) : (
                      <Form form={forgotPasswordForm} onFinish={onFinishForgotPassword} layout="vertical" requiredMark={false}>
                        <div style={{ marginBottom: 24, padding: 16, background: token.colorFillAlter, borderRadius: token.borderRadiusLG }}>
                          <Text type="secondary">
                            <Translate id="message.forgotPassword.info">如果您忘记了当前密码，可以通过邮箱重置。我们会向您的注册邮箱发送一封包含重置链接的邮件。</Translate>
                          </Text>
                        </div>
                        <Form.Item
                          name="email"
                          label={<Translate id="placeholder.email">邮箱</Translate>}
                          rules={[
                            { required: true, message: translate({ id: "validation.email.required", message: "请输入您的邮箱！" }) },
                            { type: "email", message: translate({ id: "validation.email.invalid", message: "请输入有效的邮箱地址！" }) },
                          ]}
                          initialValue={userAuth?.data?.email || ""}>
                          <Input prefix={<MailOutlined style={{ color: token.colorTextDescription }} />} placeholder={translate({ id: "placeholder.email", message: "邮箱" })} size="large" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Button type="primary" htmlType="submit" loading={loading} block size="large">
                            <Translate id="action.sendResetEmail">发送重置邮件</Translate>
                          </Button>
                        </Form.Item>
                      </Form>
                    )}
                  </Card>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

const UserPage = () => (
  <AuthProvider>
    <App>
      <UserProfile />
    </App>
  </AuthProvider>
);

export default UserPage;
