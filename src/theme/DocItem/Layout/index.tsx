import React from "react";
import OriginalLayout from "@theme-original/DocItem/Layout";
import type { WrapperProps } from "@docusaurus/types";
import type LayoutType from "@theme/DocItem/Layout";
import Head from "@docusaurus/Head";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { toBcp47 } from "@site/src/utils/i18n";

type Props = WrapperProps<typeof LayoutType>;

/**
 * 给所有 docs 页面注入 TechArticle JSON-LD。
 *
 * Docusaurus 3.10 默认对 docs 已经发：canonical / hreflang / og:* / twitter:card+image，
 * 还有 BreadcrumbList schema。但没有 Article/TechArticle 类型 —— 这个 swizzle 唯一的存在理由。
 *
 * 为什么是 TechArticle 而不是 Article：
 *   docs 内容偏「部署/设置/扩展使用」等技术教程，TechArticle 是 Article 的子类，
 *   语义上更精确，对 Google rich result 与 LLM 主题理解都更友好。
 */
export default function DocItemLayoutWrapper(props: Props): React.JSX.Element {
  const { metadata, frontMatter } = useDoc();
  const { siteConfig, i18n } = useDocusaurusContext();

  const bcp47Locale = toBcp47(i18n.currentLocale, i18n.localeConfigs);
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`;
  const canonicalUrl = `${siteConfig.url}${localePrefix}${metadata.permalink}`;
  const buildDate = (siteConfig.customFields?.buildDate as string) || new Date().toISOString();
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  const headline = (frontMatter as any).title || metadata.title;
  const description = (frontMatter as any).description || metadata.description || "";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${canonicalUrl}#article`,
        headline,
        description,
        url: canonicalUrl,
        inLanguage: bcp47Locale,
        datePublished: buildDate,
        dateModified: buildDate,
        image: { "@type": "ImageObject", url: `${siteConfig.url}/img/social-card.png`, width: 1280, height: 640 },
        author: { "@id": orgId },
        publisher: { "@id": orgId },
        isPartOf: { "@id": websiteId },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        // Speakable: 让语音助手 / AI 摘要优先朗读 H1 + 第一段
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "article p:first-of-type"] },
        // 同 license 信号家族保持一致：站点内容 CC BY-SA 4.0
        license: "https://creativecommons.org/licenses/by-sa/4.0/",
      },
    ],
  };

  return (
    <>
      <Head>
        {/* X 官方建议 twitter: 与 og: 同时提供（fallback 不完全等价） */}
        <meta name="twitter:title" content={headline} />
        {description && <meta name="twitter:description" content={description} />}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <OriginalLayout {...props} />
    </>
  );
}
