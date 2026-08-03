import React, { useState, useEffect } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Button, Space, Modal, Input, Flex, Dropdown } from "antd";
import { presetPrimaryColors } from "@ant-design/colors";
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
  const [newTagColor, setNewTagColor] = useState(PRESET_COLORS[4]); // gold as default
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
    // 自动切换到下一个颜色
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

  // 色块即标签。原来直接显示 antd 调色板的 key（"gold"/"geekblue"）——实现细节，且 18 种
  // 语言全是英文。填充用调色板原色而非 <Tag color>：暗色模式下 Tag 底色太重，抽掉文字后
  // gold 和 lime 分辨不出。
  const Swatch = ({ color }: { color: string }) => (
    <span
      aria-label={color}
      style={{
        display: "inline-block",
        width: 28,
        height: 22,
        borderRadius: 4,
        background: presetPrimaryColors[color],
        border: "1px solid var(--site-color-hairline)",
      }}
    />
  );

  // 触发器用真 <button>：原来的 <Tag>（span）无法聚焦，键盘用户改不了颜色
  const ColorSelector = ({ value, onChange }: { value: string; onChange: (color: string) => void }) => (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: PRESET_COLORS.map((color) => ({
          key: color,
          label: <Swatch color={color} />,
          onClick: () => onChange(color),
        })),
      }}>
      <button type="button" aria-label={colorLabel} style={{ background: "none", border: 0, padding: 0, lineHeight: 0, cursor: "pointer" }}>
        <Swatch color={value} />
      </button>
    </Dropdown>
  );

  return (
    <Modal
      title={<Translate id="myspace.tagManager.title">管理自定义标签</Translate>}
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      okText={<Translate id="action.save">保存</Translate>}
      cancelText={<Translate id="action.cancel">取消</Translate>}>
      <Space orientation="vertical" style={{ width: "100%" }}>
        <Flex gap="small">
          <Input
            placeholder={translate({ id: "myspace.tagManager.namePlaceholder", message: "标签名称" })}
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onPressEnter={handleAddTag}
            style={{ flex: 1 }}
          />
          <ColorSelector value={newTagColor} onChange={setNewTagColor} />
          <Button icon={<PlusOutlined />} onClick={handleAddTag}>
            <Translate id="action.add">添加</Translate>
          </Button>
        </Flex>

        <div style={{ marginTop: 16 }}>
          {localTags.map((tag) => (
            <Flex key={tag.id} align="center" gap="small" style={{ marginBottom: 8 }}>
              <Input value={tag.name} onChange={(e) => handleUpdateTagName(tag.id, e.target.value)} style={{ flex: 1 }} />
              <ColorSelector value={tag.color} onChange={(color) => handleUpdateTagColor(tag.id, color)} />
              <Button icon={<DeleteOutlined />} danger size="small" onClick={() => handleDeleteTag(tag.id)} />
            </Flex>
          ))}
          {localTags.length === 0 && (
            <EmptyState compact icon={<TagOutlined />} title={<Translate id="myspace.tagManager.empty">暂无自定义标签</Translate>} description={<Translate id="myspace.tagManager.emptyHint">在上面输入名称、选个颜色，就能建第一个标签</Translate>} />
          )}
        </div>
      </Space>
    </Modal>
  );
};

export default TagManagerModal;
