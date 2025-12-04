import React, { useState } from "react";
import { Input, Button, theme } from "antd";
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
  const { token } = theme.useToken();
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      style={{
        border: `1px solid ${focused ? token.colorPrimary : token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorBgContainer,
        boxShadow: focused ? `0 0 0 2px ${token.colorPrimaryBg}` : "none",
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
          padding: token.paddingSM,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `${token.paddingXS}px ${token.paddingSM}px`,
          borderTop: `1px solid ${token.colorSplit}`,
          backgroundColor: token.colorFillQuaternary,
        }}>
        <div style={{ display: "flex", gap: token.marginXS }}>
          <Button type="text" size="small" icon={<SmileOutlined />} onClick={onEmojiToggle} />
          <Button type="text" size="small" icon={<GifOutlined />} onClick={onGifToggle} />
        </div>
        <div style={{ display: "flex", gap: token.marginXS }}>
          {onCancel && (
            <Button onClick={onCancel} size="small" disabled={submitting}>
              <Translate id="cancel">取消</Translate>
            </Button>
          )}
          {isLoggedIn ? (
            <Button type="primary" size="small" icon={<SendOutlined />} onClick={onSubmit} loading={submitting}>
              {onCancel ? <Translate id="reply.submit">回复</Translate> : <Translate id="comment.add">提交评论</Translate>}
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
