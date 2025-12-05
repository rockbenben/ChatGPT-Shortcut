import React from "react";
import { Modal, Typography, Space, Button, Tooltip, theme, Flex, Tag } from "antd";
import { CopyOutlined, CheckOutlined, LinkOutlined, InfoCircleOutlined, FireFilled, LikeFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { PromptCardTag } from "./PromptCard/PromptCardTag";
import { PromptRemark } from "./PromptCard/PromptRemark";
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

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({ open, onCancel, data }) => {
  if (!data) return null;

  const { token } = theme.useToken();
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
      centered
      destroyOnHidden
      title={null}
      styles={{
        body: {
          padding: 0,
          overflow: "hidden",
          borderRadius: token.borderRadiusLG,
        },
      }}
      closeIcon={null}>
      <Flex vertical style={{ height: "100%", maxHeight: "85vh" }}>
        {/* Header Section */}
        <div
          style={{
            padding: `${token.paddingMD}px ${token.paddingLG}px`,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            backgroundColor: token.colorBgContainer,
          }}>
          <Flex justify="space-between" align="start" gap={token.padding}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={3} style={{ margin: 0, marginBottom: token.marginXS }}>
                {data.title}
              </Typography.Title>
              <Space separator={<span style={{ color: token.colorBorder }}>|</span>} size="small" wrap>
                {data.share === false && (
                  <Space size={4}>
                    <LockOutlined style={{ color: token.colorTextSecondary }} />
                    <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      <Translate id="prompt.private">Private</Translate>
                    </Typography.Text>
                  </Space>
                )}
                {data.owner && (
                  <Space size={4}>
                    <UserOutlined style={{ color: token.colorTextTertiary }} />
                    <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      {data.owner}
                    </Typography.Text>
                  </Space>
                )}
                {data.copyCount > 0 && (
                  <Space size={4}>
                    <FireFilled style={{ color: token.colorError }} />
                    <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      {formatCompactNumber(data.copyCount)}
                    </Typography.Text>
                  </Space>
                )}
                {data.vote > 0 && (
                  <Space size={4}>
                    <LikeFilled style={{ color: token.colorWarning }} />
                    <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      {formatCompactNumber(data.vote)}
                    </Typography.Text>
                  </Space>
                )}
                {data.website && (
                  <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <LinkOutlined style={{ fontSize: token.fontSizeSM }} />
                    <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      Website
                    </Typography.Text>
                  </a>
                )}
              </Space>
            </div>
            {/* Close Button (Custom) */}
            <Button type="text" onClick={onCancel} style={{ color: token.colorTextTertiary }}>
              ✕
            </Button>
          </Flex>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            overflowY: "auto",
            padding: `${token.paddingLG}px`,
            flex: 1,
            backgroundColor: token.colorBgLayout,
          }}>
          <Flex vertical gap={token.marginLG}>
            {/* Remark / Note */}
            {data.remark && (
              <div
                style={{
                  padding: `${token.paddingSM}px ${token.paddingMD}px`,
                  backgroundColor: token.colorInfoBg,
                  borderRadius: token.borderRadius,
                  border: `1px solid ${token.colorInfoBorder}`,
                }}>
                <PromptRemark remark={data.remark} style={{ margin: 0, border: "none", padding: 0 }} />
              </div>
            )}

            {/* Prompt Content Block */}
            <div>
              <Flex justify="space-between" align="center" style={{ marginBottom: token.marginXS }}>
                <Typography.Text strong style={{ fontSize: token.fontSizeLG }}>
                  <Translate id="prompt.content">Prompt Content</Translate>
                </Typography.Text>
                <Button size="small" type={copied ? "primary" : "default"} icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy}>
                  {copied ? <Translate id="common.copied">Copied</Translate> : <Translate id="action.copy">Copy</Translate>}
                </Button>
              </Flex>
              <div
                style={{
                  backgroundColor: token.colorBgContainer,
                  padding: token.paddingMD,
                  borderRadius: token.borderRadiusLG,
                  border: `1px solid ${token.colorBorder}`,
                  boxShadow: token.boxShadowTertiary,
                }}>
                <Typography.Text
                  style={{
                    fontFamily: "'SF Mono', 'Menlo', 'Consolas', 'Courier New', monospace",
                    fontSize: token.fontSize,
                    lineHeight: 1.6,
                    color: token.colorText,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}>
                  {data.prompt}
                </Typography.Text>
              </div>
            </div>

            {/* Description */}
            {data.description && data.description !== data.prompt && (
              <div>
                <Typography.Text strong style={{ display: "block", marginBottom: token.marginXS, fontSize: token.fontSizeLG }}>
                  <Translate id="prompt.description">Description</Translate>
                </Typography.Text>
                <Typography.Paragraph type="secondary" style={{ margin: 0, lineHeight: 1.6 }}>
                  {data.description}
                </Typography.Paragraph>
              </div>
            )}
          </Flex>
        </div>

        {/* Footer Section */}
        <div
          style={{
            padding: `${token.paddingMD}px ${token.paddingLG}px`,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            backgroundColor: token.colorBgContainer,
          }}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={token.marginSM}>
            <div style={{ flex: 1, minWidth: 0 }}>{data.tags && <PromptCardTag tags={data.tags} />}</div>

            {showViewDetails && (
              <Link to={`/prompt/${data.id}`}>
                <Button type="link" icon={<InfoCircleOutlined />}>
                  <Translate id="action.viewDetails">View Details</Translate>
                </Button>
              </Link>
            )}
          </Flex>
        </div>
      </Flex>
    </Modal>
  );
};
