import React, { Suspense, useMemo } from "react";
import { Card, Typography, Space, Flex, Row, Col, Button, Skeleton, Result, Breadcrumb, Popover } from "antd";
import { UserOutlined, HomeOutlined, ShareAltOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { CopyButton } from "@site/src/components/CopyButton";
import { renderPromptWithPlaceholders, estimateTokens } from "@site/src/utils/promptRender";

const ShareButtons = React.lazy(() => import("./ShareButtons"));

// offline 分支：仅展示本地 prompt detail。无 vote / favorite / auth / comments
// （这些都是联网功能，已全部移除）
interface CommunityPromptPageProps {
  prompt: {
    id: number;
    title: string;
    description: string;
    remark?: string;
    notes?: string;
    owner?: string;
  } | null;
  loading?: boolean;
  error?: Error | null;
}

// Card 容器复用：6px hairline，与 PromptCard 同家族
const sheetCardStyle: React.CSSProperties = {
  borderRadius: 6,
  borderColor: "var(--site-color-hairline)",
  background: "var(--ifm-background-surface-color)",
};
const sheetCardBodyStyle: React.CSSProperties = { padding: "clamp(20px, 3vw, 32px)" };
const monoNum: React.CSSProperties = { fontVariantNumeric: "tabular-nums" };

const Eyebrow = ({ children }: { children: React.ReactNode }) => <span className="comp-sheet-eyebrow">{children}</span>;
const Dot = () => <span style={{ opacity: 0.5 }}>·</span>;

function CommunityPromptPage({ prompt, loading, error }: CommunityPromptPageProps) {
  // 所有 hook 都必须在 early return 之前调用（React 的 rules-of-hooks）
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const charCount = (prompt?.description || "").length;
  const tokenCount = useMemo(() => estimateTokens(prompt?.description || ""), [prompt?.description]);

  // Loading state — composition sheet 同款骨架，零跳变
  if (loading) {
    return (
      <Layout title={translate({ id: "community.loading", message: "加载中..." })}>
        <Row justify="center" style={{ marginTop: 16, marginBottom: 24 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
            <div style={{ height: 22, marginBottom: 12 }} aria-hidden="true" />
            <Card variant="outlined" style={sheetCardStyle} styles={{ body: sheetCardBodyStyle }} aria-busy="true">
              <Flex vertical gap={24}>
                <Flex vertical gap={10}>
                  <Skeleton.Input active size="large" style={{ width: "min(80%, 360px)", height: 30 }} />
                  <Skeleton.Input active size="small" style={{ width: 240, height: 14 }} />
                </Flex>
                <Skeleton active title={false} paragraph={{ rows: 1, width: ["72%"] }} />
                <Flex vertical gap={14}>
                  <Flex justify="space-between" align="center" wrap gap={12}>
                    <Skeleton.Input active size="small" style={{ width: 80, height: 14 }} />
                    <Skeleton.Button active size="large" style={{ width: 140 }} />
                  </Flex>
                  <div className="comp-sheet-code">
                    <Skeleton active title={false} paragraph={{ rows: 6, width: ["100%", "94%", "100%", "86%", "100%", "68%"] }} />
                  </div>
                </Flex>
                <Flex justify="flex-end" wrap gap={8}>
                  <Skeleton.Button active style={{ width: 90, height: 36 }} />
                </Flex>
              </Flex>
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
                <Link to="/">
                  <Button type="primary">
                    <Translate id="link.home">首页</Translate>
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
              { title: prompt.title },
            ]}
            style={{ marginBottom: 12, paddingLeft: 8, paddingRight: 8 }}
          />

          <Card variant="outlined" style={sheetCardStyle} styles={{ body: sheetCardBodyStyle }}>
            <Flex vertical gap={24}>
              {/* HERO: title + meta line（owner · chars · tokens 用 Space split 串起来） */}
              <Flex vertical gap={10}>
                <Typography.Title level={1} className="comp-sheet-title">
                  {prompt.title}
                </Typography.Title>
                <Space separator={<Dot />} wrap style={{ fontSize: 11.5, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)" }}>
                  {prompt.owner && (
                    <span>
                      <UserOutlined style={{ marginRight: 4 }} />
                      {prompt.owner}
                    </span>
                  )}
                  <span style={monoNum}>
                    {charCount.toLocaleString()} <Translate id="prompt.charsLabel">字符</Translate>
                  </span>
                  <span style={monoNum}>≈ {tokenCount.toLocaleString()} tokens</span>
                </Space>
              </Flex>

              {/* REMARK: sage 左竖线引语 */}
              {prompt.remark && <blockquote className="comp-sheet-remark">{prompt.remark}</blockquote>}

              {/* PROMPT BODY: 上下 hairline，无外框 */}
              <Flex vertical gap={14}>
                <Flex justify="space-between" align="center" wrap gap={12}>
                  <Eyebrow>
                    <Translate id="prompt.content">Prompt 内容</Translate>
                  </Eyebrow>
                  <CopyButton text={prompt.description || ""} variant="primary" size="large" />
                </Flex>
                <div className="comp-sheet-code">{renderPromptWithPlaceholders(prompt.description || "")}</div>
              </Flex>

              {/* AUTHOR'S NOTE: 简易 ghost-border 容器 */}
              {prompt.notes && (
                <div
                  style={{
                    padding: "14px 16px",
                    background: "var(--site-color-ghost-border)",
                    borderRadius: 4,
                    borderLeft: "2px solid var(--site-color-hairline)",
                  }}>
                  <Eyebrow>
                    <Translate id="prompt.authorNote">作者备注</Translate>
                  </Eyebrow>
                  <Typography.Paragraph style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--ifm-color-content-secondary)" }}>
                    {prompt.notes}
                  </Typography.Paragraph>
                </div>
              )}

              {/* ACTIONS: offline 仅保留 share（vote / favorite 是联网，已全部移除） */}
              <Flex justify="flex-end" wrap gap={8} style={{ paddingTop: 4 }}>
                <Popover
                  trigger="click"
                  placement="topRight"
                  content={
                    <Suspense fallback={null}>
                      <ShareButtons shareUrl={shareUrl} title={`${prompt.title}: ${prompt.remark || ""}`} popOver={true} />
                    </Suspense>
                  }>
                  <Button icon={<ShareAltOutlined />} className="comp-sheet-share-btn">
                    <Translate id="action.share">分享</Translate>
                  </Button>
                </Popover>
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default CommunityPromptPage;
