import React, { useContext, useState, useEffect, useCallback } from "react";
import { Skeleton, Card, Typography, Tag, Tooltip, Space, Row, Col, Badge, Button } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import ShareButtons from "./ShareButtons";
import Comments from "./Comments";
import { AuthContext } from "@site/src/pages/_components/AuthContext";
import { getPrompts, updateCopyCount } from "@site/src/api";

function PromptPage({ promptId }) {
  const { userAuth } = useContext(AuthContext);
  const [prompt, setPrompt] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [mainPrompt, setMainPrompt] = useState("");
  const [copied, setShowCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];

  useEffect(() => {
    const fetchPrompt = async () => {
      setIsLoading(true);
      try {
        const promptData = await getPrompts("cards", [promptId], currentLanguage);
        setPrompt(promptData[0]);
        setMainPrompt(promptData[0][currentLanguage].prompt);
      } catch (error) {
        console.error("Error fetching prompt:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompt();
    setShareUrl(window.location.href);
  }, [promptId, currentLanguage]);

  // Handle copying the mainPrompt text
  const handleCopyClick = useCallback(async () => {
    if (mainPrompt) {
      copy(mainPrompt);
      setShowCopied(true);
      const timer = setTimeout(() => setShowCopied(false), 2000);
      return () => clearTimeout(timer);
    }
    await updateCopyCount(promptId);
  }, [promptId, mainPrompt]);

  if (isLoading) {
    return (
      <Layout>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Card>
              <Skeleton active paragraph={{ rows: 8 }} />
              <Skeleton active avatar paragraph={{ rows: 16 }} />;
            </Card>
          </Col>
        </Row>
      </Layout>
    );
  }

  const title = prompt[currentLanguage].title;
  const remark = prompt[currentLanguage].remark;
  const weight = prompt.count;
  const website = prompt.website;
  const tags = prompt.tags;

  // Switching between the native language and English
  function handleParagraphClick() {
    setMainPrompt((prevMainPrompt) => (currentLanguage !== "en" && prevMainPrompt === prompt[currentLanguage].prompt ? prompt[currentLanguage].description : prompt[currentLanguage].prompt));
  }

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
              {tags &&
                tags.map((tag) => (
                  <Link key={tag} to={"/?tags=" + tag}>
                    <Tag color="blue">{tag}</Tag>
                  </Link>
                ))}
            </Space>
            <Typography.Paragraph style={{ color: "gray", fontSize: "0.9em", marginTop: "20px" }}>
              <Translate id="comments.info">请在下方回复您对本提示词的意见、想法或分享。</Translate>
            </Typography.Paragraph>{" "}
            <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
            <Comments pageId={promptId} currentUserId={userAuth?.data?.id || 0} type="page" />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
