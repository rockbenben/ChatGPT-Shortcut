import React, { useEffect, useRef } from "react";
import { Button, Input, Typography } from "antd";
import type { InputRef } from "antd";
import Translate from "@docusaurus/Translate";
import { InputClearIcon } from "@site/src/components/InputClearIcon";
import { getPlaceholderValue } from "@site/src/utils/promptRender";

interface PromptPlaceholderBarProps {
  placeholders: string[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  focusKey?: string | null;
  focusNonce?: number;
}

/**
 * 紧凑交互式变量填写栏 —— 当提示词含 `[xxx]` 时呈现，支持点击正文占位符直接聚焦对应输入框。
 */
export const PromptPlaceholderBar: React.FC<PromptPlaceholderBarProps> = ({
  placeholders,
  values,
  onChange,
  onClear,
  focusKey,
  focusNonce,
}) => {
  const inputRefs = useRef(new Map<string, InputRef>());

  useEffect(() => {
    if (!focusKey) return;
    inputRefs.current.get(focusKey)?.focus();
  }, [focusKey, focusNonce]);

  if (placeholders.length === 0) return null;

  const filledCount = placeholders.filter((key) => Boolean(getPlaceholderValue(values, key)?.trim())).length;

  return (
    <div className="prompt-fill-bar">
      <div className="prompt-fill-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Typography.Text style={{ fontSize: 12, fontWeight: 600, color: "var(--ifm-color-content)" }}>
            <Translate id="placeholder.fillTitle">快速填写变量</Translate>
          </Typography.Text>
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--site-font-mono)",
              fontVariantNumeric: "tabular-nums",
              color: filledCount > 0 ? "var(--site-color-tag-selected-text)" : "var(--site-color-text-tertiary)",
            }}>
            {filledCount}/{placeholders.length}
          </span>
        </div>
        {filledCount > 0 && (
          <Button type="link" size="small" onClick={onClear} style={{ padding: 0, height: "auto", fontSize: 12 }}>
            <Translate id="placeholder.clear">清空</Translate>
          </Button>
        )}
      </div>

      <div className="prompt-fill-grid">
        {placeholders.map((key) => (
          <label key={key} className="prompt-fill-field">
            <span className="prompt-fill-label" title={key}>
              {key}
            </span>
            <Input
              ref={(el) => {
                if (el) inputRefs.current.set(key, el);
                else inputRefs.current.delete(key);
              }}
              size="small"
              allowClear={{ clearIcon: <InputClearIcon /> }}
              value={getPlaceholderValue(values, key) ?? ""}
              placeholder={key}
              onChange={(e) => onChange(key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
