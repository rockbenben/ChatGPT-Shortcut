import React, { useContext, useState, useCallback, useMemo } from "react";
import { Card, Typography, Tag, Tooltip, Space, Row, Col, Badge, Button, ConfigProvider, theme } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import ShareButtons from "./ShareButtons";
import Comments from "./Comments";
import AdComponent from "@site/src/pages/_components/AdComponent";
import { AuthContext } from "@site/src/pages/_components/AuthContext";
import { updateCopyCount } from "@site/src/api";

function PromptPage({ prompt }) {
  const { userAuth } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [mainPrompt, setMainPrompt] = useState(prompt[currentLanguage].prompt);

  const shareUrl = useMemo(() => (typeof window !== "undefined" ? window.location.href : ""), []);
  const title = useMemo(() => prompt[currentLanguage].title, [prompt, currentLanguage]);
  const remark = useMemo(() => prompt[currentLanguage].remark, [prompt, currentLanguage]);
  const weight = prompt.count;
  const website = prompt.website;
  const tags = prompt.tags;

  const handleParagraphClick = useCallback(() => {
    setMainPrompt((prev) => (currentLanguage !== "en" && prev === prompt[currentLanguage].prompt ? prompt[currentLanguage].description : prompt[currentLanguage].prompt));
  }, [prompt, currentLanguage]);

  const handleCopyClick = useCallback(async () => {
    copy(prompt[currentLanguage].prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    await updateCopyCount(prompt.id);
  }, [prompt, currentLanguage]);

  const isDarkMode = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#397e6a",
        },
        cssVar: true,
        hashed: false,
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <Layout title={title} description={remark}>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Card
              className="shadow--md"
              title={
                <span>
                  {title} <Badge count={"Weight: " + weight} style={{ backgroundColor: "#52c41a" }} />
                  <Button icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopyClick} style={{ marginLeft: "6px" }}>
                    {copied ? <Translate id="theme.CodeBlock.copied">已复制</Translate> : <Translate id="theme.CodeBlock.copy">复制</Translate>}
                  </Button>
                </span>
              }
              extra={
                website && (
                  <a href={website}>
                    <LinkOutlined />
                  </a>
                )
              }>
              <Typography.Paragraph style={{ color: "#595959" }}>👉 {remark}</Typography.Paragraph>
              <Tooltip title={<Translate id="tooltip.switchLang">点击切换显示语言</Translate>}>
                <Typography.Paragraph onClick={handleParagraphClick} style={{ cursor: "pointer", maxHeight: "500px", overflowY: "auto" }}>
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
              <Typography.Paragraph style={{ color: "gray", fontSize: "0.9em", marginTop: "20px" }}>
                <Translate id="comments.info">请在下方回复您对本提示词的意见、想法或分享。</Translate>
              </Typography.Paragraph>
              <AdComponent type="transverse" />
              <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
              <Comments pageId={prompt.id} currentUserId={userAuth?.data?.id || 0} type="page" />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
}

export default PromptPage;
