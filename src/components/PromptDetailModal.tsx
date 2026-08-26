import React from "react";
import { Modal, Typography, Space, Button, Tooltip, Flex, Statistic } from "antd";
import { LinkOutlined, InfoCircleOutlined, FireFilled, LikeFilled, UserOutlined, LockOutlined, CloseOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import { CopyButton } from "@site/src/components/CopyButton";
import { PromptCardTag } from "./PromptCard/PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";

import { TagType } from "@site/src/data/tags";

interface PromptDetailModalProps {
  open: boolean;
  onCancel: () => void;
  data: {
    id: string | number;
    title: string;
    description?: string;
    prompt: string;
    remark?: string;
    tags?: TagType[];
    website?: string;
    owner?: string;
    vote?: number;
    copyCount?: number;
    share?: boolean;
  };
}

// mono 眉题，与详情页 .comp-sheet-eyebrow 同语言。提示词内容 / 译文两处共用，
// 免得同一套字号字距在文件里抄两遍、改一处漏一处。
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text
    style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", flexShrink: 0 }}>
    {children}
  </Typography.Text>
);

const PromptDetailModalComponent: React.FC<PromptDetailModalProps> = ({ open, onCancel, data }) => {
  if (!data) return null;

  const isDataCard = !data.owner;

  // Show "View Details" only if there is no owner (DataCard)
  const showViewDetails = !data.owner;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      key={data?.id}
      destroyOnHidden
      centered
      title={null}
      styles={{
        body: {
          padding: 0,
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "var(--ant-color-bg-elevated, #272d33)",
        },
      }}
      closeIcon={null}>
      <Flex vertical style={{ height: "100%", maxHeight: "85vh" }}>
        {/* Header Section — single elevated bg, separated by hairline only */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--site-color-hairline)",
          }}>
          <Flex justify="space-between" align="start" gap={16}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={2} style={{ margin: 0, marginBottom: 8, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                {data.title}
              </Typography.Title>
              <Space separator={<span style={{ color: "var(--site-color-hairline)" }}>|</span>} size="small" wrap>
                {data.share === false && (
                  <Space size={4}>
                    <LockOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
                    <Typography.Text style={{ fontSize: 11, color: "var(--site-color-text-tertiary)" }}>
                      <Translate id="prompt.private">私密</Translate>
                    </Typography.Text>
                  </Space>
                )}
                {data.owner && (
                  <Space size={4}>
                    <UserOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
                    <Typography.Text style={{ fontSize: 11, color: "var(--site-color-text-tertiary)" }}>
                      {data.owner}
                    </Typography.Text>
                  </Space>
                )}
                {data.vote > 0 && (
                  <Statistic
                    value={data.vote}
                    formatter={(value) => formatCompactNumber(value as number)}
                    prefix={<LikeFilled style={{ color: "var(--site-color-text-tertiary)" }} />}
                    styles={{ content: { fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" } }}
                  />
                )}
                {data.copyCount > 0 && (
                  <Statistic
                    value={data.copyCount}
                    formatter={(value) => formatCompactNumber(value as number)}
                    prefix={<FireFilled style={{ color: "var(--site-color-text-tertiary)" }} />}
                    styles={{ content: { fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" } }}
                  />
                )}
                {data.website && (
                  <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--site-color-tag-selected-text)" }}>
                    <LinkOutlined style={{ fontSize: 11 }} />
                    <Typography.Text style={{ fontSize: 11, color: "inherit" }}>Website</Typography.Text>
                  </a>
                )}
              </Space>
            </div>
            {/* Close Button (Custom) */}
            <Tooltip title={<Translate id="action.close">关闭</Translate>}>
              <Button type="text" icon={<CloseOutlined style={{ fontSize: 16, color: "var(--site-color-text-tertiary)" }} />} onClick={onCancel} />
            </Tooltip>
          </Flex>
        </div>

        {/* Content area — header & footer stay pinned. The prompt body box (below) is the
            scroll region, so the eyebrow + copy button stay visible while scrolling a long prompt.
            overflowY:auto here is only a fallback for the rare case remark+description also overflow. */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            padding: 24,
          }}>
          <Flex vertical gap={20} style={{ flex: 1, minHeight: 0 }}>
            {/* Remark / Note — 与卡片 PromptRemark 同语言：3px 弱化 accent 竖线 + 渐隐底 + 斜体
                （原 4px 全亮 accent 在品牌绿下过响，静态内容不抢交互信号） */}
            {data.remark && (
              <div
                style={{
                  borderInlineStart: "3px solid rgba(var(--ifm-color-primary-rgb), 0.45)",
                  background: "linear-gradient(var(--site-fade-dir), rgba(var(--ifm-color-primary-rgb), 0.06) 0%, transparent 100%)",
                  borderRadius: "0 6px 6px 0",
                  padding: "6px 16px",
                  flexShrink: 0,
                }}>
                {/* pre-line：备注数据含 \n，默认 white-space 会把换行折叠成空格 */}
                <Typography.Text style={{ fontSize: 13, color: "var(--ifm-color-content-secondary)", lineHeight: 1.55, fontStyle: "italic", whiteSpace: "pre-line" }}>
                  {data.remark}
                </Typography.Text>
              </div>
            )}

            {/* Prompt Content Block — fills remaining height; the body box below is the scroll region */}
            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              <Flex justify="space-between" align="center" style={{ marginBottom: 10, flexShrink: 0 }}>
                <Eyebrow>
                  <Translate id="prompt.content">提示词内容</Translate>
                </Eyebrow>
                {/* 复制是 modal 的英雄动作，与详情页同配重（primary）；此前 outlined small 层级偏弱 */}
                <CopyButton text={data.prompt} trackingId={isDataCard ? data.id : undefined} variant="primary" size="middle" />
              </Flex>
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  backgroundColor: "var(--ifm-background-color)",
                  borderRadius: 6,
                  padding: "20px 24px",
                  border: "1px solid var(--site-color-hairline)",
                }}>
                <Typography.Paragraph
                  copyable={{
                    text: data.prompt,
                    tooltips: false,
                  }}
                  style={{
                    fontFamily: "var(--site-font-mono)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--ifm-color-content)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    margin: 0,
                  }}>
                  {data.prompt}
                </Typography.Paragraph>
              </div>
            </div>

            {/* 译文 — 之前这里是一段没有标题的灰字，读者看不出它是什么；详情页早就有
                「译文」眉题 + ghost 容器（PromptPage.tsx 同处），modal 没跟上。对齐它。
                对中文读者来说 prompt 是英文，译文才是理解这条提示词的入口，不该弱成脚注。
                眉题在容器内固定、正文单独滚动，与上面的提示词内容同一套结构。 */}
            {data.description && data.description !== data.prompt && (
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                  padding: "14px 16px",
                  // 详情页那边用的是 ghost（rgba 白 4%）。这里不能照抄：详情页的容器坐在
                  // Card 上，而 modal 的 body 本来就是 --ant-color-bg-elevated 抬升面，
                  // 再叠一层白只会把底色推得更亮、把浅色文字的对比度压下去。实测暗色下
                  // 眉题落到 4.38:1（低于 4.5），而同一个 modal 里上面的提示词框用的是
                  // --ifm-background-color 下沉到页面底色 —— 一个 modal 里两个相反方向。
                  // 统一成下沉：暗色眉题 4.38 → 5.21，浅色 4.82 → 4.77（都过线），
                  // 两个内容块也变成同一套面板语言。
                  backgroundColor: "var(--ifm-background-color)",
                  borderRadius: 6,
                  border: "1px solid var(--site-color-hairline)",
                }}>
                <Eyebrow>
                  <Translate id="prompt.translation">译文</Translate>
                </Eyebrow>
                {/* 滚动放在这个 wrapper 上，不要放回 Paragraph 自己身上：Paragraph 里
                    antd 的 copyable 按钮是行内元素，它一旦比行盒高（比如给它加内边距或
                    伪元素扩命中区），Paragraph 当滚动容器就会长出幽灵滚动条 —— 两行文字
                    也有。详见 custom.css 里 .ant-typography-copy 那段。
                    保留高度上限：译文和原文一样长，不封顶会把上面的原文挤到几乎没有。 */}
                <div style={{ overflowY: "auto", minHeight: 0, maxHeight: "20vh", marginTop: 6 }}>
                  <Typography.Paragraph
                    copyable={{
                      text: data.description,
                      // 不传 tooltips 会落到 antd 语言包（zh_CN 是「复制 / 复制成功」），与站内
                      // CopyButton 的「复制 / 已复制」分叉。复用已有 id，18 个 locale 都已译好。
                      tooltips: [translate({ id: "action.copy", message: "复制" }), translate({ id: "message.copied", message: "已复制" })],
                    }}
                    style={{ margin: 0, lineHeight: 1.6, fontSize: 13, color: "var(--ifm-color-content-secondary)" }}>
                    {data.description}
                  </Typography.Paragraph>
                </div>
              </div>
            )}
          </Flex>
        </div>

        {/* Footer Section — hairline only, no bg fill。
            无标签且非精选（社区/用户提示词常见）时整段不渲染，避免空 footer 占 60px 死区 */}
        {(Boolean(data.tags?.length) || showViewDetails) && (
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1px solid var(--site-color-hairline)",
          }}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
            <div style={{ flex: 1, minWidth: 0 }}>{data.tags && <PromptCardTag tags={data.tags} />}</div>

            {showViewDetails && (
              <Link to={`/prompt/${data.id}`}>
                <Button type="link" size="small" icon={<InfoCircleOutlined />} style={{ color: "var(--site-color-tag-selected-text)" }}>
                  <Translate id="action.viewDetails">查看详情</Translate>
                </Button>
              </Link>
            )}
          </Flex>
        </div>
        )}
      </Flex>
    </Modal>
  );
};

export const PromptDetailModal = React.memo(PromptDetailModalComponent);
