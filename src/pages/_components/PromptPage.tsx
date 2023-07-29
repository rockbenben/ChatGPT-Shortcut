import React, { useContext, useState, useEffect, useCallback } from "react";
import { Card, Typography, Tag, Tooltip, Space, Badge, Row, Col } from "antd";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { LinkOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "./ShowcaseCard/styles.module.css";
import ShareButtons from "./ShareButtons";
import Comments from "./Comments";
import { AuthContext } from "@site/src/pages/_components/AuthContext";
import { updateCopyCount } from "@site/src/api";

function PromptPage({ prompt }) {
  const { userAuth } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split("-")[0];
  const title = prompt[currentLanguage].title;
  const remark = prompt[currentLanguage].remark;
  const weight = prompt.weight;
  const website = prompt.website;
  const tags = prompt.tags;

  const [mainPrompt, setMainPrompt] = useState(prompt[currentLanguage].prompt);

  // Switching between the native language and English
  function handleParagraphClick() {
    // If the current language is English, do nothing
    if (currentLanguage === "en") return;

    if (mainPrompt === prompt[currentLanguage].prompt) {
      setMainPrompt(prompt[currentLanguage].description);
    } else {
      setMainPrompt(prompt[currentLanguage].prompt);
    }
  }

  // Handle copying the mainPrompt text
  const [copied, setShowCopied] = useState(false);
  const handleCopyClick = useCallback(async () => {
    try {
      if (mainPrompt) {
        copy(mainPrompt);
      }
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      await updateCopyCount(prompt.id);
    } catch (error) {
      console.error("Error updating copy count:", error);
    }
  }, [prompt.id, mainPrompt]);

  return (
    <Layout title={title} description={remark}>
      <Row justify='center' style={{ marginTop: "20px" }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            className='shadow--md'
            title={
              <span>
                {title} <Badge count={"Weight: " + weight} style={{ backgroundColor: "#52c41a" }} />
                <button className={clsx("button button--secondary button--sm")} style={{ marginLeft: "6px" }} onClick={handleCopyClick}>
                  {copied ? <Translate id='theme.CodeBlock.copied'>已复制</Translate> : <Translate id='theme.CodeBlock.copy'>复制</Translate>}
                </button>
              </span>
            }
            extra={
              website ? (
                <a href={website}>
                  <LinkOutlined />
                </a>
              ) : null
            }>
            <p className={styles.showcaseCardBody}>👉 {remark}</p>
            <Tooltip title={<Translate id='tooltip.switchLang'>点击切换显示语言</Translate>}>
              <p onClick={handleParagraphClick} className={styles.showcaseCardBody} style={{ cursor: "pointer" }}>
                {mainPrompt}
              </p>
            </Tooltip>
            <Space wrap>
              {tags.map((tag) => (
                <Link to={"/?tags=" + tag}>
                  <Tag color='blue' key={tag}>
                    {tag}
                  </Tag>
                </Link>
              ))}
            </Space>
            <Typography.Paragraph style={{ color: "gray", fontSize: "0.9em", marginTop: "20px" }}>
              <Translate id='comments.info'>请在下方回复您对本提示词的意见、想法或分享。</Translate>
            </Typography.Paragraph>{" "}
            <ShareButtons shareUrl={url} title={`${title}: ${remark}`} popOver={true} />
            {userAuth && userAuth.data && userAuth.data.id ? <Comments pageId={prompt.id} currentUserId={userAuth.data.id} type="page" /> : <Comments pageId={prompt.id} currentUserId={0} type="page" />}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
