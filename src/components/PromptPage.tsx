import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Card, Typography, Tag, Space, Row, Col, Button, Flex, Breadcrumb } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined, FireFilled, HomeOutlined } from "@ant-design/icons";
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
import Comments from "./Comments";

const ShareButtons = React.lazy(() => import("./ShareButtons"));
const AdComponent = React.lazy(() => import("@site/src/components/AdComponent"));

const { Title, Text } = Typography;

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
  const hreflangAlternates = i18n.locales.map((loc) => {
    const pfx = loc === i18n.defaultLocale ? "" : `/${loc}`;
    return { hreflang: loc, href: `${siteConfig.url}${pfx}/prompt/${prompt.id}` };
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
    const list =
      entry[currentLanguage] ||
      (isZh ? entry["zh-Hans"] || entry["zh"] : entry["en"]) ||
      entry["zh-Hans"] ||
      entry["en"] ||
      null;
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

  const faqList = [
    ...(customFaqItems.length >= 2 ? customFaqItems : fallbackCustomFaq),
    genericUsageFaq,
  ];

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
              {/* 面包屑导航（加 8px 左右 padding，避免窄屏贴到屏幕边缘，并与下方卡片内容形成视觉缩进层级） */}
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
                  { title: title },
                ]}
                style={{ marginBottom: 12, paddingLeft: 8, paddingRight: 8 }}
              />

              <Flex vertical gap="middle" style={{ minHeight: 400 }}>
                {/* 提示词主卡片 — 默认 antd border = hairline */}
                <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 24 } }}>
                  <Flex vertical gap="small">
                    {/* 头部：标题 + 右侧紧凑 meta 区（tags / 热度 / 外链） */}
                    <Flex justify="space-between" align="flex-start" gap="middle" wrap="wrap">
                      <Title level={2} style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                        {title}
                      </Title>

                      <Flex gap={8} align="center" wrap="wrap">
                        {Array.isArray(tags) && tags.length > 0 && (
                          <Space size={4} wrap>
                            {tags.map((tag) => (
                              <Link key={tag} to={`/?tags=${tag}&view=explore`}>
                                <Tag color="default" style={{ margin: 0, cursor: "pointer" }}>
                                  #{tag}
                                </Tag>
                              </Link>
                            ))}
                          </Space>
                        )}
                        <span style={{ fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums", display: "inline-flex", alignItems: "center" }}>
                          <FireFilled style={{ color: "var(--site-color-text-tertiary)", marginRight: 4 }} />
                          {formatCompactNumber(weight as number)}
                        </span>
                        {website && (
                          <Link to={website} target="_blank" rel="noopener noreferrer" title={website}>
                            <Button type="text" size="small" icon={<LinkOutlined style={{ color: "var(--site-color-text-tertiary)" }} />} />
                          </Link>
                        )}
                      </Flex>
                    </Flex>

                    {/* 描述/备注 - Quote Style */}
                    {remark && (
                      <div className="prompt-remark" style={{ marginTop: 12, borderLeft: "4px solid var(--ifm-color-primary)", paddingLeft: 16 }}>
                        <Typography.Text style={{ fontSize: 13, color: "var(--ifm-color-content-secondary)", lineHeight: 1.55 }}>
                          {remark}
                        </Typography.Text>
                      </div>
                    )}

                    {/* 提示词内容 — Copy 按钮 large primary 主操作（独立页 CTA） */}
                    <div>
                      {/* Action Row */}
                      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }} wrap="wrap" gap="small">
                        <Typography.Text style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)" }}>
                          <Translate id="prompt.content">Prompt 内容</Translate>
                        </Typography.Text>
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

                      {/* Tier 4: CodeSnippet 语义包装（告诉 LLM 这是可复用 prompt 模板）— 深井效果对齐 Phase 2 */}
                      <div
                        itemScope
                        itemType="https://schema.org/CreativeWork"
                        style={{
                          backgroundColor: "var(--ifm-background-color)",
                          borderRadius: 6,
                          padding: "20px 24px",
                          border: "1px solid var(--site-color-hairline)",
                        }}>
                        <meta itemProp="name" content={title} />
                        <meta itemProp="inLanguage" content={currentLanguage} />
                        {/* 占位符高亮 — [xxx] 用主色背景标记出来，无需用户肉眼扫描 */}
                        <div
                          {...({ itemProp: "text" } as any)}
                          style={{
                            fontFamily: "var(--site-font-mono)",
                            fontSize: 13,
                            lineHeight: 1.65,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            color: "var(--ifm-color-content)",
                          }}>
                          {renderPromptWithPlaceholders(promptInfo.prompt || "")}
                        </div>
                      </div>

                      {/* 字符 + token 估算 */}
                      <Flex justify="space-between" align="center" style={{ marginTop: 8, fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>
                        <span>
                          {charCount} <Translate id="prompt.charsLabel">字符</Translate> · ≈ {tokenCount} tokens
                        </span>
                      </Flex>

                      {/* 描述/翻译信息 */}
                      {promptInfo.description !== promptInfo.prompt && (
                        <Typography.Paragraph
                          copyable={{
                            text: promptInfo.description,
                          }}
                          style={{
                            fontSize: 13,
                            lineHeight: 1.55,
                            color: "var(--ifm-color-content-secondary)",
                            margin: 0,
                            marginTop: 24,
                          }}>
                          {promptInfo.description}
                        </Typography.Paragraph>
                      )}
                    </div>
                  </Flex>
                </Card>
              </Flex>
            </Col>

            {/* 侧栏（Related + Share）— 响应式：
            桌面（md+）：~25%，sticky 通过 CSS media query 启用
            移动（xs/sm）：xs={24} 占满整行换行到主内容下方，不 sticky */}
            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="full-width-col prompt-sidebar-col">
              <div className="prompt-sidebar" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* 相关推荐（build-time 预计算的 IDs 运行时拉取卡片） */}
                {related.length > 0 && (
                  <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 16 } }}>
                    <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500, color: "var(--site-color-text-tertiary)" }}>
                      <Translate id="sidebar.related">相关推荐</Translate>
                    </Text>
                    <Flex vertical style={{ marginTop: 8 }}>
                      {related.map((r, idx) => {
                        // fetchCardsByIds 返回的 record 内容嵌套在 card[lang] 下，需解包
                        const langData = (r as any)[currentLanguage] || (r as any)["zh-Hans"] || {};
                        const rTitle = langData.title || (r as any).title || "";
                        const rRemark = langData.remark || (r as any).remark || "";
                        return (
                          <Link key={r.id} to={`/prompt/${r.id}`} style={{ color: "inherit" }}>
                            <div
                              style={{
                                padding: "8px 0",
                                borderTop: idx === 0 ? "none" : "1px solid var(--site-color-hairline)",
                              }}>
                              <div
                                style={{
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: "var(--ifm-color-content)",
                                  lineHeight: 1.4,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}>
                                {rTitle}
                              </div>
                              {rRemark && (
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: "var(--ifm-color-content-secondary)",
                                    marginTop: 2,
                                    lineHeight: 1.45,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}>
                                  {rRemark}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </Flex>
                  </Card>
                )}

                {/* 常见问题（侧栏版，与 FAQPage JSON-LD 对应）
                    包 Card 使其与 Related / Share 视觉容器一致，内部文字保持次级灰度小字不抢焦点 */}
                <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 16 } }}>
                  <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500, color: "var(--site-color-text-tertiary)" }}>
                    <Translate id="faq.heading">常见问题</Translate>
                  </Text>
                  <div style={{ marginTop: 12 }}>
                    {faqList.map((item, i) => (
                      <div key={i} style={{ marginTop: i === 0 ? 0 : 14, paddingTop: i === 0 ? 0 : 14, borderTop: i === 0 ? "none" : "1px solid var(--site-color-hairline)" }}>
                        <div style={{ fontSize: 12, color: "var(--ifm-color-content)", fontWeight: 500, lineHeight: 1.45 }}>{item.q}</div>
                        <div style={{ fontSize: 12, color: "var(--ifm-color-content-secondary)", lineHeight: 1.55, marginTop: 4 }}>{item.a}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 分享（popOver=true 用 inline flex，不走 FloatButton 右下角悬浮分支） */}
                <Suspense fallback={null}>
                  <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark || ""}`} />
                </Suspense>
              </div>
            </Col>

            {/* 次级内容（Ad / Comments）—— 与主列同宽对齐（75%），位于前两列之后自动 wrap 到新行 */}
            <Col xs={24} sm={24} md={18} lg={18} xl={18} className="full-width-col">
              <Flex vertical gap="middle">
                <Suspense fallback={null}>
                  <AdComponent type="transverse" />
                </Suspense>

                {/* 评论区 */}
                <Suspense fallback={null}>
                  <Card style={{ minHeight: 480, borderRadius: 12 }}>
                    <Comments pageId={prompt.id} type="page" />
                  </Card>
                </Suspense>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
