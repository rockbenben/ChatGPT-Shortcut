import React, { Suspense, useContext, useCallback, useMemo } from "react";
import { Card, Typography, Tag, Space, Row, Col, Button, Flex, Skeleton, Divider, App, Result, Breadcrumb } from "antd";
import { CopyOutlined, CheckOutlined, HeartOutlined, HeartFilled, UserOutlined, UpOutlined, DownOutlined, HomeOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { AuthContext } from "./AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { renderPromptWithPlaceholders, estimateTokens } from "@site/src/utils/promptRender";
import Comments from "./Comments";

const ShareButtons = React.lazy(() => import("./ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

const { Title } = Typography;

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

  // 所有 hook 都必须在 early return 之前调用（React 的 rules-of-hooks）
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(prompt?.id);

  // 字符/token 统计：放在 early return 之前，避免 loading/error 路径跳过 useMemo 导致 hook 数量变化
  const charCount = (prompt?.description || "").length;
  const tokenCount = useMemo(() => estimateTokens(prompt?.description || ""), [prompt?.description]);

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
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
            <Card style={{ borderRadius: 12 }}>
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
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
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
      <Row justify="center" style={{ marginTop: 16, marginBottom: 24 }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
          {/* 面包屑挪到卡片外，与 PromptPage 保持一致的视觉层级 */}
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/" style={{ color: "var(--site-color-tag-selected-text)" }}>
                    <HomeOutlined style={{ marginRight: 4 }} />
                    <Translate id="link.home">首页</Translate>
                  </Link>
                ),
              },
              {
                title: (
                  <Link to="/community-prompts" style={{ color: "var(--site-color-tag-selected-text)" }}>
                    <Translate id="link.communityPrompts">社区提示词</Translate>
                  </Link>
                ),
              },
              { title: prompt.title },
            ]}
            style={{ marginBottom: 12, paddingLeft: 8, paddingRight: 8 }}
          />

          <Flex vertical gap="middle" style={{ minHeight: 400 }}>
            {/* 提示词主卡片 — 默认 antd border = hairline，无需额外 shadow */}
            <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 24 } }}>
              <Flex vertical gap="small">
                {/* 头部：标题 + owner（owner 作为右侧 meta 区） */}
                <Flex justify="space-between" align="flex-start" gap="middle" wrap="wrap">
                  <Title level={2} style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                    {prompt.title}
                  </Title>
                  {prompt.owner && <Tag icon={<UserOutlined />}>{prompt.owner}</Tag>}
                </Flex>

                {/* 描述/备注 - Quote Style */}
                {prompt.remark && (
                  <div className="prompt-remark" style={{ marginTop: 12, borderLeft: "4px solid var(--ifm-color-primary)", paddingLeft: 16 }}>
                    <Typography.Text style={{ fontSize: 13, color: "var(--ifm-color-content-secondary)", lineHeight: 1.55 }}>
                      {prompt.remark}
                    </Typography.Text>
                  </div>
                )}

                {/* 提示词内容 — Copy 升级为 large primary 主操作 */}
                <div>
                  <Flex justify="space-between" align="center" style={{ marginBottom: 12 }} wrap="wrap" gap="small">
                    <Typography.Text style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)" }}>
                      <Translate id="prompt.content">Prompt 内容</Translate>
                    </Typography.Text>
                    <Button type="primary" size="large" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy}>
                      {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制 Prompt</Translate>}
                    </Button>
                  </Flex>

                  {/* CodeSnippet 视觉包装 + 占位符高亮 — 深井效果对齐 Phase 2 Modal */}
                  <div
                    style={{
                      backgroundColor: "var(--ifm-background-color)",
                      borderRadius: 6,
                      padding: "20px 24px",
                      border: "1px solid var(--site-color-hairline)",
                    }}>
                    <div
                      style={{
                        fontFamily: "var(--site-font-mono)",
                        fontSize: 13,
                        lineHeight: 1.65,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "var(--ifm-color-content)",
                      }}>
                      {renderPromptWithPlaceholders(prompt.description || "")}
                    </div>
                  </div>

                  {/* 字符 + token 估算 — mono 数字对齐 */}
                  <Flex justify="space-between" align="center" style={{ marginTop: 8, fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>
                    <span>
                      {charCount} <Translate id="prompt.charsLabel">字符</Translate> · ≈ {tokenCount} tokens
                    </span>
                  </Flex>

                  {/* 备注信息 */}
                  {prompt.notes && (
                    <Typography.Paragraph
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "var(--ifm-color-content-secondary)",
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
                    {/* 投票按钮组 */}
                    <Space.Compact>
                      <Button icon={<UpOutlined />} onClick={() => handleVote("upvote")}>
                        <Translate id="action.upvote">赞</Translate> {prompt.upvotes || 0}
                      </Button>
                      <Button icon={<DownOutlined />} onClick={() => handleVote("downvote")}>
                        <Translate id="action.downvote">踩</Translate> {prompt.downvotes || 0}
                      </Button>
                    </Space.Compact>

                    {/* 收藏按钮 */}
                    <Button icon={isFavorite ? <HeartFilled style={{ color: "var(--site-color-svg-icon-favorite)" }} /> : <HeartOutlined />} onClick={handleToggleFavorite}>
                      {isFavorite ? <Translate id="action.removeFavorite">取消收藏</Translate> : <Translate id="common.favorites">收藏</Translate>}
                    </Button>
                  </Space>

                  <Suspense fallback={null}>
                    <ShareButtons shareUrl={shareUrl} title={`${prompt.title}: ${prompt.remark || ""}`} popOver={true} />
                  </Suspense>
                </Flex>
              </Flex>
            </Card>

            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>

            {/* 评论区卡片 */}
            <Suspense fallback={null}>
              <Card style={{ minHeight: 480, borderRadius: 12 }}>
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
