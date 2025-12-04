import React from "react";
import { Modal, Typography, Space, Button, Tooltip, theme, Flex } from "antd";
import { CopyOutlined, CheckOutlined, LinkOutlined, InfoCircleOutlined, FireFilled, LikeFilled } from "@ant-design/icons";
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
      destroyOnClose
      title={null} // Custom title in body
      styles={{
        body: {
          padding: 0,
        },
      }}>
      <Flex vertical style={{ height: "100%", maxHeight: "85vh" }}>
        {/* Header Section */}
        <div
          style={{
            padding: `${token.paddingMD}px ${token.paddingLG}px`,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            backgroundColor: token.colorBgContainer,
            borderTopLeftRadius: token.borderRadiusLG,
            borderTopRightRadius: token.borderRadiusLG,
          }}>
          <Flex justify="space-between" align="start" gap={token.padding}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                {data.title}
              </Typography.Title>
              <Flex align="center" gap={token.marginSM} wrap="wrap">
                {data.owner && (
                  <Typography.Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    <Translate id="prompt.owner">Shared by</Translate>: <span style={{ color: token.colorText }}>{data.owner}</span>
                  </Typography.Text>
                )}
                {data.copyCount > 0 && (
                  <Flex align="center" gap={4} style={{ color: token.colorError }}>
                    <FireFilled />
                    <Typography.Text type="danger" style={{ fontSize: token.fontSizeSM, fontWeight: 600 }}>
                      {formatCompactNumber(data.copyCount)}
                    </Typography.Text>
                  </Flex>
                )}
                {data.vote > 0 && (
                  <Flex align="center" gap={4} style={{ color: token.colorWarning }}>
                    <LikeFilled />
                    <Typography.Text type="warning" style={{ fontSize: token.fontSizeSM, fontWeight: 600 }}>
                      {formatCompactNumber(data.vote)}
                    </Typography.Text>
                  </Flex>
                )}
              </Flex>
            </div>
            {/* Actions Toolbar */}
            <Space size="small">
              {data.website && (
                <Tooltip title="Website">
                  <a href={data.website} target="_blank" rel="noopener noreferrer">
                    <Button icon={<LinkOutlined />} />
                  </a>
                </Tooltip>
              )}
              <Tooltip title={<Translate id="action.copy">Copy</Translate>}>
                <Button type={copied ? "primary" : "default"} icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy}>
                  {copied ? <Translate id="common.copied">Copied</Translate> : <Translate id="action.copy">Copy</Translate>}
                </Button>
              </Tooltip>
            </Space>
          </Flex>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            overflowY: "auto",
            padding: `${token.paddingLG}px`,
            flex: 1,
          }}>
          <Flex vertical gap={token.marginLG}>
            {/* Remark / Note */}
            {data.remark && (
              <div
                style={{
                  padding: token.paddingSM,
                  backgroundColor: token.colorFillQuaternary,
                  borderRadius: token.borderRadius,
                  borderLeft: `3px solid ${token.colorPrimary}`,
                }}>
                <PromptRemark remark={data.remark} style={{ margin: 0, border: "none", padding: 0 }} />
              </div>
            )}

            {/* Prompt Content Block */}
            <div>
              <Typography.Text type="secondary" strong style={{ display: "block", marginBottom: token.marginXS }}>
                <Translate id="prompt.content">Prompt Content</Translate>
              </Typography.Text>
              <div
                style={{
                  backgroundColor: token.colorFillAlter,
                  padding: token.paddingMD,
                  borderRadius: token.borderRadiusLG,
                  border: `1px solid ${token.colorBorderSecondary}`,
                  position: "relative",
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
                <Typography.Text type="secondary" strong style={{ display: "block", marginBottom: token.marginXS }}>
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
            backgroundColor: token.colorBgLayout,
            borderBottomLeftRadius: token.borderRadiusLG,
            borderBottomRightRadius: token.borderRadiusLG,
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
