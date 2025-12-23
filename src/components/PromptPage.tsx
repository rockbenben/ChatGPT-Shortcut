import React, { Suspense } from "react";
import { Card, Typography, Tag, Space, Row, Col, Button, Flex, theme, Alert, Statistic, Divider } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined, FireFilled } from "@ant-design/icons";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { getWeight, formatCompactNumber } from "@site/src/utils/formatters";
import Comments from "./Comments";

const ShareButtons = React.lazy(() => import("./ShareButtons"));

const { Title, Text } = Typography;

function PromptPage({ prompt, currentLanguage }) {
  const { token } = theme.useToken();
  const { copied, updateCopy } = useCopyToClipboard();

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

  return (
    <Layout title={seoTitle} description={seoDescription}>
      <Row justify="center" style={{ marginTop: token.marginLG, marginBottom: token.marginLG }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Flex vertical gap="large" style={{ minHeight: 400 }}>
            {/* 提示词信息卡片 */}
            <Card variant="borderless" className="shadow--md" style={{ borderRadius: token.borderRadiusLG }} styles={{ body: { padding: token.paddingMD } }}>
              <Flex vertical gap="small">
                {/* 头部：标题行 */}
                <Flex justify="space-between" align="flex-start" gap="middle" wrap="wrap">
                  {/* 标题 */}
                  <Title level={1} style={{ margin: 0, fontSize: "1.75rem", lineHeight: 1.3 }}>
                    {title}
                  </Title>

                  {/* 标签 + 热度 */}
                  <Flex gap={token.marginXS} align="center" wrap="wrap">
                    {website && (
                      <Link to={website} target="_blank" rel="noopener noreferrer">
                        <Button type="text" size="small" icon={<LinkOutlined />} />
                      </Link>
                    )}
                    <Space size={4} wrap>
                      {tags.map((tag) => (
                        <Link to={`/?tags=${tag}`}>
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
                      prefix={<FireFilled style={{ color: token.colorError }} />}
                      styles={{ content: { fontSize: token.fontSizeSM, color: token.colorTextSecondary } }}
                    />
                  </Flex>
                </Flex>

                {/* 描述/备注 - Compact Alert */}
                {remark && <Alert title={remark} type="info" style={{ borderRadius: token.borderRadius }} />}

                {/* 提示词内容卡片 */}
                <Card
                  type="inner"
                  title={translate({
                    id: "prompt.content",
                    message: "Prompt 内容",
                  })}
                  extra={
                    <Button
                      type={copied ? "primary" : "default"}
                      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      onClick={() => {
                        updateCopy(promptInfo.prompt, prompt.id);
                      }}>
                      {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制</Translate>}
                    </Button>
                  }>
                  <Typography.Paragraph
                    copyable={{
                      text: promptInfo.prompt,
                    }}
                    style={{
                      fontFamily: "'SF Mono', 'Menlo', 'Consolas', 'Courier New', monospace",
                      fontSize: token.fontSize,
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      margin: 0,
                    }}>
                    {promptInfo.prompt}
                  </Typography.Paragraph>

                  {/* 描述信息 */}
                  {promptInfo.description !== promptInfo.prompt && (
                    <>
                      <Divider />
                      <Typography.Paragraph
                        type="secondary"
                        copyable={{
                          text: promptInfo.description,
                        }}
                        style={{
                          fontSize: token.fontSizeSM,
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                        {promptInfo.description}
                      </Typography.Paragraph>
                    </>
                  )}
                </Card>

                {/* 底部：社交分享与提示 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap="small" className="hideOnSmallScreen">
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

            {/* 评论区卡片 */}
            <Suspense fallback={null}>
              <Card variant="borderless" className="shadow--md" style={{ minHeight: 480 }}>
                <Comments pageId={prompt.id} type="page" />
              </Card>
            </Suspense>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
}

export default PromptPage;
