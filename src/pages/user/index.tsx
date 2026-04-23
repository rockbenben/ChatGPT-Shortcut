import React, { useContext, useState, useCallback, useRef } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Card, Button, Space, Row, Col, Typography, App, Avatar, Popconfirm, Flex, Breadcrumb } from "antd";
import { HomeOutlined, DownloadOutlined, ImportOutlined, DatabaseOutlined, DeleteOutlined } from "@ant-design/icons";

import { AuthContext, AuthProvider } from "@site/src/components/AuthContext";
import { fetchCardsByIds } from "@site/src/api/homepage";

const LOCAL_FAVORITES_KEY = "local_favorites";
const LOCAL_PROMPTS_KEY = "local_user_prompts";
const LOCAL_ORDER_KEY = "local_myspace_order";
const LOCAL_TAGS_KEY = "local_custom_tags";

const { Text } = Typography;

const UserProfile = () => {
  const { userAuth, refreshUserAuth } = useContext(AuthContext);
  const { message } = App.useApp();
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const favoriteIds: number[] = userAuth?.data?.favorites?.loves || [];
  const userPrompts: any[] = userAuth?.data?.userprompts || [];

  // 导出：保留原版数据管理卡片的导出逻辑，数据源改为 localStorage
  const handleExportPrompts = useCallback(async () => {
    if (favoriteIds.length === 0 && userPrompts.length === 0) {
      message.warning(<Translate id="message.export.noPrompts">暂无提示词可导出</Translate>);
      return;
    }

    try {
      const cards = favoriteIds.length > 0 ? await fetchCardsByIds(favoriteIds, currentLanguage) : [];

      // 读取排序和标签数据
      const myspaceOrder: any[] = JSON.parse(localStorage.getItem(LOCAL_ORDER_KEY) || "[]");
      const tagsData = JSON.parse(localStorage.getItem(LOCAL_TAGS_KEY) || "{}");
      const customTags: any[] = tagsData.definitions || [];

      const exportData = {
        exportTime: new Date().toISOString(),
        prompts: userPrompts.map((prompt: any) => ({
          id: prompt.id,
          title: prompt.title,
          prompt: prompt.description,
          ...(prompt.remark && { remark: prompt.remark }),
          ...(prompt.notes && { notes: prompt.notes }),
        })),
        favorites: {
          card: favoriteIds,
          community: [],
        },
        favoriteDetails: cards.map((p: any) => {
          const langData = p[currentLanguage] || p["zh-Hans"] || p["en"] || {};
          return {
            id: p.id,
            source: "card" as const,
            ...(langData.title && { title: langData.title }),
            ...(langData.prompt && { prompt: langData.prompt }),
            ...(langData.remark && { remark: langData.remark }),
          };
        }),
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

  // 导入：解析 JSON 文件，合并收藏和自建提示词到 localStorage
  const handleImportPrompts = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      event.target.value = "";

      try {
        const content = await file.text();
        const parsed = JSON.parse(content);

        let prompts: any[] = [];
        let favoriteCardIds: number[] = [];
        let favoriteDetails: any[] = [];

        if (Array.isArray(parsed)) {
          prompts = parsed;
        } else if (parsed.prompts) {
          prompts = parsed.prompts;
          favoriteCardIds = parsed.favorites?.card || [];
          favoriteDetails = parsed.favoriteDetails || [];
        } else if (parsed.title && (parsed.prompt || parsed.description)) {
          prompts = [parsed];
        }

        prompts = prompts.map((p) => ({ ...p, description: p.prompt || p.description || "" })).filter((p) => p.title && p.description);

        // 社区收藏转为本地提示词（本地版无社区概念）
        const communityItems = favoriteDetails
          .filter((d: any) => d.source === "community" && d.title)
          .map((d: any) => ({
            title: d.title,
            description: d.prompt || "",
            remark: d.remark || "",
            notes: `从在线版社区收藏导入（原ID: ${d.id}）`,
          }));
        prompts = [...prompts, ...communityItems];

        if (prompts.length === 0 && favoriteCardIds.length === 0) {
          message.error(<Translate id="message.import.invalid">无效的数据格式</Translate>);
          return;
        }

        setImporting(true);

        // 合并自建提示词
        if (prompts.length > 0) {
          const existing: any[] = JSON.parse(localStorage.getItem(LOCAL_PROMPTS_KEY) || "[]");
          const existingTitles = new Set(existing.map((p) => p.title));
          const newPrompts = prompts
            .filter((p) => !existingTitles.has(p.title))
            .map((p) => ({
              ...p,
              id: p.id || Date.now() + Math.round(Math.random() * 100000),
              createdAt: p.createdAt || new Date().toISOString(),
            }));
          localStorage.setItem(LOCAL_PROMPTS_KEY, JSON.stringify([...newPrompts, ...existing]));
        }

        // 合并卡片收藏
        if (favoriteCardIds.length > 0) {
          const existingFavs: number[] = JSON.parse(localStorage.getItem(LOCAL_FAVORITES_KEY) || "[]");
          const existingSet = new Set(existingFavs);
          const merged = [...existingFavs, ...favoriteCardIds.filter((id) => !existingSet.has(id))];
          localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(merged));
        }

        // 恢复 MySpace 排序
        if (Array.isArray(parsed.myspaceOrder) && parsed.myspaceOrder.length > 0) {
          localStorage.setItem(LOCAL_ORDER_KEY, JSON.stringify(parsed.myspaceOrder));
        }

        // 合并自定义标签（追加新标签，不覆盖已有）
        if (Array.isArray(parsed.customTags) && parsed.customTags.length > 0) {
          const existing = JSON.parse(localStorage.getItem(LOCAL_TAGS_KEY) || "{}");
          const existingDefs: any[] = existing.definitions || [];
          const existingIds = new Set(existingDefs.map((t: any) => t.id));
          const newDefs = parsed.customTags.filter((t: any) => !existingIds.has(t.id));
          localStorage.setItem(LOCAL_TAGS_KEY, JSON.stringify({
            definitions: [...existingDefs, ...newDefs],
            itemTags: existing.itemTags || {},
          }));
        }

        setImporting(false);
        refreshUserAuth();
        message.success(<Translate id="message.import.success">导入成功！</Translate>);
      } catch (error) {
        setImporting(false);
        console.error("Import error:", error);
        message.error(<Translate id="message.import.parseError">JSON 解析失败，请检查文件格式</Translate>);
      }
    },
    [message, refreshUserAuth],
  );

  // 清除所有本地数据
  const handleClearCache = useCallback(async () => {
    localStorage.setItem(LOCAL_FAVORITES_KEY, "[]");
    localStorage.setItem(LOCAL_PROMPTS_KEY, "[]");
    refreshUserAuth();
    message.success(<Translate id="message.cache.cleared">数据已清除</Translate>);
  }, [refreshUserAuth, message]);

  return (
    <Layout title={translate({ id: "link.myAccount", message: "我的账户" })}>
      <main
        style={{
          minHeight: "calc(100vh - 60px)",
          padding: "24px 0",
        }}>
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={16} xl={14} className="full-width-col">
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
              {/* Breadcrumb Navigation — plain, no Card wrapper */}
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

              {/* Data Management Section — 保留原版样式，数据源替换为 localStorage */}
              <Card
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--ifm-color-emphasis-200)",
                  boxShadow: "var(--site-shadow-sm)",
                }}
                title={
                  <Space>
                    <DatabaseOutlined />
                    <Translate id="title.dataManagement">数据管理</Translate>
                  </Space>
                }>
                <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
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
                    <Button icon={<DownloadOutlined />} onClick={handleExportPrompts} disabled={favoriteIds.length === 0 && userPrompts.length === 0}>
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
                          <Translate id="button.clearCache">清除数据</Translate>
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <Translate id="description.clearCache.short">清空所有本地收藏和自建提示词</Translate>
                        </Text>
                      </div>
                    </Flex>
                    <Popconfirm
                      title={<Translate id="modal.clearCache.title">确认清除？</Translate>}
                      description={
                        <Text type="warning">
                          <Translate id="modal.clearCache.warning">清除后将删除所有本地收藏和自建提示词数据。</Translate>
                        </Text>
                      }
                      onConfirm={handleClearCache}
                      okText={<Translate id="button.confirm">确认清除</Translate>}
                      okButtonProps={{ danger: true }}
                      cancelText={<Translate id="action.cancel">取消</Translate>}
                      placement="topRight">
                      <Button danger icon={<DeleteOutlined />}>
                        <Translate id="button.clearAllCache">清除所有数据</Translate>
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
