import React, { Suspense, useContext, useCallback, useMemo, useState } from "react";
import { Card, Typography, Space, Flex, Row, Col, Button, Skeleton, App, Result, Breadcrumb, Popover } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined, UpOutlined, DownOutlined, HomeOutlined, ShareAltOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CopyButton } from "@site/src/components/CopyButton";
import { AuthContext } from "./AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { renderPromptWithPlaceholders, estimateTokens } from "@site/src/utils/promptRender";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";
import Comments from "./Comments";

const ShareButtons = React.lazy(() => import("./ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

interface CommunityPromptPageProps {
  prompt: CommunityPrompt | null;
  loading?: boolean;
  error?: Error | null;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
}

// Card 容器复用：6px hairline，与 PromptCard 同家族
const sheetCardStyle: React.CSSProperties = {
  borderRadius: 6,
  borderColor: "var(--site-color-hairline)",
  background: "var(--ifm-background-surface-color)",
};
const sheetCardBodyStyle: React.CSSProperties = {
  padding: "clamp(20px, 3vw, 32px)",
};
const monoNum: React.CSSProperties = { fontVariantNumeric: "tabular-nums" };

// Eyebrow caption (mono uppercase tertiary) — 4 处复用
const Eyebrow = ({ children }: { children: React.ReactNode }) => <span className="comp-sheet-eyebrow">{children}</span>;
const Dot = () => <span style={{ opacity: 0.5 }}>·</span>;

function CommunityPromptPage({ prompt, loading, error, onVote }: CommunityPromptPageProps) {
  const { userAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { siteConfig, i18n } = useDocusaurusContext();
  const { addFavorite, confirmRemoveFavorite } = useFavorite();

  // 所有 hook 都必须在 early return 之前调用（React 的 rules-of-hooks）
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(prompt?.id);

  // 外层 eyebrow 显示 «讨论 · N» —— 由内层 Comments 通过 onCountChange 回传
  const [commentCount, setCommentCount] = useState(0);

  // 字符/token 统计 + 占位符渲染：放在 early return 之前，避免 loading/error 路径跳过 useMemo 导致 hook 数量变化
  // renderedPrompt 解析 {{var}} 占位符，prompt 体可能上千字符，每次操作（复制/点赞/收藏）都重渲染会触发 regex 重跑
  const charCount = (prompt?.description || "").length;
  const tokenCount = useMemo(() => estimateTokens(prompt?.description || ""), [prompt?.description]);
  const renderedPrompt = useMemo(() => renderPromptWithPlaceholders(prompt?.description || ""), [prompt?.description]);


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

  // Loading state — 与正常态共用 Card 容器，零跳变
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
                <Flex justify="space-between" align="center" wrap gap={8}>
                  <Space size="small">
                    <Skeleton.Button active style={{ width: 120, height: 36 }} />
                    <Skeleton.Button active style={{ width: 90, height: 36 }} />
                  </Space>
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

  // Canonical 自指 ?id= 路径（每条 prompt 在每个 locale 都有自己的页面）
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  const canonicalUrl = `${siteConfig.url}${localePrefix}/community-prompt?id=${prompt.id}`;

  return (
    <Layout title={seoTitle} description={seoDescription}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Row justify="center" style={{ marginTop: 16, marginBottom: 24 }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
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
                    <Translate id="prompt.content">提示词内容</Translate>
                  </Eyebrow>
                  <CopyButton text={prompt?.description ?? ""} variant="primary" size="large" />
                </Flex>
                <div className="comp-sheet-code">{renderedPrompt}</div>
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

              {/* ACTIONS: vote pill + favorite + share */}
              <Flex justify="space-between" align="center" wrap gap={8} style={{ paddingTop: 4 }}>
                <Space size="small" wrap>
                  {/* Asymmetric vote pill：▲ 永远带数字（主信号），▼ 在 downvotes=0 时 icon-only 弱化 */}
                  <div className="comp-sheet-vote" role="group" aria-label="vote" title={`${prompt.upvotes ?? 0} 上 / ${prompt.downvotes ?? 0} 下`}>
                    <Button
                      type="text"
                      size="small"
                      icon={<UpOutlined />}
                      onClick={() => handleVote("upvote")}
                      aria-label="upvote"
                      className="comp-sheet-vote-btn comp-sheet-vote-up">
                      <span style={monoNum}>{prompt.upvotes ?? 0}</span>
                    </Button>
                    <Button
                      type="text"
                      size="small"
                      icon={<DownOutlined />}
                      onClick={() => handleVote("downvote")}
                      aria-label="downvote"
                      className={"comp-sheet-vote-btn comp-sheet-vote-down" + ((prompt.downvotes ?? 0) > 0 ? "" : " comp-sheet-vote-icon-only")}>
                      {(prompt.downvotes ?? 0) > 0 && <span style={monoNum}>{prompt.downvotes}</span>}
                    </Button>
                  </div>

                  <Button
                    icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleToggleFavorite}
                    aria-pressed={isFavorite}
                    className="comp-sheet-fav-btn">
                    <Translate id="common.favorites">收藏</Translate>
                  </Button>
                </Space>

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

          {/* 广告 — speedup 分支专属，置于主卡片与讨论区之间 */}
          <Suspense fallback={null}>
            <AdComponent type="transverse" />
          </Suspense>

          {/* DISCUSSION: 一条 hairline + eyebrow，count 由内层 Comments 回传 */}
          <Flex vertical gap={14} style={{ marginTop: 40, paddingTop: 22, borderTop: "1px solid var(--site-color-hairline)" }}>
            <Eyebrow>
              <Translate id="comments.heading">讨论</Translate>
              {commentCount > 0 && (
                <>
                  {" · "}
                  <span style={monoNum}>{commentCount}</span>
                </>
              )}
            </Eyebrow>
            <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
              <Comments pageId={prompt.id} type="userprompt" onCountChange={setCommentCount} />
            </Suspense>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}

export default CommunityPromptPage;
