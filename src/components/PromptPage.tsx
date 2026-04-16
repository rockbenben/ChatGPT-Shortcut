import React, { Suspense } from "react";
import { Card, Typography, Tag, Space, Row, Col, Button, Flex, Statistic, Divider, Breadcrumb } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined, FireFilled, HomeOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { getWeight, formatCompactNumber } from "@site/src/utils/formatters";
// Comments removed for local version

const ShareButtons = React.lazy(() => import("./ShareButtons"));

const { Title, Text } = Typography;

function PromptPage({ prompt, currentLanguage }) {
  const { copied, updateCopy } = useCopyToClipboard();
  const { siteConfig, i18n } = useDocusaurusContext();

  const promptInfo = prompt[currentLanguage] || prompt;

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

  // schema.org Article + BreadcrumbList JSON-LD（提升 LLM/搜索引擎引用率）
  const homeUrl = `${siteConfig.url}${localePrefix}/`;
  // datePublished/dateModified 用 build time，避免 Google "missing field" 警告
  const buildDate = (siteConfig.customFields?.buildDate as string) || new Date().toISOString();
  // 通过 @id 引用主页定义的 Organization / WebSite 实体（关联知识图谱）
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
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
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Head>
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
                      title: title,
                    },
                  ]}
                  style={{ marginBottom: 12 }}
                />

                {/* 头部：标题行 */}
                <Flex justify="space-between" align="flex-start" gap="middle" wrap="wrap">
                  {/* 标题 */}
                  <Title level={2} style={{ margin: 0 }}>
                    {title}
                  </Title>

                  {/* 标签 + 热度 */}
                  <Flex gap={8} align="center" wrap="wrap">
                    {website && (
                      <Link to={website} target="_blank" rel="noopener noreferrer">
                        <Button type="text" size="small" icon={<LinkOutlined />} />
                      </Link>
                    )}
                    <Space size={4} wrap>
                      {tags.map((tag) => (
                        <Link key={tag} to={`/?tags=${tag}&view=explore`}>
                          <Tag color="default" style={{ margin: 0, cursor: "pointer" }}>
                            #{tag}
                          </Tag>
                        </Link>
                      ))}
                    </Space>

                    {/* 热度统计 */}
                    <Statistic
                      value={weight}
                      formatter={(value) => formatCompactNumber(value as number)}
                      prefix={<FireFilled style={{ color: "var(--ifm-color-danger)" }} />}
                      styles={{ content: { fontSize: 12, color: "var(--ifm-color-emphasis-500)" } }}
                    />
                  </Flex>
                </Flex>

                {/* 描述/备注 - Quote Style */}
                {remark && (
                  <div style={{ marginTop: 12, borderLeft: "4px solid var(--ifm-color-primary)", paddingLeft: 16 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                      {remark}
                    </Typography.Text>
                  </div>
                )}

                {/* 提示词内容 - Streamlined Code Block */}
                <div>
                  {/* Action Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      <Translate id="prompt.content">Prompt 内容</Translate>
                    </Typography.Text>
                    <Button
                      type={copied ? "primary" : "default"}
                      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      onClick={() => {
                        updateCopy(promptInfo.prompt, prompt.id);
                      }}>
                      {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制</Translate>}
                    </Button>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--ifm-color-emphasis-100)",
                      borderRadius: 12,
                      padding: 24,
                    }}>
                    <Typography.Paragraph
                      copyable={{
                        text: promptInfo.prompt,
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
                      {promptInfo.prompt}
                    </Typography.Paragraph>
                  </div>

                  {/* 描述/翻译信息 */}
                  {promptInfo.description !== promptInfo.prompt && (
                    <Typography.Paragraph
                      type="secondary"
                      copyable={{
                        text: promptInfo.description,
                      }}
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                        marginTop: 24,
                      }}>
                      {promptInfo.description}
                    </Typography.Paragraph>
                  )}
                </div>

                <Divider />

                {/* 底部：社交分享 */}
                <Flex justify="flex-end" align="center" className="hideOnSmallScreen">
                  <Suspense fallback={null}>
                    <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
                  </Suspense>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
