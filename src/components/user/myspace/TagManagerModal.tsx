import React, { useState, useEffect } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Button, Space, Modal, Input, Flex, Popover } from "antd";
import { PlusOutlined, DeleteOutlined, TagOutlined } from "@ant-design/icons";
import { EmptyState } from "@site/src/components/EmptyState";
import type { CustomTag } from "./types";

// Ant Design 预设颜色（支持深浅模式）
const PRESET_COLORS = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];

const TagManagerModal: React.FC<{
  open: boolean;
  onClose: () => void;
  tags: CustomTag[];
  onSave: (tags: CustomTag[]) => void;
}> = ({ open, onClose, tags, onSave }) => {
  const [localTags, setLocalTags] = useState<CustomTag[]>(tags);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(PRESET_COLORS[4]);
  const colorLabel = translate({ id: "myspace.tagManager.color", message: "标签颜色" });

  useEffect(() => {
    setLocalTags(tags);
  }, [tags, open]);

  const handleAddTag = () => {
    if (!newTagName.trim()) return;

    const newTag: CustomTag = {
      id: `tag_${Date.now()}`,
      name: newTagName.trim(),
      color: newTagColor,
      order: localTags.length,
    };
    setLocalTags([...localTags, newTag]);
    setNewTagName("");
    const currentIndex = PRESET_COLORS.indexOf(newTagColor);
    setNewTagColor(PRESET_COLORS[(currentIndex + 1) % PRESET_COLORS.length]);
  };

  const handleDeleteTag = (tagId: string) => {
    setLocalTags(localTags.filter((t) => t.id !== tagId));
  };

  const handleUpdateTagName = (tagId: string, name: string) => {
    setLocalTags(localTags.map((t) => (t.id === tagId ? { ...t, name } : t)));
  };

  const handleUpdateTagColor = (tagId: string, color: string) => {
    setLocalTags(localTags.map((t) => (t.id === tagId ? { ...t, color } : t)));
  };

  const handleSave = () => {
    onSave(localTags);
    onClose();
  };

  const Swatch = ({ color, active = false, size = 18 }: { color: string; active?: boolean; size?: number }) => (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `var(--ant-${color}-6)`,
        border: active ? "2px solid var(--ifm-color-content)" : "1px solid var(--site-color-hairline)",
        boxShadow: active ? "0 0 0 2px var(--ant-color-bg-elevated, #272d33)" : undefined,
        flexShrink: 0,
      }}
    />
  );

  const ColorSelector = ({ value, onChange }: { value: string; onChange: (color: string) => void }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
      <Popover
        trigger="click"
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        placement="bottomLeft"
        content={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, padding: 2 }}>
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                aria-pressed={value === color}
                onClick={() => {
                  onChange(color);
                  setPopoverOpen(false);
                }}
                style={{
                  background: "none",
                  border: 0,
                  padding: 2,
                  lineHeight: 0,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}>
                <Swatch color={color} active={value === color} size={22} />
              </button>
            ))}
          </div>
        }>
        <button
          type="button"
          aria-label={colorLabel}
          style={{
            background: "transparent",
            border: "1px solid var(--site-color-hairline)",
            borderRadius: 8,
            width: 32,
            height: 32,
            padding: 0,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
          <Swatch color={value} size={16} />
        </button>
      </Popover>
    );
  };

  return (
    <Modal
      centered
      title={<Translate id="myspace.tagManager.title">管理自定义标签</Translate>}
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      okText={<Translate id="action.save">保存</Translate>}
      cancelText={<Translate id="action.cancel">取消</Translate>}>
      <Space orientation="vertical" size="middle" style={{ width: "100%", marginTop: 12 }}>
        <Flex gap="small" align="center">
          <ColorSelector value={newTagColor} onChange={setNewTagColor} />
          <Input
            aria-label={translate({ id: "myspace.tagManager.namePlaceholder", message: "标签名称" })}
            placeholder={translate({ id: "myspace.tagManager.namePlaceholder", message: "标签名称" })}
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onPressEnter={handleAddTag}
            style={{ flex: 1 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTag} disabled={!newTagName.trim()}>
            <Translate id="action.add">添加</Translate>
          </Button>
        </Flex>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {localTags.map((tag) => (
            <Flex
              key={tag.id}
              align="center"
              gap="small"
              style={{
                padding: "4px 8px",
                borderRadius: 10,
                background: "var(--site-color-preview-bg)",
                border: "1px solid var(--site-color-hairline)",
              }}>
              <ColorSelector value={tag.color} onChange={(color) => handleUpdateTagColor(tag.id, color)} />
              <Input
                variant="borderless"
                value={tag.name}
                onChange={(e) => handleUpdateTagName(tag.id, e.target.value)}
                aria-label={translate({ id: "myspace.tagManager.namePlaceholder", message: "标签名称" })}
                style={{ flex: 1, paddingInline: 4 }}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                aria-label={translate({ id: "action.delete", message: "删除" })}
                onClick={() => handleDeleteTag(tag.id)}
                style={{ color: "var(--site-color-text-tertiary)" }}
              />
            </Flex>
          ))}
          {localTags.length === 0 && (
            <EmptyState
              compact
              icon={<TagOutlined />}
              title={<Translate id="myspace.tagManager.empty">暂无自定义标签</Translate>}
              description={<Translate id="myspace.tagManager.emptyHint">在上面输入名称、选个颜色，就能建第一个标签</Translate>}
            />
          )}
        </div>
      </Space>
    </Modal>
  );
};

export default TagManagerModal;
