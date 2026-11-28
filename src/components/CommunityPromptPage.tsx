import React, { Suspense, useContext, useCallback, useMemo, useState, useEffect } from "react";
import { Space, Flex, Row, Col, Button, Skeleton } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined, UpOutlined, DownOutlined, HomeOutlined, FileSearchOutlined, WarningOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CopyButton } from "@site/src/components/CopyButton";
import { PromptPlaceholderBar } from "@site/src/components/PromptPlaceholderBar";
import { SiteBreadcrumb } from "@site/src/components/SiteBreadcrumb";
import { TransverseAdSlot } from "@site/src/components/TransverseAdSlot";
import { SharePopoverButton } from "@site/src/components/SharePopoverButton";
import { AuthContext } from "./AuthContext";
import { useFavorite } from "@site/src/hooks/useFavorite";
import { extractPlaceholders, applyPlaceholders, getPlaceholderValue, renderPromptWithPlaceholders, estimateTokens } from "@site/src/utils/promptRender";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";
import { EmptyState } from "@site/src/components/EmptyState";
import { ActionLink } from "@site/src/components/ActionLink";
import { toBcp47 } from "@site/src/utils/i18n";
import { lazyWithRetry } from "@site/src/utils/lazyRetry";
import { DeferredComments } from "./DeferredComments";

const LoginModal = lazyWithRetry(() =>
  import("@site/src/components/user/LoginModal").then((m) => ({ default: m.LoginModal })),
);
// 与社区列表页（pages/community-prompts.tsx）同一份登录表单，同样只在未登录用户点
// 点赞/收藏时才挂载并拉 chunk。

interface CommunityPromptPageProps {
  prompt: CommunityPrompt | null;
  loading?: boolean;
  error?: Error | null;
  /** 内容确实不存在（作者取消分享 / 已删除 / 无效 id）——与「加载失败」区分开 */
  notFound?: boolean;
  /** 加载失败时点「重试」触发重新拉取 */
  onRetry?: () => void;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
  /** 该条是否有构建期静态页（由 CommunityPromptDetail 算好传入），决定 canonical 形态 */
  hasStaticPage?: boolean;
}

const monoNum: React.CSSProperties = { fontVariantNumeric: "tabular-nums" };

// Eyebrow caption (mono uppercase tertiary) — 4 处复用
const Eyebrow = ({ children }: { children: React.ReactNode }) => <span className="comp-sheet-eyebrow">{children}</span>;
const Dot = () => <span style={{ opacity: 0.5 }}>·</span>;

function CommunityPromptPage({ prompt, loading, error, notFound, onRetry, onVote, hasStaticPage }: CommunityPromptPageProps) {
  const { userAuth, getUserAuth } = useContext(AuthContext);
  const { siteConfig, i18n } = useDocusaurusContext();
  const { toggleFavorite } = useFavorite();
  const [loginOpen, setLoginOpen] = useState(false);

  // schema.org / 数字格式化都要 BCP-47：读 localeConfigs.htmlLang（覆盖 ind→id 这种历史命名）
  const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);

  // 投票控件的 title / aria-label 需要纯字符串（不能塞 <Translate> 节点），复用已有词条
  const upvoteLabel = translate({ id: "action.upvote", message: "赞" });
  const downvoteLabel = translate({ id: "action.downvote", message: "踩" });
  const voteLabel = `${upvoteLabel} / ${downvoteLabel}`;

  // 所有 hook 都必须在 early return 之前调用（React 的 rules-of-hooks）
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const isFavorite = userAuth?.data?.favorites?.commLoves?.includes(prompt?.id);

  // 外层 eyebrow 显示 «讨论 · N» —— 由内层 Comments 通过 onCountChange 回传
  const [commentCount, setCommentCount] = useState(0);

  // 字符/token 统计 + 占位符交互状态：放在 early return 之前，避免 loading/error 路径跳过 hook
  const rawPrompt = prompt?.description || "";
  const charCount = rawPrompt.length;
  const tokenCount = useMemo(() => estimateTokens(rawPrompt), [rawPrompt]);

  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  const [focusState, setFocusState] = useState<{ key: string | null; nonce: number }>({ key: null, nonce: 0 });

  useEffect(() => {
    setPlaceholderValues({});
    setFocusState({ key: null, nonce: 0 });
  }, [prompt?.id, rawPrompt]);

  const placeholders = useMemo(() => extractPlaceholders(rawPrompt), [rawPrompt]);
  const hasFilledValues = useMemo(
    () => placeholders.some((key) => Boolean(getPlaceholderValue(placeholderValues, key)?.trim())),
    [placeholders, placeholderValues],
  );
  const filledPrompt = useMemo(() => applyPlaceholders(rawPrompt, placeholderValues), [rawPrompt, placeholderValues]);

  const handleSelectPlaceholder = useCallback((key: string) => {
    setFocusState((prev) => ({ key, nonce: prev.nonce + 1 }));
  }, []);
  const handlePlaceholderChange = useCallback((key: string, val: string) => {
    setPlaceholderValues((prev) => ({ ...prev, [key]: val }));
  }, []);
  const handleClearPlaceholders = useCallback(() => {
    setPlaceholderValues({});
  }, []);
  const renderedPrompt = useMemo(
    () => renderPromptWithPlaceholders(rawPrompt, { values: placeholderValues, onSelectPlaceholder: handleSelectPlaceholder }),
    [rawPrompt, placeholderValues, handleSelectPlaceholder],
  );

  const handleToggleFavorite = useCallback(() => {
    // 读权威值而不是渲染态：applyAuth 经 startTransition 发布，state 会滞后一帧，
    // 后台 SWR 刷新落地的瞬间用 userAuth 判登录会把已登录用户弹进登录框。
    // 同 pages/community-prompts.tsx 的 vote() 写法，也与下面 isFavorite 只能用于展示同理。
    if (!getUserAuth()) {
      // 只 toast 是个死胡同：该页除评论框外没有登录入口，导航栏也没有，/user 会把未登录
      // 用户弹回首页。列表页早就是弹登录框，这里与它对齐。
      setLoginOpen(true);
      return;
    }
    if (prompt?.id) {
      // 是否已收藏由 useFavorite 内部用权威值判定，这里不能读渲染期的 isFavorite
      toggleFavorite(prompt.id, true);
    }
  }, [getUserAuth, prompt?.id, toggleFavorite]);

  const handleVote = useCallback(
    (action: "upvote" | "downvote") => {
      if (!getUserAuth()) {
        setLoginOpen(true);
        return;
      }
      if (prompt?.id && onVote) {
        onVote(prompt.id, action);
      }
    },
    [getUserAuth, prompt?.id, onVote],
  );

  // Loading state — 与正常态共用 Card 容器，零跳变
  if (loading) {
    return (
      <Layout title={translate({ id: "community.loading", message: "加载中…" })}>
        <main style={{ minHeight: "100vh" }}>
          <Row justify="center" style={{ marginTop: 16, marginBottom: 24, paddingInline: 12 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
            <div style={{ height: 22, marginBottom: 12 }} aria-hidden="true" />
            <div className="comp-sheet-card" aria-busy="true">
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
            </div>
          </Col>
        </Row>
        </main>
      </Layout>
    );
  }

  // 加载失败态：内容可能真实存在（网络抖动 / 服务故障），不能冒充「未找到」，
  // 也不能注入 noindex —— 那会把一次临时故障变成永久性的收录排除。
  if (error) {
    return (
      <Layout title={translate({ id: "community.fetchError", message: "获取数据失败" })}>
        <main>
          <EmptyState
            fullPage
            icon={<WarningOutlined />}
            title={<Translate id="community.fetchError">获取数据失败</Translate>}
            description={<Translate id="community.fetchErrorDesc">网络或服务暂时不可用，请稍后重试</Translate>}
            action={
              <Button type="primary" onClick={onRetry}>
                <Translate id="action.retry">重试</Translate>
              </Button>
            }
          />
        </main>
      </Layout>
    );
  }

  // 未找到态：内容确实不存在（无效 id / 已删除 / 取消分享）
  if (notFound || !prompt) {
    return (
      <Layout title={translate({ id: "community.notFound", message: "提示词未找到" })}>
        <Head>
          {/* CSR 注入：仅裸路径 / 无效 id / 已删除 prompt 渲染到这里。
              noindex 不能写在静态壳（src/pages/community-prompt.tsx）——
              那会连带所有 ?id= URL 一起被排除收录且阻止 Google 渲染 JS。
              Google 渲染后读到这里的 noindex，会把无效 URL 排除；
              有效 ?id= 走下方正常分支，靠 per-id canonical/og 被收录。 */}
          <meta name="robots" content="noindex" />
        </Head>
        <main>
          <EmptyState
            fullPage
            icon={<FileSearchOutlined />}
            title={<Translate id="community.notFound">提示词未找到</Translate>}
            description={<Translate id="community.notFoundDesc">该提示词可能已被删除或设为私有</Translate>}
            action={
              <ActionLink to="/community-prompts" variant="primary">
                <Translate id="community.backToList">返回列表</Translate>
              </ActionLink>
            }
          />
        </main>
      </Layout>
    );
  }

  const seoTitle = `${prompt.title} - ${translate({ id: "community.seoSuffix", message: "社区提示词" })}`;
  const seoDescription = prompt.remark || prompt.description?.substring(0, 160) || "";

  // Canonical 按 locale 自指：UGC 正文虽不随 locale 翻译，但 UI 框架是翻译的——
  // 若全部 canonical 合并到根路径，Google 只收录中文界面版，英文搜索用户
  // 点进来满屏中文导航/按钮。权衡：接受跨 locale 的正文重复（Google 会自行聚类挑选），
  // 换取各语言用户落地到本地化界面。与 sitemap 的 per-locale 注入保持一致。
  // 默认 locale 且静态化开关打开（docusaurus.config.js 的 COMMUNITY_STATIC_PAGES，经
  // customFields 透过来）→ canonical 指向构建期直出正文的 /community-prompt/<id>。
  // ?id= 的 CSR 壳也这么指，把 Search Console 里那 587 个 ?id= URL 收敛到静态页那一份。
  // 站内卡片链接**故意仍用 ?id=**：列表页最新的条目正是上次构建之后才出现、还没有静态页的，
  // 链过去就是 404；而卡片点击是客户端路由，CrUX 不计，静态页对它没有收益。
  // 开关关闭 / 非默认 locale / 读不到 customFields → 自指 ?id=，与静态化之前完全一致。
  // 静态页只在默认 locale 存在，且只有被选中的那 2000 条有（EdgeOne 20000 文件上限，
  // 见 scripts/genCommunitySelection.mjs）。没静态页就自指 ?id=，
  // 否则就是 canonical 到 404 —— 实测踩过 /community-prompt/15501。
  const canonicalToStatic = hasStaticPage === true && siteConfig.customFields?.communityStaticPages === true && i18n.currentLocale === i18n.defaultLocale;
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  const canonicalUrl = `${siteConfig.url}${localePrefix}${canonicalToStatic ? `/community-prompt/${prompt.id}` : `/community-prompt?id=${prompt.id}`}`;

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
      <main>
        <Row justify="center" style={{ marginTop: 16, marginBottom: 24, paddingInline: 12 }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16} className="full-width-col">
            <SiteBreadcrumb
              items={[
                {
                  to: "/",
                  title: (
                    <>
                      <HomeOutlined />
                      <span>
                        <Translate id="link.home">首页</Translate>
                      </span>
                    </>
                  ),
                },
                {
                  to: "/community-prompts",
                  title: <Translate id="link.communityPrompts">社区提示词</Translate>,
                },
                { title: prompt.title },
              ]}
              style={{ marginBottom: 12 }}
            />

          <div className="comp-sheet-card">
            <Flex vertical gap={24}>
              {/* HERO: title + meta line（owner · chars · tokens 用 Space split 串起来） */}
              <Flex vertical gap={10}>
                <h1 className="comp-sheet-title">{prompt.title}</h1>
                <Space separator={<Dot />} wrap style={{ fontSize: 11.5, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)" }}>
                  {prompt.owner && (
                    <span>
                      <UserOutlined style={{ marginInlineEnd: 4 }} />
                      {prompt.owner}
                    </span>
                  )}
                  {/* 显式传页面 locale：裸 toLocaleString() 跟的是宿主 locale，会和界面语言错配 */}
                  <span style={monoNum}>
                    {charCount.toLocaleString(bcp47Locale)} <Translate id="prompt.charsLabel">字符</Translate>
                  </span>
                  <span style={monoNum}>≈ {tokenCount.toLocaleString(bcp47Locale)} tokens</span>
                </Space>
              </Flex>

              {/* REMARK: sage 左竖线引语 */}
              {prompt.remark && <blockquote className="comp-sheet-remark">{prompt.remark}</blockquote>}

              {/* PROMPT BODY: 工作台预览框 + 变量直填 */}
              <Flex vertical gap={14}>
                <Flex justify="space-between" align="center" wrap gap={12}>
                  <Eyebrow>
                    <Translate id="prompt.content">提示词内容</Translate>
                  </Eyebrow>
                  <CopyButton text={filledPrompt} variant="primary" size="large">
                    {hasFilledValues ? <Translate id="prompt.copyFilled">复制已填内容</Translate> : undefined}
                  </CopyButton>
                </Flex>
                <PromptPlaceholderBar
                  placeholders={placeholders}
                  values={placeholderValues}
                  onChange={handlePlaceholderChange}
                  onClear={handleClearPlaceholders}
                  focusKey={focusState.key}
                  focusNonce={focusState.nonce}
                />
                <div className="comp-sheet-code">{renderedPrompt}</div>
              </Flex>

              {/* AUTHOR'S NOTE */}
              {prompt.notes && (
                <div
                  style={{
                    padding: "14px 16px",
                    background: "var(--site-color-preview-bg)",
                    borderRadius: 10,
                    border: "1px solid var(--site-color-hairline)",
                  }}>
                  <Eyebrow>
                    <Translate id="prompt.authorNote">作者备注</Translate>
                  </Eyebrow>
                  <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--ifm-color-content-secondary)" }}>
                    {prompt.notes}
                  </p>
                </div>
              )}

              {/* ACTIONS: vote pill + favorite + share */}
              <Flex justify="space-between" align="center" wrap gap={8} style={{ paddingTop: 4 }}>
                <Space size="small" wrap>
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

                  <Button
                    icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleToggleFavorite}
                    aria-pressed={isFavorite}
                    className="comp-sheet-fav-btn">
                    <Translate id="common.favorites">收藏</Translate>
                  </Button>
                </Space>

                <SharePopoverButton shareUrl={shareUrl} title={`${prompt.title}: ${prompt.remark || ""}`} placement="topRight" />
              </Flex>
            </Flex>
          </div>

          {/* 广告 — speedup 分支专属，置于主卡片与讨论区之间 */}
          <TransverseAdSlot style={{ marginTop: 24 }} />

          {/* DISCUSSION: 一条 hairline + eyebrow，count 由内层 Comments 回传 */}
          <Flex vertical gap={14} style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid var(--site-color-hairline)" }}>
            <Eyebrow>
              <Translate id="comments.heading">讨论</Translate>
              {commentCount > 0 && (
                <>
                  {" · "}
                  <span style={monoNum}>{commentCount}</span>
                </>
              )}
            </Eyebrow>
            <DeferredComments pageId={prompt.id} type="userprompt" onCountChange={setCommentCount} />
          </Flex>
        </Col>
      </Row>
      </main>
      {loginOpen && (
        <Suspense fallback={null}>
          <LoginModal open={loginOpen} onCancel={() => setLoginOpen(false)} />
        </Suspense>
      )}
    </Layout>
  );
}

export default CommunityPromptPage;
