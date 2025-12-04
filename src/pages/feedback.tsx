import React, { Suspense } from "react";
import Layout from "@theme/Layout";
import { Card, Typography, theme, Flex, Skeleton } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";

const Comments = React.lazy(() => import("@site/src/pages/_components/Comments"));

const { Title, Paragraph, Text } = Typography;

const FeedbackPage = () => {
  const { token } = theme.useToken();

  return (
    <Layout
      title={translate({ id: "feedback.title", message: "反馈与建议" })}
      description={translate({
        id: "feedback.description",
        message: "您的反馈对我们很重要！",
      })}>
      <main style={{ backgroundColor: token.colorBgLayout, minHeight: "calc(100vh - 60px)", padding: "40px 24px" }}>
        <Flex justify="center">
          <Card
            style={{
              width: "100%",
              maxWidth: 1200,
              boxShadow: token.boxShadowSecondary,
              borderRadius: token.borderRadiusLG,
            }}
            styles={{ body: { padding: "40px" } }}
            variant="borderless">
            <Flex vertical align="center" gap="large">
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: token.colorPrimaryBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: token.colorPrimary,
                }}>
                <MessageOutlined />
              </div>

              <div style={{ textAlign: "center" }}>
                <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
                  <Translate id="feedback.welcome">欢迎给出反馈</Translate>
                </Title>
                <Text type="secondary" style={{ fontSize: token.fontSizeLG }}>
                  <Translate id="feedback.subtitle">您的每一份贡献，都在让这个开源项目变得更好</Translate>
                </Text>
              </div>

              <div
                style={{
                  backgroundColor: token.colorFillAlter,
                  padding: "24px",
                  borderRadius: token.borderRadiusLG,
                  width: "100%",
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}>
                <Paragraph style={{ marginBottom: 0, color: token.colorTextSecondary }}>
                  <Translate id="feedback.paragraph">
                    ChatGPT Shortcut 是一款开源的提示词管理工具，致力于提升 AI 使用效率。我们热切期待您的参与：无论是反馈
                    Bug、提出功能建议，还是分享优质的提示词（Prompt）。对于提示词投稿，我们支持多种语言，一经采纳将被收录并署名（支持用户名搜索）。您的每一份贡献，都能帮助社区成员拓展思维、提升生产力。让我们共同打造更完美的提示词库！
                  </Translate>
                </Paragraph>
              </div>

              <div style={{ width: "100%", minHeight: 400 }}>
                <Suspense fallback={<Skeleton active avatar paragraph={{ rows: 4 }} />}>
                  <Comments pageId={1000} type="page" />
                </Suspense>
              </div>
            </Flex>
          </Card>
        </Flex>
      </main>
    </Layout>
  );
};

export default React.memo(FeedbackPage);
