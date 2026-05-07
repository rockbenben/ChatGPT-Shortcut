import React from "react";
import Layout from "@theme/Layout";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import Comments from "@site/src/components/Comments";

const SPEC_FONT = "ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, 'Liberation Mono', monospace";

const TYPE_CHIPS = [
  translate({ id: "feedback.type.bug", message: "Bug 反馈" }),
  translate({ id: "feedback.type.suggestion", message: "功能建议" }),
  translate({ id: "feedback.type.help", message: "使用问题" }),
];

const FeedbackPage = () => {
  return (
    <Layout
      title={translate({ id: "feedback.title", message: "反馈与建议" })}
      description={translate({
        id: "feedback.description",
        message: "您的反馈对我们很重要！",
      })}>
      <main
        style={{
          minHeight: "calc(100vh - 60px)",
          padding: "clamp(40px, 7vw, 72px) clamp(20px, 5vw, 40px) clamp(48px, 8vw, 96px)",
          position: "relative",
          overflow: "hidden",
        }}>
        {/* Atmospheric halo — 延用主页 hero 的 brand-tinted radial,
            给 editorial header 区域提供呼吸感而不抢戏 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 1200,
            height: 560,
            background: "radial-gradient(circle, var(--ifm-color-primary-lightest) 0%, transparent 70%)",
            opacity: 0.08,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <article style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Spec line — editorial mono label, mirrors LevelSystem spec card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: SPEC_FONT,
              fontSize: 11,
              color: "var(--site-color-text-tertiary)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>
            <span>FEEDBACK</span>
            <span style={{ width: 28, height: 1, background: "var(--site-color-hairline)" }} />
            <Translate id="feedback.spec_label">公开反馈</Translate>
          </div>

          {/* Title — large editorial */}
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              margin: "0 0 14px",
              color: "var(--ifm-color-content)",
            }}>
            <Translate id="feedback.welcome">反馈与建议</Translate>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 15,
              color: "var(--ifm-color-content-secondary)",
              lineHeight: 1.65,
              margin: "0 0 28px",
              maxWidth: 640,
            }}>
            <Translate id="feedback.subtitle">Bug 报告、功能建议、使用问题——任何声音都欢迎</Translate>
          </p>

          {/* Type chips + GitHub Issues link */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
              marginBottom: 16,
            }}>
            {TYPE_CHIPS.map(label => (
              <span
                key={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 28,
                  padding: "0 12px",
                  borderRadius: 999,
                  background: "var(--ifm-hover-overlay)",
                  border: "1px solid var(--site-color-hairline)",
                  color: "var(--ifm-color-content-secondary)",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}>
                {label}
              </span>
            ))}
            <Button
              size="small"
              icon={<GithubOutlined />}
              href="https://github.com/rockbenben/ChatGPT-Shortcut/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: 28,
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                paddingInline: 14,
                marginLeft: 4,
              }}>
              GitHub Issues <span style={{ fontSize: 13, opacity: 0.55, marginLeft: 2 }}>↗</span>
            </Button>
          </div>

          {/* Hairline */}
          <div
            style={{
              height: 1,
              background: "var(--site-color-hairline)",
              margin: "32px 0",
            }}
          />

          {/* Comments */}
          <Comments pageId={1000} type="page" />
        </article>
      </main>
    </Layout>
  );
};

export default FeedbackPage;
