import React, { useState } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import { Button, Tag, Typography, Row, Col, Flex, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Comments from "@site/src/components/Comments";

const REPO = "rockbenben/ChatGPT-Shortcut";
const ISSUES_BASE = `https://github.com/${REPO}/issues`;

// Chips 携带 GitHub label query — 点击 chip 跳到对应 label 已有 issues 列表（浏览历史反馈）
// 主按钮则跳到 /issues/new（新建反馈），二者语义分离：browse vs create
const TYPE_CHIPS = [
  { label: translate({ id: "feedback.type.bug", message: "Bug 反馈" }), labelQuery: "bug" },
  { label: translate({ id: "feedback.type.suggestion", message: "功能建议" }), labelQuery: "enhancement" },
  { label: translate({ id: "feedback.type.help", message: "使用问题" }), labelQuery: "question" },
];

const Dot = () => <span style={{ opacity: 0.5 }}>·</span>;

const FeedbackPage = () => {
  // 外层 eyebrow «讨论 · N» — 由内层 Comments 通过 onCountChange 回传
  const [commentCount, setCommentCount] = useState(0);

  return (
    <Layout
      title={translate({ id: "feedback.title", message: "反馈与建议" })}
      description={translate({
        id: "feedback.description",
        message: "您的反馈对我们很重要！",
      })}>
      <main className="margin-vert--md">
        <section className="margin-top--sm margin-bottom--sm">
          {/* docusaurus container = 主页同款 ~1320px max；内层 Col xl={18} ≈ 990px 阅读宽度,
              比详情页 (~880px) 宽一档（discussion 流不应该太窄），又比主页 (1320px) 窄留呼吸 */}
          <div className="container padding-vert--md">
            <Row justify="center">
              <Col xs={24} sm={22} md={20} lg={20} xl={18} className="full-width-col">
                {/* Hero — eyebrow + title + subtitle + 响应承诺/维护者署名 meta line */}
                <Flex vertical gap={10} style={{ marginBottom: 20 }}>
                  <span className="comp-sheet-eyebrow">
                    FEEDBACK · <Translate id="feedback.spec_label">公开反馈</Translate>
                  </span>
                  <Typography.Title level={1} className="comp-sheet-title">
                    <Translate id="feedback.welcome">反馈与建议</Translate>
                  </Typography.Title>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--ifm-color-content-secondary)", lineHeight: 1.6, maxWidth: 640 }}>
                    <Translate id="feedback.subtitle">Bug 报告、功能建议、使用问题——任何声音都欢迎</Translate>
                  </p>
                  {/* Distinctive — 响应时长承诺 + 维护者署名（mono tertiary，跟项目家族 hero meta line 同款） */}
                  <Space separator={<Dot />} wrap style={{ fontSize: 11.5, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", marginTop: 4 }}>
                    <span>
                      <Translate id="feedback.responseTime">通常 24 小时内回复</Translate>
                    </span>
                    <span>
                      Maintained by{" "}
                      <a href="https://github.com/rockbenben" target="_blank" rel="noopener noreferrer" style={{ color: "var(--site-color-tag-selected-text)" }}>
                        @rockbenben
                      </a>
                    </span>
                  </Space>
                </Flex>

                {/* Chips（浏览已有 label 的 issue）+ 主按钮（新建 issue） — 语义清晰分离 */}
                <Flex wrap gap={8} align="center">
                  {TYPE_CHIPS.map(({ label, labelQuery }) => (
                    <a key={label} href={`${ISSUES_BASE}?q=is%3Aissue+label%3A${labelQuery}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <Tag style={{ borderRadius: 999, padding: "2px 12px", margin: 0, fontSize: 13, cursor: "pointer" }}>{label}</Tag>
                    </a>
                  ))}
                  <Button type="primary" size="small" icon={<GithubOutlined />} href={`${ISSUES_BASE}/new`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 4 }}>
                    <Translate id="feedback.newIssue">新建 Issue</Translate>
                  </Button>
                </Flex>

                {/* Comments wrapping — 跟 PromptPage / CommunityPromptPage 同款 hairline + eyebrow + count */}
                <Flex vertical gap={14} style={{ marginTop: 40, paddingTop: 22, borderTop: "1px solid var(--site-color-hairline)" }}>
                  <span className="comp-sheet-eyebrow">
                    <Translate id="comments.heading">讨论</Translate>
                    {commentCount > 0 && (
                      <>
                        {" · "}
                        <span style={{ fontVariantNumeric: "tabular-nums" }}>{commentCount}</span>
                      </>
                    )}
                  </span>
                  <Comments pageId={1000} type="page" onCountChange={setCommentCount} />
                </Flex>
              </Col>
            </Row>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default FeedbackPage;
