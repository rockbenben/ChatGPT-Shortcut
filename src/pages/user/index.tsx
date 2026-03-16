import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Card, Form, Input, Button, Spin, Space, Row, Col, Typography, App, Avatar, Tag, Popconfirm, Flex, Statistic, Breadcrumb, Progress } from "antd";
import {
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  DownloadOutlined,
  ImportOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  TrophyOutlined,
  RocketOutlined,
  StarOutlined,
  CrownOutlined,
  FireOutlined,
  ThunderboltOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import { getLevelInfo, LevelName, LevelDescription } from "@site/src/components/LevelSystem";
import { getUserAllInfo } from "@site/src/api/user";
import { submitPrompt, updatePrompt, createFavorite, updateFavorite, changePassword, forgotPassword, updateUsername, getPrompts, clearUserProfileCache, clearMySpaceCache } from "@site/src/api";
import { deriveLoves, deriveCommLoves } from "@site/src/utils/myspaceUtils";

const { Title, Text } = Typography;

const UserProfile = () => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext); // 用于获取 userprompts share 信息
  const { message, modal } = App.useApp();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  const [userInfo, setUserInfo] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [changePasswordForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

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
      // 从 userAuth.data.items 获取用户提示词和收藏
      const userPromptItems = userAuth?.data?.items?.filter((item) => item.type === "prompt") || [];
      const favoriteItems = userAuth?.data?.items?.filter((item) => item.type === "favorite") || [];

      if (userPromptItems.length === 0 && favoriteItems.length === 0) {
        message.warning(<Translate id="message.export.noPrompts">暂无提示词可导出</Translate>);
        return;
      }

      // 获取提示词和收藏的详细数据
      const promptIds = userPromptItems.map((item) => item.id);
      const cardFavoriteIds = favoriteItems.filter((item) => item.source === "card").map((item) => item.id);
      const commFavoriteIds = favoriteItems.filter((item) => item.source === "community").map((item) => item.id);

      const [userPromptsData, cardFavoritesData, commFavoritesData] = await Promise.all([
        promptIds.length > 0 ? getPrompts("userprompts", promptIds) : [],
        cardFavoriteIds.length > 0 ? getPrompts("cards", cardFavoriteIds) : [],
        commFavoriteIds.length > 0 ? getPrompts("commus", commFavoriteIds) : [],
      ]);

      // favorites: 只包含 ID 数组（用于导入）
      const favorites = {
        card: cardFavoriteIds,
        community: commFavoriteIds,
      };

      // favoriteDetails: 详细内容供用户查看（导入时忽略）
      const favoriteDetails = [
        ...cardFavoritesData.map((p: any) => {
          const langData = p[currentLanguage] || p["zh-Hans"] || p["en"] || {};
          return {
            id: p.id,
            source: "card" as const,
            ...(langData.title && { title: langData.title }),
            ...(langData.prompt && { prompt: langData.prompt }),
            ...(langData.remark && { remark: langData.remark }),
          };
        }),
        ...commFavoritesData.map((p: any) => ({
          id: p.id,
          source: "community" as const,
          ...(p.title && { title: p.title }),
          ...(p.description && { prompt: p.description }),
          ...(p.remark && { remark: p.remark }),
        })),
      ];

      // MySpace 排序和自定义标签（导入时可恢复布局）
      const items = userAuth?.data?.items || [];
      const myspaceOrder = items.map((item: any) => ({
        id: item.id,
        type: item.type,
        source: item.source,
      }));
      const customTags = userAuth?.data?.customTags || [];

      const exportData = {
        exportTime: new Date().toISOString(),
        prompts: userPromptsData.map((prompt: any) => ({
          id: prompt.id,
          title: prompt.title,
          prompt: prompt.description,
          ...(prompt.remark && { remark: prompt.remark }),
          ...(prompt.notes && { notes: prompt.notes }),
          share: prompt.share,
        })),
        favorites,
        ...(favoriteDetails.length > 0 && { favoriteDetails }),
        ...(myspaceOrder.length > 0 && { myspaceOrder }),
        ...(customTags.length > 0 && { customTags }),
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
  }, [userAuth, message, currentLanguage]);

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

  // 导入提示词处理
  const handleImportPrompts = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // 重置 input 以允许重复选择同一文件
      event.target.value = "";

      try {
        const content = await file.text();
        const parsed = JSON.parse(content);

        // 解析数据
        let prompts: any[] = [];
        let favorites: { card: number[]; community: number[] } = { card: [], community: [] };

        if (Array.isArray(parsed)) {
          prompts = parsed;
        } else if (parsed.prompts) {
          prompts = parsed.prompts;
          if (parsed.favorites) {
            favorites.card = parsed.favorites.card || [];
            favorites.community = parsed.favorites.community || [];
          }
        } else if (parsed.title && (parsed.prompt || parsed.description)) {
          prompts = [parsed];
        }

        // 标准化 prompt 字段
        prompts = prompts.map((p) => ({ ...p, prompt: p.prompt || p.description || "" })).filter((p) => p.title && p.prompt);

        const hasFavorites = favorites.card.length > 0 || favorites.community.length > 0;
        if (prompts.length === 0 && !hasFavorites) {
          message.error(<Translate id="message.import.invalid">无效的数据格式</Translate>);
          return;
        }

        setImporting(true);

        // 获取用户已有提示词ID
        const userPromptIds = userAuth?.data?.userprompts?.map((p: any) => p.id) || [];
        const favoriteId = userAuth?.data?.favorites?.id;

        // 获取现有提示词详情（用于对比内容）
        const conflictIds = prompts.filter((p) => p.id && userPromptIds.includes(p.id)).map((p) => p.id);
        let existingPromptsMap: Record<number, any> = {};
        if (conflictIds.length > 0) {
          try {
            const existingPrompts = await getPrompts("userprompts", conflictIds);
            existingPromptsMap = existingPrompts.reduce((acc: Record<number, any>, p: any) => {
              acc[p.id] = p;
              return acc;
            }, {});
          } catch {
            // 获取失败时继续导入，只是无法跳过相同内容
          }
        }

        let successCount = 0;
        let errorCount = 0;

        // 处理提示词（并发执行，提升性能）
        const promptTasks = prompts.map(async (prompt) => {
          if (prompt.id && userPromptIds.includes(prompt.id)) {
            // 检查内容是否相同，相同则跳过
            const existing = existingPromptsMap[prompt.id];
            if (existing) {
              const isSame =
                existing.title === prompt.title &&
                existing.description === prompt.prompt &&
                (existing.remark || "") === (prompt.remark || "") &&
                (existing.notes || "") === (prompt.notes || "") &&
                existing.share === (prompt.share ?? false);
              if (isSame) {
                return { status: "skipped" as const };
              }
            }
            // 更新现有提示词
            await updatePrompt(prompt.id, {
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: prompt.share ?? false,
            });
            return { status: "success" as const };
          } else if (!prompt.id) {
            // 没有 id：新创建提示词，默认公开
            await submitPrompt({
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: prompt.share ?? true,
            });
            return { status: "success" as const };
          } else {
            // 有 id 但不属于当前用户：导入为新提示词，强制私密
            await submitPrompt({
              title: prompt.title,
              description: prompt.prompt,
              remark: prompt.remark,
              notes: prompt.notes,
              share: false,
            });
            return { status: "success" as const };
          }
        });

        const promptResults = await Promise.allSettled(promptTasks);
        for (const result of promptResults) {
          if (result.status === "fulfilled") {
            if (result.value.status !== "skipped") {
              successCount++;
            }
          } else {
            errorCount++;
          }
        }

        // 处理收藏（合并模式，并行执行）
        if (hasFavorites) {
          const items = userAuth?.data?.items || [];
          const favoriteConfigs = [
            { importIds: favorites.card, isCommunity: false, derive: deriveLoves },
            { importIds: favorites.community, isCommunity: true, derive: deriveCommLoves },
          ] as const;

          const tasks = favoriteConfigs.map(async ({ importIds, isCommunity, derive }) => {
            if (importIds.length === 0) return false;

            const existing = derive(items);
            const merged = [...new Set([...existing, ...importIds])];
            if (merged.length === existing.length) return false; // 无新增

            favoriteId ? await updateFavorite(favoriteId, merged, isCommunity) : await createFavorite(merged, isCommunity);
            return true;
          });

          const results = await Promise.allSettled(tasks);
          successCount += results.filter((r) => r.status === "fulfilled" && r.value).length;
        }

        // myspaceOrder 和 customTags 仅作为导出备份数据保留在 JSON 中
        // 联网版导入时不恢复排序和标签：
        // - 排序中的 prompt ID 是源用户的，导入后新建 prompt 有新 ID，无法对应
        // - 覆盖式写入会破坏目标用户已有的排序和标签体系
        // 本地版可安全使用这些字段（写入 localStorage，不涉及多用户冲突）

        setImporting(false);

        if (errorCount === 0) {
          message.success(<Translate id="message.import.success">导入成功！</Translate>);
        } else if (successCount > 0) {
          message.warning(`${translate({ id: "message.import.partial", message: "部分导入成功" })} (${successCount}/${successCount + errorCount})`);
        } else {
          message.error(<Translate id="message.import.failed">导入失败</Translate>);
        }

        // 刷新 MySpace 数据（prompts 和 favorites）
        await refreshUserAuth();
      } catch (error) {
        setImporting(false);
        console.error("Import error:", error);
        message.error(<Translate id="message.import.parseError">JSON 解析失败，请检查文件格式</Translate>);
      }
    },
    [userAuth, message, refreshUserAuth],
  );

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
      <main
        style={{
          minHeight: "calc(100vh - 60px)",
          padding: "24px 0",
        }}>
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={16} xl={14}>
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
              {/* Breadcrumb Navigation */}
              <Card
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--ifm-color-emphasis-200)",
                  boxShadow: "var(--site-shadow-sm)",
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

              <Row gutter={[24, 24]}>
                {/* Left Column: Profile Info */}
                <Col xs={24} md={10}>
                  <Card
                    style={{
                      height: "100%",
                      borderRadius: 12,
                      border: "1px solid var(--ifm-color-emphasis-200)",
                      boxShadow: "var(--site-shadow-sm)",
                    }}
                    title={
                      <Space>
                        <UserOutlined style={{ color: "var(--ifm-color-primary)" }} />
                        <Translate id="title.userInfo">用户信息</Translate>
                      </Space>
                    }>
                    {(() => {
                      const sharedCount = userAuth?.data?.userprompts?.filter((p) => p.share).length || 0;
                      const levelInfo = getLevelInfo(sharedCount);
                      const progressPercent = levelInfo.next ? Math.min(100, Math.round((sharedCount / levelInfo.next) * 100)) : 100;
                      const remaining = levelInfo.next ? levelInfo.next - sharedCount : 0;

                      // Icon mapping for visual display
                      const iconMap: Record<string, React.ReactNode> = {
                        crown: <CrownOutlined />,
                        trophy: <TrophyOutlined />,
                        star: <StarOutlined />,
                        rocket: <RocketOutlined />,
                        fire: <FireOutlined />,
                        thunderbolt: <ThunderboltOutlined />,
                      };

                      return (
                        <Flex vertical align="center" gap={0}>
                          {/* Avatar with static gradient ring */}
                          <div
                            style={{
                              position: "relative",
                              padding: 4,
                              borderRadius: "50%",
                              background: levelInfo.color,
                              marginBottom: 16,
                            }}>
                            <Avatar
                              size={88}
                              icon={<UserOutlined />}
                              style={{
                                backgroundColor: "var(--ifm-background-color)",
                                color: "var(--ifm-color-primary)",
                                fontSize: 36,
                                border: "3px solid var(--ifm-background-color)",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                background: "var(--ifm-background-color)",
                                borderRadius: "50%",
                                padding: 4,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                              }}>
                              <span style={{ fontSize: 20, color: "var(--ifm-color-primary)" }}>{iconMap[levelInfo.icon]}</span>
                            </div>
                          </div>

                          {/* Username */}
                          {editUsername ? (
                            <Space.Compact style={{ width: "100%", maxWidth: 240, marginBottom: 8 }}>
                              <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onPressEnter={submitNewUsername} autoFocus />
                              <Button type="primary" icon={<SaveOutlined />} onClick={submitNewUsername} loading={loading} />
                              <Button icon={<EditOutlined />} onClick={() => setEditUsername(false)} />
                            </Space.Compact>
                          ) : (
                            <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                              <Title level={4} style={{ margin: 0 }}>
                                {userInfo.username}
                              </Title>
                              <Button type="text" icon={<EditOutlined />} onClick={handleEditUsernameClick} size="small" style={{ color: "var(--ifm-color-emphasis-500)" }} />
                            </Flex>
                          )}

                          {/* Email */}
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <MailOutlined style={{ marginRight: 4 }} />
                            {userInfo.email}
                          </Text>

                          {/* Level Badge */}
                          <Tag
                            color={levelInfo.tagColor}
                            style={{
                              marginTop: 16,
                              padding: "6px 16px",
                              fontSize: 14,
                              fontWeight: 600,
                              borderRadius: 8,
                            }}>
                            <LevelName level={levelInfo.level} emoji={levelInfo.emoji} />
                          </Tag>

                          {/* Level Description */}
                          <Text type="secondary" style={{ marginTop: 8, fontSize: 12, textAlign: "center" }}>
                            <LevelDescription level={levelInfo.level} />
                          </Text>

                          {/* Stats Card - Using Ant Design Card */}
                          <Card
                            size="small"
                            style={{
                              width: "100%",
                              marginTop: 20,
                              borderRadius: 12,
                              overflow: "hidden",
                              border: "1px solid rgba(var(--ifm-color-primary-rgb), 0.2)",
                            }}
                            styles={{
                              body: {
                                textAlign: "center",
                                background: "linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-background-color) 100%)",
                              },
                            }}>
                            <Statistic
                              title={
                                <Space style={{ color: "var(--ifm-color-emphasis-500)" }}>
                                  <ShareAltOutlined />
                                  <Translate id="stat.sharedPrompts">已分享提示词</Translate>
                                </Space>
                              }
                              value={sharedCount}
                              styles={{
                                content: {
                                  color: "var(--ifm-color-primary)",
                                  fontSize: 32,
                                  fontWeight: 700,
                                },
                              }}
                            />
                          </Card>

                          {/* Progress to next level */}
                          {levelInfo.next && (
                            <Flex vertical gap={8} style={{ width: "100%", marginTop: 16 }}>
                              <Flex justify="space-between">
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  <Translate id="progress.toNextLevel">距离下一等级</Translate>
                                </Text>
                                <Text strong style={{ fontSize: 12, color: "var(--ifm-color-primary)" }}>
                                  {remaining}
                                </Text>
                              </Flex>
                              <Progress
                                percent={progressPercent}
                                strokeColor={{
                                  "0%": "var(--ifm-color-primary)",
                                  "100%": "var(--ifm-color-primary-dark)",
                                }}
                                trailColor="var(--ifm-color-emphasis-200)"
                                showInfo={false}
                              />
                              <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                                <Translate id="progress.encourage">继续分享，解锁更高等级！</Translate> 🎯
                              </Text>
                            </Flex>
                          )}

                          {/* Max level celebration */}
                          {!levelInfo.next && sharedCount > 0 && (
                            <Card
                              size="small"
                              style={{
                                width: "100%",
                                marginTop: 16,
                                border: "1px solid var(--ifm-color-success-dark)",
                              }}
                              styles={{
                                body: {
                                  textAlign: "center",
                                  background: "linear-gradient(135deg, var(--ifm-color-success-contrast-background) 0%, var(--ifm-background-color) 100%)",
                                },
                              }}>
                              <Text strong style={{ color: "var(--ifm-color-success)" }}>
                                🎉 <Translate id="level.max.congrats">恭喜达成最高等级！你是社区的传奇贡献者！</Translate>
                              </Text>
                            </Card>
                          )}
                        </Flex>
                      );
                    })()}
                  </Card>
                </Col>

                {/* Right Column: Security Settings */}
                <Col xs={24} md={14}>
                  <Card
                    style={{
                      height: "100%",
                      borderRadius: 12,
                      border: "1px solid var(--ifm-color-emphasis-200)",
                      boxShadow: "var(--site-shadow-sm)",
                    }}
                    title={
                      <Space>
                        <SafetyCertificateOutlined style={{ color: "var(--ifm-color-primary)" }} />
                        <Translate id="title.security">安全设置</Translate>
                      </Space>
                    }
                    extra={
                      <Button
                        type="link"
                        style={{ color: "var(--ifm-color-primary)" }}
                        onClick={() => {
                          modal.confirm({
                            title: (
                              <Space>
                                <MailOutlined style={{ color: "var(--ifm-color-primary)" }} />
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
                                    <Input
                                      prefix={<MailOutlined style={{ color: "var(--ifm-color-emphasis-400)" }} />}
                                      placeholder={translate({ id: "placeholder.email", message: "邮箱" })}
                                      size="large"
                                    />
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
                      {userInfo?.provider === "local" && (
                        <Form.Item
                          name="currentPassword"
                          label={<Translate id="placeholder.currentPassword">当前密码</Translate>}
                          rules={[{ required: true, message: translate({ id: "validation.currentPassword.required", message: "请输入当前密码！" }) }]}>
                          <Input.Password
                            prefix={<LockOutlined style={{ color: "var(--ifm-color-emphasis-400)" }} />}
                            placeholder={translate({ id: "placeholder.currentPassword", message: "当前密码" })}
                            size="large"
                          />
                        </Form.Item>
                      )}
                      <Form.Item
                        name="newPassword"
                        label={<Translate id="placeholder.newPassword">新密码</Translate>}
                        rules={[
                          { required: true, message: translate({ id: "input.newPassword", message: "请输入新密码！" }) },
                          { min: 6, message: translate({ id: "validation.password.length", message: "密码长度至少为 6 个字符" }) },
                        ]}>
                        <Input.Password
                          prefix={<LockOutlined style={{ color: "var(--ifm-color-emphasis-400)" }} />}
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
                          prefix={<LockOutlined style={{ color: "var(--ifm-color-emphasis-400)" }} />}
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

              {/* Data Management Section */}
              <Card
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--ifm-color-emphasis-200)",
                  boxShadow: "var(--site-shadow-sm)",
                }}
                title={
                  <Space>
                    <DatabaseOutlined style={{ color: "var(--ifm-color-primary)" }} />
                    <Translate id="title.dataManagement">数据管理</Translate>
                  </Space>
                }>
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  {/* Export Prompts */}
                  <Flex justify="space-between" align="center" style={{ padding: "12px 0", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>
                    <Flex align="center" gap={20}>
                      <Avatar
                        icon={<DownloadOutlined />}
                        style={{
                          backgroundColor: "var(--ifm-color-emphasis-100)",
                          color: "var(--ifm-color-primary)",
                          border: "1px solid var(--ifm-color-emphasis-200)",
                        }}
                      />
                      <div>
                        <Text strong>
                          <Translate id="button.exportPrompts">导出提示词</Translate>
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <Translate id="description.exportPrompts.short">导出为 JSON 文件，方便备份</Translate>
                        </Text>
                      </div>
                    </Flex>
                    <Button icon={<DownloadOutlined />} onClick={handleExportPrompts} disabled={!userAuth?.data?.items?.some((item) => item.type === "prompt" || item.type === "favorite")}>
                      <Translate id="button.export">导出数据</Translate>
                    </Button>
                  </Flex>

                  {/* Import Prompts */}
                  <Flex justify="space-between" align="center" style={{ padding: "12px 0", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>
                    <Flex align="center" gap={20}>
                      <Avatar
                        icon={<ImportOutlined />}
                        style={{
                          backgroundColor: "var(--ifm-color-emphasis-100)",
                          color: "var(--ifm-color-primary)",
                          border: "1px solid var(--ifm-color-emphasis-200)",
                        }}
                      />
                      <div>
                        <Text strong>
                          <Translate id="button.importPrompts">导入提示词</Translate>
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <Translate id="description.importPrompts.short">从 JSON 文件导入提示词和收藏</Translate>
                        </Text>
                      </div>
                    </Flex>
                    <Button icon={<ImportOutlined />} loading={importing} onClick={() => fileInputRef.current?.click()}>
                      <Translate id="button.import">导入数据</Translate>
                    </Button>
                  </Flex>

                  {/* Clear Cache */}
                  <Flex justify="space-between" align="center" style={{ padding: "12px 0" }}>
                    <Flex align="center" gap={20}>
                      <Avatar
                        icon={<DeleteOutlined />}
                        style={{
                          backgroundColor: "var(--ifm-color-emphasis-100)",
                          color: "var(--ifm-color-primary)",
                          border: "1px solid var(--ifm-color-emphasis-200)",
                        }}
                      />
                      <div>
                        <Text strong>
                          <Translate id="button.clearCache">清除缓存</Translate>
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
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
            </Space>
          </Col>
        </Row>
      </main>
      <input type="file" ref={fileInputRef} accept=".json" style={{ display: "none" }} onChange={handleImportPrompts} />
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
