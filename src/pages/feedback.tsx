import React, { Suspense } from "react";
import Layout from "@theme/Layout";
import { Row, Col, Card, Typography } from "antd";
import Translate, { translate } from "@docusaurus/Translate";

const Comments = React.lazy(() => import("@site/src/pages/_components/Comments"));

const { Title, Paragraph } = Typography;

const styles = {
  commentsContainer: {
    minHeight: "400px",
  },
};

const FeedbackPage = () => {
  return (
    <Layout
      title={translate({ id: "feedback.title", message: "反馈与建议" })}
      description={translate({
        id: "feedback.description",
        message: "您的反馈对我们很重要！",
      })}>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card className="shadow--md">
            <Title style={{ textAlign: "center" }}>
              <Translate id="feedback.welcome" description="The welcome title on the feedback page">
                欢迎给出反馈
              </Translate>
            </Title>
            <Paragraph>
              <Translate id="feedback.paragraph" description="The main paragraph on the feedback page">
                欢迎给出建议、想法和提示词，以便不断改进 ChatGPT Shortcut，并提高个人效率和生产力。如果您需要反馈
                bug，请提供问题发生的链接和相关情况。对于提示词内容，您可以提交多种语言的内容，或简单描述您对提示词的想法。我们期待能够拓展思维或产生高质量输出的提示词。一旦您提交的提示词被发布，您的贡献将会添加到页面上。您可以通过搜索贡献者名称（用户名）来找到对应的词条。
              </Translate>
            </Paragraph>

            {/* CLS optimization for Comments component */}
            <div style={styles.commentsContainer}>
              <Suspense fallback={<div style={styles.commentsContainer}></div>}>
                <Comments pageId={1000} type="page" />
              </Suspense>
            </div>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default React.memo(FeedbackPage);
