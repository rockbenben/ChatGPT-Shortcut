import React, { useState, useCallback, useMemo, Suspense } from "react";
import { Card, Typography, Tag, Tooltip, Space, Row, Col, Badge, Button } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { getWeight, formatCount } from "@site/src/utils/formatters";

const ShareButtons = React.lazy(() => import("./ShareButtons"));
const Comments = React.lazy(() => import("./Comments"));
const AdComponent = React.lazy(() => import("@site/src/pages/_components/AdComponent"));

const { Paragraph } = Typography;

const styles = {
  container: {
    marginTop: "20px",
    width: "100%", // Ensure stable container width
    overflow: "hidden", // Prevent horizontal scroll causing CLS
  },
  badge: { backgroundColor: "#52c41a" },
  remark: { color: "#595959" },
  commentInfo: {
    color: "gray",
    fontSize: "0.9em",
    marginTop: "20px",
  },
  mainText: {
    maxHeight: "200px",
    overflowY: "auto" as React.CSSProperties["overflowY"],
    minHeight: "100px",
    transition: "none",
  },
  commentsContainer: {
    minHeight: "400px",
    width: "100%",
  },
};

function PromptPage({ prompt }) {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const canToggle = currentLanguage !== "en" && prompt[currentLanguage].description !== prompt[currentLanguage].prompt;
  const [paragraphText, setParagraphText] = useState(prompt[currentLanguage].prompt);
  const { copied, updateCopy } = useCopyToClipboard();

  // 使用 useMemo 缓存计算值
  const { shareUrl, title, remark, weight, website, tags } = useMemo(
    () => ({
      shareUrl: typeof window !== "undefined" ? window.location.href : "",
      title: prompt[currentLanguage].title,
      remark: prompt[currentLanguage].remark,
      weight: getWeight(prompt),
      website: prompt.website,
      tags: prompt.tags,
    }),
    [prompt, currentLanguage]
  );

  const seoDescription = useMemo(() => {
    // 优先使用数据文件中的 metaDescription
    const meta = (prompt as any).metaDescription && String((prompt as any).metaDescription).trim();
    if (meta) return meta;

    // 兜底：拼接 description + prompt，并截断到 160 字符
    const desc = prompt?.[currentLanguage]?.description || "";
    const prm = prompt?.[currentLanguage]?.prompt || "";
    const full = `${desc} ${prm}`.trim();
    return full.length > 160 ? `${full.slice(0, 157)}...` : full;
  }, [prompt, currentLanguage]);

  const handleParagraphClick = useCallback(() => {
    if (!canToggle) return;
    setParagraphText((prevText) => (prevText === prompt[currentLanguage].prompt ? prompt[currentLanguage].description : prompt[currentLanguage].prompt));
  }, [prompt, currentLanguage]);

  return (
    <Layout title={`${title}-${remark}`} description={seoDescription}>
      <Row justify="center" style={styles.container}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            className="shadow--md"
            title={
              <>
                {title} <Badge count={`${formatCount(weight)}`} style={styles.badge} />
              </>
            }
            extra={
              <Space>
                <Button
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => {
                    updateCopy(prompt[currentLanguage].prompt, prompt.id);
                  }}>
                  {copied ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
                </Button>
                {website && (
                  <Link to={website}>
                    <LinkOutlined />
                  </Link>
                )}
              </Space>
            }>
            <Paragraph style={styles.remark}>👉 {remark}</Paragraph>
            {canToggle ? (
              <Tooltip title={<Translate id="tooltip.switchLang">点击切换显示语言</Translate>}>
                <Paragraph onClick={handleParagraphClick} style={{ ...styles.mainText, cursor: "pointer" }}>
                  {paragraphText}
                </Paragraph>
              </Tooltip>
            ) : (
              <Paragraph style={styles.mainText}>{paragraphText}</Paragraph>
            )}
            <Space wrap>
              {tags.map((tag) => (
                <Link to={`/?tags=${tag}`} key={tag}>
                  <Tag color="blue">{tag}</Tag>
                </Link>
              ))}
            </Space>
            <Paragraph style={styles.commentInfo}>
              <Translate id="comments.info">请在下方回复您对本提示词的意见、想法或分享。</Translate>
            </Paragraph>

            {/* CLS optimization: Fixed width containers prevent layout shifts */}
            <Suspense fallback={null}>
              <AdComponent type="transverse" />
              <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
            </Suspense>

            <div style={styles.commentsContainer}>
              <Suspense fallback={<div style={styles.commentsContainer}></div>}>
                <Comments pageId={prompt.id} type="page" />
              </Suspense>
            </div>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
} // 使用 memo 优化整个组件的重渲染
export default React.memo(PromptPage);
