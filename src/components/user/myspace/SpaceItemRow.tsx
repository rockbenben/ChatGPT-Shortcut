import React, { useMemo } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Tag, Button, Flex, Tooltip, Dropdown, Col } from "antd";
import { TagOutlined } from "@ant-design/icons";
import PromptCard from "@site/src/components/PromptCard";
import { getWeight } from "@site/src/utils/formatters";
import type { CustomTag } from "./types";

// 每个 item 一个 row 组件，让 React.memo 形成边界：
// 不抽出去时 MySpace 每次 re-render（点 favorite/搜索/切 filter/开 dropdown）都会重建
// extraActions JSX + tagMenuItems 数组 + 内联 onEdit 闭包，让 PromptCard 的 React.memo 全失败。
// 抽出后只有 props 真变的 row 才 re-render（典型：只有当前打开/切换 dropdown 的那张卡）。
interface SpaceItemRowProps {
  item: any;
  customTags: CustomTag[];
  isTagDropdownOpen: boolean;
  onToggleTag: (itemId: string, tagId: string) => void;
  setOpenTagDropdownItemId: (id: string | null) => void;
  setTagManagerOpen: (open: boolean) => void;
  saveTagAssignment: () => void;
  dropdownEditRef: React.MutableRefObject<{ itemId: string; originalTags: string[] } | null>;
  handleDeletePrompt: (id: number) => void;
  handleEditPrompt: (data: any) => void;
  handleRemoveFavorite: (id: number, isComm?: boolean) => void;
  handleConvertToPrivate: (data: any) => void;
  onOpenModal?: (data: any) => void;
}

const SpaceItemRow = React.memo<SpaceItemRowProps>(
  ({
    item,
    customTags,
    isTagDropdownOpen,
    onToggleTag,
    setOpenTagDropdownItemId,
    setTagManagerOpen,
    saveTagAssignment,
    dropdownEditRef,
    handleDeletePrompt,
    handleEditPrompt,
    handleRemoveFavorite,
    handleConvertToPrivate,
    onOpenModal,
  }) => {
    const hasAnyTag = (item.customTags?.length || 0) > 0;

    const tagMenuItems = useMemo(
      () => [
        ...customTags.map((tag) => {
          const isAssigned = item.customTags?.includes(tag.id);
          return {
            key: tag.id,
            label: (
              <Flex align="center" justify="space-between" gap="small" style={{ minWidth: 160 }}>
                <Tag color={tag.color} style={{ margin: 0, opacity: isAssigned ? 1 : 0.55 }}>
                  {tag.name}
                </Tag>
                <span
                  aria-hidden
                  style={{
                    color: isAssigned ? "var(--site-color-tag-selected-text)" : "transparent",
                    fontSize: 14,
                    fontWeight: 600,
                    minWidth: 16,
                    textAlign: "right",
                    lineHeight: 1,
                  }}>
                  ✓
                </span>
              </Flex>
            ),
            onClick: (info: any) => {
              info.domEvent?.stopPropagation();
              onToggleTag(item.id, tag.id);
            },
          };
        }),
        { type: "divider" as const },
        {
          key: "__manage",
          label: (
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--site-color-text-tertiary)" }}>
              <Translate id="myspace.manageTags">管理标签</Translate>
            </span>
          ),
          onClick: (info: any) => {
            info.domEvent?.stopPropagation();
            saveTagAssignment();
            setOpenTagDropdownItemId(null);
            setTagManagerOpen(true);
          },
        },
      ],
      [customTags, item.id, item.customTags, onToggleTag, saveTagAssignment, setOpenTagDropdownItemId, setTagManagerOpen],
    );

    const extraActions = (
      <Tooltip title={translate({ id: "myspace.assignTag", message: "分配标签" })}>
        {customTags.length > 0 ? (
          <Dropdown
            menu={{ items: tagMenuItems }}
            trigger={["click"]}
            open={isTagDropdownOpen}
            onOpenChange={(open, info) => {
              if (!open && info?.source === "menu") return;
              if (open) {
                dropdownEditRef.current = { itemId: item.id, originalTags: [...(item.customTags || [])] };
                setOpenTagDropdownItemId(item.id);
              } else {
                setOpenTagDropdownItemId(null);
                saveTagAssignment();
              }
            }}>
            <Button
              type="text"
              size="small"
              icon={<TagOutlined style={hasAnyTag ? { color: "var(--site-color-tag-selected-text)" } : undefined} />}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        ) : (
          <Button
            type="text"
            size="small"
            icon={<TagOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setTagManagerOpen(true);
            }}
          />
        )}
      </Tooltip>
    );

    return (
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <PromptCard
          type={item.type === "prompt" ? "user" : "favorite"}
          data={item.data}
          sortableId={item.id}
          copyCount={getWeight(item.data)}
          onDelete={item.type === "prompt" ? handleDeletePrompt : undefined}
          onEdit={item.type === "prompt" ? handleEditPrompt : undefined}
          onRemoveFavorite={item.type === "favorite" ? handleRemoveFavorite : undefined}
          onConvertToPrivate={item.type === "favorite" ? handleConvertToPrivate : undefined}
          onOpenModal={onOpenModal}
          extraActions={extraActions}
        />
      </Col>
    );
  },
);
SpaceItemRow.displayName = "SpaceItemRow";

export default SpaceItemRow;
