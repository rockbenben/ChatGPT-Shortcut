import React, { useState } from "react";
import type { ComponentPropsWithRef } from "react";
import { Input, Button } from "antd";
import { SmileOutlined, GifOutlined, SendOutlined } from "@ant-design/icons";
import Translate, { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import { useAppleKeyboard } from "@site/src/hooks/useAppleKeyboard";

interface CommentEditorProps extends Pick<ComponentPropsWithRef<typeof Input.TextArea>, "id" | "ref" | "aria-describedby" | "aria-invalid" | "aria-required"> {
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

const CommentEditor: React.FC<CommentEditorProps> = ({ value, onChange, onSubmit, submitting, placeholder, isLoggedIn, onLogin, onEmojiToggle, onGifToggle, onCancel, ...fieldProps }) => {
  const [focused, setFocused] = useState(false);
  const isApple = useAppleKeyboard();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !e.nativeEvent.isComposing && isLoggedIn && !submitting) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div
      style={{
        border: `1px solid ${focused ? "var(--site-color-tag-selected-border)" : "var(--site-color-hairline)"}`,
        borderRadius: 10,
        backgroundColor: "var(--ifm-background-surface-color)",
        boxShadow: focused ? "0 0 0 3px rgba(var(--ifm-color-primary-rgb), 0.14)" : "none",
        transition: "border-color 0.14s var(--site-motion-emphasized), box-shadow 0.14s var(--site-motion-emphasized)",
        overflow: "hidden",
      }}>
      <Input.TextArea
        {...fieldProps}
        aria-label={onCancel ? translate({ id: "action.reply", message: "回复" }) : translate({ id: "comment.add", message: "提交评论" })}
        aria-keyshortcuts={isLoggedIn ? "Control+Enter Meta+Enter" : undefined}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
          resize: "vertical",
          padding: "12px 14px",
        }}
      />
      <div
        className="comment-editor-toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          padding: "8px 12px",
          borderTop: "1px solid var(--site-color-hairline)",
          backgroundColor: "var(--site-color-preview-bg)",
        }}>
        <div style={{ display: "flex", gap: 6 }}>
          <IconAction size="small" label={translate({ id: "comments.emoji.label", message: "插入表情" })} icon={<SmileOutlined />} onClick={onEmojiToggle} />
          <IconAction size="small" label={translate({ id: "comments.gif.label", message: "插入 GIF" })} icon={<GifOutlined />} onClick={onGifToggle} />
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end", marginInlineStart: "auto", gap: 8 }}>
          {isLoggedIn && (
            <kbd
              className="hideOnSmallScreen"
              aria-hidden
              style={{
                fontFamily: "var(--site-font-mono)",
                fontSize: 10.5,
                color: "var(--site-color-text-tertiary)",
                border: "1px solid var(--site-color-hairline)",
                borderRadius: 4,
                padding: "1px 5px",
                userSelect: "none",
              }}>
              {isApple ? "⌘↵" : "Ctrl+Enter"}
            </kbd>
          )}
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
