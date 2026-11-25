import React from "react";
import Translate from "@docusaurus/Translate";
import { Card, Button, Space, Typography, Popconfirm, Flex } from "antd";
import { DownloadOutlined, ImportOutlined, DatabaseOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface DataManagementCardProps {
  canExport: boolean;
  importing: boolean;
  onExport: () => void;
  onImportClick: () => void;
  onClearCache: () => void;
}

const badgeStyle: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 10,
  backgroundColor: "var(--site-color-preview-bg)",
  border: "1px solid var(--site-color-hairline)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  flexShrink: 0,
};

/** 数据管理卡片：导出 / 导入 / 清缓存三行（纯展示，动作由 useImportExport 与页面提供） */
const DataManagementCard: React.FC<DataManagementCardProps> = ({ canExport, importing, onExport, onImportClick, onClearCache }) => (
  <Card
    style={{
      borderRadius: 12,
      borderColor: "var(--site-color-hairline)",
      boxShadow: "var(--site-shadow-xs)",
    }}
    title={
      <Space>
        <DatabaseOutlined />
        <Translate id="title.dataManagement">数据管理</Translate>
      </Space>
    }>
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      {/* Export Prompts */}
      <Flex justify="space-between" align="center" wrap="wrap" gap={12} style={{ padding: "12px 0", borderBottom: "1px solid var(--site-color-hairline)" }}>
        <Flex align="center" gap={14} style={{ minWidth: 0, flex: "1 1 220px" }}>
          <span aria-hidden style={{ ...badgeStyle, color: "var(--site-color-tag-selected-text)" }}>
            <DownloadOutlined />
          </span>
          <div style={{ minWidth: 0 }}>
            <Text strong>
              <Translate id="button.exportPrompts">导出提示词</Translate>
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              <Translate id="description.exportPrompts.short">导出为 JSON 文件，方便备份</Translate>
            </Text>
          </div>
        </Flex>
        <Button icon={<DownloadOutlined />} onClick={onExport} disabled={!canExport}>
          <Translate id="button.export">导出数据</Translate>
        </Button>
      </Flex>

      {/* Import Prompts */}
      <Flex justify="space-between" align="center" wrap="wrap" gap={12} style={{ padding: "12px 0", borderBottom: "1px solid var(--site-color-hairline)" }}>
        <Flex align="center" gap={14} style={{ minWidth: 0, flex: "1 1 220px" }}>
          <span aria-hidden style={{ ...badgeStyle, color: "var(--site-color-tag-selected-text)" }}>
            <ImportOutlined />
          </span>
          <div style={{ minWidth: 0 }}>
            <Text strong>
              <Translate id="button.importPrompts">导入提示词</Translate>
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              <Translate id="description.importPrompts.short">从 JSON 文件导入提示词和收藏</Translate>
            </Text>
          </div>
        </Flex>
        <Button icon={<ImportOutlined />} loading={importing} onClick={onImportClick}>
          <Translate id="button.import">导入数据</Translate>
        </Button>
      </Flex>

      {/* Clear Cache */}
      <Flex justify="space-between" align="center" wrap="wrap" gap={12} style={{ padding: "12px 0 4px" }}>
        <Flex align="center" gap={14} style={{ minWidth: 0, flex: "1 1 220px" }}>
          <span aria-hidden style={{ ...badgeStyle, color: "var(--site-color-text-tertiary)" }}>
            <DeleteOutlined />
          </span>
          <div style={{ minWidth: 0 }}>
            <Text strong>
              <Translate id="button.clearCache">清除缓存</Translate>
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              <Translate id="description.clearCache.short">刷新本地缓存数据</Translate>
            </Text>
          </div>
        </Flex>
        <Popconfirm
          title={<Translate id="modal.clearCache.title">确认清除缓存？</Translate>}
          description={
            <Text type="warning">
              <Translate id="modal.clearCache.warning">清除后将重新加载所有数据</Translate>
            </Text>
          }
          onConfirm={onClearCache}
          okText={<Translate id="button.confirmClear">确认清除</Translate>}
          okButtonProps={{ danger: true }}
          cancelText={<Translate id="action.cancel">取消</Translate>}
          placement="topRight">
          <Button icon={<DeleteOutlined />}>
            <Translate id="button.clearAllCache">清除所有缓存</Translate>
          </Button>
        </Popconfirm>
      </Flex>
    </Space>
  </Card>
);

export default DataManagementCard;
