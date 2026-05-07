import React from "react";
import { Modal, Typography, Space, Button, Tooltip, Flex, Statistic } from "antd";
import { CopyOutlined, CheckOutlined, LinkOutlined, InfoCircleOutlined, FireFilled, LikeFilled, UserOutlined, LockOutlined, CloseOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
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

const PromptDetailModalComponent: React.FC<PromptDetailModalProps> = ({ open, onCancel, data }) => {
  if (!data) return null;

  const { copied, copyText, updateCopy } = useCopyToClipboard();

  const isDataCard = !data.owner;
  const handleCopy = () => {
    if (isDataCard) {
      updateCopy(data.prompt, data.id);
    } else {
      copyText(data.prompt);
    }
  };

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

        {/* Scrollable Content — same bg as modal (no inversion) */}
        <div
          style={{
            overflowY: "auto",
            padding: 24,
            flex: 1,
          }}>
          <Flex vertical gap={20}>
            {/* Remark / Note - Quote Style */}
            {data.remark && (
              <div style={{ borderLeft: "4px solid var(--ifm-color-primary)", paddingLeft: 16 }}>
                <Typography.Text style={{ fontSize: 13, color: "var(--ifm-color-content-secondary)", lineHeight: 1.55 }}>
                  {data.remark}
                </Typography.Text>
              </div>
            )}

            {/* Prompt Content Block — recessed deep well */}
            <div>
              <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
                <Typography.Text style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)" }}>
                  <Translate id="prompt.content">Prompt 内容</Translate>
                </Typography.Text>
                <Button
                  size="small"
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={handleCopy}
                  style={copied ? { color: "var(--site-color-tag-selected-text)", borderColor: "var(--site-color-tag-selected-text)" } : undefined}>
                  {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制</Translate>}
                </Button>
              </Flex>
              <div
                style={{
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

            {/* Description */}
            {data.description && data.description !== data.prompt && (
              <Typography.Paragraph
                copyable={{
                  text: data.description,
                }}
                style={{ margin: 0, lineHeight: 1.55, fontSize: 13, color: "var(--ifm-color-content-secondary)" }}>
                {data.description}
              </Typography.Paragraph>
            )}
          </Flex>
        </div>

        {/* Footer Section — hairline only, no bg fill */}
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
      </Flex>
    </Modal>
  );
};

export const PromptDetailModal = React.memo(PromptDetailModalComponent);
