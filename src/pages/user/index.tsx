import React, { useContext, useEffect, useState, useCallback } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import { Card, Form, Input, Button, Spin, Space, Row, Col, Typography, App, theme, Avatar, Tag, Popconfirm, Flex, Statistic, Breadcrumb } from "antd";
import { HomeOutlined, EditOutlined, SaveOutlined, LockOutlined, MailOutlined, UserOutlined, SafetyCertificateOutlined, DownloadOutlined, DatabaseOutlined, DeleteOutlined } from "@ant-design/icons";

import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import { getUserAllInfo } from "@site/src/api/user";
import { changePassword, forgotPassword, updateUsername, getPrompts, clearUserProfileCache, clearMySpaceCache } from "@site/src/api";

const { Title, Text } = Typography;

const UserProfile = () => {
  const { userAuth } = useContext(AuthContext); // 用于获取 userprompts share 信息
  const { message, modal } = App.useApp(); // 使用 modal 实现主题适配
  const { token } = theme.useToken();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [changePasswordForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();

  // Fetch user info from /me endpoint
  const fetchUserInfo = useCallback(async () => {
    setUserLoading(true);
    try {
      const data = await getUserAllInfo();
      if (data) {
        setUserInfo(data.data);
        setNewUsername(data.data.username);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    } finally {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (!userLoading && !userInfo) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userLoading, userInfo]);

  const handleExportPrompts = useCallback(async () => {
    try {
      // 从 userAuth.data.items 获取用户提示词
      const userPromptItems = userAuth?.data?.items?.filter((item) => item.type === "prompt") || [];

      if (userPromptItems.length === 0) {
        message.warning(<Translate id="message.export.noPrompts">暂无提示词可导出</Translate>);
        return;
      }

      // 获取提示词ID列表
      const promptIds = userPromptItems.map((item) => item.id);
      const userPromptsData = await getPrompts("userprompts", promptIds);

      const exportData = {
        exportTime: new Date().toISOString(),
        totalCount: userPromptsData.length,
        prompts: userPromptsData.map((prompt: any) => ({
          id: prompt.id,
          title: prompt.title,
          description: prompt.description,
          remark: prompt.remark || "",
          notes: prompt.notes || "",
          createdAt: prompt.createdAt,
          updatedAt: prompt.updatedAt,
          share: prompt.share,
        })),
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `my-prompts-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success(<Translate id="message.export.success">提示词导出成功！</Translate>);
    } catch (error) {
      console.error("Export error:", error);
      message.error(<Translate id="message.export.error">导出失败，请稍后重试</Translate>);
    }
  }, [userAuth, message]);

  const handleClearCache = useCallback(async () => {
    try {
      // 清除所有用户相关缓存
      clearUserProfileCache(); // USER_PROFILE 缓存
      clearMySpaceCache(); // MYSPACE 缓存
      await fetchUserInfo();
      message.success(<Translate id="message.cache.cleared">缓存已清除，数据已刷新</Translate>);
    } catch (error) {
      console.error("Clear cache error:", error);
      message.error(<Translate id="message.cache.clearError">清除缓存失败</Translate>);
    }
  }, [fetchUserInfo, message]);

  const handleEditUsernameClick = () => {
    setNewUsername(userInfo?.username || "");
    setEditUsername(true);
  };

  const submitNewUsername = async () => {
    if (!newUsername.trim()) {
      message.error("Username cannot be empty");
      return;
    }

    if (newUsername === userInfo?.username) {
      setEditUsername(false);
      return;
    }

    setLoading(true);
    try {
      await updateUsername(newUsername);
      await fetchUserInfo();
      message.success("Username updated successfully!");
      setEditUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
      const errorMessage = error?.response?.data?.error?.message || "Unknown error";
      message.error(`Failed to update username: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

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

  if (userLoading || !userInfo) {
    return (
      <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Spin size="large" />
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
              {/* Breadcrumb Navigation */}
              <Card
                style={{
                  borderRadius: token.borderRadiusLG,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  boxShadow: token.boxShadowTertiary,
                }}
                styles={{ body: { padding: "12px 24px" } }}>
                <Flex justify="space-between" align="center">
                  <Breadcrumb
                    itemRender={(item, params, items, paths) => {
                      const isLast = items.indexOf(item) === items.length - 1;
                      return isLast || !item.path ? (
                        <span>{item.title}</span>
                      ) : (
                        <Link to={item.path} style={{ color: "var(--ifm-color-primary)" }}>
                          {item.title}
                        </Link>
                      );
                    }}
                    items={[
                      {
                        path: "/",
                        title: (
                          <Flex align="center" gap={4}>
                            <HomeOutlined />
                            <span>
                              <Translate id="link.home">首页</Translate>
                            </span>
                          </Flex>
                        ),
                      },
                      {
                        title: <Translate id="link.myAccount">用户中心</Translate>,
                      },
                    ]}
                  />
                </Flex>
              </Card>

              {/* Data Management Section */}
              <Card
                style={{
                  borderRadius: token.borderRadiusLG,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  boxShadow: token.boxShadowTertiary,
                }}
                title={
                  <Space>
                    <DatabaseOutlined style={{ color: token.colorPrimary }} />
                    <Translate id="title.dataManagement">数据管理</Translate>
                  </Space>
                }>
                <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
                  {/* Export Prompts */}
                  <Flex justify="space-between" align="center" style={{ padding: `${token.paddingSM}px 0`, borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
                    <Flex align="center" gap={token.marginMD}>
                      <Avatar
                        icon={<DownloadOutlined />}
                        style={{
                          backgroundColor: token.colorPrimaryBg,
                          color: token.colorPrimary,
                          border: `1px solid ${token.colorPrimaryBorder}`,
                        }}
                      />
                      <div>
                        <Text strong>
                          <Translate id="button.exportPrompts">导出提示词</Translate>
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                          <Translate id="description.exportPrompts.short">导出为 JSON 文件，方便备份</Translate>
                        </Text>
                      </div>
                    </Flex>
                    <Button icon={<DownloadOutlined />} onClick={handleExportPrompts} disabled={!userAuth?.data?.items?.some((item) => item.type === "prompt")}>
                      <Translate id="button.export">导出数据</Translate>
                    </Button>
                  </Flex>

                  {/* Clear Cache */}
                  <Flex justify="space-between" align="center" style={{ padding: `${token.paddingSM}px 0` }}>
                    <Flex align="center" gap={token.marginMD}>
                      <Avatar
                        icon={<DeleteOutlined />}
                        style={{
                          backgroundColor: token.colorPrimaryBg,
                          color: token.colorPrimary,
                          border: `1px solid ${token.colorPrimaryBorder}`,
                        }}
                      />
                      <div>
                        <Text strong>
                          <Translate id="button.clearCache">清除缓存</Translate>
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                          <Translate id="description.clearCache.short">刷新本地缓存数据</Translate>
                        </Text>
                      </div>
                    </Flex>
                    <Popconfirm
                      title={<Translate id="modal.clearCache.title">确认清除缓存？</Translate>}
                      description={
                        <div>
                          <Text>
                            <Translate id="modal.clearCache.content">系统使用 ETag 技术自动管理缓存，通常无需手动清除。</Translate>
                          </Text>
                          <br />
                          <Text type="warning">
                            <Translate id="modal.clearCache.warning">清除后将重新加载所有数据。</Translate>
                          </Text>
                        </div>
                      }
                      onConfirm={handleClearCache}
                      okText={<Translate id="button.confirm">确认清除</Translate>}
                      okButtonProps={{ danger: true }}
                      cancelText={<Translate id="action.cancel">取消</Translate>}
                      placement="topRight">
                      <Button danger icon={<DeleteOutlined />}>
                        <Translate id="button.clearAllCache">清除所有缓存</Translate>
                      </Button>
                    </Popconfirm>
                  </Flex>
                </Space>
              </Card>

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
                      <Avatar size={96} icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimaryBg, color: token.colorPrimary, marginBottom: 16, fontSize: 40 }} />

                      {editUsername ? (
                        <Space.Compact style={{ width: "100%", maxWidth: 240 }}>
                          <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onPressEnter={submitNewUsername} autoFocus />
                          <Button type="primary" icon={<SaveOutlined />} onClick={submitNewUsername} loading={loading} />
                          <Button icon={<EditOutlined />} onClick={() => setEditUsername(false)} />
                        </Space.Compact>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {userInfo.username}
                          </Title>
                          <Button type="text" icon={<EditOutlined />} onClick={handleEditUsernameClick} size="small" style={{ color: token.colorTextSecondary }} />
                        </div>
                      )}

                      <Text type="secondary" style={{ marginTop: 4 }}>
                        <MailOutlined style={{ marginRight: 4 }} />
                        {userInfo.email}
                      </Text>

                      {userAuth?.data?.userprompts && userAuth.data.userprompts.filter((p) => p.share).length > 0 ? (
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
                      <Button
                        type="link"
                        onClick={() => {
                          modal.confirm({
                            title: (
                              <Space>
                                <MailOutlined style={{ color: token.colorPrimary }} />
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
                                    <Input prefix={<MailOutlined style={{ color: token.colorTextDescription }} />} placeholder={translate({ id: "placeholder.email", message: "邮箱" })} size="large" />
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
                        }}>
                        <Translate id="action.forgotPassword">忘记密码？</Translate>
                      </Button>
                    }>
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
