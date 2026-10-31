import React, { Suspense, useContext, useCallback, useMemo } from "react";
import { Card, Typography, Space, Flex, Row, Col, Button, Skeleton, App, Breadcrumb, Popover } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined, UpOutlined, DownOutlined, HomeOutlined, ShareAltOutlined, FileSearchOutlined, WarningOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CopyButton } from "@site/src/components/CopyButton";
import { AuthContext } from "./AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { useOnlineUrl } from "@site/src/utils/onlineUrl";
import { renderPromptWithPlaceholders, estimateTokens } from "@site/src/utils/promptRender";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";
import { EmptyState } from "@site/src/components/EmptyState";
import { toBcp47 } from "@site/src/utils/i18n";
import { lazyOptional } from "@site/src/utils/lazyRetry";

const ShareButtons = lazyOptional(() => import("./ShareButtons"));
// 见 PromptPage 同名注释：静态 import 会把 Pagination + Form + react-markdown
// 全链拖进 eager common chunk，每个页面都要下载。

interface CommunityPromptPageProps {
  prompt: CommunityPrompt | null;
  loading?: boolean;
  error?: Error | null;
  /** 内容确实不存在（作者取消分享 / 已删除 / 无效 id）——与「加载失败」区分开 */
  notFound?: boolean;
  /** 加载失败时点「重试」触发重新拉取 */
  onRetry?: () => void;
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

function CommunityPromptPage({ prompt, loading, error, notFound, onRetry, onVote }: CommunityPromptPageProps) {
  const { userAuth, getUserAuth } = useContext(AuthContext);
  const { message: messageApi } = App.useApp();
  const { siteConfig, i18n } = useDocusaurusContext();
  const { toggleFavorite } = useFavorite();

  // schema.org / 数字格式化都要 BCP-47：读 localeConfigs.htmlLang（覆盖 ind→id 这种历史命名）
  const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);

  // 投票控件的 title / aria-label 需要纯字符串（不能塞 <Translate> 节点），复用已有词条
  const upvoteLabel = translate({ id: "action.upvote", message: "赞" });
  const downvoteLabel = translate({ id: "action.downvote", message: "踩" });
  const voteLabel = `${upvoteLabel} / ${downvoteLabel}`;

  // 所有 hook 都必须在 early return 之前调用（React 的 rules-of-hooks）
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const onlineCommunityUrl = useOnlineUrl("/community-prompts");
  const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(prompt?.id);
  // 自己的提示词不显示收藏按钮：toggleFavorite 本来就会拒绝（「不能收藏自己的提示词」），
  // 显示一个必定被拒的按钮只会让人怀疑到底成没成。离线版这一页展示的**全部**是自建
  // 提示词，因此收藏永远不适用；在线版看别人的社区提示词时照常显示。
  const isOwnPrompt = !!prompt?.id && !!userAuth?.data?.userprompts?.some((p: any) => p.id === prompt.id);

  // 字符/token 统计 + 占位符渲染：放在 early return 之前，避免 loading/error 路径跳过 useMemo 导致 hook 数量变化
  // renderedPrompt 解析 [xxx] 占位符，prompt 体可能上千字符，每次操作（复制/点赞/收藏）都重渲染会触发 regex 重跑
  const charCount = (prompt?.description || "").length;
  const tokenCount = useMemo(() => estimateTokens(prompt?.description || ""), [prompt?.description]);
  const renderedPrompt = useMemo(() => renderPromptWithPlaceholders(prompt?.description || ""), [prompt?.description]);

  const handleToggleFavorite = useCallback(() => {
    if (!getUserAuth()) {
      messageApi.warning(translate({ id: "message.loginRequired", message: "请先登录" }));
      return;
    }
    if (prompt?.id) {
      // 是否已收藏由 useFavorite 内部用权威值判定，这里不能读渲染期的 isFavorite
      toggleFavorite(prompt.id, true);
    }
  }, [getUserAuth, prompt?.id, toggleFavorite, messageApi]);

  const handleVote = useCallback(
    (action: "upvote" | "downvote") => {
      if (!getUserAuth()) {
        messageApi.warning(translate({ id: "message.loginRequired", message: "请先登录" }));
        return;
      }
      if (prompt?.id && onVote) {
        onVote(prompt.id, action);
      }
    },
    [getUserAuth, prompt?.id, onVote, messageApi],
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
                  <Skeleton.Input active size="small" style={{ width: 140 }} />
                  <Skeleton.Input active size="large" style={{ width: "60%" }} />
                </Flex>
                <Skeleton active paragraph={{ rows: 6 }} />
              </Flex>
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  // 加载失败态：内容可能真实存在（网络抖动 / 服务故障），不能冒充「未找到」
  if (error) {
    return (
      <Layout title={translate({ id: "community.fetchError", message: "获取数据失败" })}>
        <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
            <EmptyState
              icon={<WarningOutlined />}
              title={<Translate id="community.fetchError">获取数据失败</Translate>}
              description={<Translate id="community.fetchErrorDesc">网络或服务暂时不可用，请稍后重试</Translate>}
              action={
                onRetry ? (
                  <Button type="primary" onClick={onRetry}>
                    <Translate id="action.retry">重试</Translate>
                  </Button>
                ) : undefined
              }
            />
          </Col>
        </Row>
      </Layout>
    );
  }

  // 未找到态：内容确实不存在（无效 id / 已删除 / 取消分享）
  if (notFound || !prompt) {
    return (
      <Layout title={translate({ id: "community.notFound", message: "提示词未找到" })}>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
            <EmptyState
              icon={<FileSearchOutlined />}
              title={<Translate id="community.notFound">提示词未找到</Translate>}
              description={<Translate id="community.notFoundDesc">该提示词可能已被删除或设为私有</Translate>}
              // 回本地首页而不是主站社区：这个空状态出现在「本地提示词没找到」时
              // （旧书签、已删条目），用户想回的是自己的列表，把他送去互联网是答非所问。
              action={
                <Link to="/">
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

  // Canonical 按 locale 自指：UGC 正文虽不随 locale 翻译，但 UI 框架是翻译的——
  // 若全部 canonical 合并到根路径，Google 只收录中文界面版，英文搜索用户
  // 点进来满屏中文导航/按钮。权衡：接受跨 locale 的正文重复（Google 会自行聚类挑选），
  // 换取各语言用户落地到本地化界面。与 sitemap 的 per-locale 注入保持一致。
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  const canonicalUrl = `${siteConfig.url}${localePrefix}/community-prompt?id=${prompt.id}`;

  return (
    <Layout title={seoTitle} description={seoDescription}>
      <Head>
        {/* CSR-only：Docusaurus 默认对 SPA 路由 /community-prompt 只能发静态 canonical/og;
            JS 执行后用真实 ?id= 与 prompt 标题覆盖（Googlebot 执行 JS 会读到）。
            twitter: 与 og: 同时提供，因为 X 官方文档说 fallback「类似但不完全相同」 */}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Head>
      <Row justify="center" style={{ marginTop: 16, marginBottom: 24 }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/" style={{ color: "var(--site-color-tag-selected-text)" }}>
                    <HomeOutlined style={{ marginInlineEnd: 4 }} />
                    <Translate id="link.home">首页</Translate>
                  </Link>
                ),
              },
              {
                title: (
                  <a href={onlineCommunityUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--site-color-tag-selected-text)" }}>
                    <Translate id="link.communityPrompts">社区提示词</Translate>
                  </a>
                ),
              },
              {
                title: prompt.title,
              },
            ]}
            style={{ marginBottom: 12, fontSize: 13 }}
          />

          <Card variant="outlined" style={sheetCardStyle} styles={{ body: sheetCardBodyStyle }}>
            <Flex vertical gap={24}>
              {/* TOP META ROW: eyebrow (id + author) + reading metrics */}
              <Flex justify="space-between" align="center" wrap gap={8}>
                <Eyebrow>
                  <span>#{prompt.id}</span>
                  {prompt.owner && (
                    <>
                      <Dot />
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <UserOutlined />
                        {prompt.owner}
                      </span>
                    </>
                  )}
                </Eyebrow>
                <Eyebrow>
                  <span style={monoNum}>{charCount.toLocaleString(bcp47Locale)}</span> <Translate id="prompt.chars">字</Translate>
                  <Dot />
                  <span style={monoNum}>~{tokenCount.toLocaleString(bcp47Locale)}</span> tokens
                </Eyebrow>
              </Flex>

              {/* TITLE: clamp 字体大小，居左自流 */}
              <h1 className="comp-sheet-title">{prompt.title}</h1>

              {/* REMARK: 带背景的左竖线引语 */}
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
                    borderInlineStart: "2px solid var(--site-color-hairline)",
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
                {/* 投票依赖服务端计数，跟 CommunityCard 一样只在调用方传了 onVote 时才渲染；
                    离线版的 community-prompt 页不传，整个 vote pill 自然不出现。 */}
                {(onVote || !isOwnPrompt) && (
                <Space size="small" wrap>
                  {onVote && (
                  <>
                  {/* Asymmetric vote pill：▲ 永远带数字（主信号），▼ 在 downvotes=0 时 icon-only 弱化 */}
                  {/* 原来是硬编码中文「N 上 / N 下」，18 种语言照发；改用已有译文 */}
                  <div
                    className="comp-sheet-vote"
                    role="group"
                    aria-label={voteLabel}
                    title={`${prompt.upvotes ?? 0} ${upvoteLabel} / ${prompt.downvotes ?? 0} ${downvoteLabel}`}>
                    <Button
                      type="text"
                      size="small"
                      icon={<UpOutlined />}
                      onClick={() => handleVote("upvote")}
                      aria-label={upvoteLabel}
                      className="comp-sheet-vote-btn comp-sheet-vote-up">
                      <span style={monoNum}>{prompt.upvotes ?? 0}</span>
                    </Button>
                    <Button
                      type="text"
                      size="small"
                      icon={<DownOutlined />}
                      onClick={() => handleVote("downvote")}
                      aria-label={downvoteLabel}
                      className={"comp-sheet-vote-btn comp-sheet-vote-down" + ((prompt.downvotes ?? 0) > 0 ? "" : " comp-sheet-vote-icon-only")}>
                      {(prompt.downvotes ?? 0) > 0 && <span style={monoNum}>{prompt.downvotes}</span>}
                    </Button>
                  </div>
                  </>
                  )}

                  {!isOwnPrompt && (
                  <Button
                    icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleToggleFavorite}
                    aria-pressed={isFavorite}
                    className="comp-sheet-fav-btn">
                    <Translate id="common.favorites">收藏</Translate>
                  </Button>
                  )}
                </Space>
                )}

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

            {/* 离线版不嵌讨论区：Comments 依赖后端存取评论，这条线没有后端。
                在线版这里是 hairline + eyebrow «讨论 · N» + <Comments>。 */}
        </Col>
      </Row>
    </Layout>
  );
}

export default CommunityPromptPage;
