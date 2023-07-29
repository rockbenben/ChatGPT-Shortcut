import React, { useContext } from "react";
import Layout from "@theme/Layout";
import { Card, Typography } from "antd";
import Comments from "@site/src/pages/_components/Comments";
import Translate, { translate } from "@docusaurus/Translate";
import { AuthContext, AuthProvider } from "@site/src/pages/_components/AuthContext";

const { Title, Paragraph } = Typography;

const FeedbackPage = () => {
  const { userAuth } = useContext(AuthContext);

  return (
    <Layout
      title={translate({ id: "feedback.title", message: "反馈与建议" })}
      description={translate({
        id: "feedback.description",
        message: "您的反馈对我们很重要！",
      })}>
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <Card
          style={{
            width: "80%",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            padding: "2rem",
            borderRadius: "15px",
          }}>
          <Typography>
            <Title style={{ textAlign: "center" }}>
              <Translate id='feedback.welcome' description='The welcome title on the feedback page'>
                欢迎给出反馈
              </Translate>
            </Title>
            <Paragraph>
              <Translate id='feedback.paragraph' description='The main paragraph on the feedback page'>
                欢迎给出建议、想法和提示词，以便不断改进 ChatGPT Shortcut，并提高个人效率和生产力。如果您需要反馈 bug，请提供问题发生的链接和相关情况。对于提示词内容，您可以提交多种语言的内容，或简单描述您对提示词的想法。我们期待能够拓展思维或产生高质量输出的提示词。一旦您提交的提示词被发布，您的贡献将会添加到页面上。您可以通过搜索贡献者名称（用户名）来找到对应的词条。
              </Translate>
            </Paragraph>
          </Typography>
          {userAuth && userAuth.data && userAuth.data.id ? <Comments pageId={1000} currentUserId={userAuth.data.id} type='page' /> : <Comments pageId={1000} currentUserId={0} type='page' />}
        </Card>
      </div>
    </Layout>
  );
};

export default function WrappedFeedbackPage() {
  return (
    <AuthProvider>
      <FeedbackPage />
    </AuthProvider>
  );
}
