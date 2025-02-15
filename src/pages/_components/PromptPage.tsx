import React, { useContext, useState, useCallback, useMemo, Suspense } from "react";
import { Card, Typography, Tag, Tooltip, Space, Row, Col, Badge, Button, ConfigProvider, theme } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import themeConfig from "@site/src/pages/_components/themeConfig";
import { AuthContext } from "@site/src/pages/_components/AuthContext";
import { updateCopyCount } from "@site/src/api";

// 懒加载非关键组件
const ShareButtons = React.lazy(() => import("./ShareButtons"));
const Comments = React.lazy(() => import("./Comments"));
const AdComponent = React.lazy(() => import("@site/src/pages/_components/AdComponent"));

// 预定义样式以减少运行时计算
const styles = {
  container: { marginTop: "20px" },
  badge: { backgroundColor: "#52c41a" },
  copyButton: { marginLeft: "6px" },
  remark: { color: "#595959" },
  promptText: {
    cursor: "pointer",
    maxHeight: "500px",
    overflowY: "auto",
    // 预留空间防止布局偏移
    minHeight: "100px",
  },
  commentInfo: {
    color: "gray",
    fontSize: "0.9em",
    marginTop: "20px",
  },
};

// 抽离卡片标题组件以优化重渲染
const CardTitle = React.memo(({ title, weight, copied, onCopyClick }) => (
  <span>
    {title} <Badge count={`Weight: ${weight}`} style={styles.badge} />
    <Button icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={onCopyClick} style={styles.copyButton}>
      {copied ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
    </Button>
  </span>
));

function PromptPage({ prompt }) {
  const { userAuth } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [mainPrompt, setMainPrompt] = useState(prompt[currentLanguage].prompt);

  // 使用 useMemo 缓存计算值
  const { shareUrl, title, remark, weight, website, tags, isDarkMode } = useMemo(
    () => ({
      shareUrl: typeof window !== "undefined" ? window.location.href : "",
      title: prompt[currentLanguage].title,
      remark: prompt[currentLanguage].remark,
      weight: prompt.count,
      website: prompt.website,
      tags: prompt.tags,
      isDarkMode: typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark",
    }),
    [prompt, currentLanguage]
  );

  const handleParagraphClick = useCallback(() => {
    setMainPrompt((prev) => (currentLanguage !== "en" && prev === prompt[currentLanguage].prompt ? prompt[currentLanguage].description : prompt[currentLanguage].prompt));
  }, [prompt, currentLanguage]);

  const handleCopyClick = useCallback(async () => {
    copy(prompt[currentLanguage].prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    await updateCopyCount(prompt.id);
  }, [prompt, currentLanguage]);

  return (
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <Layout title={title} description={remark}>
        <Row justify="center" style={styles.container}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Card
              className="shadow--md"
              title={<CardTitle title={title} weight={weight} copied={copied} onCopyClick={handleCopyClick} />}
              extra={
                website && (
                  <Link to={website}>
                    <LinkOutlined />
                  </Link>
                )
              }>
              <Typography.Paragraph style={styles.remark}>👉 {remark}</Typography.Paragraph>
              <Tooltip title={<Translate id="tooltip.switchLang">点击切换显示语言</Translate>}>
                <Typography.Paragraph onClick={handleParagraphClick} style={styles.promptText}>
                  {mainPrompt}
                </Typography.Paragraph>
              </Tooltip>
              <Space wrap>
                {tags.map((tag) => (
                  <Link to={`/?tags=${tag}`} key={tag}>
                    <Tag color="blue">{tag}</Tag>
                  </Link>
                ))}
              </Space>
              <Typography.Paragraph style={styles.commentInfo}>
                <Translate id="comments.info">请在下方回复您对本提示词的意见、想法或分享。</Translate>
              </Typography.Paragraph>

              <Suspense fallback={null}>
                <AdComponent type="transverse" />
                <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
                <Comments pageId={prompt.id} currentUserId={userAuth?.data?.id || 0} type="page" />
              </Suspense>
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
}

// 使用 memo 优化整个组件的重渲染
export default React.memo(PromptPage);
