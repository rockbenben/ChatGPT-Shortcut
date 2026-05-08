import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Card, Typography, Space, Row, Col, Button, Flex, Breadcrumb, Popover } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined, FireFilled, HomeOutlined, ShareAltOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { getWeight, formatCompactNumber } from "@site/src/utils/formatters";
import { SITE_NAME } from "@site/src/data/constants";
import { fetchCardsByIds, type CardData } from "@site/src/api/homepage";
import { renderPromptWithPlaceholders, estimateTokens } from "@site/src/utils/promptRender";
import promptFaqData from "@site/src/data/meta_faqs.json";
// Comments removed for local version

const ShareButtons = React.lazy(() => import("./ShareButtons"));

// Composition Sheet 复用样式（与 CommunityPromptPage 保持家族一致）
const sheetCardStyle: React.CSSProperties = {
  borderRadius: 6,
  borderColor: "var(--site-color-hairline)",
  background: "var(--ifm-background-surface-color)",
};
const sheetCardBodyStyle: React.CSSProperties = { padding: "clamp(20px, 3vw, 32px)" };
const monoNum: React.CSSProperties = { fontVariantNumeric: "tabular-nums" };

const Eyebrow = ({ children }: { children: React.ReactNode }) => <span className="comp-sheet-eyebrow">{children}</span>;
const Dot = () => <span style={{ opacity: 0.5 }}>·</span>;

function PromptPage({ prompt, currentLanguage }) {
  const { copied, updateCopy } = useCopyToClipboard();
  const { siteConfig, i18n } = useDocusaurusContext();

  const promptInfo = prompt[currentLanguage] || prompt;

  // Item 10: prompt.related 由 CodeUpdateHandler.py 在 build-time 预计算并写入各 card JSON
  // 运行时仅用 IDs 拉取精简卡片数据
  const [related, setRelated] = useState<CardData[]>([]);
  useEffect(() => {
    const ids: number[] = Array.isArray((prompt as any).related) ? (prompt as any).related : [];
    if (ids.length === 0) return;
    let cancelled = false;
    fetchCardsByIds(ids, currentLanguage)
      .then((cards) => {
        if (cancelled) return;
        setRelated(cards.filter((c) => c.id !== prompt.id).slice(0, 3));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [prompt.id, currentLanguage]);

  // Item 8: 字符 / token 统计（useMemo 缓存）
  const charCount = useMemo(() => (promptInfo.prompt || "").length, [promptInfo.prompt]);
  const tokenCount = useMemo(() => estimateTokens(promptInfo.prompt || ""), [promptInfo.prompt]);

  // 静态值：单语言 JSON 数据在组件生命周期内不会变化
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = promptInfo.title;
  const remark = promptInfo.remark;
  const weight = getWeight(prompt);
  const website = prompt.website;
  const tags = prompt.tags;

  // SEO 字段
  const seoTitle = prompt.metaTitle?.trim() || `${title}-${remark}`;
  const seoDescription = prompt.metaDescription?.trim() || `${promptInfo.description || ""} ${promptInfo.prompt || ""}`.trim();

  // SSR 安全的绝对 URL（不依赖 window）
  const localePrefix = currentLanguage && currentLanguage !== i18n.defaultLocale ? `/${currentLanguage}` : "";
  const canonicalUrl = `${siteConfig.url}${localePrefix}/prompt/${prompt.id}`;

  // schema.org Article + BreadcrumbList + HowTo + FAQPage JSON-LD（Tier 1 GEO: 提升 LLM 引用率）
  const homeUrl = `${siteConfig.url}${localePrefix}/`;
  // datePublished/dateModified 用 build time，避免 Google "missing field" 警告
  const buildDate = (siteConfig.customFields?.buildDate as string) || new Date().toISOString();
  // 通过 @id 引用主页定义的 Organization / WebSite 实体（关联知识图谱）
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  // Tier 2: hreflang alternates — 对 LLM 和搜索引擎声明 18 locale 互为翻译
  // hreflang 必须是合法 BCP 47 代码，优先取 localeConfigs.htmlLang（覆盖 ind→id 这种历史命名）
  const hreflangAlternates = i18n.locales.map((loc) => {
    const pfx = loc === i18n.defaultLocale ? "" : `/${loc}`;
    const hreflang = i18n.localeConfigs?.[loc]?.htmlLang ?? loc;
    return { hreflang, href: `${siteConfig.url}${pfx}/prompt/${prompt.id}` };
  });

  // FAQ 结构：
  //   前 2 条：prompt-specific 定制内容，源自 src/data/meta_faqs.json
  //   第 3 条：通用"使用步骤"，所有 prompt 共享（包括在哪些 AI 模型里用）
  // 如果该 ID 尚未在 meta_faqs.json 里维护，前 2 条回退为通用模板
  const customFaqItems: { q: string; a: string }[] = (() => {
    const entry = (promptFaqData as any)[String(prompt.id)];
    if (!entry || typeof entry !== "object") return [];
    // locale 解析优先级：
    //   1. 精确 locale（user 当前语言）
    //   2. en（非中文 locale 的通用 fallback）
    //   3. zh-Hans / zh（中文 locale 的 fallback；仅在 en 也缺时用）
    const isZh = currentLanguage === "zh-Hans" || currentLanguage === "zh-Hant" || currentLanguage === "zh";
    const list = entry[currentLanguage] || (isZh ? entry["zh-Hans"] || entry["zh"] : entry["en"]) || entry["zh-Hans"] || entry["en"] || null;
    return Array.isArray(list) ? list.slice(0, 2) : [];
  })();

  const fallbackCustomFaq = [
    {
      q: translate({ id: "faq.scenario.q", message: "这个 prompt 适合什么场景使用？" }),
      a: translate({
        id: "faq.scenario.a",
        message: "适合完成与本页标题和说明相关的任务。若首次尝试效果不够理想，可以在占位符处提供更多上下文细节，或追加「请分步骤回答」「请举例说明」等约束词。",
      }),
    },
    {
      q: translate({ id: "faq.tips.q", message: "怎么优化输出质量？" }),
      a: translate({
        id: "faq.tips.a",
        message: "一是把 [占位符] 改得更具体（加风格、长度、领域等细节）；二是对不满意的回复追问「请改得更 X」；三是切换 Claude / GPT-4 / Gemini 等不同模型对比效果。",
      }),
    },
  ];

  const genericUsageFaq = {
    q: translate({ id: "faq.usage.q", message: "如何使用这个提示词？" }),
    a: translate({
      id: "faq.usage.a",
      message: "复制提示词，把方括号 [占位符] 替换成你的输入，然后粘贴到 ChatGPT、Claude、Gemini、DeepSeek、Qwen 或任意支持自然语言的对话式 AI 界面发送即可。",
    }),
  };

  const faqList = [...(customFaqItems.length >= 2 ? customFaqItems : fallbackCustomFaq), genericUsageFaq];

  const howToSteps = [
    { name: translate({ id: "howto.step1.name", message: "复制提示词" }), text: translate({ id: "howto.step1.text", message: "将提示词模板复制到剪贴板。" }) },
    { name: translate({ id: "howto.step2.name", message: "自定义占位符" }), text: translate({ id: "howto.step2.text", message: "用你的具体内容替换方括号 [占位符] 部分。" }) },
    { name: translate({ id: "howto.step3.name", message: "发送给 AI" }), text: translate({ id: "howto.step3.text", message: "粘贴到 ChatGPT、Claude、Gemini、DeepSeek 等对话式 AI 界面执行。" }) },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "HowTo"],
        headline: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        inLanguage: currentLanguage,
        datePublished: buildDate,
        dateModified: buildDate,
        image: { "@type": "ImageObject", url: `${siteConfig.url}/img/logo.png`, width: 200, height: 200 },
        keywords: Array.isArray(tags) ? tags.join(", ") : undefined,
        author: { "@id": orgId },
        publisher: { "@id": orgId },
        isPartOf: { "@id": websiteId },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        // Tier 1 GEO: prompt-specific semantic fields
        about: Array.isArray(tags) ? tags.map((t) => ({ "@type": "Thing", name: t })) : undefined,
        audience: {
          "@type": "Audience",
          audienceType: "AI practitioners, content creators, developers, students",
        },
        learningResourceType: "Prompt Template",
        educationalUse: "Prompt Engineering",
        genre: "AI Prompt",
        license: "https://creativecommons.org/licenses/by-sa/4.0/",
        copyrightHolder: { "@id": orgId },
        copyrightYear: new Date(buildDate).getFullYear(),
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".prompt-remark"] },
        // HowTo steps (composite Article + HowTo)
        totalTime: "PT1M",
        step: howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
        // Tier 4: 把 prompt body 标为可复用代码片段（CodeSnippet）
        hasPart: {
          "@type": "CreativeWork",
          additionalType: "https://schema.org/SoftwareSourceCode",
          text: promptInfo.prompt,
          encodingFormat: "text/plain",
          inLanguage: currentLanguage,
          name: title,
        },
        // Tier 5: 关联 tags 作为知识图谱实体
        mentions: Array.isArray(tags)
          ? tags.map((t) => ({
              "@type": "Thing",
              name: t,
              url: `${siteConfig.url}${localePrefix}/?tags=${encodeURIComponent(t)}`,
            }))
          : undefined,
      },
      // Tier 1: FAQPage
      {
        "@type": "FAQPage",
        mainEntity: [
          ...faqList.map((item) => ({
            "@type": "Question" as const,
            name: item.q,
            acceptedAnswer: { "@type": "Answer" as const, text: item.a },
          })),
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: homeUrl },
          { "@type": "ListItem", position: 2, name: title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <Layout title={seoTitle} description={seoDescription}>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:section" content="AI Prompt" />
        {Array.isArray(tags) && tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        <link rel="canonical" href={canonicalUrl} />
        {/* Tier 2: hreflang alternates — 对 LLM / 搜索引擎声明多语言版本 */}
        {hreflangAlternates.map((h) => (
          <link key={h.hreflang} rel="alternate" hrefLang={h.hreflang} href={h.href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteConfig.url}/prompt/${prompt.id}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Head>
      {/* 外层 Row：保持原有的居中 + 最大宽度约束（xl 约 66% container 宽度） */}
      <Row justify="center" style={{ marginTop: 16, marginBottom: 24 }}>
        <Col xs={24} sm={22} md={22} lg={20} xl={18} className="full-width-col">
          {/* 内层 Row：在约束后的宽度内做 75/25 三栏分布 */}
          <Row gutter={[24, 24]}>
            {/* 主内容列（75%） */}
            <Col xs={24} sm={24} md={18} lg={18} xl={18} className="full-width-col">
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
                  { title: title },
                ]}
                style={{ marginBottom: 12, paddingLeft: 8, paddingRight: 8 }}
              />

              {/* === Composition Sheet === */}
              <Card variant="outlined" style={sheetCardStyle} styles={{ body: sheetCardBodyStyle }}>
                <Flex vertical gap={24}>
                  {/* HERO: 双层 meta 按语义拆分
                        Layer 1（同行）: title 左 / tags 右上角对齐 — tags 是分类 metadata，与 title 同语义层
                        Layer 2（下行）: 🔥 weight · chars · tokens · 来源 — 数值 + 链接 metadata，独立 mono 行 */}
                  <Flex vertical gap={10}>
                    <Flex justify="space-between" align="flex-start" wrap gap={12}>
                      <Typography.Title level={1} className="comp-sheet-title" style={{ flex: 1, minWidth: 0 }}>
                        {title}
                      </Typography.Title>
                      {Array.isArray(tags) && tags.length > 0 && (
                        <Space size={4} wrap style={{ paddingTop: 6 }}>
                          {tags.map((tag) => (
                            <Link key={tag} to={`/?tags=${tag}&view=explore`} className="prompt-tag-link">
                              #{tag}
                            </Link>
                          ))}
                        </Space>
                      )}
                    </Flex>

                    <Space split={<Dot />} wrap style={{ fontSize: 11.5, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)" }}>
                      <span style={monoNum}>
                        <FireFilled style={{ marginRight: 4 }} />
                        {formatCompactNumber(weight as number)}
                      </span>
                      <span style={monoNum}>
                        {charCount.toLocaleString()} <Translate id="prompt.charsLabel">字符</Translate>
                      </span>
                      <span style={monoNum}>≈ {tokenCount.toLocaleString()} tokens</span>
                      {website && (
                        <Link to={website} target="_blank" rel="noopener noreferrer" title={website} className="prompt-tag-link">
                          <LinkOutlined style={{ marginRight: 4 }} />
                          <Translate id="prompt.source">来源</Translate>
                        </Link>
                      )}
                    </Space>
                  </Flex>

                  {/* REMARK */}
                  {remark && <blockquote className="comp-sheet-remark prompt-remark">{remark}</blockquote>}

                  {/* PROMPT BODY: 上下 hairline，schema CreativeWork microdata 保留 */}
                  <Flex vertical gap={14}>
                    <Flex justify="space-between" align="center" wrap gap={12}>
                      <Eyebrow>
                        <Translate id="prompt.content">Prompt 内容</Translate>
                      </Eyebrow>
                      <Button
                        type="primary"
                        size="large"
                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                        onClick={() => {
                          updateCopy(promptInfo.prompt, prompt.id);
                        }}>
                        {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制 Prompt</Translate>}
                      </Button>
                    </Flex>
                    <div itemScope itemType="https://schema.org/CreativeWork" className="comp-sheet-code" {...({ itemProp: "text" } as any)}>
                      <meta itemProp="name" content={title} />
                      <meta itemProp="inLanguage" content={currentLanguage} />
                      {renderPromptWithPlaceholders(promptInfo.prompt || "")}
                    </div>
                  </Flex>

                  {/* 译文（双语切换下与 prompt 不同时显示）— 复用 ghost-border 容器 */}
                  {promptInfo.description && promptInfo.description !== promptInfo.prompt && (
                    <div
                      style={{
                        padding: "14px 16px",
                        background: "var(--site-color-ghost-border)",
                        borderRadius: 4,
                        borderLeft: "2px solid var(--site-color-hairline)",
                      }}>
                      <Eyebrow>
                        <Translate id="prompt.translation">译文</Translate>
                      </Eyebrow>
                      <Typography.Paragraph
                        copyable={{ text: promptInfo.description }}
                        style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--ifm-color-content-secondary)" }}>
                        {promptInfo.description}
                      </Typography.Paragraph>
                    </div>
                  )}
                </Flex>
              </Card>
            </Col>

            {/* === Sidebar Strip === 不用独立 Card，sections 用 hairline + eyebrow 区分
                桌面（md+）：~25%，sticky 通过 .prompt-sidebar-col CSS media query 启用
                移动（xs/sm）：xs={24} 占满整行换行到主内容下方 */}
            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="full-width-col prompt-sidebar-col">
              <div className="prompt-sidebar">
                {related.length > 0 && (
                  <section className="prompt-sidebar-section">
                    <Eyebrow>
                      <Translate id="sidebar.related">相关推荐</Translate>
                    </Eyebrow>
                    <div style={{ marginTop: 10 }}>
                      {related.map((r) => {
                        const langData = (r as any)[currentLanguage] || (r as any)["zh-Hans"] || {};
                        const rTitle = langData.title || (r as any).title || "";
                        const rRemark = langData.remark || (r as any).remark || "";
                        return (
                          <Link key={r.id} to={`/prompt/${r.id}`} className="prompt-related-item">
                            <div className="prompt-related-title">{rTitle}</div>
                            {rRemark && <div className="prompt-related-remark">{rRemark}</div>}
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                <section className="prompt-sidebar-section">
                  <Eyebrow>
                    <Translate id="faq.heading">常见问题</Translate>
                  </Eyebrow>
                  <div style={{ marginTop: 10 }}>
                    {faqList.map((item, i) => (
                      <div key={i} className="prompt-faq-item">
                        <div className="prompt-faq-q">{item.q}</div>
                        <div className="prompt-faq-a">{item.a}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="prompt-sidebar-section">
                  <Eyebrow>
                    <Translate id="action.share">分享</Translate>
                  </Eyebrow>
                  <div style={{ marginTop: 10 }}>
                    <Popover
                      trigger="click"
                      placement="topLeft"
                      content={
                        <Suspense fallback={null}>
                          <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark || ""}`} popOver={true} />
                        </Suspense>
                      }>
                      <Button icon={<ShareAltOutlined />} className="comp-sheet-share-btn" block>
                        <Translate id="action.share">分享</Translate>
                      </Button>
                    </Popover>
                  </div>
                </section>
              </div>
            </Col>
            {/* offline 分支：不嵌入 Comments / Discussion 区（Comments 是联网组件） */}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
