import React, { useState, useEffect } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Empty, Tag, Button, Space, Modal, Input, Flex, Dropdown } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
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

  // 颜色选择器组件
  const ColorSelector = ({ value, onChange }: { value: string; onChange: (color: string) => void }) => (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: PRESET_COLORS.map((color) => ({
          key: color,
          label: (
            <Tag color={color} style={{ margin: 0, cursor: "pointer" }}>
              {color}
            </Tag>
          ),
          onClick: () => onChange(color),
        })),
      }}>
      <Tag color={value} style={{ cursor: "pointer", minWidth: 60 }}>
        {value}
      </Tag>
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
          {localTags.length === 0 && <Empty description={<Translate id="myspace.tagManager.empty">暂无自定义标签</Translate>} />}
        </div>
      </Space>
    </Modal>
  );
};

export default TagManagerModal;
