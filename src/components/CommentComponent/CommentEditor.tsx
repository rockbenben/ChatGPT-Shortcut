import React, { useState } from "react";
import { Input, Button } from "antd";
import { SmileOutlined, GifOutlined, SendOutlined } from "@ant-design/icons";
import Translate from "@docusaurus/Translate";

interface CommentEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  placeholder?: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onEmojiToggle: () => void;
  onGifToggle: () => void;
  onCancel?: () => void;
}

const CommentEditor: React.FC<CommentEditorProps> = ({ value, onChange, onSubmit, submitting, placeholder, isLoggedIn, onLogin, onEmojiToggle, onGifToggle, onCancel }) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      style={{
        border: `1px solid ${focused ? "var(--ifm-color-primary)" : "var(--ifm-color-emphasis-200)"}`,
        borderRadius: 8,
        boxShadow: focused ? "0 0 0 2px var(--ifm-color-primary-lightest)" : "none",
        transition: "all 0.3s",
        overflow: "hidden",
      }}>
      <Input.TextArea
        value={value}
        onChange={handleChange}
        rows={3}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
          resize: "vertical",
          padding: 12,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          borderTop: "1px solid var(--ifm-color-emphasis-200)",
        }}>
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="text" size="small" icon={<SmileOutlined />} onClick={onEmojiToggle} />
          <Button type="text" size="small" icon={<GifOutlined />} onClick={onGifToggle} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {onCancel && (
            <Button onClick={onCancel} size="small" disabled={submitting}>
              <Translate id="action.cancel">取消</Translate>
            </Button>
          )}
          {isLoggedIn ? (
            <Button type="primary" size="small" icon={<SendOutlined />} onClick={onSubmit} loading={submitting}>
              {onCancel ? <Translate id="action.reply">回复</Translate> : <Translate id="comment.add">提交评论</Translate>}
            </Button>
          ) : (
            <Button onClick={onLogin} type="primary" size="small">
              <Translate id="button.login">登录</Translate>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;
