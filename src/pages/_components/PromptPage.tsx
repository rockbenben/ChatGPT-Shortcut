import React, { useContext, useState, useCallback } from "react";
import { Card, Typography, Tag, Tooltip, Space, Row, Col, Badge, Button } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import ShareButtons from "./ShareButtons";
import Comments from "./Comments";
import { AuthContext } from "@site/src/pages/_components/AuthContext";
import { updateCopyCount } from "@site/src/api";

function PromptPage({ prompt }) {
  const { userAuth } = useContext(AuthContext);
  const [copied, setShowCopied] = useState(false);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const [shareUrl, setShareUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  });

  const title = prompt[currentLanguage].title;
  const remark = prompt[currentLanguage].remark;
  const weight = prompt.weight;
  const website = prompt.website;
  const tags = prompt.tags;

  const [mainPrompt, setMainPrompt] = useState(prompt[currentLanguage].prompt);

  // Switching between the native language and English
  const handleParagraphClick = useCallback(() => {
    setMainPrompt((prevMainPrompt) => (currentLanguage !== "en" && prevMainPrompt === prompt[currentLanguage].prompt ? prompt[currentLanguage].description : prompt[currentLanguage].prompt));
  }, [prompt, currentLanguage]);

  // Handle copying the mainPrompt text
  const handleCopyClick = useCallback(async () => {
    copy(prompt[currentLanguage].prompt);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
    await updateCopyCount(prompt.id);
  }, [prompt, currentLanguage]);

  return (
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
              website ? (
                <a href={website}>
                  <LinkOutlined />
                </a>
              ) : null
            }>
            <Typography.Paragraph style={{ color: "#595959" }}>👉 {remark}</Typography.Paragraph>
            <Tooltip title={<Translate id="tooltip.switchLang">点击切换显示语言</Translate>}>
              <Typography.Paragraph onClick={handleParagraphClick} style={{ cursor: "pointer", color: "#595959", maxHeight: "500px", overflowY: "auto" }}>
                {mainPrompt}
              </Typography.Paragraph>
            </Tooltip>
            <Space wrap>
              {tags.map((tag) => (
                <Link to={"/?tags=" + tag}>
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                </Link>
              ))}
            </Space>
            <Typography.Paragraph style={{ color: "gray", fontSize: "0.9em", marginTop: "20px" }}>
              <Translate id="comments.info">请在下方回复您对本提示词的意见、想法或分享。</Translate>
            </Typography.Paragraph>{" "}
            <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
            <Comments pageId={prompt.id} currentUserId={userAuth?.data?.id || 0} type="page" />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
