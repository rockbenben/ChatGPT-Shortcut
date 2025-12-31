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

export const PromptDetailModalComponent: React.FC<PromptDetailModalProps> = ({ open, onCancel, data }) => {
  if (!data) return null;

  const { copied, updateCopy } = useCopyToClipboard();

  const handleCopy = () => {
    updateCopy(data.prompt, data.id);
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
          borderRadius: 8,
        },
      }}
      closeIcon={null}>
      <Flex vertical style={{ height: "100%", maxHeight: "85vh" }}>
        {/* Header Section */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--ifm-color-emphasis-200)",
            backgroundColor: "var(--ifm-background-color)",
          }}>
          <Flex justify="space-between" align="start" gap={16}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={2} style={{ margin: 0, marginBottom: 8 }}>
                {data.title}
              </Typography.Title>
              <Space separator={<span style={{ color: "var(--ifm-color-emphasis-200)" }}>|</span>} size="small" wrap>
                {data.share === false && (
                  <Space size={4}>
                    <LockOutlined style={{ color: "var(--ifm-color-emphasis-500)" }} />
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      <Translate id="prompt.private">私密</Translate>
                    </Typography.Text>
                  </Space>
                )}
                {data.owner && (
                  <Space size={4}>
                    <UserOutlined style={{ color: "var(--ifm-color-emphasis-400)" }} />
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {data.owner}
                    </Typography.Text>
                  </Space>
                )}
                {data.vote > 0 && (
                  <Statistic
                    value={data.vote}
                    formatter={(value) => formatCompactNumber(value as number)}
                    prefix={<LikeFilled style={{ color: "var(--ifm-color-warning)" }} />}
                    styles={{ content: { fontSize: 12, color: "var(--ifm-color-warning)" } }}
                  />
                )}
                {data.copyCount > 0 && (
                  <Statistic
                    value={data.copyCount}
                    formatter={(value) => formatCompactNumber(value as number)}
                    prefix={<FireFilled style={{ color: "var(--ifm-color-danger)" }} />}
                    styles={{ content: { fontSize: 12, color: "var(--ifm-color-emphasis-500)" } }}
                  />
                )}
                {data.website && (
                  <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--ifm-color-primary)" }}>
                    <LinkOutlined style={{ fontSize: 12 }} />
                    <Typography.Text style={{ fontSize: 12, color: "inherit" }}>Website</Typography.Text>
                  </a>
                )}
              </Space>
            </div>
            {/* Close Button (Custom) */}
            <Tooltip title={<Translate id="action.close">关闭</Translate>}>
              <Button type="text" icon={<CloseOutlined style={{ fontSize: 18, color: "var(--ifm-color-emphasis-400)" }} />} onClick={onCancel} />
            </Tooltip>
          </Flex>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            overflowY: "auto",
            padding: 24,
            flex: 1,
            backgroundColor: "var(--ifm-background-surface-color)",
          }}>
          <Flex vertical gap={24}>
            {/* Remark / Note - Quote Style */}
            {data.remark && (
              <div style={{ borderLeft: "4px solid var(--ifm-color-primary)", paddingLeft: 16 }}>
                <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                  {data.remark}
                </Typography.Text>
              </div>
            )}

            {/* Prompt Content Block */}
            <div>
              <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
                <Typography.Text strong style={{ fontSize: 16 }}>
                  <Translate id="prompt.content">Prompt 内容</Translate>
                </Typography.Text>
                <Button type={copied ? "primary" : "default"} icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy}>
                  {copied ? <Translate id="message.copied">复制成功</Translate> : <Translate id="action.copy">复制</Translate>}
                </Button>
              </Flex>
              <div
                style={{
                  backgroundColor: "var(--ifm-color-emphasis-100)",
                  borderRadius: 12,
                  padding: 24,
                }}>
                <Typography.Paragraph
                  copyable={{
                    text: data.prompt,
                    tooltips: false,
                  }}
                  style={{
                    fontFamily: "'SF Mono', 'Menlo', 'Consolas', 'Courier New', monospace",
                    fontSize: 14,
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
                type="secondary"
                copyable={{
                  text: data.description,
                }}
                style={{ margin: 0, lineHeight: 1.6, fontSize: 14 }}>
                {data.description}
              </Typography.Paragraph>
            )}
          </Flex>
        </div>

        {/* Footer Section */}
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1px solid var(--ifm-color-emphasis-200)",
            backgroundColor: "var(--ifm-background-color)",
          }}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
            <div style={{ flex: 1, minWidth: 0 }}>{data.tags && <PromptCardTag tags={data.tags} />}</div>

            {showViewDetails && (
              <Link to={`/prompt/${data.id}`}>
                <Button type="link" icon={<InfoCircleOutlined />}>
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
