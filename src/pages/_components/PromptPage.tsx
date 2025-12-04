import React, { useState, useCallback, useMemo, Suspense } from "react";
import { Card, Typography, Tag, Tooltip, Space, Row, Col, Button, Flex, theme } from "antd";
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

const { Title, Paragraph, Text } = Typography;

function PromptPage({ prompt }) {
  const { token } = theme.useToken();
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
  }, [prompt, currentLanguage, canToggle]);

  return (
    <Layout title={`${title}-${remark}`} description={seoDescription}>
      <Row justify="center" style={{ marginTop: token.marginLG, marginBottom: token.marginLG }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Flex vertical gap="large">
            {/* 提示词信息卡片 */}
            <Card variant="borderless" className="shadow--md">
              <Flex vertical gap="middle">
                {/* 头部：标题、标签、操作按钮 */}
                <Flex justify="space-between" align="start" gap="small" wrap="wrap">
                  <Flex vertical gap="small" style={{ flex: 1, minWidth: 0 }}>
                    <Flex align="center" gap="small" wrap="wrap">
                      <Title level={2} style={{ margin: 0, fontSize: "1.75rem" }}>
                        {title}
                      </Title>
                      <Tag color="green" style={{ margin: 0, border: "none" }}>
                        {formatCount(weight)}
                      </Tag>
                    </Flex>
                    <Flex gap="small" wrap="wrap">
                      {tags.map((tag) => (
                        <Link to={`/?tags=${tag}`} key={tag}>
                          <Tag color="blue" variant="filled" style={{ margin: 0 }}>
                            {tag}
                          </Tag>
                        </Link>
                      ))}
                    </Flex>
                  </Flex>
                  <Space>
                    <Button
                      type="primary"
                      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      onClick={() => {
                        updateCopy(prompt[currentLanguage].prompt, prompt.id);
                      }}>
                      {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制</Translate>}
                    </Button>
                    {website && (
                      <Link to={website} target="_blank" rel="noopener noreferrer">
                        <Button icon={<LinkOutlined />} />
                      </Link>
                    )}
                  </Space>
                </Flex>

                {/* 描述/备注 */}
                <Paragraph type="secondary" style={{ fontSize: token.fontSizeLG, margin: 0 }}>
                  {remark}
                </Paragraph>

                {/* 提示词内容区域 */}
                <div
                  style={{
                    padding: token.paddingMD,
                    background: token.colorFillAlter,
                    borderRadius: token.borderRadiusLG,
                    borderLeft: `3px solid ${token.colorPrimary}`,
                  }}>
                  {canToggle ? (
                    <Tooltip title={<Translate id="tooltip.switchLanguage">点击切换显示语言</Translate>}>
                      <Paragraph
                        onClick={handleParagraphClick}
                        style={{
                          margin: 0,
                          fontSize: token.fontSizeLG,
                          cursor: "pointer",
                          minHeight: 100,
                        }}>
                        {paragraphText}
                      </Paragraph>
                    </Tooltip>
                  ) : (
                    <Paragraph style={{ margin: 0, fontSize: token.fontSizeLG, minHeight: 100 }}>{paragraphText}</Paragraph>
                  )}
                </div>

                {/* 底部：社交分享与提示 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap="small" className="hideOnSmallScreen" style={{ marginTop: token.marginXS }}>
                  <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    <Translate id="label.commentInfo">请在下方回复您对本提示词的意见、想法或分享。</Translate>
                  </Text>
                  <Suspense fallback={null}>
                    <div className="social-buttons-grayscale">
                      <ShareButtons shareUrl={shareUrl} title={`${title}: ${remark}`} popOver={true} />
                    </div>
                  </Suspense>
                </Flex>
              </Flex>
            </Card>

            {/* 广告组件 */}
            <Suspense fallback={null}>
              <AdComponent type="transverse" />
            </Suspense>

            {/* 评论区卡片 */}
            <Card variant="borderless" className="shadow--md">
              <div style={{ minHeight: 200 }}>
                <Suspense fallback={<div style={{ minHeight: 200 }}></div>}>
                  <Comments pageId={prompt.id} type="page" />
                </Suspense>
              </div>
            </Card>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}

// 使用 memo 优化整个组件的重渲染
export default React.memo(PromptPage);
