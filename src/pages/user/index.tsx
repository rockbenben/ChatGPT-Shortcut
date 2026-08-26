import React, { useContext, useEffect, useState, useCallback } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Card, Input, Button, Spin, Space, Row, Col, Typography, App, Avatar, Flex, Breadcrumb } from "antd";
import { HomeOutlined, EditOutlined, SaveOutlined, MailOutlined, UserOutlined, CloseOutlined, LoginOutlined } from "@ant-design/icons";
import { EmptyState } from "@site/src/components/EmptyState";

import { AuthContext } from "@site/src/components/AuthContext";
import { getUserAllInfo } from "@site/src/api/user";
import { updateUsername, clearUserProfileCache, clearMySpaceCache } from "@site/src/api";
import LevelSpecCard from "@site/src/components/user/account/LevelSpecCard";
import SecurityCard from "@site/src/components/user/account/SecurityCard";
import DataManagementCard from "@site/src/components/user/account/DataManagementCard";
import { useImportExport } from "@site/src/components/user/account/useImportExport";

const { Title, Text } = Typography;

const UserProfile = () => {
  const { userAuth, getUserAuth, refreshUserAuth } = useContext(AuthContext); // 用于获取 userprompts share 信息
  const { message } = App.useApp();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  const [userInfo, setUserInfo] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const { fileInputRef, importing, handleExportPrompts, handleImportPrompts } = useImportExport({ userAuth, getUserAuth, currentLanguage, refreshUserAuth });

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
        const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
        window.location.href = `${localePrefix}/`;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userLoading, userInfo, i18n.currentLocale, i18n.defaultLocale]);

  const handleClearCache = useCallback(async () => {
    try {
      // 清除所有用户相关缓存
      clearUserProfileCache(); // USER_PROFILE 缓存
      clearMySpaceCache(); // MYSPACE 缓存
      await fetchUserInfo();
      message.success(<Translate id="message.cache.cleared">缓存已清除，数据已刷新</Translate>);
    } catch (error) {
      console.error("Clear cache error:", error);
      message.error(<Translate id="message.cache.clearError">清除缓存失败，请稍后重试</Translate>);
    }
  }, [fetchUserInfo, message]);

  const handleEditUsernameClick = () => {
    setNewUsername(userInfo?.username || "");
    setEditUsername(true);
  };

  const submitNewUsername = async () => {
    if (!newUsername.trim()) {
      // 不能复用 validation.username.required：那条是登录框的「请输入用户名或注册邮箱」
      message.error(translate({ id: "validation.username.empty", message: "用户名不能为空" }));
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
      message.success(translate({ id: "message.username.updated", message: "用户名已更新" }));
      setEditUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
      const detail = error?.response?.data?.error?.message;
      message.error(detail || translate({ id: "message.username.updateError", message: "用户名更新失败，请稍后重试" }));
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  if (!userInfo) {
    return (
      <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
        <EmptyState
          fullPage
          icon={<UserOutlined />}
          title={<Translate id="account.signInRequired">登录后查看账户</Translate>}
          description={<Translate id="account.signInRequiredHint">正在带你回首页，也可以直接点下面的按钮</Translate>}
          action={
            <Link to="/">
              <Button type="primary" icon={<LoginOutlined />}>
                <Translate id="auth.callback.backHome">返回首页登录</Translate>
              </Button>
            </Link>
          }
        />
      </Layout>
    );
  }

  const sharedCount = userAuth?.data?.userprompts?.filter((p) => p.share).length || 0;

  return (
    <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
      <main
        style={{
          minHeight: "calc(100vh - 60px)",
          padding: "24px 0",
        }}>
        {/* paddingInline 必须等于下面那个 Row 的 gutter 的一半：antd 的 gutter 是「负 margin +
            子 Col 正 padding」实现的，父级没有这 12px 去抵消时，内层 Row 会左右各溢出 12px。
            窄屏下两列都塌成 xs=24 占满，右边那 12px 直接变成整页横向滚动（实测 383px 宽下
            scrollWidth-clientWidth = 12）。与 PromptPage 是同一处结构、同一个修法。
            外层容器只有 padding:"24px 0"（纵向），指望不上。 */}
        <Row justify="center" style={{ paddingInline: 12 }}>
          <Col xs={24} sm={22} md={20} lg={16} xl={14} className="full-width-col">
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
              {/* Breadcrumb Navigation — plain, no Card wrapper */}
              <Breadcrumb
                itemRender={(item, params, items, paths) => {
                  const isLast = items.indexOf(item) === items.length - 1;
                  return isLast || !item.path ? (
                    <span>{item.title}</span>
                  ) : (
                    <Link to={item.path} style={{ color: "var(--site-color-tag-selected-text)" }}>
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
                    // 与导航菜单项、Layout title 同名：三处指的都是这一个页面。
                    // 之前面包屑单独用 link.userCenter「用户中心 / User center」，
                    // 菜单点进来却写「我的账户」——18 个语言都这么分叉，不是英文独有问题。
                    // 那个 id 已从本分支各 code.json 移除（每个分支自带一份，互不影响）。
                    title: <Translate id="link.myAccount">我的账户</Translate>,
                  },
                ]}
              />

              <Row gutter={[24, 24]}>
                {/* Left Column: Profile Info */}
                <Col xs={24} md={10}>
                  <Card
                    style={{
                      height: "100%",
                      borderRadius: 12,
                    }}
                    title={
                      <Space>
                        <UserOutlined />
                        <Translate id="title.userInfo">用户信息</Translate>
                      </Space>
                    }>
                    <Flex vertical>
                      {/* Identity row — 紧凑横排，avatar 不再带等级渐变环（等级移到下方 spec card） */}
                      <Flex align="center" gap={16} style={{ marginBottom: 24 }}>
                        <Avatar
                          size={56}
                          icon={<UserOutlined />}
                          style={{
                            backgroundColor: "var(--ifm-background-surface-color)",
                            color: "var(--ifm-color-content-secondary)",
                            border: "1px solid var(--site-color-hairline)",
                            flexShrink: 0,
                          }}
                        />
                        <Flex vertical style={{ flex: 1, minWidth: 0 }}>
                          {editUsername ? (
                            <Space.Compact style={{ width: "100%" }}>
                              <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onPressEnter={submitNewUsername} autoFocus />
                              <Button type="primary" icon={<SaveOutlined />} onClick={submitNewUsername} loading={loading} aria-label={translate({ id: "action.save", message: "保存" })} />
                              <Button icon={<CloseOutlined />} onClick={() => setEditUsername(false)} aria-label={translate({ id: "action.cancel", message: "取消" })} />
                            </Space.Compact>
                          ) : (
                            <Flex align="center" gap={4}>
                              <Title
                                level={4}
                                style={{
                                  margin: 0,
                                  fontSize: 18,
                                  fontWeight: 600,
                                  letterSpacing: "-0.01em",
                                  lineHeight: 1.2,
                                  minWidth: 0,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}>
                                {userInfo.username}
                              </Title>
                              <Button type="text" icon={<EditOutlined />} onClick={handleEditUsernameClick} size="small" style={{ color: "var(--site-color-text-tertiary)", flexShrink: 0 }} />
                            </Flex>
                          )}
                          <Text style={{ fontSize: 12, color: "var(--site-color-text-tertiary)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            <MailOutlined style={{ marginRight: 4 }} />
                            {userInfo.email}
                          </Text>
                        </Flex>
                      </Flex>

                      <LevelSpecCard sharedCount={sharedCount} />
                    </Flex>
                  </Card>
                </Col>

                {/* Right Column: Security Settings */}
                <Col xs={24} md={14}>
                  <SecurityCard userInfo={userInfo} />
                </Col>
              </Row>

              {/* Data Management Section */}
              <DataManagementCard
                canExport={!!userAuth?.data?.items?.some((item) => item.type === "prompt" || item.type === "favorite")}
                importing={importing}
                onExport={handleExportPrompts}
                onImportClick={() => fileInputRef.current?.click()}
                onClearCache={handleClearCache}
              />
            </Space>
          </Col>
        </Row>
      </main>
      <input type="file" ref={fileInputRef} accept=".json" style={{ display: "none" }} onChange={handleImportPrompts} />
    </Layout>
  );
};

const UserPage = () => <UserProfile />;

export default UserPage;
