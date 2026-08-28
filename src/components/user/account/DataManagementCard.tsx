import React from "react";
import Translate from "@docusaurus/Translate";
import { Card, Button, Space, Typography, Avatar, Popconfirm, Flex } from "antd";
import { DownloadOutlined, ImportOutlined, DatabaseOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface DataManagementCardProps {
  canExport: boolean;
  importing: boolean;
  onExport: () => void;
  onImportClick: () => void;
  onClearCache: () => void;
}

/** 数据管理卡片：导出 / 导入 / 清缓存三行（纯展示，动作由 useImportExport 与页面提供） */
const DataManagementCard: React.FC<DataManagementCardProps> = ({ canExport, importing, onExport, onImportClick, onClearCache }) => (
  <Card
    style={{
      borderRadius: 12,
    }}
    title={
      <Space>
        <DatabaseOutlined />
        <Translate id="title.dataManagement">数据管理</Translate>
      </Space>
    }>
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      {/* Export Prompts */}
      <Flex justify="space-between" align="center" style={{ padding: "12px 0", borderBottom: "1px solid var(--site-color-hairline)" }}>
        <Flex align="center" gap={20}>
          <Avatar
            icon={<DownloadOutlined />}
            style={{
              backgroundColor: "var(--ifm-background-surface-color)",
              color: "var(--site-color-tag-selected-text)",
              border: "1px solid var(--site-color-hairline)",
            }}
          />
          <div>
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
      <Flex justify="space-between" align="center" style={{ padding: "12px 0", borderBottom: "1px solid var(--site-color-hairline)" }}>
        <Flex align="center" gap={20}>
          <Avatar
            icon={<ImportOutlined />}
            style={{
              backgroundColor: "var(--ifm-background-surface-color)",
              color: "var(--site-color-tag-selected-text)",
              border: "1px solid var(--site-color-hairline)",
            }}
          />
          <div>
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
      <Flex justify="space-between" align="center" style={{ padding: "12px 0" }}>
        <Flex align="center" gap={20}>
          <Avatar
            icon={<DeleteOutlined />}
            style={{
              backgroundColor: "var(--ifm-background-surface-color)",
              color: "var(--site-color-text-tertiary)",
              border: "1px solid var(--site-color-hairline)",
            }}
          />
          {/* 这段文案**刻意硬编码英文、不走 i18n**，不要改回 <Translate>：
              在线版这个按钮只清客户端缓存，清完从服务端重取，原译文「清除后将重新加载所有数据」是准确的；
              离线版的 localStorage 就是数据库，同一个按钮是永久删掉收藏 / 自建提示词 / 标签 / 排序，
              没有任何备份也无法撤销 —— 沿用那套译文会让用户以为数据还能回来。
              不新增 i18n key：同一句话要铺 17 个 locale，而这里语义的正确性比本地化要紧。
              cancelText 保留译文：“取消”是安全选项，用母语看懂更重要，也不会误导。 */}
          <div>
            <Text strong>Clear local data</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Permanently deletes everything this site stores in your browser
            </Text>
          </div>
        </Flex>
        <Popconfirm
          title="Delete all local data?"
          // 不用 <Text type="warning">：antd 的 colorWarningText 在浅色主题下是 #faad14，
          // 压白底只有 1.9:1（14px 要求 4.5:1）—— 实测几乎看不见，而这是整个界面上
          // 最需要被看清的一句话。改用站点自己那对达标的 token（浅 #ad4e00 / 暗 #fa8c16）。
          description={<Text style={{ color: "var(--site-color-warning-text)" }}>This browser is the only place it is stored. Export a backup first — this cannot be undone.</Text>}
          onConfirm={onClearCache}
          okText="Delete permanently"
          okButtonProps={{ danger: true }}
          cancelText={<Translate id="action.cancel">取消</Translate>}
          styles={{ root: { maxWidth: 340 } }}
          placement="topRight">
          <Button danger icon={<DeleteOutlined />}>
            Delete all
          </Button>
        </Popconfirm>
      </Flex>
    </Space>
  </Card>
);

export default DataManagementCard;
