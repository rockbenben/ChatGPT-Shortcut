import React, { Suspense, useContext, useCallback } from "react";
import { Card, Typography, Tag, Space, Row, Col, Button, Flex, Skeleton, Divider, App, Result, Statistic } from "antd";
import { CopyOutlined, CheckOutlined, StarOutlined, StarFilled, UserOutlined, UpOutlined, DownOutlined, HomeOutlined, FireOutlined } from "@ant-design/icons";
import { gold } from "@ant-design/colors";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { AuthContext } from "./AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import Comments from "./Comments";
import { Breadcrumb } from "antd";

const ShareButtons = React.lazy(() => import("./ShareButtons"));

const { Title, Text } = Typography;

interface CommunityPromptPageProps {
  prompt: {
    id: number;
    title: string;
    description: string;
    remark?: string;
    notes?: string;
    owner?: string;
    upvotes?: number;
    downvotes?: number;
    upvoteDifference?: number;
  } | null;
  loading?: boolean;
  error?: Error | null;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
}

function CommunityPromptPage({ prompt, loading, error, onVote }: CommunityPromptPageProps) {
  const { userAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { copied, copyText } = useCopyToClipboard();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(prompt?.id);

  const handleCopy = useCallback(() => {
    if (prompt?.description) {
      copyText(prompt.description);
    }
  }, [copyText, prompt?.description]);

  const handleToggleFavorite = useCallback(() => {
    if (!userAuth) {
      messageApi.warning(translate({ id: "message.loginRequired", message: "请先登录" }));
      return;
    }
    if (prompt?.id) {
      if (isFavorite) {
        confirmRemoveFavorite(prompt.id, true);
      } else {
        addFavorite(prompt.id, true);
      }
    }
  }, [userAuth, prompt?.id, isFavorite, addFavorite, confirmRemoveFavorite, messageApi]);

  const handleVote = useCallback(
    (action: "upvote" | "downvote") => {
      if (!userAuth) {
        messageApi.warning(translate({ id: "message.loginRequired", message: "请先登录" }));
        return;
      }
      if (prompt?.id && onVote) {
        onVote(prompt.id, action);
      }
    },
    [userAuth, prompt?.id, onVote, messageApi],
  );

  // Loading state
  if (loading) {
    return (
      <Layout title={translate({ id: "community.loading", message: "加载中..." })}>
        <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Card variant="borderless" className="shadow--md" style={{ borderRadius: 12 }}>
              <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  // Error state
  if (error || !prompt) {
    return (
      <Layout title={translate({ id: "community.notFound", message: "提示词未找到" })}>
        <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Result
              status="404"
              title={translate({ id: "community.notFound", message: "提示词未找到" })}
              subTitle={translate({ id: "community.notFoundDesc", message: "该提示词可能已被删除或设为私有" })}
              extra={
                <Link to="/community-prompts">
                  <Button type="primary">
                    <Translate id="community.backToList">返回列表</Translate>
                  </Button>
                </Link>
              }
            />
          </Col>
        </Row>
      </Layout>
    );
  }

  const seoTitle = `${prompt.title} - ${translate({ id: "community.seoSuffix", message: "社区提示词" })}`;
  const seoDescription = prompt.remark || prompt.description?.substring(0, 160) || "";

  return (
    <Layout title={seoTitle} description={seoDescription}>
      <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Flex vertical gap="large" style={{ minHeight: 400 }}>
            {/* 提示词信息卡片 */}
            <Card variant="borderless" className="shadow--md" style={{ borderRadius: 12 }} styles={{ body: { padding: 24 } }}>
              <Flex vertical gap="small">
                {/* 面包屑导航 */}
                <Breadcrumb
                  items={[
                    {
                      title: (
                        <Link to="/" style={{ color: "var(--ifm-color-primary)" }}>
                          <HomeOutlined style={{ marginRight: 4 }} />
                          <Translate id="link.home">首页</Translate>
                        </Link>
                      ),
                    },
                    {
                      title: (
                        <Link to="/community-prompts" style={{ color: "var(--ifm-color-primary)" }}>
                          <Translate id="link.communityPrompts">社区提示词</Translate>
                        </Link>
                      ),
                    },
                    {
                      title: prompt.title,
                    },
                  ]}
                  style={{ marginBottom: 12 }}
                />

                {/* 头部：标题行 */}
                <Flex justify="space-between" align="flex-start" gap="middle" wrap="wrap">
                  {/* 标题 */}
                  <Title level={1} style={{ margin: 0, fontSize: "1.75rem", lineHeight: 1.3 }}>
                    {prompt.title}
                  </Title>

                  {/* 作者 + 投票统计 */}
                  <Flex gap={12} align="center" wrap="wrap">
                    {prompt.owner && (
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        <UserOutlined style={{ marginRight: 4 }} />
                        {prompt.owner}
                      </Text>
                    )}
                    <Statistic
                      value={prompt.upvoteDifference || 0}
                      prefix={<FireOutlined style={{ color: "var(--ifm-color-danger)" }} />}
                      styles={{ content: { fontSize: 14, color: "var(--ifm-color-emphasis-500)" } }}
                    />
                  </Flex>
                </Flex>

                {/* 描述/备注 - Quote Style */}
                {prompt.remark && (
                  <div style={{ marginTop: 12, borderLeft: "4px solid var(--ifm-color-primary)", paddingLeft: 16 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                      {prompt.remark}
                    </Typography.Text>
                  </div>
                )}

                {/* 提示词内容 */}
                <div>
                  {/* Action Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      <Translate id="prompt.content">Prompt 内容</Translate>
                    </Typography.Text>
                    <Space>
                      <Button type={copied ? "primary" : "default"} icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy}>
                        {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制</Translate>}
                      </Button>
                    </Space>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--ifm-color-emphasis-100)",
                      borderRadius: 12,
                      padding: 24,
                    }}>
                    <Typography.Paragraph
                      copyable={{
                        text: prompt.description,
                        tooltips: false,
                      }}
                      style={{
                        fontFamily: "'SF Mono', 'Menlo', 'Consolas', 'Courier New', monospace",
                        fontSize: 14,
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "var(--ifm-color-content)",
                        margin: 0,
                      }}>
                      {prompt.description}
                    </Typography.Paragraph>
                  </div>

                  {/* 备注信息 */}
                  {prompt.notes && (
                    <Typography.Paragraph
                      type="secondary"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                        marginTop: 24,
                      }}>
                      {prompt.notes}
                    </Typography.Paragraph>
                  )}
                </div>

                <Divider />

                {/* 底部：操作按钮 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap="small">
                  <Space size="middle">
                    {/* 投票按钮 */}
                    <Button icon={<UpOutlined />} onClick={() => handleVote("upvote")}>
                      <Translate id="action.upvote">赞</Translate> {prompt.upvotes || 0}
                    </Button>
                    <Button icon={<DownOutlined />} onClick={() => handleVote("downvote")}>
                      <Translate id="action.downvote">踩</Translate> {prompt.downvotes || 0}
                    </Button>

                    {/* 收藏按钮 */}
                    <Button icon={isFavorite ? <StarFilled style={{ color: gold[5] }} /> : <StarOutlined />} onClick={handleToggleFavorite} type={isFavorite ? "primary" : "default"}>
                      {isFavorite ? <Translate id="action.removeFavorite">取消收藏</Translate> : <Translate id="common.favorites">收藏</Translate>}
                    </Button>
                  </Space>

                  <Suspense fallback={null}>
                    <div className="social-buttons-grayscale">
                      <ShareButtons shareUrl={shareUrl} title={`${prompt.title}: ${prompt.remark || ""}`} popOver={true} />
                    </div>
                  </Suspense>
                </Flex>
              </Flex>
            </Card>

            {/* 评论区卡片 */}
            <Suspense fallback={null}>
              <Card variant="borderless" className="shadow--md" style={{ minHeight: 480, borderRadius: 12 }}>
                <Comments pageId={prompt.id} type="userprompt" />
              </Card>
            </Suspense>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}

export default CommunityPromptPage;
